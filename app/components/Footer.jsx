import {Link} from '@remix-run/react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer-div">
      <ul className="mainMenu-ul-footer">
        <li className="mainMenu-li-footer">
          <a href="" style={{cursor: 'default', textDecoration: 'none'}}>
            <h6 className="footer-text">
              © {year} TAY K | ALL RIGHTS RESERVED
            </h6>
          </a>
        </li>
        <li className="mainMenu-li">
          <Link to="/policies" style={{textDecoration: 'none'}}>
            <h6 className="footer-text">POLICIES</h6>
          </Link>
        </li>
        <li className="mainMenu-li">
          {/* <a href="mailto: info@tayk.world" style={{textDecoration: 'none'}}>
            <h6 className="footer-text">CONTACT</h6>
          </a> */}
          <Link to="/contact" style={{textDecoration: 'none'}}>
            <h6 className="footer-text">CONTACT</h6>
          </Link>
        </li>
        <li className="mainMenu-li">
          <Link to="/credits" style={{textDecoration: 'none'}}>
            <h6 className="footer-text">CREDITS</h6>
          </Link>
        </li>
      </ul>
    </div>
  );
}
