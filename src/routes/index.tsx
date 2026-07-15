import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { submitWaitlist } from "@/actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import stickerFlipPhone from "@/assets/flip 2.png";
import stickerImac from "@/assets/laptop 2.png";
import stickerIpod from "@/assets/ipod 2.png";
const founderImg = "/kyla.jpeg";
const workshop1 = "/community1.jpeg";
const workshop2 = "/community2.jpeg";
const workshop3 = "/community3.jpeg";
const workshop4 = "/community4.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        property: "og:image",
        content:
          "https://id-preview--72b051a7-6610-4494-a738-4ae1ddba4081.lovable.app/og.jpg",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <WhatYoullLearn />
      <WhyExists />
      <Community />
      <FAQ />
      <FinalCTA />
    </>
  );
}

/* ---------------- Hero ---------------- */

type StickerKind = "image" | "emoji" | "node";

type Sticker = {
  kind: StickerKind;
  src?: string;
  emoji?: string;
  node?: React.ReactNode;
  alt?: string;
  /** position: top/left/right/bottom in % or css units */
  style: CSSProperties;
  /** width in px for image stickers, or font-size for emoji */
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  /** parallax strength 0-1 */
  depth: number;
  /** hide below md */
  hideOnMobile?: boolean;
};

const STICKERS: Sticker[] = [
  // Large nostalgic tech stickers
  {
    kind: "image",
    src: stickerFlipPhone,
    alt: "Pastel pink flip phone sticker",
    style: { top: "12%", left: "5%" },
    size: 170,
    rotate: -10,
    delay: 0,
    duration: 6.5,
    depth: 0.6,
    hideOnMobile: true,
  },
  {
    kind: "image",
    src: stickerImac,
    alt: "Pink retro iMac computer sticker",
    style: { top: "10%", right: "3%" },
    size: 220,
    rotate: 8,
    delay: 1.2,
    duration: 7.5,
    depth: 0.7,
    hideOnMobile: true,
  },
  {
    kind: "image",
    src: stickerIpod,
    alt: "Classic white iPod with earphones sticker",
    style: { bottom: "8%", left: "7%" },
    size: 170,
    rotate: -6,
    delay: 0.6,
    duration: 8,
    depth: 0.5,
    hideOnMobile: true,
  },
  // Small accent stickers
  {
    kind: "node",
    node: <PixelHeartSticker />,
    style: { bottom: "22%", right: "10%" },
    size: 0,
    rotate: 8,
    delay: 0.3,
    duration: 5.8,
    depth: 0.4,
    hideOnMobile: true,
  },
  {
    kind: "node",
    node: <CursorSticker />,
    style: { top: "40%", left: "11%" },
    size: 0,
    rotate: -14,
    delay: 1.1,
    duration: 5.5,
    depth: 0.35,
    hideOnMobile: true,
  },
  {
    kind: "node",
    node: <SparkleStarSticker />,
    style: { top: "20%", right: "18%" },
    size: 0,
    rotate: -6,
    delay: 2.2,
    duration: 6,
    depth: 0.45,
    hideOnMobile: true,
  },
];

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setParallax({ x, y }));
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-16 pb-24 sm:pt-32 sm:pb-44 lg:pt-40 lg:pb-56"
    >
      {/* soft gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob animate-blob left-[-8rem] top-4 h-96 w-96 bg-[oklch(0.86_0.15_300)]" />
        <div
          className="blob animate-blob right-[-6rem] top-32 h-[28rem] w-[28rem] bg-[oklch(0.9_0.13_15)]"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="blob animate-blob left-1/2 bottom-[-4rem] h-80 w-80 -translate-x-1/2 bg-[oklch(0.92_0.14_55)]"
          style={{ animationDelay: "6s" }}
        />
      </div>

      {/* Stickers layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {STICKERS.map((s, i) => {
          const tx = parallax.x * 30 * s.depth;
          const ty = parallax.y * 30 * s.depth;
          const base: CSSProperties = {
            ...s.style,
            transform: `translate3d(${tx}px, ${ty}px, 0)`,
            transition: "transform 400ms cubic-bezier(.2,.7,.2,1)",
          };
          const inner: CSSProperties = {
            animation: `sticker-float ${s.duration}s ease-in-out ${s.delay}s infinite`,
            ["--rot" as string]: `${s.rotate}deg`,
          };
          return (
            <div
              key={i}
              className={`absolute ${s.hideOnMobile ? "hidden md:block" : ""}`}
              style={base}
            >
              <div style={inner} className="sticker-inner">
                {s.kind === "image" && (
                  <img
                    src={s.src}
                    alt={s.alt ?? ""}
                    width={s.size}
                    height={s.size}
                    loading="lazy"
                    style={{ width: s.size, height: s.size }}
                    className="drop-shadow-[0_18px_24px_oklch(0.55_0.22_300/0.18)]"
                  />
                )}
                {s.kind === "emoji" && (
                  <span
                    style={{ fontSize: s.size, lineHeight: 1 }}
                    className="block drop-shadow-[0_10px_14px_oklch(0.7_0.18_5/0.25)]"
                  >
                    {s.emoji}
                  </span>
                )}
                {s.kind === "node" && s.node}
              </div>
            </div>
          );
        })}
      </div>

      {/* Content — centered editorial */}
      <div className="animate-rise relative mx-auto flex w-[min(880px,calc(100%-2rem))] flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-foreground/70 uppercase">
          <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
            <defs>
              <linearGradient id="eyebrowStar" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="oklch(0.72 0.18 300)" />
                <stop offset="55%" stopColor="oklch(0.78 0.17 5)" />
                <stop offset="100%" stopColor="oklch(0.84 0.15 55)" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="url(#eyebrowStar)"
            />
          </svg>
          Welcome to Internet Girls
        </span>
        <h1 className="font-display text-[3.25rem] font-medium leading-[1.02] tracking-[-0.02em] sm:text-[4.5rem] lg:text-[5.75rem]">
          Helping more women{" "}
          <em className="text-gradient font-normal italic">get&nbsp;ahead</em>{" "}
          with AI.
        </h1>
        <p className="mt-7 max-w-xl text-lg text-muted-foreground sm:text-xl">
          We've built a space where women learn AI together through free
          workshops, practical resources, and IRL meetups across Southeast Asia.
        </p>

        <WaitlistCard />
      </div>
    </section>
  );
}

