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

function ProductForm({variantId, selectedVariant}) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();
  const lines = [{merchandiseId: variantId, quantity: 1}];
  const isOutOfStock = !selectedVariant?.availableForSale;

  return (
    <div>
      {isOutOfStock ? (
        <button className="addtocart-button-soldout">Sold Out</button>
      ) : (
        <fetcher.Form action="/cart" method="post">
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
    </div>
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
  });
};

export default function ProductHandle() {
  const {product, selectedVariant, storeDomain} = useLoaderData();
  const [imageIndex, setImageIndex] = useState(0);
  const [toggleDescription, setToggleDescription] = useState(false);
  const [toggleReturns, setToggleReturns] = useState(false);
  const largeImage = product.media.nodes[imageIndex && imageIndex].image;
  const sizeVariantsIndicator = product.variants;
  // const prodMediaLength = product.media.nodes.length;

  return (
    <>
      <Header
        mediaHome={false}
        blogPost={false}
        productHome={false}
        product={true}
        landingPage={false}
        dragX={{x: 0}}
      />
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
            {/* add to cart button */}
            <ProductForm
              variantId={selectedVariant?.id}
              selectedVariant={selectedVariant}
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

{
  /* <Row style={{width: '100%', paddingTop: '3vh'}}>
        <Col className="g-0 d-md-none d-none d-lg-block" lg={1}>
          <div style={{width: '100%', paddingLeft: '10px'}}>
            {product.media.nodes.map((product, i) => {
              return (
                <div key={i}>
                  {product.image !== undefined &&
                    i <= lastImage &&
                    i >= firstImage && (
                      <Image
                        data={product.image}
                        className="desktop-image-picker"
                        onClick={() => setImageIndex(i)}
                      />
                    )}
                </div>
              );
            })}
            <div
              className="image-picker-div"
              onClick={() => {
                setFirstImage(
                  firstImage < prodMediaLength - 4
                    ? firstImage + 1
                    : prodMediaLength - 4,
                    setLastImage(lastImage < prodMediaLength - 1 ? lastImage + 1 : lastImage)
                  )}}
                >
                  <img src={'/arrow.svg'} className="arrow-image" />
            </div>
            <div
              className="image-picker-div"
              onClick={() => {
                setFirstImage(firstImage > 0 ? firstImage - 1 : 0);
                setLastImage(
                  lastImage < prodMediaLength && firstImage > 0
                    ? lastImage - 1
                    : lastImage,
                )
                  }}
            >
              <img
                src={'/arrow'}
                className="arrow-image"
                style={{transform: 'rotate(180deg)'}}
              />
            </div>
          </div>
        </Col>

        <Col lg={7} className="d-md-none d-none d-lg-block">
          <div className="prod-main-image">
              <Image
                data={largeImage}
                style={{ width: "auto", height: "100%" }}
              />
            </div>
          </Col>

          <Col 
            md={12} sm={12} xs={12} 
            className='d-block d-lg-none' 
            style={{ width: "100%", textAlign: "center", marginLeft: "15px" }}
          >
              <Image
                data={largeImage}
                style={{ width: "100%", height: "auto", border: "1px solid black" }}
              />
          </Col>
          <Col
            md={12} sm={12} xs={12} 
            className=' d-block d-lg-none' 
            style={{ height: "15vh", marginLeft: "15px", width: "100%", marginTop: "10px", display: "table" }}
          >
              {product.media.nodes.map((product, i) => {
                  return (
                    <div key={i} style={{ height: "100%", width: "25%", float: "left" }}>
                      {product.image !== undefined && i < 4 &&
                        <div
                          key={i}
                          style={{ backgroundImage: `url(${product.image.url})` }}
                          className="mobile-image-picker"
                          onClick={() => setImageIndex(i)}
                        >
                        </div>
                      }
                    </div>
                  )
                })}
          </Col>

          <Col lg={4} style={{ marginTop: "10px" }}>
            <h1 className='prod-title'>{product.title}</h1>
            <Money
              withoutTrailingZeros
              data={selectedVariant.price}
              style={{ fontSize: "15pt", fontWeight: "400", marginBottom: "10px" }}
            />
            <div className='info-box-div'>
                <h6 className='info-box-text'>seller: <span style={{ color: "green" }}>blade(1734)</span></h6>
                <h6 className='info-box-text'>ships from: Los Angeles</h6>
                <h6 className='info-box-text'>ships to: Worldwide</h6>
            </div>
            <ProductOptions options={product.options} selectedVariant={selectedVariant} />

          <div style={{width: '100%', marginTop: '2vh'}}>
            <ProductForm variantId={selectedVariant?.id} />
          </div>
            <h6 style={{ marginTop: "5vh" }} className='sub-title-prod' onClick={() => setToggleDescription(!toggleDescription)}>
              Description <img src={'/arrow.svg'} className="arrow-image" style={{ transform: toggleDescription ? "rotate(-180deg)" : "rotate(0)" }} />
            </h6>
            {toggleDescription &&
              <div
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              ></div>
            }

            <h6 className='sub-title-prod' onClick={() => setToggleReturns(!toggleReturns)}>
              Returns & Exchanges <img src={'/arrow.svg'} className="arrow-image" style={{ transform: toggleReturns ? "rotate(-180deg)" : "rotate(0)" }} />
            </h6>
            {toggleReturns &&
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            }
          </Col>
        </Row>
        <Row style={{ height: "10vh", padding: "50px 10px 10px 10px" }}>
          <h6>You may also like:</h6>
        </Row> */
}
