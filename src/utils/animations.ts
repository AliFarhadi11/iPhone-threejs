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

  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "play none none reverse",
      start: isMobile ? "top 80%" : "top bottom",
      end: isMobile ? "bottom 20%" : "bottom top",
      scrub: isMobile ? 0.5 : 1,
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
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<",
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<",
  );
};
