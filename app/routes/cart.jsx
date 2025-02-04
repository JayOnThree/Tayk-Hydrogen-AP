import {Link, useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {CartLineItems} from '~/components/Cart';
import {CART_QUERY} from '~/queries/cart';
import {CartActions, CartSummary} from '~/components/Cart';
import {Container} from 'react-bootstrap';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useNavigate} from '@remix-run/react';

export async function loader({context}) {
  const cartId = await context.session.get('cartId');
  const cart = cartId
    ? (
        await context.storefront.query(CART_QUERY, {
          variables: {
            cartId,
            country: context.storefront.i18n.country,
            language: context.storefront.i18n.language,
          },
          cache: context.storefront.CacheNone(),
        })
      ).cart
    : null;
  return {cart};
}

export async function action({request, context}) {
  const {session, storefront} = context;
  const headers = new Headers();
  const [formData, storedCartId, customerAccessToken] = await Promise.all([
    request.formData(),
    session.get('cartId'),
    session.get('customerAccessToken'),
  ]);
  let cartId = storedCartId;
  let status = 200;
  let result;

  const cartAction = formData.get('cartAction');
  const countryCode = formData.get('countryCode')
    ? formData.get('countryCode')
    : null;
  switch (cartAction) {
    case 'ADD_TO_CART':
      const lines = formData.get('lines')
        ? JSON.parse(String(formData.get('lines')))
        : [];
      if (!cartId) {
        result = await cartCreate({
          input: countryCode ? {lines, buyerIdentity: {countryCode}} : {lines},
          storefront,
        });
      } else {
        result = await cartAdd({
          cartId,
          lines,
          storefront,
        });
      }
      cartId = result.cart.id;
      break;
    case 'REMOVE_FROM_CART':
      const lineIds = formData.get('linesIds')
        ? JSON.parse(String(formData.get('linesIds')))
        : [];
      if (!lineIds.length) {
        throw new Error('No lines to remove');
      }
      result = await cartRemove({
        cartId,
        lineIds,
        storefront,
      });
      cartId = result.cart.id;
      break;
    default:
      throw new Error('Invalid cart action');
  }
  /**
   * The Cart ID may change after each mutation. We need to update it each time in the session.
   */
  session.set('cartId', cartId);
  headers.set('Set-Cookie', await session.commit());
  const {cart, errors} = result;
  return json({cart, errors}, {status, headers});
}
export default function Cart() {
  const {cart} = useLoaderData();
  const navigate = useNavigate();

  if (cart?.totalQuantity > 0)
    return (
      <Container fluid className="container-shop">
        <Header />
        <div>
          <CartLineItems linesObj={cart.lines} />
        </div>
        <div>
          <div>
            <CartSummary cost={cart.cost} />
            <CartActions checkoutUrl={cart.checkoutUrl} />
          </div>
        </div>
        <Footer />
      </Container>
    );

  return (
    <div>
      <h2 className="empty-cart-text">Your cart is empty</h2>
      <div className="checkout-button">
        <a
          className="cart-text"
          onClick={() => navigate('/collections/shirts')}
        >
          Continue shopping
        </a>
      </div>
    </div>
  );
}

/**
 * Create a cart with line(s) mutation
 * @param input CartInput https://shopify.dev/api/storefront/{api_version}/input-objects/CartInput
 * @see https://shopify.dev/api/storefront/{api_version}/mutations/cartcreate
 * @returns result {cart, errors}
 * @preserve
 */
export async function cartCreate({input, storefront}) {
  const {cartCreate} = await storefront.mutate(CREATE_CART_MUTATION, {
    variables: {input},
  });
  return cartCreate;
}
/**
 * Storefront API cartLinesAdd mutation
 * @param cartId
 * @param lines [CartLineInput!]! https://shopify.dev/api/storefront/{api_version}/input-objects/CartLineInput
 * @see https://shopify.dev/api/storefront/{api_version}/mutations/cartLinesAdd
 * @returns result {cart, errors}
 * @preserve
 */
export async function cartAdd({cartId, lines, storefront}) {
  const {cartLinesAdd} = await storefront.mutate(ADD_LINES_MUTATION, {
    variables: {cartId, lines},
  });
  return cartLinesAdd;
}
/**
 * Create a cart with line(s) mutation
 * @param cartId the current cart id
 * @param lineIds [ID!]! an array of cart line ids to remove
 * @see https://shopify.dev/api/storefront/2022-07/mutations/cartlinesremove
 * @returns mutated cart
 * @preserve
 */
export async function cartRemove({cartId, lineIds, storefront}) {
  const {cartLinesRemove} = await storefront.mutate(
    REMOVE_LINE_ITEMS_MUTATION,
    {
      variables: {
        cartId,
        lineIds,
      },
    },
  );
  if (!cartLinesRemove) {
    throw new Error('No data returned from remove lines mutation');
  }
  return cartLinesRemove;
}
/*
    Cart Queries
  */
const USER_ERROR_FRAGMENT = `#graphql
    fragment ErrorFragment on CartUserError {
      message
      field
      code
    }
  `;
const LINES_CART_FRAGMENT = `#graphql
    fragment CartLinesFragment on Cart {
      id
      totalQuantity
    }
  `;
//! @see: https://shopify.dev/api/storefront/{api_version}/mutations/cartcreate
const CREATE_CART_MUTATION = `#graphql
    mutation ($input: CartInput!, $country: CountryCode = ZZ, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
      cartCreate(input: $input) {
        cart {
          ...CartLinesFragment
        }
        errors: userErrors {
          ...ErrorFragment
        }
      }
    }
    ${LINES_CART_FRAGMENT}
    ${USER_ERROR_FRAGMENT}
  `;
const ADD_LINES_MUTATION = `#graphql
    mutation ($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode = ZZ, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartLinesFragment
        }
        errors: userErrors {
          ...ErrorFragment
        }
      }
    }
    ${LINES_CART_FRAGMENT}
    ${USER_ERROR_FRAGMENT}
  `;
const REMOVE_LINE_ITEMS_MUTATION = `#graphql
    mutation ($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode, $country: CountryCode)
    @inContext(country: $country, language: $language) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          totalQuantity
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ...on ProductVariant {
                    id
                  }
                }
              }
            }
          }
        }
        errors: userErrors {
          message
          field
          code
        }
      }
    }
  `;
