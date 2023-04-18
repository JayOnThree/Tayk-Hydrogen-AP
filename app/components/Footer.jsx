import {Link} from '@remix-run/react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer-div">
      <ul className="mainMenu-ul-footer">
        <li className="mainMenu-li-footer">
          <a href='' style={{cursor: 'default', textDecoration: 'none'}}>
          <h6 className="footer-text">© {year} TAY K | ALL RIGHTS RESERVED</h6>
          </a>
        </li>
        <li className="mainMenu-li">
          <Link to='/policies/return-policy' style={{textDecoration: 'none'}}>
            <h6 className="footer-text">RETURN POLICY</h6>
          </Link>
        </li>
        <li className="mainMenu-li">
          <Link to="/policies/shipping-policy" style={{textDecoration: 'none'}}>
            <h6 className="footer-text">SHIPPING POLICY</h6>
          </Link>
        </li>
        <li className="mainMenu-li">
          <a href="mailto: info@tayk.world" style={{textDecoration: 'none'}}>
            <h6 className="footer-text">CONTACT</h6>
          </a>
        </li>
      </ul>
    </div>
  );
}