/* ---------------- Illustrated stickers ---------------- */

function CursorSticker() {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow">
        <path
          d="M4 3l6 17 3-7 7-3z"
          fill="oklch(0.68 0.19 300)"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="rounded-md bg-brand-gradient px-2 py-0.5 text-[10px] font-semibold text-white shadow-soft">
        internet girl
      </span>
    </div>
  );
}

function PixelHeartSticker() {
  return (
    <svg width="42" height="38" viewBox="0 0 11 10" shapeRendering="crispEdges">
      {/* pixel heart */}
      {[
        [1, 1], [2, 1], [3, 1], [7, 1], [8, 1], [9, 1],
        [0, 2], [4, 2], [6, 2], [10, 2],
        [0, 3], [10, 3],
        [0, 4], [10, 4],
        [1, 5], [9, 5],
        [2, 6], [8, 6],
        [3, 7], [7, 7],
        [4, 8], [6, 8],
        [5, 9],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="1"
          height="1"
          fill="oklch(0.72 0.2 5)"
        />
      ))}
    </svg>
  );
}

function SparkleStarSticker() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" className="drop-shadow">
      <defs>
        <linearGradient id="sparkleStar" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.72 0.18 300)" />
          <stop offset="55%" stopColor="oklch(0.78 0.17 5)" />
          <stop offset="100%" stopColor="oklch(0.84 0.15 55)" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l1.5 5.5L19 9l-5 1.5L14 17l-2-4.5L10 17l-0.5-6.5L4 9l5.5-1.5L12 2z"
        fill="url(#sparkleStar)"
      />
      <circle cx="5" cy="6" r="1" fill="oklch(0.78 0.17 5)" />
      <circle cx="20" cy="10" r="0.8" fill="oklch(0.72 0.18 300)" />
      <circle cx="7" cy="20" r="0.8" fill="oklch(0.84 0.15 55)" />
    </svg>
  );
}

function WaitlistCard() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await submitWaitlist({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
        },
      });
      setSubmitted(true);
      setTimeout(() => alert("Thank you for joining our waitlist! You're in ✨"), 100);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      id="waitlist"
      onSubmit={onSubmit}
      className="glass-strong mt-8 flex w-full max-w-xl flex-col gap-3 rounded-3xl p-4 sm:flex-row sm:items-center"
    >
      <input
        required
        type="text"
        name="name"
        placeholder="Full name"
        disabled={loading}
        className="flex-1 min-w-0 rounded-2xl border-0 bg-white/70 px-4 py-3 text-sm outline-none ring-1 ring-inset ring-border/60 focus:ring-2 focus:ring-primary disabled:opacity-50"
      />
      <input
        required
        type="email"
        name="email"
        placeholder="you@email.com"
        disabled={loading}
        className="flex-[1.4] min-w-0 rounded-2xl border-0 bg-white/70 px-4 py-3 text-sm outline-none ring-1 ring-inset ring-border/60 focus:ring-2 focus:ring-primary disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading || submitted}
        className="flex shrink-0 w-full sm:w-[120px] flex-col items-center justify-center rounded-2xl bg-brand-gradient py-3 sm:py-2 text-center text-sm font-semibold leading-tight text-white shadow-soft transition-transform hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-80"
      >
        {loading ? (
          "Joining..."
        ) : submitted ? (
          <>You're<br className="hidden sm:block" /> in ✨</>
        ) : (
          <>Join the<br className="hidden sm:block" /> Waitlist</>
        )}
      </button>
    </form>
  );
}

