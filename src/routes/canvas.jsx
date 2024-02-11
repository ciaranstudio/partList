// import { extend } from "@react-three/fiber";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// import { Loader } from "@react-three/drei";
import { Leva } from "leva";
import Experience from "../Experience.jsx";
import Placeholder from "../Placeholder.jsx";
import { useLoaderData } from "react-router-dom";
// import { Loader } from "@react-three/drei";
// extend({ Loader });

import { getContacts } from "../contacts";
// import { authProvider } from "../auth";

export async function loader({ request }) {
  const url = new URL(request.url);
  const contacts = await getContacts();
  // console.log("contacts: ", contacts);
  return { contacts };
}

export default function CanvasLayout({ hideDebug, perfVisible }) {
  const { contacts } = useLoaderData();
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
        <Suspense fallback={<Placeholder />}>
          {/* <Suspense fallback={<Loader />}> */}
          <Experience contacts={contacts} perfVisible={perfVisible} />
        </Suspense>
      </Canvas>
      {/* <Loader /> */}
    </>
  );
}
