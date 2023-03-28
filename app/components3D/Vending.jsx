import {TextureLoader} from 'three';
import {useLoader} from '@react-three/fiber';
import {useGLTF} from '@react-three/drei';

import Scene from '../../../public/glb/scene.glb';
// import Shirt from '../../../public/Shirt.png';

export default function Media({prodImages}) {
  const {nodes, materials} = useGLTF(Scene);
  const imgUrl = prodImages.map((images) => images.variants.nodes[0].image.url);
  // const imgTexture = useLoader(TextureLoader, Shirt);
  const batchTextures = useLoader(TextureLoader, imgUrl);
  // console.log(batchTextures);

  return (
    <group>
      {batchTextures.map((textures, i) => {
        return (
          <mesh
            key={i}
            geometry={nodes.Plane008.geometry}
            position={[0.96, 1.05, -0.8]}
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
      })}
      {/* <mesh
        geometry={nodes.Plane008.geometry}
        position={[0.96, 1.05, -0.8]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>
      <mesh
        geometry={nodes.Plane009.geometry}
        material={nodes.Plane009.material}
        position={[0.96, 1.05, -0.935]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>
      <mesh
        geometry={nodes.Plane010.geometry}
        material={nodes.Plane010.material}
        position={[0.96, 1.05, -1.07]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>
      <mesh
        geometry={nodes.Plane008.geometry}
        material={nodes.Plane008.material}
        position={[0.96, 0.91, -0.8]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>
      <mesh
        geometry={nodes.Plane009.geometry}
        material={nodes.Plane009.material}
        position={[0.96, 0.91, -0.935]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>
      <mesh
        geometry={nodes.Plane010.geometry}
        material={nodes.Plane010.material}
        position={[0.96, 0.91, -1.07]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>

      <mesh
        geometry={nodes.Plane008.geometry}
        material={nodes.Plane008.material}
        position={[0.96, 0.77, -0.8]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>
      <mesh
        geometry={nodes.Plane009.geometry}
        material={nodes.Plane009.material}
        position={[0.96, 0.77, -0.935]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>
      <mesh
        geometry={nodes.Plane010.geometry}
        material={nodes.Plane010.material}
        position={[0.96, 0.77, -1.07]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>

      <mesh
        geometry={nodes.Plane008.geometry}
        material={nodes.Plane008.material}
        position={[0.96, 0.63, -0.8]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>
      <mesh
        geometry={nodes.Plane009.geometry}
        material={nodes.Plane009.material}
        position={[0.96, 0.63, -0.935]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh>
      <mesh
        geometry={nodes.Plane010.geometry}
        material={nodes.Plane010.material}
        position={[0.96, 0.63, -1.07]}
        rotation={[-1.55, 0, -Math.PI / 2]}
        scale={0.06}
      >
        <meshBasicMaterial
          attach="material"
          map={imgTexture}
          transparent={true}
        />
      </mesh> */}
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
