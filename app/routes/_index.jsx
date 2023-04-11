import {ClientOnly} from 'remix-utils';
import {useLoaderData} from '@remix-run/react';
import {json} from 'react-router';

import Canvas from '~/components3D/Scene';

export async function loader({context}) {
  const {products} = await context.storefront.query(PRODUCTS_QUERY);
  return json({products});
}

export default function index() {
  const {products} = useLoaderData();

  return (
    <div className="App">
      <ClientOnly
        fallback={null}
        children={() => <Canvas products={products} />}
      />
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
