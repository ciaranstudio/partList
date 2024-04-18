import * as React from "react";
import { Suspense, useEffect, useRef } from "react";
import { Cloud, Sky, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import controls from "./debugControls";
import CubeAndSpheres from "./CubeAndSpheres";
// import { useProgress } from "@react-three/drei";
import Placeholder from "./Placeholder";
// import gsap from "gsap";
// import * as THREE from "three";

export default function Experience({ contacts, perfVisible }) {
  // const loadingBarElement = document.querySelector(".loading-bar");
  // const { active, progress, errors, item, loaded, total } = useProgress();

  // useEffect(() => {
  //   loadingBarElement.style.transform = `scaleX(${progress / 100})`;
  //   if (progress == 100) {
  //     window.setTimeout(() => {
  //       loadingBarElement.classList.add("ended");
  //       loadingBarElement.style.transform = "";
  //     }, 500);
  //   }
  // }, [progress]);

  const orbitRef = useRef();
  const debugControls = controls();
  debugControls.perfVisible = perfVisible;

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.autoRotateSpeed = 0.5;
      orbitRef.current.autoRotate = true;
    }
  }, []);

  return (
    <>
      <color args={["#e8e8e8"]} attach="background" />
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
      <Suspense fallback={Placeholder}>
        <CubeAndSpheres contacts={contacts} orbitRef={orbitRef} />
      </Suspense>
    </>
  );
}
