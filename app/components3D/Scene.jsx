import * as THREE from 'three';
import {Suspense, useRef, useState, useEffect} from 'react';
import {Canvas, extend, useFrame} from '@react-three/fiber';
import {UnrealBloomPass} from 'three-stdlib';
import {useNavigate} from '@remix-run/react';
import {
  Environment,
  BakeShadows,
  Preload,
  Html,
  Effects,
  PerspectiveCamera,
  Loader,
} from '@react-three/drei';
import {useDrag} from '@use-gesture/react';
import {useSpring} from '@react-spring/core';
import {motion} from 'framer-motion';
import {a} from '@react-spring/web';

import EnvImage from '../../public/glb/moonless_golf_2k.hdr';

import Vending from './Vending';
import Media from './Media';
import Connect from './Connect';
import Court from './Court';

extend({UnrealBloomPass});

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
      <img
        src="/arrow2.svg"
        alt="Join the Discord"
        className="arrow-image"
        style={{
          transform: connectSelect ? 'translateY(0)' : 'translateY(1000px)',
          opacity: connectSelect ? 1 : 0,
        }}
      />
    </>
  );
}

function MediaPhoneUI({mediaSelect}) {
  const divStyle = {
    zIndex: '10',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    touchAction: 'none',
    marginTop: '150px',
    position: 'absolute',
    marginLeft: '25px',
  };

  const [hovered, setHovered] = useState(false);
  const locale = 'en';
  const navgiate = useNavigate();
  const [today, setDate] = useState(new Date());
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.toLocaleTimeString(locale, {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });
  const [toggled, setToggled] = useState(false);
  const [{x}, api] = useSpring(() => ({x: 0}));
  const bindDrag = useDrag(
    ({down, tap, movement: [mx]}) => {
      if (!down && tap) {
        api.start({x: 200});
        setToggled(true);
        return;
      }
      if (down) {
        api.start({x: mx});
      } else {
        const isToggled = x._lastCallId > 30;
        api.start({x: isToggled ? 200 : 0});
        setToggled(isToggled);
      }
    },
    {bounds: {left: 0, right: 200, top: 0, bottom: 0}},
    {axis: 'x'},
  );

  useEffect(() => {
    if (toggled) {
      navgiate('/media');
    }
  }, [toggled]);

  return (
    <div
      style={{
        opacity: mediaSelect ? 1 : 0,
        transform: mediaSelect ? 'translateY(0)' : 'translateY(1500px)',
      }}
      className="phone-container"
    >
      <div
        className="phone-background"
        style={{backgroundImage: 'url(/Background.jpg)'}}
      >
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
        <div style={divStyle} alt="swipe Arrow">
          <div className="backgroundStyle">
            <a.div // Knob
              style={{backgroundImage: `url('/slideArrow.svg')`, x}}
              className="knobStyle"
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              {...bindDrag()}
            ></a.div>
          </div>
          <h2 className="slide-media-text">Drag to Enter</h2>
        </div>
      </div>
    </div>
  );
}

function PerspectiveCameraAmimated({posX, posY, posZ, rotX, rotY, rotZ}) {
  const camera = useRef();

  useFrame(() => {
    camera.current.rotation.x = THREE.MathUtils.lerp(
      camera.current.rotation.x,
      rotX,
      0.1,
    );
    camera.current.rotation.y = THREE.MathUtils.lerp(
      camera.current.rotation.y,
      rotY,
      0.1,
    );
    camera.current.rotation.z = THREE.MathUtils.lerp(
      camera.current.rotation.z,
      rotZ,
      0.1,
    );
    camera.current.position.x = THREE.MathUtils.lerp(
      camera.current.position.x,
      posX,
      0.1,
    );
    camera.current.position.y = THREE.MathUtils.lerp(
      camera.current.position.y,
      posY,
      0.1,
    );
    camera.current.position.z = THREE.MathUtils.lerp(
      camera.current.position.z,
      posZ,
      0.1,
    );
  });
  return <PerspectiveCamera ref={camera} makeDefault fov={90} />;
}

