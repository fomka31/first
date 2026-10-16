import { InteractiveBentoHero, type BentoItem } from "@/components/interactive-bento-hero";

const BENTO_ITEMS: BentoItem[] = [
  {
    id: "engine",
    category: "motion",
    title: "3D-наклон и параллакс слоёв по оси Z",
    description:
      "Широкие карточки наклоняются мягче (6°), а компактные — острее (10°). Внутренний текст парит на глубине translateZ(34px).",
    metric: "120 FPS",
    badge: "3D Spring Tilt",
    span: "md:col-span-2",
  },
  {
    id: "rsc",
    category: "architecture",
    title: "Изоляция Client Components",
    description:
      "Данные и каркас страницы рендерятся на сервере, а в браузер отправляются только лёгкие интерактивные узлы.",
    metric: "-42% JS",
    badge: "App Router",
    span: "md:col-span-1",
  },
  {
    id: "spotlight",
    category: "motion",
    title: "Реактивный блик без ре-рендеров",
    description:
      "Координаты свечения и границ обновляются напрямую через useMotionTemplate и GPU.",
    metric: "0 re-renders",
    badge: "MotionValues",
    span: "md:col-span-1",
  },
  {
    id: "waterfalls",
    category: "architecture",
    title: "Готовность к мгновенному деплою",
    description:
      "Оптимизированная сборка проходит статическую генерацию (SSG) и раздаётся с Edge-узлов за миллисекунды.",
    metric: "< 50ms TTFB",
    badge: "Edge Ready",
    span: "md:col-span-2",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090A0F] text-zinc-100 selection:bg-emerald-400/20 selection:text-emerald-300">
      <InteractiveBentoHero items={BENTO_ITEMS} />
    </main>
  );
}