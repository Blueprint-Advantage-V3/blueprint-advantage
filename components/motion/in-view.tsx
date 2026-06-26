"use client";

/**
 * InView — from motion-primitives.com (MIT).
 * Animates its children in when they scroll into view.
 * https://motion-primitives.com/docs/in-view
 */
import { ReactNode, useRef } from "react";
import { motion, useInView, Variant, Transition, UseInViewOptions } from "motion/react";

type InViewProps = {
  children: ReactNode;
  variants?: { hidden: Variant; visible: Variant };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: keyof typeof motion;
  once?: boolean;
  className?: string;
};

const defaultVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function InView({
  children,
  variants = defaultVariants,
  transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  viewOptions = { margin: "0px 0px -120px 0px" },
  as = "div",
  once = true,
  className,
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { ...viewOptions, once });

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
