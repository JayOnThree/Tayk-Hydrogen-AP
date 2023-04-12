import {useState} from 'react';
import {useLocation} from '@remix-run/react';

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
    <div className="header-container-canvas">
      {location.pathname === '/' && (
        <div
          className="header-div"
          style={{
            width: 'calc(100% - 100px)',
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
                        dragX.x > 245 && !shopSelect && !connectSelect
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
                        dragX.x > 77 &&
                        dragX.x < 245 &&
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
              <div
                className="menu-text"
                onClick={() => (connectSelect ? connectFalse() : connectTrue())}
              >
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
                        dragX.x < 77 && !shopSelect && !mediaSelect
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
    </div>
  );
}

export {SceneHeader};
