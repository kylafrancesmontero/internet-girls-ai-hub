import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import stickerPhone from "@/assets/sticker-phone.png";
import stickerLaptop from "@/assets/sticker-laptop.png";
import stickerCoffee from "@/assets/sticker-coffee.png";
import stickerButterfly from "@/assets/sticker-butterfly.png";
import stickerHeadphones from "@/assets/sticker-headphones.png";
import stickerNotebook from "@/assets/sticker-notebook.png";
import founderAsset from "@/assets/founder-kyla.jpg.asset.json";
import workshop1Asset from "@/assets/community-1.jpg.asset.json";
import workshop2Asset from "@/assets/community-2.jpg.asset.json";
import workshop3Asset from "@/assets/community-3.jpg.asset.json";
import workshop4Asset from "@/assets/community-4.jpg.asset.json";
const founderImg = founderAsset.url;
const workshop1 = workshop1Asset.url;
const workshop2 = workshop2Asset.url;
const workshop3 = workshop3Asset.url;
const workshop4 = workshop4Asset.url;

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
  {
    kind: "image",
    src: stickerButterfly,
    alt: "Butterfly sticker",
    style: { top: "2%", left: "6%" },
    size: 110,
    rotate: -12,
    delay: 0,
    duration: 6,
    depth: 0.6,
  },
  {
    kind: "image",
    src: stickerPhone,
    alt: "Retro flip phone sticker",
    style: { top: "14%", right: "4%" },
    size: 130,
    rotate: 14,
    delay: 1.2,
    duration: 7,
    depth: 0.9,
  },
  {
    kind: "image",
    src: stickerLaptop,
    alt: "Laptop sticker",
    style: { bottom: "6%", left: "3%" },
    size: 150,
    rotate: -8,
    delay: 0.4,
    duration: 8,
    depth: 0.5,
    hideOnMobile: true,
  },
  {
    kind: "image",
    src: stickerCoffee,
    alt: "Coffee cup sticker",
    style: { top: "48%", left: "1%" },
    size: 90,
    rotate: 10,
    delay: 2,
    duration: 5.5,
    depth: 0.7,
    hideOnMobile: true,
  },
  {
    kind: "image",
    src: stickerHeadphones,
    alt: "Headphones sticker",
    style: { bottom: "10%", right: "6%" },
    size: 130,
    rotate: -14,
    delay: 1.6,
    duration: 6.5,
    depth: 0.8,
  },
  {
    kind: "image",
    src: stickerNotebook,
    alt: "Notebook sticker",
    style: { top: "52%", right: "2%" },
    size: 100,
    rotate: 8,
    delay: 2.4,
    duration: 7.5,
    depth: 0.55,
    hideOnMobile: true,
  },
  // Illustrated / emoji stickers
  {
    kind: "emoji",
    emoji: "💖",
    style: { top: "8%", left: "42%" },
    size: 44,
    rotate: -10,
    delay: 0.6,
    duration: 5,
    depth: 0.4,
  },
  {
    kind: "emoji",
    emoji: "✨",
    style: { top: "22%", left: "22%" },
    size: 38,
    rotate: 8,
    delay: 1.4,
    duration: 4.5,
    depth: 0.3,
  },
  {
    kind: "emoji",
    emoji: "⭐",
    style: { top: "30%", right: "22%" },
    size: 34,
    rotate: -6,
    delay: 2.2,
    duration: 5.5,
    depth: 0.35,
  },
  {
    kind: "emoji",
    emoji: "🦋",
    style: { bottom: "18%", left: "28%" },
    size: 36,
    rotate: 12,
    delay: 3,
    duration: 6,
    depth: 0.45,
    hideOnMobile: true,
  },
  // Illustrated SVG stickers (glass card style)
  {
    kind: "node",
    node: <ChatBubbleSticker />,
    style: { top: "6%", right: "26%" },
    size: 0,
    rotate: 6,
    delay: 0.8,
    duration: 6,
    depth: 0.5,
  },
  {
    kind: "node",
    node: <StickyNoteSticker />,
    style: { bottom: "22%", right: "30%" },
    size: 0,
    rotate: -8,
    delay: 1.8,
    duration: 7,
    depth: 0.6,
    hideOnMobile: true,
  },
  {
    kind: "node",
    node: <BrowserSticker />,
    style: { bottom: "4%", left: "38%" },
    size: 0,
    rotate: 4,
    delay: 2.6,
    duration: 6.5,
    depth: 0.5,
    hideOnMobile: true,
  },
  {
    kind: "node",
    node: <CursorSticker />,
    style: { top: "44%", left: "44%" },
    size: 0,
    rotate: -14,
    delay: 1.1,
    duration: 5,
    depth: 0.35,
  },
  {
    kind: "node",
    node: <PixelHeartSticker />,
    style: { top: "38%", right: "12%" },
    size: 0,
    rotate: 10,
    delay: 0.3,
    duration: 5.8,
    depth: 0.4,
  },
  {
    kind: "node",
    node: <PaperclipSticker />,
    style: { top: "18%", left: "10%" },
    size: 0,
    rotate: 22,
    delay: 2.9,
    duration: 6.2,
    depth: 0.5,
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
      className="relative overflow-hidden pt-16 pb-28 sm:pt-24 sm:pb-36"
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
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
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

function StickerCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-strong flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-medium text-foreground shadow-soft ring-1 ring-white/60 ${className}`}
    >
      {children}
    </div>
  );
}

function ChatBubbleSticker() {
  return (
    <StickerCard>
      <span className="inline-block h-5 w-5 rounded-full bg-brand-gradient" />
      <span>Ask AI ✨</span>
    </StickerCard>
  );
}

function StickyNoteSticker() {
  return (
    <div className="rotate-[-4deg] rounded-md bg-[oklch(0.94_0.09_95)] px-3 py-2 font-display text-sm italic text-foreground/80 shadow-[0_14px_24px_-10px_oklch(0.5_0.15_60/0.35)] ring-1 ring-black/5">
      you got this ♡
    </div>
  );
}

function BrowserSticker() {
  return (
    <div className="w-40 rounded-xl bg-white p-1.5 shadow-[0_18px_30px_-12px_oklch(0.55_0.2_300/0.3)] ring-1 ring-border/60">
      <div className="flex items-center gap-1 px-1 pb-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.17_5)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.15_55)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.18_300)]" />
      </div>
      <div className="rounded-md bg-soft-gradient p-3">
        <div className="h-1.5 w-16 rounded-full bg-white/70" />
        <div className="mt-1.5 h-1.5 w-24 rounded-full bg-white/60" />
        <div className="mt-1.5 h-1.5 w-12 rounded-full bg-white/50" />
      </div>
    </div>
  );
}

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

function PaperclipSticker() {
  return (
    <svg width="34" height="46" viewBox="0 0 24 32" fill="none" className="drop-shadow">
      <path
        d="M17 8v14a5 5 0 01-10 0V7a3 3 0 116 0v13a1.5 1.5 0 01-3 0V9"
        stroke="oklch(0.62 0.18 300)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WaitlistCard() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
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
        placeholder="First name"
        className="flex-1 rounded-2xl border-0 bg-white/70 px-4 py-3 text-sm outline-none ring-1 ring-inset ring-border/60 focus:ring-2 focus:ring-primary"
      />
      <input
        required
        type="email"
        placeholder="you@email.com"
        className="flex-[1.4] rounded-2xl border-0 bg-white/70 px-4 py-3 text-sm outline-none ring-1 ring-inset ring-border/60 focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="rounded-2xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]"
      >
        {submitted ? "You're in ✨" : "Join the Waitlist"}
      </button>
    </form>
  );
}

/* ---------------- What You'll Learn ---------------- */

const LEARN_CARDS = [
  {
    tag: "Foundation",
    tagBg: "oklch(0.94 0.06 300)",
    question: "How do I confidently use AI?",
    sections: [
      {
        title: "Week 1",
        items: [
          "What is AI & Meet the Players",
          "Critical Thinking & the 4Ds",
          "Prompting",
          "Productivity",
        ],
      },
      {
        title: "Week 2",
        items: [
          "Research & Analysis",
          "Writing & Communication",
          "Data Privacy & Responsible AI",
          "AI Best Practices",
        ],
      },
    ],
  },
  {
    tag: "Specialist",
    tagBg: "oklch(0.94 0.06 5)",
    question: "How do I use AI in my job?",
    sections: [
      {
        title: "Choose your track",
        items: [
          "AI for Marketing",
          "AI for Admin & Operations",
          "AI for Content Creators",
          "AI for Entrepreneurs",
        ],
      },
    ],
  },
  {
    tag: "AI Builder",
    tagBg: "oklch(0.94 0.06 55)",
    question: "How do I build with AI?",
    sections: [
      {
        title: "Start shipping",
        items: ["Building Apps", "Building AI Agents", "AI Workflows"],
      },
    ],
  },
];

function WhatYoullLearn() {
  return (
    <section className="relative py-24">
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

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {LEARN_CARDS.map((card, i) => (
            <article
              key={card.tag}
              className="group relative flex flex-col rounded-3xl bg-card p-7 shadow-soft ring-1 ring-border/60 transition-transform hover:-translate-y-1"
            >
              <span
                className="w-fit rounded-full px-3 py-1 text-xs font-semibold text-foreground/80"
                style={{ background: card.tagBg }}
              >
                0{i + 1} · {card.tag}
              </span>
              <h3 className="mt-5 text-2xl leading-tight">{card.question}</h3>
              <div className="mt-6 flex flex-1 flex-col gap-5">
                {card.sections.map((s) => (
                  <div key={s.title}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {s.title}
                    </p>
                    <ul className="space-y-2">
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-start gap-2 text-sm text-foreground/85"
                        >
                          <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gradient" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why we exist ---------------- */

function WhyExists() {
  return (
    <section className="relative py-24">
      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
            Our Story
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl">
            Why <span className="text-gradient italic">Internet Girls</span>{" "}
            exists
          </h2>
          
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              Our founder, Kyla, believes AI will become as essential as using
              the internet or email.
            </p>
            <p>
              As she explored the rapidly changing world of AI, she kept
              noticing the same pattern. AI was everywhere, but many women
              around her felt overwhelmed by the endless stream of tools,
              technical jargon, and conflicting advice. The curiosity was
              there, what was missing was a welcoming place to start.
            </p>
            <p>
              She didn't think the answer was another course. She believed the
              answer was a community: a place where women could learn together,
              ask questions freely, and build confidence at their own pace.
            </p>
            <p className="font-medium text-foreground">
              That's how Internet Girls began.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-gradient" />
            <div>
              <p className="font-semibold">Kyla · Founder, Internet Girls</p>
              <p className="text-sm text-muted-foreground">
                Building the space we needed.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative rounded-[2.5rem] p-3 shadow-soft" style={{ background: "linear-gradient(135deg, oklch(0.88 0.14 300), oklch(0.9 0.13 20), oklch(0.92 0.14 55))" }}>
            <img
              src={founderImg}
              alt="Kyla, founder of Internet Girls"
              width={900}
              height={1100}
              loading="lazy"
              className="h-[520px] w-[400px] rounded-[2rem] object-cover"
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
    <section className="relative py-24">
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
          </a>
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
    <section className="relative py-24">
      <div className="mx-auto w-[min(1100px,calc(100%-2rem))]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-6 py-20 text-center text-white sm:px-16">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="blob left-10 top-10 h-56 w-56 bg-white/40" />
            <div className="blob right-10 bottom-10 h-72 w-72 bg-white/30" />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-4xl leading-tight text-white sm:text-6xl">
              Your AI journey starts here.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
              Whether you're completely new to AI or looking to build practical
              skills, there's a place for you at Internet Girls.
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
