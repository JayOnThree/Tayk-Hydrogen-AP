import {useNavigate} from '@remix-run/react';
// import {motion} from 'framer-motion';
import {Suspense} from 'react';

import Footer from '~/components/Footer';
import MobileHeader from '~/components/MobileHeader';

export default function Mobile() {
  const navigate = useNavigate();

  return (
    <Suspense fallback={null}>
      <MobileHeader />
      <div
        style={{backgroundImage: `url('/bg.jpg')`}}
        className="mobile-div-container"
      >
        <span
          style={{top: 'calc(25vh - 4px)', left: '60px'}}
          className="dot-mobile"
          onClick={() => navigate('/products')}
        ></span>
        <h6
          onClick={() => navigate('/products')}
          className="scene-title-mobile"
          style={{top: '25vh', left: '110px'}}
        >
          Shop for TayK Merch
        </h6>

        <span
          style={{top: 'calc(50vh - 4px)', left: '20px'}}
          className="dot-mobile"
          onClick={() => navigate('/media')}
        ></span>
        <h6
          onClick={() => navigate('/media')}
          className="scene-title-mobile"
          style={{top: '50vh', left: '70px'}}
        >
          View everything Tay K
        </h6>

        <span
          style={{top: 'calc(40vh - 4px)', right: '20px'}}
          className="dot-mobile"
          onClick={() => (location.href = 'https://discord.gg/tayk')}
        ></span>
        <h6
          onClick={() => (location.href = 'https://discord.gg/tayk')}
          className="scene-title-mobile"
          style={{top: '40vh', right: '70px'}}
        >
          Connect on Discord
        </h6>
        <Footer />
      </div>
    </Suspense>
  );
}
