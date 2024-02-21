// import { extend } from "@react-three/fiber";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// import { Loader } from "@react-three/drei";
import { Leva } from "leva";
import Experience from "../Experience.jsx";
// import Placeholder from "../Placeholder.jsx";
import { useLoaderData } from "react-router-dom";
// import { Loader } from "@react-three/drei";
// extend({ Loader });
import { getContacts } from "../contacts";
// import { authProvider } from "../auth";
// import { useProgress } from "@react-three/drei";
// import gsap from "gsap";
// import * as THREE from "three";

export async function loader({ request }) {
  const url = new URL(request.url);
  const contacts = await getContacts();
  // console.log("contacts: ", contacts);
  return { contacts };
}

export default function CanvasLayout({ hideDebug, perfVisible }) {
  const { contacts } = useLoaderData();

  // const loadingBarElement = document.querySelector(".loading-bar");
  // const { active, progress, errors, item, loaded, total } = useProgress();
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

  // useEffect(() => {
  //   loadingBarElement.style.transform = `scaleX(${progress / 100})`;
  //   if (progress == 100) {
  //     window.setTimeout(() => {
  //       // animate overlay
  //       gsap.to(overlayOpacity, {
  //         duration: 1,
  //         value: 0,
  //         delay: 1,
  //         onUpdate: () => {
  //           setOverlayAlpha(overlayOpacity.value);
  //         },
  //       });
  //       // update loadingBarElement
  //       loadingBarElement.classList.add("ended");
  //       loadingBarElement.style.transform = "";
  //     }, 500);
  //   }
  // }, [progress]);
  return (
    <>
      <Leva collapsed hidden={hideDebug} oneLineLabels />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-2, -7.25, -50],
        }}
        id="three-canvas"
      >
        <Suspense fallback={null}>
          {/* <Suspense fallback={<Placeholder />}> */}
          {/* <Suspense fallback={<Loader />}> */}
          {/* <mesh geometry={overlayGeometry} material={overlayMaterial}></mesh> */}
          <Experience contacts={contacts} perfVisible={perfVisible} />
        </Suspense>
      </Canvas>
      {/* <Loader /> */}
    </>
  );
}
