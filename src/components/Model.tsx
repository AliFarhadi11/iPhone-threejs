import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type SizeState = "small" | "large";

interface IphoneModel {
  title: string;
  color: string[];
  img: string;
}

const Model = () => {
  const [size, setSize] = useState<SizeState>("small");
  const [model, setModel] = useState<IphoneModel>({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  const root = useRef<HTMLElement>(
    document.getElementById("root") || document.body,
  );

  // camera control for the model view
  const cameraControlSmall = useRef<OrbitControlsImpl | null>(null);
  const cameraControlLarge = useRef<OrbitControlsImpl | null>(null);

  // model
  const small = useRef<THREE.Group>(new THREE.Group());
  const large = useRef<THREE.Group>(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size, smallRotation, largeRotation, tl]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="mt-5 flex flex-col items-center">
          <div className="relative h-[75svh] w-full overflow-hidden md:h-[90svh]">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
            />

            <Canvas
              className="h-full w-full"
              style={{
                position: "fixed",
                inset: 0,
                overflow: "hidden",
              }}
              eventSource={root.current}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="mb-5 text-center text-sm font-light">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, idx) => (
                  <li
                    key={idx}
                    className="mx-2 size-6 cursor-pointer rounded-full"
                    style={{ background: item.color[0] }}
                    onClick={() => setModel(item)}
                  ></li>
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn cursor-pointer"
                    style={{
                      background: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value as SizeState)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
