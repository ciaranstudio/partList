import * as React from "react";
import { useRef } from "react";
import * as THREE from "three";
import { Geometry, Base, Subtraction } from "@react-three/csg";
import controls from "./debugControls";
import { missionText } from "./missionText";
import SphereObjects from "./SphereObjects";
import TextDetails from "./TextDetails";

export default function CubeAndSpheres({ contacts, orbitRef }) {
  const debugControls = controls();

  const bottomScreenRef = useRef();

  const windowPlaneHeight = 15.35;
  const windowPlaneWidth = 14;
  const windowSubtraction = 0.05;
  const outerCubePlus = 0.25;
  const opacityScreenOffset = 0.05;
  const quarterRotation = -Math.PI * 0.5;

  const windowPlane = (
    inner,
    [argW, argH],
    [positionX, positionY, positionZ],
    rotationX,
    rotationY,
  ) => {
    return (
      <mesh
        position={[positionX, positionY, positionZ]}
        rotation-x={rotationX}
        rotation-y={rotationY}
      >
        <meshPhongMaterial
          color={inner ? debugControls.innerFrame : debugControls.outerFrame}
          side={THREE.DoubleSide}
          opacity={0.85}
          transparent
          shininess={50}
          specular="#909090"
        />
        <Geometry>
          <Base>
            <planeGeometry args={[argW, argH]} />
          </Base>
          <Subtraction>
            <planeGeometry
              args={[argW - windowSubtraction, argH - windowSubtraction]}
            />
          </Subtraction>
        </Geometry>
      </mesh>
    );
  };

  const screenPlane = (
    ref,
    [argW, argH],
    [positionX, positionY, positionZ],
    rotationX,
    onClick,
    opacity,
    visible,
    wireframe,
  ) => {
    return (
      <mesh
        ref={ref}
        position={[positionX, positionY, positionZ]}
        rotation-x={rotationX}
        onClick={onClick}
      >
        <planeGeometry args={[argW, argH]} />
        {/* <MeshReflectorMaterial
          resolution={512}
          blur={[500, 500]}
          mixBlur={0.5}
          mirror={1}
          color={debugControls.screenColor}
          opacity={opacity}
          transparent
          visible={visible}
          wireframe={wireframe}
          // side={THREE.DoubleSide}
        /> */}
        <meshPhongMaterial
          color={debugControls.screenColor}
          // side={THREE.DoubleSide}
          opacity={opacity}
          transparent
          visible={visible}
          wireframe={wireframe}
          // shininess={50}
          // specular="#909090"
          depthTest={true}
        />
      </mesh>
    );
  };

  return (
    <>
      <SphereObjects contacts={contacts} />

      <TextDetails
        missionText={missionText}
        windowPlaneHeight={windowPlaneHeight}
        windowPlaneWidth={windowPlaneWidth}
        windowSubtraction={windowSubtraction}
        contacts={contacts}
        screenPlane={screenPlane}
        opacityScreenOffset={opacityScreenOffset}
      />

      <mesh
        ref={bottomScreenRef}
        position={[0, -(windowPlaneHeight / 2) + 0.5, 0]}
        rotation-x={quarterRotation}
      >
        <planeGeometry
          args={[
            windowPlaneWidth - windowSubtraction,
            windowPlaneHeight - windowSubtraction,
          ]}
        />
        <meshPhongMaterial
          shininess={100}
          specular="#909090"
          color={debugControls.screenColor}
          opacity={0.05}
          transparent
          visible={true}
          wireframe={false}
          depthTest={false}
          // side={THREE.DoubleSide}
        />
      </mesh>

      {windowPlane(
        true,
        [windowPlaneWidth, windowPlaneHeight],
        [0, -(windowPlaneHeight / 2) + 0.5, 0],
        quarterRotation,
        0,
      )}
      {windowPlane(
        true,
        [windowPlaneWidth, windowPlaneHeight],
        [0, windowPlaneHeight / 2 + 0.5, 0],
        quarterRotation,
        0,
      )}

      {/* front and back */}
      {windowPlane(
        true,
        [windowPlaneWidth, windowPlaneHeight],
        [0, 0.5, windowPlaneHeight / 2],
        0,
        0,
      )}
      {windowPlane(
        true,
        [windowPlaneWidth, windowPlaneHeight],
        [0, 0.5, -windowPlaneHeight / 2],
        0,
        0,
      )}

      {/* sides */}
      {windowPlane(
        true,
        [windowPlaneHeight, windowPlaneHeight],
        [windowPlaneWidth / 2, 0.5, 0],
        0,
        quarterRotation,
      )}
      {windowPlane(
        true,
        [windowPlaneHeight, windowPlaneHeight],
        [-windowPlaneWidth / 2, 0.5, 0],
        0,
        quarterRotation,
      )}

      {/* Outer cube box */}
      {/* top and bottom */}
      {windowPlane(
        false,
        [windowPlaneWidth + outerCubePlus, windowPlaneHeight + outerCubePlus],
        [0, -((windowPlaneHeight + outerCubePlus) / 2) + 0.5, 0],
        quarterRotation,
        0,
      )}
      {windowPlane(
        false,
        [windowPlaneWidth + outerCubePlus, windowPlaneHeight + outerCubePlus],
        [0, (windowPlaneHeight + outerCubePlus) / 2 + 0.5, 0],
        quarterRotation,
        0,
      )}

      {/* front and back */}
      {windowPlane(
        false,
        [windowPlaneWidth + outerCubePlus, windowPlaneHeight + outerCubePlus],
        [0, 0.5, (windowPlaneHeight + outerCubePlus) / 2],
        0,
        0,
      )}
      {windowPlane(
        false,
        [windowPlaneWidth + outerCubePlus, windowPlaneHeight + outerCubePlus],
        [0, 0.5, -(windowPlaneHeight + outerCubePlus) / 2],
        0,
        0,
      )}

      {/* sides */}
      {windowPlane(
        false,
        [windowPlaneHeight + outerCubePlus, windowPlaneHeight + outerCubePlus],
        [(windowPlaneWidth + outerCubePlus) / 2, 0.5, 0],
        0,
        quarterRotation,
      )}
      {windowPlane(
        false,
        [windowPlaneHeight + outerCubePlus, windowPlaneHeight + outerCubePlus],
        [-(windowPlaneWidth + outerCubePlus) / 2, 0.5, 0],
        0,
        quarterRotation,
      )}
    </>
  );
}
