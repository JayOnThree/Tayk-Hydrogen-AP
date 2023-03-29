import {useGLTF} from '@react-three/drei';

import Scene from '../../public/glb/scene.glb';

export default function Media() {
  const {nodes, materials} = useGLTF(Scene);

  return (
    <group>
      <group
        position={[2.96,-0.05,3.53]}
        rotation={[-Math.PI / 2, 0, -0.93]} scale={0.0013}
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
