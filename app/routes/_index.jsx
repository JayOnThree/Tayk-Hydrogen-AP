import {ClientOnly} from 'remix-utils';
import {useLoaderData} from '@remix-run/react';
import {json} from 'react-router';

import Canvas from '~/components3D/Scene';
import Footer from '~/components/Footer';

export async function loader({context}) {
  const {products} = await context.storefront.query(PRODUCTS_QUERY);
  return json({products});
}

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {products} = useLoaderData();

  return (
    <div className="App">
      <ClientOnly
        fallback={null}
        children={() => <Canvas products={products} />}
      />
      <Footer />
    </div>
  );
}

const PRODUCTS_QUERY = `#graphql
  query products {
    products(first: 12) {
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
            }
          }
        }
      }
    }
`;