export default function Scene({children, ...props}) {
  const mesh = useRef(null);
  const prodImages = props.products.nodes;

  const [posX, setPosX] = useState(-2);
  const [posY, setPosY] = useState(0.1);
  const [posZ, setPosZ] = useState(0.5);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(1);
  const [rotZ, setRotZ] = useState(0);
  const [dragX, setDragX] = useState({x: 0});
  const [shopSelect, setShopSelect] = useState(false);
  const [mediaSelect, setMediaSelect] = useState(false);
  const [connectSelect, setConnectSelect] = useState(false);
  const [shopHovered, setShopHovered] = useState(false);
  const [mediaHovered, setMediaHovered] = useState(false);
  const [connectHovered, setConnectHovered] = useState(false);

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
      bounds: {left: 0, right: 300, top: 0, bottom: 0},
      rubberband: true,
    },
  );

  useEffect(() => {
    if (mediaSelect) {
      setPosX(-1.39);
      setPosY(0.1);
      setPosZ(1.5);
      setRotX(0.5);
      setRotY(3.5);
      setRotZ(0.1);
    }

    if (shopSelect) {
      setPosX(-2.8);
      setPosY(0.1);
      setPosZ(1);
      setRotX(0.05);
      setRotY(1.45);
      setRotZ(0.05);
    }

    if (!mediaSelect && !shopSelect) {
      setPosX(-1.8);
      setPosY(0.1);
      setPosZ(0.7);
      setRotX(0);
      setRotY(dragX.x / 100);
      setRotZ(0);
    }
  }, [mediaSelect, dragX, shopSelect]);

  return (
    <div>
      <img
        style={{
          transform:
            shopSelect || connectSelect || mediaSelect
              ? 'scale(1)'
              : 'scale(0)',
        }}
        src="/close.svg"
        className="close-img"
        alt="exit"
        onClick={() => {
          setMediaSelect(false);
          setShopSelect(false);
          setConnectSelect(false);
        }}
      />
      <MediaPhoneUI mediaSelect={mediaSelect} />
      <ConnectDiscordUI connectSelect={connectSelect} />
      <Loader containerStyles={{background: 'black'}} />
      <div className="header-container-canvas">
        <motion.div
          className="header-div"
          initial={{width: '80%', marginLeft: '20%'}}
          animate={{width: '100%', marginLeft: 0}}
          exit={{width: '80%', marginLeft: '20%'}}
          transition={{duration: 0.3}}
        >
          <div style={{width: '100%', textAlign: 'center'}} className="menu-text">
            {connectSelect && 'CONNECT'}
            {mediaSelect && 'MEDIA'}
            {shopSelect && 'SHOP'}
          </div>
          {!connectSelect && !shopSelect && !mediaSelect && (
            <ul className="mainMenu-ul">
              <li className="mainMenu-li">
                <div
                  className="menu-text"
                  onClick={() => {
                    setMediaSelect(!mediaSelect);
                  }}
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
                  onClick={() => {
                    setShopSelect(!shopSelect);
                  }}
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
                  onClick={() => setConnectSelect(!connectSelect)}
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
          )}
        </motion.div>
      </div>
      <Canvas {...props} style={{top: 0, left: 0, position: 'fixed'}}>
        {children}
        <Preload all />
        <fog attach="fog" args={['black', 1, 6]} />
        <pointLight position={[40, 40, 40]} />
        <BakeShadows />
        <Environment files={EnvImage} ground={{height: 16, radius: 100}} />
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
        <Effects disableGamma>
          <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
        </Effects>
        <Suspense fallback={null}>
          <group ref={mesh} {...props} {...bind()}>
            <group position={[-4.2, -0.6, 1.6]} scale={1.5}>
              <group dispose={null} scale={0.5}>
                <Court />
                <group
                  onPointerOver={() => setMediaHovered(true)}
                  onPointerOut={() => setMediaHovered(false)}
                  onClick={(event) => {
                    setMediaSelect(!mediaSelect);
                    event.stopPropagation();
                  }}
                >
                  <Media />
                  <Html position={[3, 0, 3]} color style={{width: '500px'}}>
                    <motion.h6
                      className="scene-title"
                      animate={{y: mediaHovered ? '0' : '20px', opacity: mediaHovered ? 1 : 0}}
                    >
                      Click to view
                    </motion.h6>
                    <motion.h6
                      className="scene-title"
                      animate={{y: !mediaHovered ? '0' : '-20px', opacity: !mediaHovered ? 1 : 0}}
                    >
                      View everything Tay K
                    </motion.h6>
                  </Html>
                </group>
                <group
                  onPointerOver={() => setShopHovered(true)}
                  onPointerOut={() => setShopHovered(false)}
                  onClick={(event) => {
                    setShopSelect(!shopSelect);
                    event.stopPropagation();
                  }}
                >
                  <Vending prodImages={prodImages} />
                  <Html position={[0, 1, -1.5]} color style={{width: '500px'}}>
                    <motion.h6
                      className="scene-title"
                      animate={{y: shopHovered ? '0' : '20px', opacity: shopHovered ? 1 : 0}}
                    >
                      Click to view
                    </motion.h6>
                    <motion.h6
                      className="scene-title"
                      animate={{y: !shopHovered ? '0' : '-20px', opacity: !shopHovered ? 1 : 0}}
                    >
                      Shop for Tay K merch
                    </motion.h6>
                  </Html>
                </group>
                <group>
                  <mesh
                    position={[3.3, 0.5, -3.8]}
                    onClick={() => setConnectSelect(!connectSelect)}
                    onPointerOver={() => setConnectHovered(true)}
                    onPointerOut={() => setConnectHovered(false)}
                  >
                    <boxGeometry args={[1, 1, 1.2]} />
                    <meshPhongMaterial color="white" opacity={0} transparent />
                  </mesh>
                  <Connect />
                  <Html position={[3.7, 1, -3.5]} color style={{width: '500px'}}>
                    <motion.h6
                      className="scene-title"
                      animate={{y: connectHovered ? '0' : '20px', opacity: connectHovered ? 1 : 0}}
                    >
                      Click to view
                    </motion.h6>
                    <motion.h6
                      className="scene-title"
                      animate={{y: !connectHovered ? '0' : '-20px', opacity: !connectHovered ? 1 : 0}}
                    >
                      Connect on Discord
                    </motion.h6>
                  </Html>
                </group>
              </group>
            </group>
            <PerspectiveCameraAmimated
              posX={posX}
              posY={posY}
              posZ={posZ}
              rotX={rotX}
              rotY={rotY}
              rotZ={rotZ}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
