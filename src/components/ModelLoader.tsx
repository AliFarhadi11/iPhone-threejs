import { Html } from "@react-three/drei";
import { DotLoader } from "react-spinners";

const ModelLoader = () => {
  return (
    <Html>
      <div className="flex-center absolute inset-0 size-full">
        <DotLoader color="#fff" />
      </div>
    </Html>
  );
};

export default ModelLoader;
