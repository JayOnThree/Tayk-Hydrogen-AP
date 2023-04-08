import {useEffect} from 'react';
import {Drawer, useDrawer} from '~/components/Drawer';
import {Suspense} from 'react';
import {Await, useMatches, useFetchers} from '@remix-run/react';
import {CartLineItems, CartActions, CartSummary} from '~/components/Cart';

function CartHeader({openDrawer}) {
  const [root] = useMatches();

  return (
    <Suspense>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <button
            className="cart-button cart-margin"
            onClick={openDrawer}
            style={{position: 'fixed', zIndex: '9'}}
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
    <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
      <header role="banner">
        <div>
          <CartHeader cart={cart} openDrawer={openDrawer} />
        </div>
      </header>
      <main
        role="main"
        id="mainContent"
        className="flex-grow p-6 md:p-8 lg:p-12"
      >
        {children}
      </main>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <CartDrawer cart={cart} close={closeDrawer} />
      </Drawer>
    </div>
  );
}

function CartDrawer({cart, close}) {
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
              <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
                <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
                  Your cart is empty
                </h2>
                <button
                  onClick={close}
                  className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}