/* ---------------- What You'll Learn ---------------- */

const LEARN_CARDS = [
  {
    tag: "Foundation",
    tagBg: "oklch(0.94 0.06 300)",
    title: "Getting Started",
    bullets: [
      "The New Era of AI",
      "Thinking clearly with AI",
      "Power Prompting",
      "Everyday Productivity with AI",
    ],
    meta: "Live • recorded replay",
  },
  {
    tag: "Foundation",
    tagBg: "oklch(0.94 0.06 5)",
    title: "Putting AI to Work",
    bullets: [
      "Research Faster with AI",
      "Writing & Communication",
      "Plan & Organize with AI",
      "Data Privacy & Responsible AI",
    ],
    meta: "Live • recorded replay",
  },
  {
    tag: "Specialist",
    tagBg: "oklch(0.94 0.06 55)",
    title: "AI for Marketing",
    status: "COMING SOON",
    description: "Role-specific AI skills for modern marketers,",
    meta: "Live • recorded replay",
  },
  {
    tag: "Specialist",
    tagBg: "oklch(0.94 0.06 300)",
    title: "AI for Creators",
    status: "COMING SOON",
    description: "Create faster and stand out with your unique voice.",
    meta: "Live • recorded replay",
  },
  {
    tag: "Specialist",
    tagBg: "oklch(0.94 0.06 5)",
    title: "AI for Entrepreneurs",
    status: "COMING SOON",
    description: "Learn how to use AI to grow and run your business.",
    meta: "Live • recorded replay",
  },
  {
    tag: "AI Builder",
    tagBg: "oklch(0.94 0.06 55)",
    title: "AI Builder",
    status: "COMING SOON",
    description: "Build AI apps, AI agents, and AI workflows without coding.",
    meta: "Live • recorded replay",
  },
];

