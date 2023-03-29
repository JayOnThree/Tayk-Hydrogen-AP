import * as THREE from 'three';
import {useGLTF} from '@react-three/drei';
import Scene from '../../public/glb/scene.glb';

export default function Court() {
  const {nodes, materials} = useGLTF(Scene);
  const connectBlue = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0, 0.5, 20),
    toneMapped: false,
  });
  const glowYellow = new THREE.MeshBasicMaterial({
    color: new THREE.Color(7, 0, 0.5),
    toneMapped: false,
  });
  const glowGreen = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0, 3, 1),
    toneMapped: false,
  });

  return (
    <group>
      {/* long chair bench */}
      <mesh
        castShadow
        geometry={nodes.DP_TNR_Bench_1_DP_TNR_Bench_1_0.geometry}
        material={materials.DP_TNR_Bench_1}
        position={[0.9, 0.27, -3.73]}
        rotation={[-1.57, 0, -2.01]}
        scale={0.012}
      />
      {/* swing structure is directly below */}
      <mesh
        castShadow
        geometry={nodes.MonkeyBars.geometry}
        material={materials['Material.004']}
        position={[4.9, 0.59, 4.94]}
        rotation={[0, 0.36, 0]}
        scale={0.0009}
      />
      <mesh
        castShadow
        geometry={nodes.Swing.geometry}
        material={materials['Material.004']}
        position={[1.55, 0.56, 5.01]}
        rotation={[-1.69, 0.22, 0.49]}
        scale={0.0009}
      />
            <mesh castShadow geometry={nodes.Teator.geometry} material={materials['Material.004']} position={[3.72, 0.17, 4.14]} rotation={[0, 0.23, 0]} scale={0.0009} />
            <mesh castShadow geometry={nodes.Totter.geometry} material={materials['Material.004']} position={[3.71, 0.32, 4.15]} rotation={[-Math.PI, 1.34, -2.73]} scale={0.0009} />

            {/* metal pole fence */}
            <mesh castShadow geometry={nodes.DP_AFG_Metalfence_2_DP_AFG_Metalfence_2_0.geometry} material={materials.DP_AFG_Metalfence_2} position={[3.59, 0.53, 3.46]} rotation={[0, 0.02, 0]} scale={0.015} />

            {/* Fences */}
            <mesh castShadow geometry={nodes.DP_TNR_WireFence_1_DP_TNR_WireFence_1_0003.geometry} material={materials.DP_TNR_WireFence_1} position={[6.39, 0.58, 3.58]} rotation={[0, -1.56, 0]} scale={0.015} />
            <mesh castShadow geometry={nodes.DP_TNR_WireFence_1_DP_TNR_WireFence_1_0001.geometry} material={materials.DP_TNR_WireFence_1} position={[6.39, 0.58, 2.13]} rotation={[0, -1.56, 0]} scale={0.015} />
            <mesh castShadow geometry={nodes.DP_TNR_WireFence_1_DP_TNR_WireFence_1_0002.geometry} material={materials.DP_TNR_WireFence_1} position={[6.39, 0.58, 0.68]} rotation={[0, -1.56, 0]} scale={0.015} />
            <mesh castShadow geometry={nodes.DP_TNR_WireFence_1_DP_TNR_WireFence_1_0004.geometry} material={materials.DP_TNR_WireFence_1} position={[6.39, 0.58, -3.55]} rotation={[0, -1.56, 0]} scale={0.015} />
            <mesh castShadow geometry={nodes.DP_TNR_WireFence_1_DP_TNR_WireFence_1_0008.geometry} material={materials.DP_TNR_WireFence_1} position={[6.39, 0.58, -5]} rotation={[0, -1.56, 0]} scale={0.015} />
            <mesh castShadow geometry={nodes.DP_TNR_WireFence_1_DP_TNR_WireFence_1_0007.geometry} material={materials.DP_TNR_WireFence_1} position={[6.39, 0.58, -0.76]} rotation={[0, -1.56, 0]} scale={0.015} />
            <mesh castShadow geometry={nodes.DP_TNR_WireFence_1_DP_TNR_WireFence_1_0005.geometry} material={materials.DP_TNR_WireFence_1} position={[6.39, 0.58, 5.01]} rotation={[0, -1.56, 0]} scale={0.015} />

            {/* wire fence with hole in it */}
            <mesh castShadow geometry={nodes.DP_TNR_WireFence_2_DP_TNR_WireFence_1_0.geometry} material={materials.DP_TNR_WireFence_1} position={[6.38, 0.62, -2.16]} rotation={[0, Math.PI / 2, 0]} scale={0.015} />

            {/* court */}
            <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials['Material.006']} position={[3.45, -0.03, -0.58]} rotation={[0, -1.57, 0]} scale={[3.61, 1.44, 2.51]} />

            {/* text */}
            <mesh castShadow geometry={nodes.Text001.geometry} material={glowGreen} position={[3.42, 1.5, -3.5]} rotation={[Math.PI / 2, 0, 0]} scale={0.26} />
            <mesh castShadow geometry={nodes.Text002.geometry} material={glowYellow} position={[0.71, 1.28, -0.47]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.41} />
            <mesh castShadow geometry={nodes.Text003.geometry} material={connectBlue} position={[4, 0.9, 0.68]} rotation={[Math.PI / 2, 0, Math.PI]} scale={0.31} />

            {/* posters */}
            <mesh castShadow geometry={nodes.Plane002.geometry} material={materials['Material.010']} position={[6.38, 0.66, -3.3]} rotation={[Math.PI / 2, 0, -1.71]} scale={[0.24, 0.32, 0.32]} />
            <mesh castShadow geometry={nodes.Plane003.geometry} material={materials['Material.011']} position={[0.5, 0.9, -2.85]} rotation={[Math.PI / 2, 0, 1.49]} scale={[0.29, 0.38, 0.38]} />
            <mesh castShadow geometry={nodes.Plane004.geometry} material={materials['Material.012']} position={[0.51, 0.65, -3.38]} rotation={[Math.PI / 2, 0, 1.44]} scale={[0.29, 0.38, 0.38]} />
            <mesh castShadow geometry={nodes.Plane005.geometry} material={materials['Material.013']} position={[2.22, 0.65, -5.65]} rotation={[Math.PI / 2, 0, 3.06]} scale={[0.29, 0.38, 0.38]} />
            <mesh castShadow geometry={nodes.Plane006.geometry} material={materials['Material.014']} position={[6.38, 0.66, 2.35]} rotation={[Math.PI / 2, 0, -1.71]} scale={[0.24, 0.32, 0.32]} />

            {/* hoop */}
            <mesh castShadow receiveShadow geometry={nodes.defaultMaterial001.geometry} material={materials.Hoop_notLit} position={[3.45, 1.16, 2.59]} rotation={[-Math.PI / 2, 0, 1.57]} scale={0.35} />
            <mesh castShadow receiveShadow geometry={nodes.defaultMaterial.geometry} material={materials.Hoop_litUp} position={[3.48, 1.16, -3.79]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={0.35} />

            {/* walls */}
            <mesh castShadow geometry={nodes.Cube004.geometry} material={materials.leftVen} position={[0.42, 0.71, 0.6]} rotation={[Math.PI, -1.57, 0]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube005.geometry} material={materials.behindVen} position={[0.42, 0.71, -0.87]} rotation={[Math.PI, -1.57, 0]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube006.geometry} material={materials.RightVen} position={[0.42, 0.71, -2.34]} rotation={[Math.PI, -1.57, 0]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube007.geometry} material={materials.righRightVen} position={[0.42, 0.71, -3.79]} rotation={[Math.PI, -1.57, 0]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube001.geometry} material={materials.OtherWalls} position={[4.32, 0.71, 6.39]} rotation={[0, 0, -Math.PI]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube002.geometry} material={materials.OtherWalls} position={[2.91, 0.71, 6.39]} rotation={[0, 0, -Math.PI]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube003.geometry} material={materials.OtherWalls} position={[1.52, 0.71, 6.39]} rotation={[0, 0, -Math.PI]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube008.geometry} material={materials.OtherWalls} position={[5.02, 0.71, -5.74]} rotation={[Math.PI, 0, 0]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube009.geometry} material={materials.OtherWalls} position={[3.57, 0.71, -5.74]} rotation={[Math.PI, 0, 0]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube010.geometry} material={materials.OtherWalls} position={[2.16, 0.71, -5.74]} rotation={[Math.PI, 0, 0]} scale={[0.73, 0.73, -0.07]} />
            <mesh castShadow geometry={nodes.Cube010.geometry} material={materials.OtherWalls} position={[0.75, 0.71, -5.74]} rotation={[Math.PI, 0, 0]} scale={[0.73, 0.73, -0.07]} />

            {/* concrete floor */}
            <mesh castShadow receiveShadow geometry={nodes.Plane001.geometry} material={materials.asphalt} position={[3.75, -0.1, -0.55]} scale={[8.87, 6.25, 8.92]} />
        </group>
  );
}
