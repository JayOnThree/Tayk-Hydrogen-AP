import {useState} from 'react';

/**
 * A Drawer component that opens on user click.
 * @param open - Boolean state. If `true`, then the drawer opens.
 * @param onClose - Function should set the open state.
 * @param children - React children node.
 */

function Drawer({open, onClose, children}) {
  return (
    <div id="cart">
      <div className={`Cart ${open ? 'Cart--open' : ''}`}>
        <button className="cart-close" onClick={onClose}>
          x
        </button>
        <header className="Cart__container">
          <h2 className="cart-header-text">Your cart</h2>
          {children}
        </header>
      </div>
    </div>
  );
}

export {Drawer};
export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);
  function openDrawer() {
    setIsOpen(true);
  }
  function closeDrawer() {
    setIsOpen(false);
  }
  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}