import {useState, useEffect} from 'react';
import {Link, useLocation} from '@remix-run/react';
import {Container} from 'react-bootstrap';
import {motion} from 'framer-motion';

export default function Header({blogPost}) {
  const location = useLocation();
  const [mobile, setMobile] = useState();
  const [tablet, setTablet] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMobile(window.innerWidth < 600);
      setTablet(window.innerWidth < 900 && window.innerWidth > 600);
    }
  });

  return (
    <Container fluid className="header-container" style={{width: '100vw'}}>
      <motion.div
        className="navigation-div"
        style={{width: mobile ? '40%' : tablet ? '30%' : '20%'}}
        initial={{marginLeft: '-200px'}}
        animate={{marginLeft: '0px'}}
        exit={{marginLeft: '-200px'}}
        transition={{duration: 0.5}}
      >
        <Link
          to={blogPost ? '/media/blog' : '/media'}
          className="circle-router"
        >
          <img alt="back" src="/back.svg" className="icon-router" />
        </Link>
        <Link to="/" className="circle-router">
          <img alt="exit" src="/exit.svg" className="icon-router" />
        </Link>
      </motion.div>
      <div className="header-container">
        <motion.div
          className="header-div"
          animate={{
            width: mobile ? '60%' : tablet ? '70%' : '80%',
            marginLeft: mobile ? '40%' : tablet ? '30%' : '20%',
          }}
          exit={{width: '100%', marginLeft: 0}}
        >
          <div className="headline-text-nav">
            {location.pathname.indexOf('media') > -1 && (
              <h5 className="menu-text">Media</h5>
            )}
            {location.pathname.indexOf('collections') > -1 && (
              <h5 className="menu-text">Shop</h5>
            )}
            {location.pathname.indexOf('products') > -1 && (
              <h5 className="menu-text">Shop</h5>
            )}
          </div>
        </motion.div>
      </div>
      <img src="/cart.svg" className="cart" />
    </Container>
  );
}
