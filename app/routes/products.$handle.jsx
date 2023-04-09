import {useState} from 'react';
import {useLoaderData} from '@remix-run/react';
import {Container, Row, Col} from 'react-bootstrap';
import {json} from 'react-router';
import {Image} from '@shopify/hydrogen-react';
import {Money, ShopPayButton} from '@shopify/hydrogen-react';
import {useMatches, useFetcher} from '@remix-run/react';

import ProductOptions from '~/components/ProductOptions';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

const seo = ({data}) => ({
  title: data?.product?.title,
  description: data?.product?.description,
});
export const handle = {
  seo,
};

function ProductForm({variantId, selectedVariant}) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();
  const lines = [{merchandiseId: variantId, quantity: 1}];
  const isOutOfStock = !selectedVariant?.availableForSale;
  const analytics = {
    event: 'addToCart',
    // products: [product],
  };

  return (
    <>
      {isOutOfStock ? (
        <button className="addtocart-button-soldout">Sold Out</button>
      ) : (
        <fetcher.Form action="/cart" method="post">
          <input
            type="hidden"
            name="analytics"
            value={JSON.stringify(analytics)}
          />
          <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
          <input
            type="hidden"
            name="countryCode"
            value={selectedLocale?.country ?? 'US'}
          />
          <input type="hidden" name="lines" value={JSON.stringify(lines)} />
          <button className="addtocart-button">Add to Bag</button>
        </fetcher.Form>
      )}
    </>
  );
}

export const loader = async ({params, context, request}) => {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions = [];

  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];

  return json({
    product,
    selectedVariant,
    storeDomain: shop.primaryDomain.url,
    analytics: {
      pageType: `products/${handle}`,
    },
  });
};

export default function ProductHandle() {
  const {product, selectedVariant} = useLoaderData();
  const [imageIndex, setImageIndex] = useState(0);
  const [toggleDescription, setToggleDescription] = useState(false);
  // const [toggleReturns, setToggleReturns] = useState(false);
  const largeImage = product.media.nodes[imageIndex && imageIndex].image;
  const sizeVariantsIndicator = product.variants;
  // const prodMediaLength = product.media.nodes.length;

  return (
    <>
      <Header />
      <Container fluid className="container-shop">
        <Row style={{height: '100%'}}>
          <Col
            className="product-images-div d-none d-md-none d-lg-block"
            lg={3}
          >
            {product.media.nodes.map((product, i) => {
              return (
                <div key={product.image.id}>
                  {product.image !== undefined && (
                    <Image
                      data={product.image}
                      className="desktop-image-picker"
                      onClick={() => setImageIndex(i)}
                    />
                  )}
                </div>
              );
            })}
          </Col>
          <Col
            className="product-images-div d-none d-md-none d-lg-block"
            lg={5}
            style={{backgroundImage: `url(${largeImage.url})`}}
          ></Col>
          <Col
            xs={12}
            className="product-images-div-mobile d-flex d-lg-none"
            style={{backgroundImage: `url(${largeImage.url})`}}
          ></Col>
          <Col
            className="product-images-picker-div-mobile d-flex d-lg-none"
            xs={12}
          >
            {product.media.nodes.map((product, i) => {
              return (
                <div key={product.image.id}>
                  {product.image !== undefined && (
                    <Image
                      data={product.image}
                      className="desktop-image-picker-mobile"
                      onClick={() => setImageIndex(i)}
                    />
                  )}
                </div>
              );
            })}
          </Col>
          <Col
            className="product-options-div"
            lg={4}
            style={{backgroundImage: `url(/panelBackground.svg)`}}
          >
            <h1 className="prod-title">{product.title}</h1>
            <Money
              withoutTrailingZeros
              data={selectedVariant.price}
              className="price-text"
            />
            <ProductOptions
              options={product.options}
              selectedVariant={selectedVariant}
              sizeVariantsIndicator={sizeVariantsIndicator.nodes}
            />
            {/* <ShopPayButton
              storeDomain={storeDomain}
              variantIds={[selectedVariant?.id]}
              width={'100%'}
            /> */}
            <ProductForm
              variantId={selectedVariant?.id}
              selectedVariant={selectedVariant}
              // product={product}
            />
            <h6
              style={{marginTop: '5vh'}}
              className="sub-title-prod"
              onClick={() => setToggleDescription(!toggleDescription)}
            >
              Description{' '}
              <img
                src="/arrow.svg"
                className="arrow-image-product"
                style={{
                  transform: toggleDescription
                    ? 'rotate(-180deg)'
                    : 'rotate(0)',
                }}
              />
            </h6>
            {toggleDescription && (
              <div
                dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
                className="subtext-prod"
              ></div>
            )}

            {/* <h6
              className="sub-title-prod"
              onClick={() => setToggleReturns(!toggleReturns)}
            >
              Returns & Exchanges{' '}
              <img
                src="/arrow.svg"
                className="arrow-image-product"
                style={{
                  transform: toggleReturns ? 'rotate(-180deg)' : 'rotate(0)',
                }}
              />
            </h6>
            {toggleReturns && (
              <div className="subtext-prod">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            )} */}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
      media(first: 10) {
        nodes {
          ... on MediaImage {
            mediaContentType
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
      options {
        name,
        values,
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;