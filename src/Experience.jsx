import * as React from "react";
import { useEffect, useRef } from "react";
import { Cloud, Sky, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import controls from "./debugControls";
import CubeAndSpheres from "./CubeAndSpheres";

export default function Experience({ contacts, perfVisible }) {
  const orbitRef = useRef();
  const debugControls = controls();
  debugControls.perfVisible = perfVisible;
  // useEffect(() => {
  //   if (orbitRef.current) {
  //     orbitRef.current.autoRotateSpeed = 0.85;
  //     orbitRef.current.autoRotate = true;

  //     const onClick = (event) => {
  //       disableAutoRotate();
  //       window.removeEventListener("click", onClick);
  //     };

  //     window.addEventListener("pointerdown", onClick);
  //   }
  // }, []);

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.autoRotateSpeed = 0.5;
      orbitRef.current.autoRotate = true;
    }
  }, []);

  return (
    <>
      <color args={["#171717"]} attach="background" />
      <fog args={["#d8d8d8", 0, 180]} attach="fog" />

      {debugControls.perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault ref={orbitRef} maxDistance={150} />

      <directionalLight position={[1, 2, 3]} intensity={10.5} />
      <ambientLight intensity={1.5} />
      <Sky
        distance={900000}
        sunPosition={[20, 10, 150]}
        inclination={0}
        azimuth={0.75}
        onClick={() => {
          orbitRef.current.autoRotate = false;
        }}
      />
      <Cloud
        bounds={[15, 10, 5]}
        concentrate="inside"
        scale={[7, 8, 10]}
        volume={20}
        fade={200}
        speed={0.0015}
        opacity={0.8}
      />

      <CubeAndSpheres
        contacts={contacts}
        orbitRef={orbitRef}
        // onClick={() => {
        //   orbitRef.current.autoRotate = false;
        // }}
      />
    </>
  );
}
