"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles, Zap, Layers } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";

export interface BentoItem {
  id: string;
  category: "motion" | "architecture";
  title: string;
  description: string;
  metric: string;
  badge: string;
  span: string;
}

const TABS = [
  { id: "all", label: "Все возможности" },
  { id: "motion", label: "Живой UI & 3D Motion" },
  { id: "architecture", label: "Архитектура Vercel" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const SNAPPY_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export function InteractiveBentoHero({ items }: { items: BentoItem[] }) {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const prefersReducedMotion = useReducedMotion();

  const filteredItems =
    activeTab === "all"
      ? items
      : items.filter((item) => item.category === activeTab);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 md:py-28 overflow-hidden">
      {/* Фоновое свечение */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]"
      />

      {/* Hero-шапка */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 },
          },
        }}
        className="max-w-3xl space-y-6"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
            visible: { opacity: 1, y: 0, transition: SNAPPY_SPRING },
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium tracking-wide text-emerald-300 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>3D Spatial Bento + Next.js App Router</span>
        </motion.div>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
            visible: { opacity: 1, y: 0, transition: SNAPPY_SPRING },
          }}
          className="text-4xl font-semibold tracking-tight text-white sm:text-6xl leading-[1.08]"
        >
          Интерфейсы, которые{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
            ощущаются в объёме
          </span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
            visible: { opacity: 1, y: 0, transition: SNAPPY_SPRING },
          }}
          className="max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed"
        >
          Наведи курсор на любую карточку: 3D-наклон, параллакс слоёв по оси Z и
          динамический блик работают на чистых MotionValues без ре-рендеров React.
        </motion.p>

        {/* Кнопка и табы */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
            visible: { opacity: 1, y: 0, transition: SNAPPY_SPRING },
          }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <motion.button
            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            transition={SNAPPY_SPRING}
            className="group relative inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-[0_0_25px_-5px_rgba(52,211,153,0.5)] transition-colors hover:bg-emerald-300"
          >
            <span>Запустить проект</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>

          <div
            role="tablist"
            aria-label="Фильтр карточек"
            className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-filter-pill"
                      transition={SNAPPY_SPRING}
                      className="absolute inset-0 -z-10 rounded-lg bg-white/10 border border-white/15 shadow-sm"
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Bento-сетка со встроенными 3D Tilt-карточками */}
      <motion.div
        layout
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
              transition={SNAPPY_SPRING}
              className={item.span}
            >
              <TiltCard
                className="h-full"
                maxTilt={item.span.includes("col-span-2") ? 6 : 10}
                glareColor={
                  item.category === "motion" ? "52, 211, 153" : "34, 211, 238"
                }
              >
                <div className="flex h-full flex-col justify-between gap-10 [transform-style:preserve-3d]">
                  {/* Верхний ряд карточки — вынесен по оси Z на 22px */}
                  <div className="flex items-center justify-between gap-2 [transform:translateZ(22px)]">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-300">
                      {item.category === "motion" ? (
                        <Zap className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Layers className="h-3.5 w-3.5 text-cyan-400" />
                      )}
                      {item.badge}
                    </span>

                    <span className="font-mono text-xs font-semibold tracking-wider text-emerald-300/90">
                      {item.metric}
                    </span>
                  </div>

                  {/* Текстовый слой — вынесен по оси Z на 34px для глубокого параллакса */}
                  <div className="space-y-2.5 [transform:translateZ(34px)]">
                    <h2 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-emerald-200">
                      {item.title}
                    </h2>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}