/* eslint-disable hydrogen/prefer-image-component */
// import * as THREE from 'three';
import {Suspense, useRef, useState, useEffect, useTransition} from 'react';
import {Canvas, extend, useFrame, useThree} from '@react-three/fiber';
import {UnrealBloomPass} from 'three-stdlib';
import {useNavigate, useLocation} from '@remix-run/react';
import {
  Environment,
  BakeShadows,
  Preload,
  Html,
  Effects,
  PerspectiveCamera,
  useProgress,
  PerformanceMonitor,
} from '@react-three/drei';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {useDrag} from '@use-gesture/react';
import {useSpring, animated} from '@react-spring/three';
import {motion} from 'framer-motion';

import EnvImage from '../../public/glb/moonless_golf_2k.hdr';
import Vending from './Vending';
import Media from './Media';
import Connect from './Connect';
import Court from './Court';
import Footer from '~/components/Footer';
import {SceneHeader, useSceneHeader} from '~/components/SceneHeader';

extend({UnrealBloomPass});
extend({OrbitControls});

function EnterButton({
  shopSelect,
  connectSelect,
  mediaSelect,
  mediaFalse,
  connectFalse,
  shopFalse,
}) {
  const navigate = useNavigate();
  function navigationTimeout() {
    mediaFalse();
    connectFalse();
    shopFalse();
    setTimeout(() => {
      navigate(
        shopSelect
          ? '/collections/shirts'
          : mediaSelect
          ? '/media'
          : connectSelect && 'https://discord.com/',
      );
    }, 500);
  }

  return (
    <button
      className="enter-button-landing"
      style={{
        backgroundImage: 'url(/arrow2.svg)',
        transform:
          shopSelect || connectSelect || mediaSelect ? 'scale(1)' : 'scale(0)',
      }}
      onClick={() => navigationTimeout()}
    >
      <h3 className="enter-button-text">ENTER</h3>
    </button>
  );
}

function ConnectDiscordUI({connectSelect}) {
  return (
    <>
      <img
        src="/Discord-min.png"
        alt="Join the Discord"
        className="discord-image"
        style={{
          transform: connectSelect ? 'translateY(0)' : 'translateY(1000px)',
          opacity: connectSelect ? 1 : 0,
        }}
      />
    </>
  );
}

function MediaPhoneUI({mediaSelect}) {
  const locale = 'en';
  const [today, setDate] = useState(new Date());
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.toLocaleTimeString(locale, {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });

  return (
    <div
      style={{
        opacity: mediaSelect ? 1 : 0,
        transform: mediaSelect ? 'translateY(0)' : 'translateY(1500px)',
      }}
      className="phone-container"
    >
      <div className="phone-background">
        <div className="time-div">
          <h2 className="time-text">{time}</h2>
          <h2 className="date-text">{date}</h2>
        </div>
        <div className="notification-div">
          <h2 className="notification-header">TayK</h2>
          <h2 className="notification-body">
            Welcome to the Tay K experience. Stay up to date and keep in touch
            with me{' '}
          </h2>
        </div>
      </div>
    </div>
  );
}

function ShopUI({shopSelect}) {
  return (
    <div
      className="home-marque-div"
      style={{
        transform: shopSelect ? 'translateY(0)' : 'translateY(1000px)',
        opacity: shopSelect ? 1 : 0,
      }}
    >
      <marquee className="marque-text-home" scrollamount="12">
        BUY MERCH HERE
      </marquee>
    </div>
  );
}

function Loader({progress}) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        zIndex: '50',
        background: 'red',
      }}
    >
      {progress.toFixed(0)}%
    </div>
  );
}

