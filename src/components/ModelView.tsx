import { PerspectiveCamera, View, OrbitControls } from "@react-three/drei";
import { Group, Vector3 } from "three";
import Lights from "./Lights";
import { Suspense } from "react";
import Iphone from "./Iphone";
import ModelLoader from "./ModelLoader";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface ModelViewProps {
  index: number;
  groupRef: React.RefObject<Group>;
  gsapType: string;
  controlRef: React.RefObject<OrbitControlsImpl | null>;
  setRotationState: (rotation: number) => void;
  item: {
    img: string;
    color: string[];
    title: string;
  };
}

const ModelView = ({
  index,
  gsapType,
  groupRef,
  controlRef,
  item,
  setRotationState,
}: ModelViewProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute size-full ${index === 2 ? "-right-full" : ""}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new Vector3(0, 0, 0)}
        onEnd={() => {
          if (controlRef.current) {
            setRotationState(controlRef.current.getAzimuthalAngle());
          }
        }}
      />

      <group
        ref={groupRef}
        name={`${index === 1 ? "small" : "large"}`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<ModelLoader />}>
          <Iphone
            item={item}
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
