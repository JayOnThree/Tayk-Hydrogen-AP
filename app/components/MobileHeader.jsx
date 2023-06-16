import {Link, useLocation} from '@remix-run/react';

export default function MobileHeader() {
  const location = useLocation();
  return (
    <div className="header-container">
      {location.pathname === '/' && (
        <div className="header-div">
          <ul className="mainMenu-ul">
            <li className="mainMenu-li">
              <div className="menu-text">TAYK WORLD</div>
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
            >
              <div className="headline-text-nav">
                {location.pathname.indexOf('media') > -1 && (
                  <h5 className="menu-text-notLanding">Media</h5>
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
