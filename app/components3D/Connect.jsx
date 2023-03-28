import {useRef, useEffect} from 'react';
import {useGLTF, useAnimations} from '@react-three/drei';

import Basketball from '../../../public/glb/baldBasketball.glb';
import TiedUpHair from '../../../public/glb/TiedUpHar.glb';

function UpHair() {
  const groupUphair = useRef();
  const {nodes, materials, animations} = useGLTF(TiedUpHair);
  const {actions} = useAnimations(animations, groupUphair);

  useEffect(() => {
    actions.Animation_1.play();
  });

  return (
    <group
      ref={groupUphair}
      dispose={null}
      scale={0.15}
      position={[2.7, 0, -4]}
      rotation={[0, 1, 0]}
    >
      <group name="Scene">
        <group name="TiedUpHair">
          <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh
              name="Full_Body_Med_Poly"
              geometry={nodes.Full_Body_Med_Poly.geometry}
              material={materials.Skin}
              skeleton={nodes.Full_Body_Med_Poly.skeleton}
            />
            <skinnedMesh
              name="Gucci_Shirt_2001"
              geometry={nodes.Gucci_Shirt_2001.geometry}
              material={materials['Material.001']}
              skeleton={nodes.Gucci_Shirt_2001.skeleton}
            />
            <skinnedMesh
              name="Jacket_Black"
              geometry={nodes.Jacket_Black.geometry}
              material={materials['Material.002']}
              skeleton={nodes.Jacket_Black.skeleton}
            />
            <skinnedMesh
              name="Pants_Mesh_Unwrapped"
              geometry={nodes.Pants_Mesh_Unwrapped.geometry}
              material={materials['Material.005']}
              skeleton={nodes.Pants_Mesh_Unwrapped.skeleton}
            />
            <skinnedMesh
              name="Rick_Owens_Shoe"
              geometry={nodes.Rick_Owens_Shoe.geometry}
              material={materials['Black Fabric']}
              skeleton={nodes.Rick_Owens_Shoe.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

export default function Connect() {
  const group = useRef();
  const {nodes, materials, animations} = useGLTF(Basketball);
  const {actions} = useAnimations(animations, group);

  useEffect(() => {
    actions.ArmatureAction.play();
    actions.Sketchfab_modelAction.play();
  });

  return (
    <group>
      <UpHair />
      <group
        ref={group}
        dispose={null}
        scale={0.15}
        position={[3.5, 0, -3.2]}
        rotation={[0, 3, 0]}
      >
        <group name="Scene">
          <group
            name="Sketchfab_model"
            position={[-1.38, 3.93, 2.14]}
            rotation={[Math.PI / 2, 0, 3.5]}
            scale={0.53}
          >
            <group name="root">
              <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                <group name="BB_PRINCIPAL_1">
                  <group name="BB_RIM_0">
                    <mesh
                      name="Object_6"
                      geometry={nodes.Object_6.geometry}
                      material={materials.BBALL_RIM}
                    />
                  </group>
                  <mesh
                    name="Object_4"
                    geometry={nodes.Object_4.geometry}
                    material={materials.BBALL_PRINCIPAL}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.TiedUpHair} />
          <skinnedMesh
            name="Full_Body_Med_Poly"
            geometry={nodes.Full_Body_Med_Poly.geometry}
            material={materials.Skin}
            skeleton={nodes.Full_Body_Med_Poly.skeleton}
          />
          <skinnedMesh
            name="Gucci_Shirt_2001"
            geometry={nodes.Gucci_Shirt_2001.geometry}
            material={materials['Material.001']}
            skeleton={nodes.Gucci_Shirt_2001.skeleton}
          />
          <skinnedMesh
            name="Pants_Mesh_Unwrapped"
            geometry={nodes.Pants_Mesh_Unwrapped.geometry}
            material={materials['Material.005']}
            skeleton={nodes.Pants_Mesh_Unwrapped.skeleton}
          />
          <skinnedMesh
            name="Rick_Owens_Shoe"
            geometry={nodes.Rick_Owens_Shoe.geometry}
            material={materials.Laces}
            skeleton={nodes.Rick_Owens_Shoe.skeleton}
          />
        </group>
      </group>
    </group>
  );
}
