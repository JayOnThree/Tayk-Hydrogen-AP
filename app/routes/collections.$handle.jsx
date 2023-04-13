import {useState} from 'react';
import {useLoaderData, Link} from '@remix-run/react';
import {json} from 'react-router';
import {Container, Row, Col} from 'react-bootstrap';
import {useNavigate} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';
// import {motion} from 'framer-motion';

import ProductCard from '~/components/ProductCard';

const seo = ({data}) => ({
  title: data?.collection?.title,
  description: data?.collection?.description,
});
export const handle = {
  seo,
};

export async function loader({params, context, request}) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');

  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      cursor,
    },
  });

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);

  if (!collection) {
    throw new Response(null, {status: 404});
  }

  return json({
    collection,
    collections,
    analytics: {
      // pageType: `collections/${handle}`,
      pageType: AnalyticsPageType.collection,
      collections: [collections],
    },
  });
}

export const meta = ({data}) => {
  return {
    title: data?.collection?.title ?? 'Collection',
    description: data?.collection?.description,
  };
};

export default function Collection() {
  // const MotionContainer = motion(Container);
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

  const {collection, collections} = useLoaderData();
  const [textIndex, setTextIndex] = useState(null);
  const [dialText, setDialText] = useState(null);
  const CollectionLength = collection.products.nodes.length;
  const updatedOrientation = Orientation.splice(0, CollectionLength);
  const navigation = useNavigate();

  function enterFunction() {
    const routeIndex = updatedOrientation.indexOf(dialText);
    if (updatedOrientation.indexOf(dialText) !== -1) {
      setDialText('Thank you');
      setTimeout(() => {
        navigation(`/products/${collection.products.nodes[routeIndex].handle}`);
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
      <Row style={{height: '100px'}}>
        <Col lg={8} className="category-div">
          {collections.nodes.map((collection) => {
            return (
              <Link
                style={{textDecoration: 'none'}}
                to={`/collections/${collection.handle}`}
                key={collection.id}
                className="category-text category-text-size"
              >
                {collection.title}
              </Link>
            );
          })}
        </Col>
        <Col lg={4} className="marque-div d-none d-md-none d-lg-flex">
          {dialText === null ? (
            textIndex === null ? (
              <marquee className="marque-text">
                CLICK AN ITEM OR TYPE ITS CODE
              </marquee>
            ) : (
              <h5 className="marque-text">{updatedOrientation[textIndex]}</h5>
            )
          ) : (
            <h5 className="marque-text">{dialText}</h5>
          )}
        </Col>
      </Row>
      <Row style={{height: 'calc(100% - 100px)'}}>
        <Col lg={8} xs={7} className="product-page-div">
          <div className="Product-wrapper">
            {collection.products.nodes.map((product, i) => (
              <div
                key={product.id}
                onPointerOver={() => setTextIndex(i)}
                onPointerOut={() => setTextIndex(null)}
              >
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </Col>
        <Col lg={4} xs={5}>
          <div style={{height: '100%', width: '100%'}}>
            <div className="marque-div-mobile d-flex d-lg-none">
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

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 10) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(first: 100) {
        nodes {
          id
          title
          publishedAt
          handle
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
  }
`;
