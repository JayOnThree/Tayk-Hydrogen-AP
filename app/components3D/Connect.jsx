import {useRef, useEffect} from 'react';
import {useGLTF, useAnimations} from '@react-three/drei';

import Drib from '../../public/glb/dribble.glb';
import Idl from '../../public/glb/idle.glb';

function Dribble({...props}) {
  const group = useRef();
  const {nodes, materials, animations} = useGLTF(Drib);
  const {actions, names} = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].play();
    actions[names[1]].play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" scale={0.43} position={[3, 0, -4]} rotation={[0, 1.4, 0]}>
        <group
          name="metarig"
          position={[-0.03, -0.06, 0.36]}
          rotation={[-0.16, -0.79, -0.16]}
        >
          <primitive object={nodes.spine} />
          <group name="Cube013">
            <skinnedMesh
              name="Cube014"
              geometry={nodes.Cube014.geometry}
              material={materials['Material.002']}
              skeleton={nodes.Cube014.skeleton}
            />
            <skinnedMesh
              name="Cube014_1"
              geometry={nodes.Cube014_1.geometry}
              material={materials['Material.001']}
              skeleton={nodes.Cube014_1.skeleton}
            />
            <skinnedMesh
              name="Cube014_2"
              geometry={nodes.Cube014_2.geometry}
              material={materials['Material.006']}
              skeleton={nodes.Cube014_2.skeleton}
            />
            <skinnedMesh
              name="Cube014_3"
              geometry={nodes.Cube014_3.geometry}
              material={materials['Material.011']}
              skeleton={nodes.Cube014_3.skeleton}
            />
            <skinnedMesh
              name="Cube014_4"
              geometry={nodes.Cube014_4.geometry}
              material={materials.Black}
              skeleton={nodes.Cube014_4.skeleton}
            />
            <skinnedMesh
              name="Cube014_5"
              geometry={nodes.Cube014_5.geometry}
              material={materials['Material.003']}
              skeleton={nodes.Cube014_5.skeleton}
            />
            <skinnedMesh
              name="Cube014_6"
              geometry={nodes.Cube014_6.geometry}
              material={materials['Material.005']}
              skeleton={nodes.Cube014_6.skeleton}
            />
            <skinnedMesh
              name="Cube014_7"
              geometry={nodes.Cube014_7.geometry}
              material={materials['Material.007']}
              skeleton={nodes.Cube014_7.skeleton}
            />
          </group>
        </group>
        <group name="basketball" position={[-0.7, 0.9, 0.58]} scale={0.25}>
          <mesh
            name="Object_0"
            geometry={nodes.Object_0.geometry}
            material={materials.BBALL_PRINCIPAL}
          />
          <mesh
            name="Object_0_1"
            geometry={nodes.Object_0_1.geometry}
            material={materials.BBALL_RIM}
          />
        </group>
      </group>
    </group>
  );
}

export default function Connect() {
  const group = useRef();
  const {nodes, materials, animations} = useGLTF(Idl);
  const {actions, names} = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].play();
  });

  return (
    <group>
      <Dribble />
      <group
        ref={group}
        dispose={null}
        scale={0.4}
        position={[2.35, 0, -3.5]}
        rotation={[0, 2, 0]}
      >
        <group name="Scene">
          <group
            name="metarig"
            position={[-0.07, -0.05, 0.06]}
            rotation={[-0.11, -0.75, -0.08]}
          >
            <primitive object={nodes.spine} />
            <group name="Cube">
              <skinnedMesh
                name="Cube001"
                geometry={nodes.Cube001.geometry}
                material={materials['Material.002']}
                skeleton={nodes.Cube001.skeleton}
              />
              <skinnedMesh
                name="Cube001_1"
                geometry={nodes.Cube001_1.geometry}
                material={materials['Material.008']}
                skeleton={nodes.Cube001_1.skeleton}
              />
              <skinnedMesh
                name="Cube001_2"
                geometry={nodes.Cube001_2.geometry}
                material={materials['Material.009']}
                skeleton={nodes.Cube001_2.skeleton}
              />
              <skinnedMesh
                name="Cube001_3"
                geometry={nodes.Cube001_3.geometry}
                material={materials.Black}
                skeleton={nodes.Cube001_3.skeleton}
              />
              <skinnedMesh
                name="Cube001_4"
                geometry={nodes.Cube001_4.geometry}
                material={materials['Material.010']}
                skeleton={nodes.Cube001_4.skeleton}
              />
              <skinnedMesh
                name="Cube001_5"
                geometry={nodes.Cube001_5.geometry}
                material={materials['Material.006']}
                skeleton={nodes.Cube001_5.skeleton}
              />
              <skinnedMesh
                name="Cube001_6"
                geometry={nodes.Cube001_6.geometry}
                material={materials['Material.003']}
                skeleton={nodes.Cube001_6.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
