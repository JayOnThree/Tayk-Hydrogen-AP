import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import styles from './styles/app.css';
import favicon from '../public/favicon.svg';
import bootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import shareicon from '../public/shareimage.png';
import {defer} from '@shopify/remix-oxygen';
import {Layout} from '~/components/Layout';
import {CART_QUERY} from '~/queries/cart';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'stylesheet', href: bootstrapCSS},
    {rel: 'stylesheet', href: 'https://use.typekit.net/qbo7evm.css'},
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  title: "The Tay K Experience",
  description: 'Connect and shop on the Tay K certified platform',
  'og:image': shareicon,
  'og:image:type': 'image/png',
  'og:image:width': '1024',
  'og:image:height': '1024',
});

export async function loader({context, request}) {
  const cartId = await context.session.get('cartId');
  return defer({
    cart: cartId ? getCart(context, cartId) : undefined,
    layout: await context.storefront.query(LAYOUT_QUERY),
  });
}

async function getCart({storefront}, cartId) {
  if (!storefront) {
    throw new Error('missing storefront client in cart query');
  }
  const {cart} = await storefront.query(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });
  return cart;
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{background: 'black', overflow: 'hidden'}}>
        <Layout />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      id
      name
      description
      primaryDomain {
        url
      }
      brand {
       logo {
         image {
          url
         }
       }
     }
    }
  }
`;
