import {Link, useFetcher} from '@remix-run/react';
import {flattenConnection, Image, Money} from '@shopify/hydrogen-react';

export function CartSummary({cost}) {
  return (
    <>
      <dl className="space-y-2">
        <div className="flex items-center justify-between">
          <dt>Subtotal</dt>
          <dd>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </div>
      </dl>
    </>
  );
}

export function CartActions({checkoutUrl}) {
  if (!checkoutUrl) return null;
  return (
    <div className="checkout-button">
      <a className="cart-text" href={checkoutUrl}>Continue to Checkout</a>
    </div>
  );
}

function ItemRemoveButton({lineIds}) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value="REMOVE_FROM_CART" />
      <input type="hidden" name="linesIds" value={JSON.stringify(lineIds)} />
      <button className="remove-button-cart" type="submit">
        <IconRemove />
      </button>
    </fetcher.Form>
  );
}

function IconRemove() {
  return (
    <svg
      fill="transparent"
      stroke="currentColor"
      viewBox="0 0 20 20"
      style={{height: '30px', width: '30px'}}
    >
      <title>Remove</title>
      <path
        d="M4 6H16"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.5 6L6 17H14L14.5 6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6L8 5C8 4 8.75 3 10 3C11.25 3 12 4 12 5V6"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function LineItem({lineItem}) {
  const {merchandise, quantity} = lineItem;

  return (
    <div className="cart-container">
      <Link
        to={`/products/${merchandise.product.handle}`}
        className="flex-shrink-0"
      >
        <Image data={merchandise.image} width={110} height={110} />
      </Link>
      <div className="cart-content-div">
        <div style={{width: '220px', display: 'block', height: '50px'}}>
          <div style={{float: 'left'}} className="cart-prod-title">
            {merchandise.product.title}
          </div>
          <div style={{float: 'right'}} className="cart-prod-title">
            {merchandise.title}
          </div>
        </div>
        <div style={{width: '220px', display: 'block', height: '50px'}}>
          <Money
            style={{float: 'left'}}
            className="cart-prod-money"
            data={lineItem.cost.totalAmount}
          />
        </div>
        <div style={{width: '220px', display: 'block', height: '20px'}}>
          <div style={{float: 'left'}} className="cart-prod-title">
            Qty: {quantity}
          </div>
          <div
            style={{float: 'right', marginTop: '-20px', marginRight: '-5px'}}
          >
            <ItemRemoveButton lineIds={[lineItem.id]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartLineItems({linesObj}) {
  const lines = flattenConnection(linesObj);
  return (
    <div>
      {lines.map((line) => {
        return <LineItem key={line.id} lineItem={line} />;
      })}
    </div>
  );
}
