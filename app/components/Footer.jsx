import {Link} from '@remix-run/react';

export default function Footer() {
  return (
    <div className="footer-div">
      <ul className="mainMenu-ul-footer">
        <li className="mainMenu-li-footer">
          <h6 className="footer-text">© 2022 Tay K | All rights reserved</h6>
        </li>
        <li className="mainMenu-li">
          <Link to='/policies/return-policy'>
            <h6 className="footer-text">Return Policy</h6>
          </Link>
        </li>
        <li className="mainMenu-li">
          <Link to="/policies/shipping-policy">
            <h6 className="footer-text">Shipping Policy</h6>
          </Link>
        </li>
      </ul>
    </div>
  );
}
