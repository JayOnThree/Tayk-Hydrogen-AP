import {useRef} from 'react';
import * as THREE from 'three';
import {useGLTF} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';

import Scene from '../../public/glb/scene.glb';
import Phone from './Phone';

export default function Media({mediaSelect}) {
  const {nodes, materials} = useGLTF(Scene);
  const ref = useRef();

  useFrame(() => {
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      mediaSelect ? 0.5 : 0.4,
      0.02,
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      mediaSelect ? -Math.PI / 1 : -Math.PI / 2,
      0.5,
    );
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      mediaSelect ? 3 : 0,
      0.1,
    );
    ref.current.scale.x = THREE.MathUtils.lerp(
      ref.current.scale.x,
      mediaSelect ? 0.45 : 0.15,
      0.1,
    );
    ref.current.scale.y = THREE.MathUtils.lerp(
      ref.current.scale.y,
      mediaSelect ? 0.45 : 0.15,
      0.1,
    );
    ref.current.scale.z = THREE.MathUtils.lerp(
      ref.current.scale.z,
      mediaSelect ? 0.45 : 0.15,
      0.1,
    );
  });

  return (
    <group>
      <group
        scale={0.15}
        position={[3.9, 0.4, 0.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={ref}
      >
        <Phone />
      </group>
      <group
        position={[2.96, -0.05, 3.53]}
        rotation={[-Math.PI / 2, 0, -0.93]}
        scale={0.0013}
      >
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[19938.15, 1963.79, -70000]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={1951.2}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['��������������003_skate_table_exi_'].geometry}
              material={materials.skate_table_exi}
              position={[70.26, -85.52, 1.87]}
              rotation={[0, 0, -0.17]}
              scale={0.72}
            />
          </group>
        </group>
      </group>
    </group>
  );
}
