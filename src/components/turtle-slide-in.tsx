"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function TurtleSlideIn() {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress as the section passes through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Turtle slides from 1400px right (fully off-screen) → 0 over the first 60% of scroll progress
  const x = useTransform(scrollYProgress, [0, 0.6], [1400, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div ref={ref} className="w-full flex justify-end pr-0 md:pr-4">
      <motion.img
        src="/canva-extracts/Untitled design.gif"
        alt="G.Sam Art Gallery animation"
        className="w-full h-auto object-contain"
        style={{ x, opacity, scaleX: -1 }}
      />
    </div>
  );
}
