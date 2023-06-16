/* eslint-disable hydrogen/prefer-image-component */
import {useState} from 'react';
import {Link, useLocation} from '@remix-run/react';
// import {motion} from 'framer-motion';

export function useSceneHeader(stateDefault = false) {
  const [shopSelect, setShopSelected] = useState(stateDefault);
  const [mediaSelect, setMediaSelected] = useState(stateDefault);
  const [connectSelect, setConnectSelected] = useState(stateDefault);

  function shopFalse() {
    setShopSelected(false);
  }
  function shopTrue() {
    setShopSelected(true);
  }
  function mediaFalse() {
    setMediaSelected(false);
  }
  function mediaTrue() {
    setMediaSelected(true);
  }
  function connectFalse() {
    setConnectSelected(false);
  }
  function connectTrue() {
    setConnectSelected(true);
  }
  return {
    shopSelect,
    mediaSelect,
    connectSelect,
    shopFalse,
    shopTrue,
    mediaFalse,
    mediaTrue,
    connectFalse,
    connectTrue,
  };
}

function SceneHeader({
  connectSelect,
  shopSelect,
  mediaSelect,
  dragX,
  mediaTrue,
  mediaFalse,
  shopTrue,
  shopFalse,
  connectTrue,
  connectFalse,
}) {
  const location = useLocation();

  return (
    <div className="header-container">
      {location.pathname === '/' && (
        <div
          className="header-div"
          style={{
            width: 'clamp(100% - 300px)',
            transform:
              !connectSelect && !shopSelect && !mediaSelect
                ? 'translateY(0)'
                : 'translateY(-200px)',
          }}
        >
          <ul className="mainMenu-ul">
            <li className="mainMenu-li">
              <div
                className="menu-text"
                onClick={() => (mediaSelect ? mediaFalse() : mediaTrue())}
              >
                Media
                {mediaSelect ? (
                  <img src="/paint.svg" alt="fingerprint" className="paint" />
                ) : (
                  <img
                    src="/paint.svg"
                    alt="indication that you are in the media section"
                    className="paint"
                    style={{
                      transform:
                        dragX.x > 770 && !shopSelect && !connectSelect
                          ? 'scale(1)'
                          : 'scale(0)',
                    }}
                  />
                )}
              </div>
            </li>
            <li className="mainMenu-li">
              <div
                className="menu-text"
                onClick={() => (shopSelect ? shopFalse() : shopTrue())}
              >
                Shop
                {shopSelect ? (
                  <img src="/paint.svg" alt="fingerprint" className="paint" />
                ) : (
                  <img
                    src="/paint.svg"
                    alt="indication that you are in the shop section"
                    className="paint"
                    style={{
                      transform:
                      dragX.x > 250 &&
                      dragX.x < 770 &&
                        !mediaSelect &&
                        !connectSelect
                          ? 'scale(1)'
                          : 'scale(0)',
                    }}
                  />
                )}
              </div>
            </li>
            <li className="mainMenu-li">
              <div className="menu-text" onClick={() => (connectSelect ? connectFalse() : connectTrue())}>
                Connect
                {connectSelect ? (
                  <img src="/paint.svg" alt="fingerprint" className="paint" />
                ) : (
                  <img
                    src="/paint.svg"
                    alt="indication that you are in the connect section"
                    className="paint"
                    style={{
                      transform:
                        dragX.x < 250 && !shopSelect && !mediaSelect
                          ? 'scale(1)'
                          : 'scale(0)',
                    }}
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
      {location.pathname !== '/' && (
        <>
          <div
            className="navigation-div"
            style={{
              width: '167px',
              marginLeft: '0px',
            }}
          >
            <a
              onClick={() => history.back()}
              className="circle-router"
              style={{marginLeft: '20px'}}
            >
              <img alt="back" src="/back.svg" className="icon-router" />
            </a>
            <Link to="/" className="circle-router">
              <img alt="exit" src="/exit.svg" className="icon-router" />
            </Link>
          </div>
          <div className="header-container">
            <div
              className="header-div"
              style={{
                width: 'clamp(167px - 100%)',
                marginLeft: '167px',
              }}
              // animate={{
              //   width: 'clamp(167px - 100%)',
              //   marginLeft: '167px',
              // }}
              // exit={{width: 'clamp(0px - 100%)', marginLeft: 0}}
            >
              <div className="headline-text-nav">
                {location.pathname.indexOf('media') > -1 && (
                  <h5 className="menu-text-notLanding">Media</h5>
                )}
                {location.pathname.indexOf('collections') > -1 && (
                  <h5 className="menu-text-notLanding">Shop</h5>
                )}
                {location.pathname.indexOf('products') > -1 && (
                  <h5 className="menu-text-notLanding">Shop</h5>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export {SceneHeader};
