import {TextureLoader} from 'three';
import {useLoader} from '@react-three/fiber';
import {useGLTF} from '@react-three/drei';

import Scene from '../../public/glb/scene.glb';

export default function Media({prodImages}) {
  const {nodes, materials} = useGLTF(Scene);
  // const imgUrl = prodImages.map((images) => images.variants.nodes[0].image.url);
  // const batchTextures = useLoader(TextureLoader, imgUrl);

  return (
    <group>
      {/* {batchTextures.map((textures, i) => {
        const row1 = i >= 0 && i <= 2;
        const row2 = i >= 3 && i <= 5;
        const row3 = i >= 6 && i <= 8;
        const left = i === 0 || i === 3 || i === 6 || i === 10;
        const middle = i === 1 || i === 4 || i === 7 || i === 11;
        return (
          <mesh
            key={i}
            geometry={nodes.Plane008.geometry}
            position={[
              0.96,
              row1 ? 1.05 : row2 ? 0.91 : row3 ? 0.77 : 0.63,
              left ? -0.8 : middle ? -0.935 : -1.07,
            ]}
            rotation={[-1.55, 0, -Math.PI / 2]}
            scale={0.06}
          >
            <meshBasicMaterial
              attach="material"
              map={textures}
              transparent={true}
            />
          </mesh>
        );
      })} */}
      <group
        position={[0.8, -0.03, -0.98]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.53}
      >
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[43.58, 155.99, -37.52]}
            rotation={[0, 1.57, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.buttons_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[43.84, 148.2, -46.98]}
            rotation={[0, 1.57, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.coinbase_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[40.11, 148.2, -46.98]}
            rotation={[0, 1.57, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.glass1_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[43.94, 5.82, -63.8]}
            rotation={[0, 0, -Math.PI]}
            scale={13.49}
          >
            <mesh
              castShadow
              geometry={nodes.holders_low_Tex1_0.geometry}
              material={materials.Tex1}
            />
          </group>
          <group
            position={[27.81, 197.28, -23.86]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.interior_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[35.88, 219.7, 11.45]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={81.73}
          >
            <mesh
              castShadow
              geometry={nodes.light_Tex1_0.geometry}
              material={materials.Material}
            />
          </group>
          <group
            position={[43.84, 148.2, -46.98]}
            rotation={[0, 1.57, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.logo_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[0, 100, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.machine_low_Tex1_0.geometry}
              material={materials.Tex1}
            />
          </group>
          <group
            position={[43.84, 148.2, -46.98]}
            rotation={[0, 1.57, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.MainDialer_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[43.39, 95.4, 10.77]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.pushtray_low_Tex1_0.geometry}
              material={materials.Tex1}
            />
          </group>
          <group position={[29.04, 169.05, 66.57]} scale={100}>
            <mesh
              castShadow
              geometry={nodes.remote_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[43.84, 148.2, -46.98]}
            rotation={[0, 1.57, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.Screen_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[24.59, 221.55, 65.09]}
            rotation={[0, 0, 0.14]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.tape_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[-43.96, 159.28, -34.57]}
            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.wire_holder_main_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
          <group
            position={[-45.54, 156.1, -34.57]}
            rotation={[0, 0, Math.PI / 2]}
            scale={100}
          >
            <mesh
              castShadow
              geometry={nodes.wire_low_Tex2_0.geometry}
              material={materials.Tex2}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(Scene);