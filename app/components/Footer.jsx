import {Link} from '@remix-run/react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer-div">
      <ul className="mainMenu-ul-footer">
        <li className="mainMenu-li-footer">
          <a href='' style={{cursor: 'default', textDecoration: 'none'}}>
          <h6 className="footer-text">© {year} Tay K | All rights reserved</h6>
          </a>
        </li>
        <li className="mainMenu-li">
          <Link to='/policies/return-policy' style={{textDecoration: 'none'}}>
            <h6 className="footer-text">Return Policy</h6>
          </Link>
        </li>
        <li className="mainMenu-li">
          <Link to="/policies/shipping-policy" style={{textDecoration: 'none'}}>
            <h6 className="footer-text">Shipping Policy</h6>
          </Link>
        </li>
        <li className="mainMenu-li">
          <Link to="/policies/shipping-policy" style={{textDecoration: 'none'}}>
            <h6 className="footer-text">Contact</h6>
          </Link>
        </li>
      </ul>
    </div>
  );
}
