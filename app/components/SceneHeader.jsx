import {useState} from 'react';
import {motion} from 'framer-motion';

export function useSceneHeader() {
  const [shopSelect, setShopSelected] = useState(false);
  const [mediaSelect, setMediaSelected] = useState(false);
  const [connectSelect, setConnectSelected] = useState(false);
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
  return (
    <div className="header-container-canvas">
      <motion.div
        className="header-div"
        initial={{width: '80%', marginLeft: '20%'}}
        animate={{
          width: '100%',
          marginLeft: 0,
          y: !connectSelect && !shopSelect && !mediaSelect ? 0 : '-200px',
          opacity: !connectSelect && !shopSelect && !mediaSelect ? 1 : 0,
        }}
        exit={{width: '80%', marginLeft: '20%'}}
        transition={{duration: 0.3}}
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
                  alt="fingerprint"
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
                  alt="fingerprint"
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
                  alt="fingerprint"
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
      </motion.div>
    </div>
  );
}

export {SceneHeader};
