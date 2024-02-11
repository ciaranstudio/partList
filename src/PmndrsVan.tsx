/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import React from "react";
// import { RigidBody } from "@react-three/rapier";
// import { useRef } from "react";

export default function PmndrsVan(props: any) {
  const { nodes, materials } = useGLTF("/pmndrsVan.gltf");
  // const body: any = useRef();
  // const body1: any = useRef();
  // const body2: any = useRef();
  // const body3: any = useRef();

  // const joint1 = useFixedJoint(body, body1, [
  //   // Position of the joint in bodyA's local space
  //   [0, 0, 0],
  //   // Orientation of the joint in bodyA's local space
  //   [0, 0, 0, 1],
  //   // Position of the joint in bodyB's local space
  //   [0, 0, 0],
  //   // Orientation of the joint in bodyB's local space
  //   [0, 0, 0, 1],
  // ]);
  // const joint2 = useFixedJoint(body, body2, [
  //   // Position of the joint in bodyA's local space
  //   [0, 0, 0],
  //   // Orientation of the joint in bodyA's local space
  //   [0, 0, 0, 1],
  //   // Position of the joint in bodyB's local space
  //   [0, 0, 0],
  //   // Orientation of the joint in bodyB's local space
  //   [0, 0, 0, 1],
  // ]);
  // const joint3 = useFixedJoint(body, body3, [
  //   // Position of the joint in bodyA's local space
  //   [0, 0, 0],
  //   // Orientation of the joint in bodyA's local space
  //   [0, 0, 0, 1],
  //   // Position of the joint in bodyB's local space
  //   [0, 0, 0],
  //   // Orientation of the joint in bodyB's local space
  //   [0, 0, 0, 1],
  // ]);
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI, 0, Math.PI]} scale={3.5} position={[0, 0, 0]}>
        <group position={[0, 0.2, -0.1]}>
          {/* <RigidBody type="kinematicPosition" colliders={false}>
            <MeshCollider type="cuboid"> */}
          {/* <RigidBody ref={body}> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_body as THREE.Mesh).geometry}
            material={materials.plastic}
          />
          {/* </RigidBody> */}
          {/* </MeshCollider> */}

          {/* <MeshCollider type="cuboid"> */}
          {/* <RigidBody ref={body1}> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_body_1 as THREE.Mesh).geometry}
            material={materials.paintBlue}
          />
          {/* </RigidBody> */}
          {/* </MeshCollider> */}

          {/* <MeshCollider type="cuboid"> */}
          {/* <RigidBody ref={body2}> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_body_2 as THREE.Mesh).geometry}
            material={materials.lightFront}
          />
          {/* </RigidBody> */}
          {/* </MeshCollider>
            <MeshCollider type="cuboid"> */}
          {/* <RigidBody ref={body3}> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_body_3 as THREE.Mesh).geometry}
            material={materials._defaultMat}
          />
          {/* </RigidBody> */}
          {/* </MeshCollider>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_body_4 as THREE.Mesh).geometry}
            material={materials.lightBack}
          />
          {/* </MeshCollider>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_body_5 as THREE.Mesh).geometry}
            material={materials.window}
          />
          {/* </MeshCollider>
          </RigidBody> */}
        </group>
        <group position={[-0.35, 0.3, 0.76]} scale={[-1, 1, 1]}>
          {/* <RigidBody type="kinematicPosition" colliders={false}>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_wheel_frontLeft as THREE.Mesh).geometry}
            material={materials.carTire}
          />
          {/* </MeshCollider>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_wheel_frontLeft_1 as THREE.Mesh).geometry}
            material={materials._defaultMat}
          />
          {/* </MeshCollider>
          </RigidBody> */}
        </group>
        <group position={[0.35, 0.3, 0.76]}>
          {/* <RigidBody type="kinematicPosition" colliders={false}>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_wheel_frontLeft as THREE.Mesh).geometry}
            material={materials.carTire}
          />
          {/* </MeshCollider>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_wheel_frontLeft_1 as THREE.Mesh).geometry}
            material={materials._defaultMat}
          />
          {/* </MeshCollider>
          </RigidBody> */}
        </group>
        <group position={[-0.35, 0.3, -0.76]} scale={[-1, 1, 1]}>
          {/* <RigidBody type="kinematicPosition" colliders={false}>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_wheel_frontLeft as THREE.Mesh).geometry}
            material={materials.carTire}
          />
          {/* </MeshCollider>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_wheel_frontLeft_1 as THREE.Mesh).geometry}
            material={materials._defaultMat}
          />
          {/* </MeshCollider>
          </RigidBody> */}
        </group>
        <group position={[0.35, 0.3, -0.76]}>
          {/* <RigidBody type="kinematicPosition" colliders={false}>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_wheel_frontLeft as THREE.Mesh).geometry}
            material={materials.carTire}
          />
          {/* </MeshCollider>
            <MeshCollider type="cuboid"> */}
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Mesh_wheel_frontLeft_1 as THREE.Mesh).geometry}
            material={materials._defaultMat}
          />
          {/* </MeshCollider>
          </RigidBody> */}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/pmndrsVan.gltf");