export default function Scene({children, ...props}) {
  const mesh = useRef(null);
  const location = useLocation();
  const prodImages = props.products.nodes;
  const [dragX, setDragX] = useState({x: 0});
  const [dpr, setDpr] = useState(1.5);
  const {
    shopSelect,
    mediaSelect,
    connectSelect,
    shopFalse,
    shopTrue,
    mediaFalse,
    mediaTrue,
    connectFalse,
    connectTrue,
  } = useSceneHeader();
  const [shopHovered, setShopHovered] = useState(false);
  const [mediaHovered, setMediaHovered] = useState(false);
  const [connectHovered, setConnectHovered] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([3, 0.5, 0]);

  useEffect(() => {
    document.body.style.cursor = mediaHovered ? 'pointer' : 'auto';
  }, [mediaHovered]);

  useEffect(() => {
    document.body.style.cursor = shopHovered ? 'pointer' : 'auto';
  }, [shopHovered]);

  useEffect(() => {
    document.body.style.cursor = connectHovered ? 'pointer' : 'auto';
  }, [connectHovered]);

  const bind = useDrag(
    ({offset: [x]}) => {
      setDragX({x});
    },
    {
      bounds: {left: -10, right: 325, top: 0, bottom: 0},
      rubberband: true,
    },
  );

  useEffect(() => {
    if (mediaSelect) {
      set({
        rotation: [0.1, 3.5, 0.1],
        position: [-1.39, 0.1, 1.5],
      });
    }

    if (shopSelect) {
      set({
        rotation: [0, 1.45, 0],
        position: [-2.55, 0.1, 1],
      });
    }

    if (connectSelect) {
      set({
        rotation: [-0.1, -0.7, 0.1],
        position: [-2.8, 0.2, -0.1],
      });
    }

    if (!mediaSelect && !shopSelect && !connectSelect) {
      set({
        rotation: [0, dragX.x / 100, 0],
        position: [0, 0, 0],
      });
    }
  }, [dragX, mediaSelect, shopSelect, connectSelect]);

  // const cameraControlsRef = useRef();

  const AnimatedCam = animated(PerspectiveCamera);

  const {active, progress, errors, item, loaded, total} = useProgress();
  const hide = progress !== 100;

  const [spring, set] = useSpring(() => ({
    rotation: [...rotation],
    position: [...position],
    config: {mass: 1, friction: 40, tension: 400},
  }));

  return (
    <>
      {hide && <Loader progress={progress} />}
      <button
        className="exit-section-button"
        style={{
          transform:
            shopSelect || connectSelect || mediaSelect
              ? 'scale(1)'
              : 'scale(0)',
        }}
      >
        <img
          src="/close.svg"
          className="close-img"
          alt="exit"
          onClick={() => {
            mediaFalse();
            connectFalse();
            shopFalse();
          }}
        />
      </button>
      <EnterButton
        mediaSelect={mediaSelect}
        connectSelect={connectSelect}
        shopSelect={shopSelect}
        shopFalse={shopFalse}
        connectFalse={connectFalse}
        mediaFalse={mediaFalse}
      />
      <MediaPhoneUI mediaSelect={mediaSelect} />
      <ConnectDiscordUI connectSelect={connectSelect} />
      <ShopUI shopSelect={shopSelect} />
      <SceneHeader
        dragX={dragX}
        shopSelect={shopSelect}
        connectSelect={connectSelect}
        mediaSelect={mediaSelect}
        mediaTrue={mediaTrue}
        mediaFalse={mediaFalse}
        shopTrue={shopTrue}
        shopFalse={shopFalse}
        connectTrue={connectTrue}
        connectFalse={connectFalse}
      />
      <Canvas
        {...props}
        style={{top: 0, left: 0, position: 'fixed'}}
        dpr={dpr}
        frameloop={location.pathname === '/' ? 'always' : 'demand'}
        camera={{position: [0, 0, 0], fov: 60}}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        >
          {children}
          <Preload all />
          <fog attach="fog" args={['black', 1, 15]} />
          <Suspense fallback={null}>
            <Effects disableGamma>
              <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
            </Effects>
            <pointLight position={[40, 40, 40]} />
            <BakeShadows />
            <directionalLight
              intensity={0.3}
              color="#F4EF8E"
              position={[0, 100, 0]}
              castShadow
              shadow-mapSize-height={512}
              shadow-mapSize-width={512}
            />
            <directionalLight
              intensity={0.5}
              color="blue"
              position={[200, 50, 500]}
              castShadow
              shadow-mapSize-height={512}
              shadow-mapSize-width={512}
            />
            <directionalLight
              intensity={1}
              color="red"
              position={[-8, 10, -20]}
              castShadow
              shadow-mapSize-height={512}
              shadow-mapSize-width={512}
            />
            <Environment files={EnvImage} ground={{height: 16, radius: 100}} />
            <group ref={mesh} {...props} {...bind()}>
              <group
                position={[-6.2, -1.2, 1.4]}
                scale={3}
                rotation={[0, 0, 0]}
              >
                <animated.group dispose={null} scale={0.5} {...spring}>
                  <Court />
                  {/* <group
                    onPointerOver={() => setMediaHovered(true)}
                    onPointerOut={() => setMediaHovered(false)}
                    onClick={(event) => {
                      mediaSelect ? mediaFalse() : mediaTrue();
                      event.stopPropagation();
                    }}
                  >
                    <Media />
                    {!mediaSelect && (
                      <Html
                        position={[4, 0.5, 3]}
                        color
                        style={{width: '500px'}}
                      >
                        <motion.h6
                          className="scene-title"
                          animate={{
                            y: mediaHovered ? '0' : '20px',
                            opacity: mediaHovered ? 1 : 0,
                          }}
                        >
                          Click to view
                        </motion.h6>
                        <motion.h6
                          className="scene-title"
                          animate={{
                            y: !mediaHovered ? '0' : '-20px',
                            opacity: !mediaHovered ? 1 : 0,
                          }}
                        >
                          View everything Tay K
                        </motion.h6>
                      </Html>
                    )}
                  </group> */}
                  {/* <group
                    onPointerOver={() => setShopHovered(true)}
                    onPointerOut={() => setShopHovered(false)}
                    onClick={(event) => {
                      shopSelect ? shopFalse() : shopTrue();
                      event.stopPropagation();
                    }}
                  >
                    <Vending prodImages={prodImages} />
                    {!shopSelect && (
                      <Html
                        position={[0, 1, -1.5]}
                        color
                        style={{width: '500px'}}
                      >
                        <motion.h6
                          className="scene-title"
                          animate={{
                            y: shopHovered ? '0' : '20px',
                            opacity: shopHovered ? 1 : 0,
                          }}
                        >
                          Click to view
                        </motion.h6>
                        <motion.h6
                          className="scene-title"
                          animate={{
                            y: !shopHovered ? '0' : '-20px',
                            opacity: !shopHovered ? 1 : 0,
                          }}
                        >
                          Shop for Tay K merch
                        </motion.h6>
                      </Html>
                    )}
                  </group> */}
                  {/* <group>
                    <mesh
                      position={[3, 0.5, -3]}
                      onClick={() =>
                        connectSelect ? connectFalse() : connectTrue()
                      }
                      onPointerOver={() => setConnectHovered(true)}
                      onPointerOut={() => setConnectHovered(false)}
                    >
                      <boxGeometry args={[1, 1, 1.2]} />
                      <meshPhongMaterial
                        color="white"
                        opacity={0}
                        transparent
                      />
                    </mesh>
                    <Connect />
                    {dragX.x < 100 && <Connect />}
                {!connectSelect && (
                      <Html
                        position={[3.7, 1, -3.5]}
                        color
                        style={{width: '500px'}}
                      >
                        <motion.h6
                          className="scene-title"
                          animate={{
                            y: connectHovered ? '0' : '20px',
                            opacity: connectHovered ? 1 : 0,
                          }}
                        >
                          Click to view
                        </motion.h6>
                        <motion.h6
                          className="scene-title"
                          animate={{
                            y: !connectHovered ? '0' : '-20px',
                            opacity: !connectHovered ? 1 : 0,
                          }}
                        >
                          Connect on Discord
                        </motion.h6>
                      </Html>
                    )}
                  </group> */}
                </animated.group>
              </group>
          
              {/* <AnimatedCam {...spring} makeDefault fov={90} /> */}
            </group>
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
      <Footer />
    </>
  );
}
