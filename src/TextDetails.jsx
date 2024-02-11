import * as React from "react";
import { useRef, createRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Geometry, Base, Subtraction } from "@react-three/csg";
import { Text, Text3D } from "@react-three/drei";
import controls from "./debugControls";

export default function TextDetails({
  contacts,
  missionText,
  windowPlaneHeight,
  windowPlaneWidth,
  windowSubtraction,
  screenPlane,
  opacityScreenOffset,
}) {
  const [clickToggle, setClickToggle] = useState(true);
  const [clickedArtistId, setClickedArtistId] = useState(null);
  const [clickedArtistTextObject, setClickedArtistTextObject] = useState(null);
  const artistsRef = useRef([contacts]);
  const bioTextGroupRef = useRef();
  const listPlanesRef = useRef(contacts.map(() => createRef()));
  const listTextRef = useRef(contacts.map(() => createRef()));
  const listBiosRef = useRef(contacts.map(() => createRef()));
  const listGroupRef = useRef();
  // const screenBehindBioRef = useRef();
  const frontScreenRef = useRef();
  // const bioScreenRef = useRef();
  const infoLetterRef = useRef();
  // const infoSphereRef = useRef();
  const mainTextRef = useRef();
  const mainTextFrameRef = useRef();
  const debugControls = controls();
  const [n, setN] = useState(4);
  useEffect(() => {
    setN(contacts.length);
  }, []);
  const infoSpherePosition = [6.05, -6.2, 7.71];
  // const iconSphereArgs = [n / 19, n * 2, n * 2, 0, Math.PI * 2, 0, Math.PI];

  const iconClick = () => {
    setClickToggle(!clickToggle);
  };

  const hoveredInfoSphere = () => {
    document.getElementById("three-canvas").style.cursor = "pointer";
  };

  const unhoveredInfoSphere = () => {
    document.getElementById("three-canvas").style.cursor = "grab";
  };

  const hoveredArtistName = () => {
    document.getElementById("three-canvas").style.cursor = "pointer";
  };

  const unhoveredArtistName = () => {
    document.getElementById("three-canvas").style.cursor = "grab";
  };

  const mainTextFrame = (customScreenOffset) => {
    return (
      <mesh
        position={[0, 0.5, windowPlaneHeight / 2 - customScreenOffset]}
        rotation-x={0}
      >
        {/* <MeshReflectorMaterial
          ref={mainTextFrameRef}
          resolution={512}
          blur={[500, 500]}
          mixBlur={0.5}
          mirror={1}
          color={debugControls.screenColor}
          opacity={debugControls.screenOpacity}
          transparent
          // side={THREE.DoubleSide}
        /> */}
        <meshPhongMaterial
          ref={mainTextFrameRef}
          color={debugControls.screenColor}
          // side={THREE.DoubleSide}
          opacity={debugControls.screenOpacity}
          transparent
          depthTest={true}
          // shininess={50}
          // specular="#909090"
          // depthTest={false}
        />
        <planeGeometry
          args={[
            windowPlaneWidth - windowSubtraction,
            windowPlaneHeight - windowSubtraction,
          ]}
        />

        <Geometry>
          <Base>
            <planeGeometry
              args={[
                windowPlaneWidth - windowSubtraction,
                windowPlaneHeight - windowSubtraction,
              ]}
            />
          </Base>
          <Subtraction>
            <planeGeometry
              args={[
                windowPlaneWidth - windowSubtraction - 1,
                windowPlaneHeight - windowSubtraction - 1,
              ]}
            />
          </Subtraction>
        </Geometry>
      </mesh>
    );
  };

  useEffect(() => {
    listGroupRef.current.visible = false;
  }, []);

  useEffect(() => {
    // clear any bios from front screen
    listBiosRef.current.forEach((item) => {
      item.current.visible = false;
    });
    // console.log("clickToggle = ", clickToggle);
    if (clickToggle) {
      // setClickToggle(false);
      infoLetterRef.current.material.color = new THREE.Color(
        "rgb(102, 106, 109)"
      );
      // infoSphereRef.current.visible = false;
      mainTextRef.current.visible = true;
      listGroupRef.current.visible = false;
      listPlanesRef.current.forEach((item) => {
        item.current.opacity = debugControls.screenOpacity;
      });
      listBiosRef.current.forEach((item) => {
        item.current.visible = false;
      });
      mainTextFrameRef.current.opacity = debugControls.screenOpacity;
      listTextRef.current.forEach((item) => {
        item.current.color = debugControls.textColor;
      });
    } else {
      infoLetterRef.current.material.color = new THREE.Color(
        "rgb(255, 255, 255)"
      );
      // console.log(infoLetterRef.current.material.color);
      // infoSphereRef.current.visible = true;
      mainTextRef.current.visible = false;
      listGroupRef.current.visible = true;
      mainTextFrameRef.current.opacity = 1;
    }
  }, [clickToggle]);

  // useEffect(() => {
  //   // console.log("clickedArtistId = ", clickedArtistId);
  //   // console.log("clickedArtistTextObject = ", clickedArtistTextObject);
  // }, [clickedArtistId, clickedArtistTextObject]);

  return (
    <>
      <group ref={bioTextGroupRef}>
        {contacts.map((contact, idx) => (
          <group key={contact.id}>
            <Text
              font="./noto-sans-v35-latin-regular.woff"
              fontSize={0.28}
              color={debugControls.textColor}
              position={[0, 0.5, windowPlaneHeight / 2 + idx / 50]}
              maxWidth={10.3}
              textAlign="left"
              ref={listBiosRef.current[idx]}
              visible={false}
            >
              {contact.notes}
            </Text>
          </group>
        ))}
      </group>

      <group ref={listGroupRef}>
        {contacts.map((contact, idx) => (
          <group key={contact.id}>
            <Text
              font="./noto-sans-v35-latin-regular.woff"
              fontSize={0.36}
              color={debugControls.textColor}
              position={[-11.4, 6.625 - idx, windowPlaneHeight / 2 - 0.125]}
              maxWidth={12.3}
              textAlign="left"
              anchorX="left"
              ref={listTextRef.current[idx]}
            >
              {`${contact.first} ${contact.last}`}
            </Text>
            <mesh
              position={[-9.5, 6.625 - idx, windowPlaneHeight / 2 - 0.135]}
              rotation-x={0}
              ref={artistsRef[idx]}
              onPointerDown={() => {
                listTextRef.current.forEach((item) => {
                  item.current.color = debugControls.textColor;
                  listTextRef.current[idx].current.color = "#002705";
                });
                listPlanesRef.current.forEach((item) => {
                  item.current.opacity = debugControls.screenOpacity;
                  listPlanesRef.current[idx].current.opacity = 1;
                });
                listBiosRef.current.forEach((item) => {
                  item.current.visible = false;
                  listBiosRef.current[idx].current.visible = true;
                });
                setClickedArtistTextObject(listBiosRef.current[idx].current);
                setClickedArtistId(listBiosRef.current[idx].current.uuid);
              }}
              onPointerOver={hoveredArtistName}
              onPointerOut={unhoveredArtistName}
            >
              {/* <MeshReflectorMaterial
                ref={listPlanesRef.current[idx]}
                resolution={512}
                blur={[500, 500]}
                mixBlur={0.5}
                mirror={1}
                color={debugControls.screenColor}
                opacity={debugControls.screenOpacity}
                transparent
                // side={ THREE.DoubleSide }
              /> */}
              <meshPhongMaterial
                ref={listPlanesRef.current[idx]}
                color={debugControls.screenColor}
                // side={THREE.DoubleSide}
                opacity={debugControls.screenOpacity}
                transparent
                // shininess={50}
                // specular="#909090"
                depthTest={true}
              />
              <planeGeometry args={[4.5, 0.8]} />
            </mesh>
          </group>
        ))}
      </group>

      {mainTextFrame(opacityScreenOffset)}

      {/* main text (project mission description) */}
      <Text
        font="./noto-sans-v35-latin-regular.woff"
        fontSize={0.2985}
        color={debugControls.textColor}
        position={[0, 0.5, windowPlaneHeight / 2 - 0.125]}
        maxWidth={10.3}
        textAlign="left"
        ref={mainTextRef}
      >
        {missionText}
      </Text>

      {/* front screen (for showing the main project description text)  */}
      {screenPlane(
        frontScreenRef,
        [
          windowPlaneWidth - windowSubtraction,
          windowPlaneHeight - windowSubtraction,
        ],
        [0, 0.5, windowPlaneHeight / 2 - opacityScreenOffset - 0.125],
        0,
        console.log(""),
        debugControls.screenOpacity,
        true,
        false
      )}

      {/* plane behind info sphere for easy click */}
      <group
        onPointerOver={hoveredInfoSphere}
        onPointerOut={unhoveredInfoSphere}
      >
        {screenPlane(
          frontScreenRef,
          [windowPlaneWidth / 4, windowPlaneHeight / 4],
          infoSpherePosition,
          0,
          iconClick,
          0,
          false,
          true
        )}
      </group>

      {/* info sphere bottom right of front (text) screen */}
      {/* <mesh
        position={infoSpherePosition}

        // onPointerOver={hoveredInfoSphere}
        // onPointerOut={unhoveredInfoSphere}
      > */}
      {/* <sphereGeometry args={iconSphereArgs} /> */}
      {/* <MeshReflectorMaterial
          resolution={512}
          blur={[500, 500]}
          mixBlur={0.5}
          mirror={1}
          color={debugControls.screenColor}
          opacity={debugControls.screenOpacity}
          transparent
          // side={ THREE.DoubleSide }
          wireframe={debugControls.wireframe}
        /> */}
      {/* <MeshDistortMaterial
          distort={debugControls.biggestDistortion}
          speed={debugControls.biggestSpeed}
          color={debugControls.biggestColor}
          wireframe={debugControls.wireframe}
          depthTest={false}
        /> */}
      {/* <meshPhongMaterial
          ref={infoSphereRef}
          color={debugControls.smallestColor}
          side={THREE.DoubleSide}
          wireframe={debugControls.wireframe}
          opacity={debugControls.outerSpheresOpacity}
          transparent
          shininess={50}
          specular="#909090"
        />
      </mesh> */}
      {/* info sphere text ("i") */}
      <Text3D
        ref={infoLetterRef}
        font="./Labrada_Regular.json"
        position={[5.99275, -6.375, 7.6675]}
        scale={0.45}
      >
        i
        <meshStandardMaterial color={new THREE.Color("rgb(102, 106, 109)")} />
      </Text3D>
    </>
  );
}