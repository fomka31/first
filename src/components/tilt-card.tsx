"use client";

import { type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareColor?: string;
}

const TILT_SPRING = {
  stiffness: 320,
  damping: 28,
  mass: 0.6,
};

export function TiltCard({
  children,
  className = "",
  maxTilt = 9,
  glareColor = "52, 211, 153",
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const smoothX = useSpring(mouseX, TILT_SPRING);
  const smoothY = useSpring(mouseY, TILT_SPRING);
  const smoothGlareX = useSpring(glareX, TILT_SPRING);
  const smoothGlareY = useSpring(glareY, TILT_SPRING);
  const smoothGlareOpacity = useSpring(glareOpacity, {
    stiffness: 260,
    damping: 30,
  });

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    prefersReducedMotion ? ["0deg", "0deg"] : [`${maxTilt}deg`, `-${maxTilt}deg`]
  );
  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    prefersReducedMotion ? ["0deg", "0deg"] : [`-${maxTilt}deg`, `${maxTilt}deg`]
  );

  const glareBackground = useMotionTemplate`radial-gradient(
    420px circle at ${smoothGlareX}% ${smoothGlareY}%,
    rgba(${glareColor}, 0.16),
    rgba(255, 255, 255, 0.05) 35%,
    transparent 70%
  )`;

  const borderGlow = useMotionTemplate`radial-gradient(
    280px circle at ${smoothGlareX}% ${smoothGlareY}%,
    rgba(${glareColor}, 0.55),
    rgba(255, 255, 255, 0.08) 60%,
    transparent 100%
  )`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    mouseX.set(clientX / rect.width - 0.5);
    mouseY.set(clientY / rect.height - 0.5);
    glareX.set((clientX / rect.width) * 100);
    glareY.set((clientY / rect.height) * 100);
    glareOpacity.set(1);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    glareOpacity.set(0);
  }

  return (
    <div className={`perspective-[1100px] ${className}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.012 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
        transition={TILT_SPRING}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full rounded-3xl bg-zinc-900/70 p-px backdrop-blur-xl shadow-2xl"
      >
        {/* Светящаяся рамка за курсором */}
        <motion.div
          aria-hidden="true"
          style={{ background: borderGlow, opacity: smoothGlareOpacity }}
          className="pointer-events-none absolute inset-0 rounded-3xl"
        />

        {/* Внутренний корпус карточки */}
        <div className="relative h-full w-full rounded-[calc(1.5rem-1px)] border border-white/[0.08] bg-[#0B0D13]/90 p-6 sm:p-8 [transform-style:preserve-3d]">
          {/* Световой блик (Glare) */}
          <motion.div
            aria-hidden="true"
            style={{ background: glareBackground, opacity: smoothGlareOpacity }}
            className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] mix-blend-screen"
          />

          {/* 3D-контент */}
          <div className="relative z-10 h-full [transform-style:preserve-3d]">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}