function WhatYoullLearn() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
            The Curriculum
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl">What you'll learn</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start with the fundamentals first, then specialize or start building
            with AI.
          </p>
        </div>

        <div className="mt-10 flex w-full justify-start sm:justify-center px-2 sm:px-4 overflow-x-auto pb-4 -mb-4 scrollbar-none">
          <span className="inline-block whitespace-nowrap rounded-full bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[12px] font-medium tracking-wide text-foreground/80 shadow-soft w-max mx-auto sm:mx-0">
            First Founding Batch • Starts 15 August • Weekly live sessions • <span className="font-semibold text-purple-600">Free</span>
          </span>
        </div>

        <div className="relative mt-12 w-full">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-5 py-2">
              {LEARN_CARDS.map((card, i) => (
                <CarouselItem key={card.title} className="pl-5 basis-auto">
                  <article
                    className="relative flex h-full w-[min(85vw,320px)] flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border/60 sm:w-[320px] sm:p-7"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className="w-fit rounded-full px-3 py-1 text-[11px] font-semibold text-foreground/80"
                        style={{ background: card.tagBg }}
                      >
                        {`0${i + 1} • ${card.tag}`}
                      </span>
                      {card.badge && (
                        <span className="rounded-full bg-[#F3E8FF] px-3 py-1 text-[11px] font-semibold text-[#8B5CF6]">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-5 text-2xl leading-tight">{card.title}</h3>

                    {card.bullets ? (
                      <div className="mt-6 flex flex-1 flex-col gap-3">
                        <ul className="space-y-3">
                          {card.bullets.map((it) => (
                            <li
                              key={it}
                              className="flex items-start gap-3 text-sm text-foreground/85"
                            >
                              <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gradient" />
                              {it}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-auto pt-6 text-[11px] font-medium text-muted-foreground">
                          {card.meta}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-6 flex flex-1 flex-col gap-4">
                        {card.status && (
                          <span className="w-fit rounded-full bg-gradient-to-r from-[oklch(0.88_0.14_300)] via-[oklch(0.9_0.13_20)] to-[oklch(0.92_0.14_55)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                            {card.status}
                          </span>
                        )}
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {card.description}
                        </p>
                        <p className="mt-auto pt-6 text-[11px] font-medium text-muted-foreground">
                          {card.meta}
                        </p>
                      </div>
                    )}
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-background)] to-transparent sm:w-32" />

            <div className="mt-8 flex items-center justify-center gap-4">
              <CarouselPrevious className="static translate-y-0 translate-x-0 h-10 w-10 border-border/60 bg-transparent text-muted-foreground hover:bg-card hover:text-foreground hover:border-border/80 shadow-sm" />
              <CarouselNext className="static translate-y-0 translate-x-0 h-10 w-10 border-border/60 bg-transparent text-muted-foreground hover:bg-card hover:text-foreground hover:border-border/80 shadow-sm" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why we exist ---------------- */

function WhyExists() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto flex flex-col-reverse lg:grid w-[min(1200px,calc(100%-2rem))] items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
            Our Story
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl">
            Why <span className="text-gradient italic">Internet Girls</span>{" "}
            exists
          </h2>

          <div className="mt-6 space-y-5 text-justify text-lg leading-relaxed text-foreground/80">
            <p>
              Hey there, I’m Kyla. 👋
            </p>
            <p>
              Growing up in Southeast Asia, I saw no shortage of talent or ambition, but very few accessible spaces to learn emerging tech.
            </p>
            <p>
              As I explored new jobs and opportunities, I realized I needed to upskill with AI, but I was hit by a wall of overwhelming content and expensive courses.
            </p>
            <p>
              That’s why Internet Girls exists: a free community making AI learning practical, fun, and accessible through workshops, shared resources, and a supportive community.
            </p>
            <p className="font-medium text-foreground">
              AI is the next internet revolution, and we’re making sure no one gets left behind.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div>
              <p className="font-semibold">Kyla Montero · Founder, Internet Girls</p>
              <p className="text-sm text-muted-foreground">
                Free AI literacy for women
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center w-full">
          <div className="relative shadow-soft sm:shadow-none">
            <img
              src={founderImg}
              alt="Kyla, founder of Internet Girls"
              width={900}
              height={1100}
              loading="lazy"
              className="h-[360px] w-[280px] sm:h-[520px] sm:w-[400px] rounded-[1.5rem] sm:rounded-[2rem] border border-black object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Community / Gallery ---------------- */

function Community() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] items-start gap-14 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
            The Community
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl">
            Women are already{" "}
            <span className="text-gradient italic">learning with us.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Internet Girls started with our very first in-person AI meetup in
            Hoi An, Vietnam. Since then, we're growing a community of women
            learning AI together across Southeast Asia through workshops,
            meetups, and practical learning experiences.
          </p>
          <Link
            to="/partners"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03]"
          >
            Get Involved
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <GalleryImg src={workshop1} alt="Kyla with speaker at an Internet Girls meetup in Hoi An" ratio="aspect-[4/5]" />
            <GalleryImg src={workshop2} alt="Attendees at an AI workshop in Hoi An" ratio="aspect-square" />
          </div>
          <div className="space-y-4 pt-10">
            <GalleryImg src={workshop3} alt="Women collaborating on laptops during a meetup" ratio="aspect-square" />
            <GalleryImg src={workshop4} alt="Community members learning together" ratio="aspect-[4/5]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryImg({
  src,
  alt,
  ratio,
}: {
  src: string;
  alt: string;
  ratio: string;
}) {
  return (
    <div
      className={`${ratio} overflow-hidden rounded-3xl shadow-soft ring-1 ring-border/60`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border/60">
      <div className="text-gradient text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto w-[min(1100px,calc(100%-2rem))]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-6 py-20 text-center text-white sm:px-16">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="blob left-10 top-10 h-56 w-56 bg-white/40" />
            <div className="blob right-10 bottom-10 h-72 w-72 bg-white/30" />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-4xl leading-tight text-white sm:text-6xl">
              Your AI Journey Starts Here.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-2xl font-medium text-white/95 leading-relaxed">
              The first foundational batch launches in the<br className="hidden sm:block" />
              <span className="inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200 font-bold text-xl sm:text-2xl drop-shadow-sm">
                second week of August 2026
              </span>
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Join the waitlist to get early access, exclusive updates, and be among the first women building with AI together.
            </p>
            <a
              href="#waitlist"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground shadow-soft transition-transform hover:scale-[1.03]"
            >
              Join the Waitlist
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto w-[min(800px,calc(100%-2rem))]">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl">Got Questions?</h2>
          <p className="mt-3 text-lg text-muted-foreground">We have answers.</p>
        </div>

        <div className="mt-12 rounded-3xl glass-strong p-6 sm:p-10">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                Is Internet Girls free?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                💜 Yes! Joining the community is completely free.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                Who is Internet Girls for?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                👩‍💻 Made for women, and welcoming to anyone who wants to learn AI in a supportive community, whether you're a complete beginner or looking to grow your skills.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                Do I need a technical background?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                ✨ Not at all. Our workshops and resources are designed for beginners with little to no technical experience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                When does it start?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                📅 Our first foundational cohort begins in the second week of August 2026.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b-0">
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                Where are your events held?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                🌏 We’re currently hosting events in Vietnam and the Philippines, with more communities across Southeast Asia coming soon.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
