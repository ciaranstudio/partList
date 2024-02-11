import { useControls, button } from "leva";

export default function debugControls() {
  const { position } = useControls("position", {
    position: {
      value: { x: 0, y: -0.1, z: -0.9 },
      step: 0.01,
    },
  });

  const {
    smallestSpin,
    smallSpin,
    // biggerSpin,
    // biggestSpin
  } = useControls("spin", {
    smallestSpin: {
      value: 0.5,
      step: 0.01,
      min: 0,
      max: 4,
    },
    smallSpin: {
      value: 1.0,
      step: 0.01,
      min: 0,
      max: 4,
    },
    // biggerSpin: {
    //   value: 1.0,
    //   step: 0.01,
    //   min: 0,
    //   max: 4,
    // },
    // biggestSpin: {
    //   value: 0.15,
    //   step: 0.01,
    //   min: 0,
    //   max: 4,
    // },
  });

  const {
    smallestScale,
    smallScale,
    // biggerScale,
    // biggestScale
  } = useControls("scale", {
    smallestScale: {
      value: 1.77,
      step: 0.01,
      min: 0,
      max: 10,
    },
    smallScale: {
      value: 1.6,
      step: 0.01,
      min: 0,
      max: 10,
    },
    // biggerScale: {
    //   value: 2.26,
    //   step: 0.01,
    //   min: 0,
    //   max: 10,
    // },
    // biggestScale: {
    //   value: 2.31,
    //   step: 0.01,
    //   min: 0,
    //   max: 10,
    // },
  });

  const {
    smallestColor,
    smallColor,
    // biggerColor,
    // biggestColor
  } = useControls("color", {
    smallestColor: "#696565",
    smallColor: "#dbd9be",
    // biggerColor: "#d2dbde",
    // biggestColor: "#d3dede",
  });

  const {
    smallestDistortion,
    smallDistortion,
    // biggerDistortion,
    // biggestDistortion,
  } = useControls("distortion", {
    smallestDistortion: {
      value: 0.56,
      step: 0.01,
      min: 0,
      max: 2,
    },
    smallDistortion: {
      value: 0.25,
      step: 0.01,
      min: 0,
      max: 2,
    },
    // biggerDistortion: {
    //   value: 0.2,
    //   step: 0.01,
    //   min: 0,
    //   max: 2,
    // },
    // biggestDistortion: {
    //   value: 0.3,
    //   step: 0.01,
    //   min: 0,
    //   max: 2,
    // },
  });

  const {
    smallestSpeed,
    smallSpeed,
    // biggerSpeed,
    // biggestSpeed
  } = useControls("speed", {
    smallestSpeed: {
      value: 0.88,
      step: 0.01,
      min: 0,
      max: 3,
    },
    smallSpeed: {
      value: 0.5,
      step: 0.01,
      min: 0,
      max: 3,
    },
    // biggerSpeed: {
    //   value: 0.0,
    //   step: 0.01,
    //   min: 0,
    //   max: 3,
    // },
    // biggestSpeed: {
    //   value: 0.0,
    //   step: 0.01,
    //   min: 0,
    //   max: 3,
    // },
  });

  const { outerSpheresOpacity, centralSphereOpacity } = useControls("opacity", {
    outerSpheresOpacity: {
      value: 0.12,
      step: 0.01,
      min: 0,
      max: 1,
    },
    centralSphereOpacity: {
      value: 1.0,
      step: 0.01,
      min: 0,
      max: 1,
    },
  });

  const { visible, wireframe } = useControls("visibility", {
    visible: true,
    wireframe: true,
  });

  const { floatSpeed, floatIntensity } = useControls("float", {
    floatSpeed: {
      value: 1.25,
      step: 0.01,
      min: 0,
      max: 20,
    },
    floatIntensity: {
      value: 14.3,
      step: 0.01,
      min: 0,
      max: 20,
    },
  });

  const { innerFrame, outerFrame } = useControls("cubeFrame", {
    innerFrame: "#cecece",
    outerFrame: "#a5bea5",
  });

  const { screenOpacity, screenColor } = useControls("screens", {
    screenOpacity: {
      value: 0.75,
      step: 0.01,
      min: 0,
      max: 1,
    },
    screenColor: "#ffffff",
  });

  const { textColor } = useControls("text", {
    textColor: "#3a3a3b",
  });

  // const { perfVisible } = useControls("performance", {
  //   perfVisible: false,
  // });

  const controls = {
    position: position,
    smallestSpin: smallestSpin,
    smallSpin: smallSpin,
    // biggerSpin: biggerSpin,
    // biggestSpin: biggestSpin,
    smallestScale: smallestScale,
    smallScale: smallScale,
    // biggerScale: biggerScale,
    // biggestScale: biggestScale,
    smallestColor: smallestColor,
    smallColor: smallColor,
    // biggerColor: biggerColor,
    // biggestColor: biggestColor,
    smallestDistortion: smallestDistortion,
    smallDistortion: smallDistortion,
    // biggerDistortion: biggerDistortion,
    // biggestDistortion: biggestDistortion,
    smallestSpeed: smallestSpeed,
    smallSpeed: smallSpeed,
    // biggerSpeed: biggerSpeed,
    // biggestSpeed: biggestSpeed,
    visible: visible,
    wireframe: wireframe,
    floatSpeed: floatSpeed,
    floatIntensity: floatIntensity,
    innerFrame: innerFrame,
    outerFrame: outerFrame,
    outerSpheresOpacity,
    centralSphereOpacity: centralSphereOpacity,
    screenOpacity: screenOpacity,
    screenColor: screenColor,
    textColor: textColor,
    // perfVisible: perfVisible,
  };
  return controls;
}
