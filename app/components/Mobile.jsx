import {Link, useNavigate} from '@remix-run/react';
import {motion} from 'framer-motion';

import Footer from '~/components/Footer';

export default function Mobile() {
  const navigate = useNavigate();

  return (
    <div
      style={{backgroundImage: `url('/untitled.png')`}}
      className="mobile-div-container"
    >
      <span style={{top: 'calc(25vh - 4px)', left: '20px'}} className="dot-mobile"></span>
      <h6
        onClick={() => navigate('/products')}
        className="scene-title-mobile"
        style={{top: '25vh', left: '70px'}}
      >
        Shop for TayK Merch
      </h6>

      <span style={{top: 'calc(60vh - 4px)', left: '20px'}} className="dot-mobile"></span>
      <h6
        onClick={() => (location.href = 'https://discord.gg/tayk')}
        className="scene-title-mobile"
        style={{top: '60vh', left: '70px'}}
      >
        View everything Tay K
      </h6>

      <span style={{top: 'calc(45vh - 4px)', right: '20px'}} className="dot-mobile"></span>
      <h6
        onClick={() => (location.href = 'https://discord.gg/tayk')}
        className="scene-title-mobile"
        style={{top: '45vh', right: '70px'}}
      >
        Connect on Discord
      </h6>
      <Footer />
    </div>
  );
}
