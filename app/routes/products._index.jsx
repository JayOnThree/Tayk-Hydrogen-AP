import {useState, Fragment} from 'react';
import {useLoaderData} from '@remix-run/react';
import {json} from 'react-router';
import {Container, Row, Col} from 'react-bootstrap';
import {Link, useNavigate} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

const seo = ({data}) => ({
  title: data?.collection?.title,
  description: data?.collection?.description,
});
export const handle = {
  seo,
};

export async function loader({context}) {
  const {products} = await context.storefront.query(PRODUCTS_QUERY);

  return json({
    products,
    analytics: {
      pageType: '/Products',
    },
  });
}

export const meta = () => {
  return {
    title: 'products',
    description: 'Products page, view all merchandise here',
  };
};

export default function Collection() {
  const Orientation = [
    'A1',
    'A2',
    'A3',
    'A4',
    'B1',
    'B2',
    'B3',
    'B4',
    'C1',
    'C2',
    'C3',
    'C4',
    'D1',
    'D2',
    'D3',
    'D4',
    'E1',
    'E2',
    'E3',
    'E4',
    'F1',
    'F2',
    'F3',
    'F4',
  ];

  const Buttons = [
    'A',
    '1',
    '2',
    'B',
    '3',
    '4',
    'C',
    '5',
    '6',
    'D',
    '7',
    '8',
    'E',
    '9',
    '0',
  ];

  const {products} = useLoaderData();
  const [textIndex, setTextIndex] = useState(null);
  const [dialText, setDialText] = useState(null);
  const CollectionLength = products.nodes.length;
  const updatedOrientation = Orientation.splice(0, CollectionLength);
  // const {price} = product.variants?.nodes[0] || {};
  const navigation = useNavigate();

  function enterFunction() {
    const routeIndex = updatedOrientation.indexOf(dialText);
    if (updatedOrientation.indexOf(dialText) !== -1) {
      setDialText('Thank you');
      setTimeout(() => {
        navigation(`/products/${products.nodes[routeIndex].handle}`);
      }, 800);
    } else {
      setDialText('Pick again');
      setTimeout(() => {
        setDialText(null);
      }, 800);
    }
  }

  return (
    <Container fluid className="container-shop" style={{overflow: 'hidden'}}>
      <Row style={{height: '100%'}}>
        <Col lg={8} xs={12} className="product-page-div">
          <div className="Product-wrapper">
            {products.nodes.map((product, i) => {
              const {price} = product.variants?.nodes[0] || {};
              const hide = product.tags.includes('coming soon');

              return (
                <div
                  className="Product"
                  key={product.id}
                  onPointerOver={() => setTextIndex(i)}
                  onPointerOut={() => setTextIndex(null)}
                >
                  <Link
                    to={`${hide ? '/products' : `/products/${product.handle}`}`}
                    style={{textDecoration: 'none'}}
                  >
                    <Image
                      data={product.variants.nodes[0].image}
                      alt={product.title}
                      className="prod-images"
                    />
                    <h6 className="title-product-text-products">
                      {product.title}
                    </h6>
                    <div className="vending-text-div" style={{display: 'flex'}}>
                      <h6 className="vending-text">{Orientation[i]}</h6>
                      <Money data={price} className="vending-price-text" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </Col>
        <Col lg={4} xs={5} className="d-none d-md-none d-lg-flex">
          <div style={{height: '100%', width: '100%'}}>
            <div className="marque-div-mobile">
              {dialText === null ? (
                textIndex === null ? (
                  <marquee className="marque-text">
                    CLICK AN ITEM OR TYPE ITS CODE
                  </marquee>
                ) : (
                  <h5 className="marque-text">{Orientation[textIndex]}</h5>
                )
              ) : (
                <h5 className="marque-text">{dialText}</h5>
              )}
            </div>
            <div
              className="dialpad-parent-container"
              style={{backgroundImage: `url(/panelBackground.svg)`}}
            >
              <div className="dialpad-div-container">
                {Buttons.map((value) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                      key={value}
                      className="square"
                      onClick={() =>
                        setDialText(
                          dialText === null ? value : dialText + value,
                        )
                      }
                    >
                      <div className="content">
                        <h4 className="dial-button-text">{value}</h4>
                      </div>
                    </div>
                  );
                })}
                <div className="square" onClick={() => setDialText(null)}>
                  <div className="content">
                    <h4 className="dial-button-text">X</h4>
                  </div>
                </div>
                <div
                  className="square"
                  onClick={() => {
                    enterFunction();
                  }}
                >
                  <div className="content" style={{width: '200%'}}>
                    <h4 className="dial-button-text">Select</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const PRODUCTS_QUERY = `#graphql
  query products {
    products(first: 100) {
        nodes {
          id
          title
          publishedAt
          handle
          tags
          variants(first: 1) {
            nodes {
              id
              image {
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
            }
          }
        }
      }
    }
`;
