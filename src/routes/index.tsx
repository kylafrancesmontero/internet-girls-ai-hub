import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import heroImg from "@/assets/hero-illustration.jpg";
import founderImg from "@/assets/founder.jpg";
import workshop1 from "@/assets/workshop-1.jpg";
import workshop2 from "@/assets/workshop-2.jpg";
import workshop3 from "@/assets/workshop-3.jpg";
import workshop4 from "@/assets/workshop-4.jpg";

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

function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-24 sm:pt-16">
      <div className="blob animate-blob left-[-6rem] top-10 h-80 w-80 bg-[oklch(0.85_0.15_300)]" />
      <div
        className="blob animate-blob right-[-4rem] top-40 h-96 w-96 bg-[oklch(0.88_0.13_15)]"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="blob animate-blob left-1/3 top-[28rem] h-72 w-72 bg-[oklch(0.9_0.14_55)]"
        style={{ animationDelay: "6s" }}
      />

      <div className="relative mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="animate-rise flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/70 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
            Welcome to Internet Girls
          </span>
          <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
            Helping more women{" "}
            <span className="text-gradient italic">get ahead</span> with AI.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            We've built a space where women learn AI together through free
            workshops, practical resources, and IRL meetups across Southeast
            Asia.
          </p>

          <WaitlistCard />
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-soft-gradient blur-2xl opacity-70" />
          <div className="glass-strong relative aspect-square w-full max-w-lg overflow-hidden rounded-[2.5rem] p-3 animate-float">
            <img
              src={heroImg}
              alt="Illustration of women collaborating with AI tools"
              width={1200}
              height={1200}
              className="h-full w-full rounded-[2rem] object-cover"
            />
            <FloatingBadge
              className="left-4 top-8"
              emoji="✨"
              label="Weekly workshops"
            />
            <FloatingBadge
              className="right-4 bottom-8"
              emoji="🌏"
              label="SEA community"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({
  className = "",
  emoji,
  label,
}: {
  className?: string;
  emoji: string;
  label: string;
}) {
  return (
    <div
      className={`absolute glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-foreground shadow-soft ${className}`}
    >
      <span aria-hidden>{emoji}</span>
      {label}
    </div>
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
              I kept walking into rooms about AI and noticing the same thing —
              women weren't at the table. Not because we didn't care, but
              because nobody was building a space that felt like it was made
              for us.
            </p>
            <p>
              So we started small. A workshop in a café. Then a bigger one. Now
              a growing community of women across Southeast Asia teaching each
              other how to use, adapt to, and build with AI — with zero gatekeeping.
            </p>
            <p className="font-medium text-foreground">
              This is the room I wish I walked into. Welcome in.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-gradient" />
            <div>
              <p className="font-semibold">Founder, Internet Girls</p>
              <p className="text-sm text-muted-foreground">
                Building the space we needed.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="blob left-6 top-6 h-60 w-60 bg-[oklch(0.88_0.14_300)] opacity-70" />
          <div className="blob right-6 bottom-4 h-64 w-64 bg-[oklch(0.9_0.13_20)] opacity-70" />
          <div className="glass-strong relative overflow-hidden rounded-[2.5rem] p-3">
            <img
              src={founderImg}
              alt="Portrait of the founder of Internet Girls"
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
            From Ho Chi Minh City to Hanoi — meet the women showing up, asking
            the questions, and shipping side projects together.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <Stat value="500+" label="Community members" />
            <Stat value="15+" label="Workshops hosted" />
            <Stat value="4" label="Cities in SEA" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <GalleryImg src={workshop1} alt="Workshop attendees laughing together" ratio="aspect-[4/5]" />
            <GalleryImg src={workshop2} alt="Women collaborating on laptops" ratio="aspect-square" />
          </div>
          <div className="space-y-4 pt-10">
            <GalleryImg src={workshop3} alt="Speaker presenting at meetup" ratio="aspect-square" />
            <GalleryImg src={workshop4} alt="Hands typing on a laptop" ratio="aspect-[4/5]" />
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
