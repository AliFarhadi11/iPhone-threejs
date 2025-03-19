import gsap from "gsap";
import { Group } from "three";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface AnimationProps {
  transform?: string;
  duration?: number;
  y?: number;
  opacity?: number;
  ease?: string;
  scale?: number;
}

interface ScrollProps {
  trigger?: string | Element;
  toggleActions?: string;
  start?: string;
  end?: string;
  scrub?: number;
  markers?: boolean;
}

export const animateWithGsap = (
  target: string | Element,
  animationProps: AnimationProps,
  scrollProps?: ScrollProps,
) => {
  const isMobile = window.innerWidth < 768;

  // Ensure opacity is preserved if it exists in animationProps
  const finalAnimationProps = {
    ...animationProps,
    opacity: animationProps.opacity ?? 1, // Default to 1 if not specified
  };

  gsap.to(target, {
    ...finalAnimationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "play none none none", // Changed to prevent any reverse animations
      start: isMobile ? "top center" : "top 80%", // More reliable trigger points
      end: isMobile ? "bottom center" : "bottom 20%",
      scrub: isMobile ? 0.3 : 0.5, // Smoother scrub on both devices
      markers: false, // Disable markers
      ...scrollProps,
    },
  });
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: React.RefObject<Group>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: AnimationProps,
) => {
  const isMobile = window.innerWidth < 768;

  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: isMobile ? 0.8 : 1,
    ease: "power2.out",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      duration: isMobile ? 0.8 : 1,
      ease: "power2.out",
    },
    "<",
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      duration: isMobile ? 0.8 : 1,
      ease: "power2.out",
    },
    "<",
  );
};
