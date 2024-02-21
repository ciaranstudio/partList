import * as React from "react";
import { Suspense, useEffect, useRef } from "react";
import { Cloud, Sky, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import controls from "./debugControls";
import CubeAndSpheres from "./CubeAndSpheres";
import { useProgress } from "@react-three/drei";
// import gsap from "gsap";
// import * as THREE from "three";

export default function Experience({ contacts, perfVisible }) {
  const loadingBarElement = document.querySelector(".loading-bar");
  const { active, progress, errors, item, loaded, total } = useProgress();
  // const overlayOpacity = { value: 1 };
  // const [overlayAlpha, setOverlayAlpha] = useState(1);
  // const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  // const overlayMaterial = new THREE.ShaderMaterial({
  //   transparent: true,
  //   uniforms: {
  //     uAlpha: { value: overlayAlpha },
  //   },
  //   vertexShader: `
  //       void main()
  //       {
  //           gl_Position = vec4(position, 1.0);
  //       }
  //   `,
  //   fragmentShader: `
  //       uniform float uAlpha;

  //       void main()
  //       {
  //           gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
  //       }
  //   `,
  // });

  useEffect(() => {
    loadingBarElement.style.transform = `scaleX(${progress / 100})`;
    if (progress == 100) {
      window.setTimeout(() => {
        // animate overlay
        // gsap.to(overlayOpacity, {
        //   duration: 1,
        //   value: 0,
        //   delay: 1,
        //   onUpdate: () => {
        //     setOverlayAlpha(overlayOpacity.value);
        //   },
        // });
        // update loadingBarElement
        loadingBarElement.classList.add("ended");
        loadingBarElement.style.transform = "";
      }, 500);
    }
  }, [progress]);

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

      <Suspense fallback={null}>
        <CubeAndSpheres
          contacts={contacts}
          orbitRef={orbitRef}
          // onClick={() => {
          //   orbitRef.current.autoRotate = false;
          // }}
        />
      </Suspense>
    </>
  );
}
