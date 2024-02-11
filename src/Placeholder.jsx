import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Placeholder(props) {
  const ballRef = useRef();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    ballRef.current.rotation.y = angle;
  });

  return (
    <mesh {...props} ref={ballRef}>
      <sphereGeometry args={[5, 6, 6]} />
      <meshBasicMaterial wireframe color="lightBlue" />
    </mesh>
  );
}
