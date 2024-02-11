import * as React from "react";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  // MeshReflectorMaterial,
} from "@react-three/drei";
// import { Geometry, Base, Subtraction } from "@react-three/csg";
import controls from "./debugControls";

export default function SphereObjects({ contacts }) {
  const smallestSphereRef = useRef();
  const smallSphereRef = useRef();
  // const biggerSphereRef = useRef();
  // const biggestSphereRef = useRef();
  // const infoSphereRef = useRef();
  const [n, setN] = useState(4);
  const smallestSphereArgs = [
    // n / 1.45,
    n / 1.75,
    n * 8,
    n * 8,
    0,
    Math.PI * 2,
    0,
    Math.PI,
  ];
  const smallSphereArgs = [n / 1.25, n * 2, n * 2, 0, Math.PI * 2, 0, Math.PI];
  // const middleSphereArgs = [
  //   n / 0.825,
  //   n * 2,
  //   n * 2,
  //   0,
  //   Math.PI * 2,
  //   0,
  //   Math.PI,
  // ];
  // const biggestSphereArgs = [
  //   n / 0.7,
  //   n * 1.5,
  //   n * 1.5,
  //   0,
  //   Math.PI * 2,
  //   0,
  //   Math.PI,
  // ];
  // const outerSphereAltArgs = [
  //   n - 1,
  //   n * 10,
  //   n * 10,
  //   0,
  //   Math.PI * 2,
  //   0,
  //   5.2024774343447,
  // ];

  const debugControls = controls();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime / 6;
    smallestSphereRef.current.rotation.y = angle * debugControls.smallestSpin;
    smallSphereRef.current.rotation.y = angle * debugControls.smallSpin;
    // biggerSphereRef.current.rotation.y = -(angle * debugControls.biggerSpin);
    // biggestSphereRef.current.rotation.y = -(angle * debugControls.biggestSpin);
  });

  useEffect(() => {
    setN(contacts.length);
  }, []);

  const sphereMain = () => {
    return (
      <mesh
        ref={smallestSphereRef}
        visible={debugControls.visible}
        position={[
          debugControls.position.x,
          debugControls.position.y,
          debugControls.position.z,
        ]}
        scale={debugControls.smallestScale}
      >
        {/* <meshPhongMaterial
          color={debugControls.smallestColor}
          // side={THREE.DoubleSide}
          transparent
          opacity={0.75}
          wireframe={false}
        /> */}
        <sphereGeometry args={smallestSphereArgs} />

        <MeshDistortMaterial
          distort={debugControls.smallestDistortion}
          speed={debugControls.smallestSpeed}
          color={debugControls.smallestColor}
          wireframe={false}
          side={THREE.DoubleSide}
          opacity={debugControls.centralSphereOpacity}
          transparent
          depthTest={true}
          flatShading={true}
        />

        {/* <meshPhongMaterial color={ screenColor } opacity={screenOpacity} transparent shininess={50} specular="#909090" /> */}

        {/* <Geometry> */}
        {/* <sphereGeometry args={smallestSphereArgs} /> */}
        {/* <Base>
            <sphereGeometry args={[1.25, 32, 32]} />
          </Base> */}
        {/* <Subtraction position={[0, 0, 0]}>
            <torusKnotGeometry args={[1, 6, 64, 8, 3, n]} />
          </Subtraction> */}
        {/* </Geometry> */}
      </mesh>
    );
  };
  return (
    <>
      <Float
        speed={debugControls.floatSpeed}
        floatIntensity={debugControls.floatIntensity}
      >
        {/* smallest wireframe sphere */}
        {sphereMain()}

        {/* smaller wireframe sphere */}
        <mesh
          ref={smallSphereRef}
          visible={debugControls.visible}
          position={[
            debugControls.position.x,
            debugControls.position.y,
            debugControls.position.z,
          ]}
          scale={debugControls.smallScale}
        >
          <sphereGeometry args={smallSphereArgs} />
          {/* <meshPhongMaterial
          color={debugControls.smallColor}
          // side={THREE.DoubleSide}
          wireframe={debugControls.wireframe}
          opacity={debugControls.spheresOpacity}
          transparent
          // shininess={50}
          // specular="#909090"
        /> */}
          <MeshDistortMaterial
            distort={debugControls.smallDistortion}
            speed={debugControls.smallSpeed}
            color={debugControls.smallColor}
            wireframe={debugControls.wireframe}
            depthTest={true}
            // side={THREE.DoubleSide}
            opacity={debugControls.outerSpheresOpacity}
            transparent
            // flatShading={true}
          />
        </mesh>
      </Float>
      {/* bigger wireframe sphere */}
      {/* <mesh
        ref={biggerSphereRef}
        visible={debugControls.visible}
        position={[
          debugControls.position.x,
          debugControls.position.y - 1,
          debugControls.position.z,
        ]}
        scale={debugControls.biggerScale}
      >
        <sphereGeometry args={middleSphereArgs} />
        <MeshDistortMaterial
          distort={debugControls.biggerDistortion}
          speed={debugControls.biggerSpeed}
          color={debugControls.biggerColor}
          wireframe={debugControls.wireframe}
          opacity={debugControls.outerSpheresOpacity}
          transparent
          depthTest={true}
        /> */}
      {/* <meshPhongMaterial
          color={debugControls.biggerColor}
          // side={THREE.DoubleSide}
          wireframe={debugControls.wireframe}
          opacity={debugControls.spheresOpacity}
          transparent
          // shininess={50}
          // specular="#909090"
        /> */}
      {/* </mesh> */}
      {/* biggest wireframe sphere */}
      {/* <mesh
        ref={biggestSphereRef}
        visible={debugControls.visible}
        position={[
          debugControls.position.x,
          debugControls.position.y,
          debugControls.position.z,
        ]}
        scale={debugControls.biggestScale}
      >
        <sphereGeometry args={biggestSphereArgs} />
        <MeshDistortMaterial
          distort={debugControls.biggestDistortion}
          speed={debugControls.biggestSpeed}
          color={debugControls.biggestColor}
          wireframe={debugControls.wireframe}
          depthTest={true}
          opacity={debugControls.outerSpheresOpacity}
          transparent
        /> */}
      {/* <meshPhongMaterial
          color={debugControls.biggestColor}
          // side={THREE.DoubleSide}
          wireframe={debugControls.wireframe}
          opacity={debugControls.spheresOpacity}
          transparent
          // shininess={50}
          // specular="#909090"
        /> */}
      {/* </mesh> */}
    </>
  );
}
