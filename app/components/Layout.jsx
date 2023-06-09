import {useEffect} from 'react';
import {Drawer, useDrawer} from '~/components/Drawer';
import {Suspense} from 'react';
import {Await, useMatches, useFetchers} from '@remix-run/react';
import {CartLineItems, CartActions, CartSummary} from '~/components/Cart';
import {useNavigate} from '@remix-run/react';

function CartHeader({openDrawer}) {
  const [root] = useMatches();

  return (
    <Suspense>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <button
            className="cart-button cart-margin"
            onClick={openDrawer}
            style={{position: 'fixed', zIndex: '11'}}
          >
            {cart?.totalQuantity > 0 && (
              <div className="items-text">
                <span>{cart?.totalQuantity}</span>
              </div>
            )}
            <img src="/cart.svg" className="cart-image" alt="cart" />
          </button>
        )}
      </Await>
    </Suspense>
  );
}

export function Layout({children}) {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const fetchers = useFetchers();
  const [root] = useMatches();
  const cart = root.data?.cart;

  // Grab all the fetchers that are adding to cart
  const addToCartFetchers = [];
  for (const fetcher of fetchers) {
    if (fetcher?.submission?.formData?.get('cartAction') === 'ADD_TO_CART') {
      addToCartFetchers.push(fetcher);
    }
  }
  // When the fetchers array changes, open the drawer if there is an add to cart action
  useEffect(() => {
    if (isOpen || addToCartFetchers.length === 0) return;
    openDrawer();
  }, [addToCartFetchers]);

  return (
    <div>
      <header role="banner">
        <div>
          <CartHeader cart={cart} openDrawer={openDrawer} />
        </div>
      </header>
      <main role="main" id="mainContent">
        {children}
      </main>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <CartDrawer cart={cart} close={closeDrawer} />
      </Drawer>
    </div>
  );
}

function CartDrawer({cart, close}) {
  const navigate = useNavigate();

  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <>
            {data?.totalQuantity > 0 ? (
              <>
                <div className="lineItem-container">
                  <CartLineItems linesObj={data.lines} />
                </div>
                <div className="cartsummary-div">
                  <CartSummary cost={data.cost} />
                  <CartActions checkoutUrl={data.checkoutUrl} />
                </div>
              </>
            ) : (
              <div>
                <h2 className="empty-cart-text">Your cart is empty</h2>
                <button className="checkout-button">
                  <h4
                    className="cart-text"
                    onClick={() => {
                      close();
                      navigate('/collections/shirts');
                    }}
                  >
                    Continue shopping
                  </h4>
                </button>
              </div>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}
