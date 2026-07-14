import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from "react";
import { submitPartner } from "@/actions";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partner with Internet Girls" },
      {
        name: "description",
        content:
          "Join Internet Girls as an AI Evangelist, AI Expert, Tech Partner, or Sponsor and help more women get ahead with AI.",
      },
      { property: "og:title", content: "Partner with Internet Girls" },
      {
        property: "og:description",
        content:
          "Join us as an AI Evangelist, Expert, Tech Partner, or Sponsor.",
      },
    ],
  }),
  component: PartnersPage,
});

const PARTNER_TYPES = [
  {
    title: "AI Evangelist",
    body: "Share your journey and inspire more women to explore AI as speakers, hosts, and champions.",
    emoji: "🎤",
  },
  {
    title: "AI Experts",
    body: "Teach workshops, mentor members, and shape the curriculum with your real-world expertise.",
    emoji: "🧠",
  },
  {
    title: "Tech Partners",
    body: "Offer tools, credits, and infrastructure that let our members learn and build without friction.",
    emoji: "⚙️",
  },
  {
    title: "Sponsors",
    body: "Fund free workshops, community meetups, and scholarships across Southeast Asia.",
    emoji: "💛",
  },
];

function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <PartnerGrid />
      <ContactForm />
    </>
  );
}

function PartnersHero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 pb-14">
      <div className="blob animate-blob left-[-4rem] top-6 h-72 w-72 bg-[oklch(0.85_0.15_300)]" />
      <div
        className="blob animate-blob right-[-2rem] top-20 h-80 w-80 bg-[oklch(0.88_0.14_15)]"
        style={{ animationDelay: "4s" }}
      />
      <div className="relative mx-auto w-[min(900px,calc(100%-2rem))] text-center">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
          Partnerships
        </span>
        <h1 className="mt-6 text-5xl leading-[1.05] sm:text-6xl">
          Partner with <span className="text-gradient italic">Internet Girls</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          We collaborate with people and companies who want to help more women
          in Southeast Asia get ahead with AI. Here's how you can plug in.
        </p>
      </div>
    </section>
  );
}

function PartnerGrid() {
  return (
    <section className="py-14">
      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PARTNER_TYPES.map((p) => (
          <article
            key={p.title}
            className="group relative flex flex-col rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_oklch(0.55_0.22_300/0.3)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft-gradient text-2xl">
              {p.emoji}
            </div>
            <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
            >
              Get in touch <span aria-hidden>→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await submitPartner({
        data: {
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          email: formData.get("email") as string,
          inquiryType: formData.get("inquiryType") as string,
          message: formData.get("message") as string,
        },
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto w-[min(900px,calc(100%-2rem))]">
        <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-8 sm:p-12">
          <div className="blob left-[-4rem] top-[-4rem] h-64 w-64 bg-[oklch(0.88_0.14_300)]" />
          <div className="blob right-[-4rem] bottom-[-4rem] h-64 w-64 bg-[oklch(0.9_0.13_40)]" />
          <div className="relative">
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl">Let's talk.</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Tell us a bit about you and how you'd like to partner. We reply
                to every message.
              </p>
            </div>

            {submitted ? (
              <div className="mt-10 rounded-3xl bg-white/70 p-10 text-center">
                <div className="text-4xl">✨</div>
                <h3 className="mt-3 text-2xl">Thank you!</h3>
                <p className="mt-2 text-muted-foreground">
                  We've got your message and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <Field label="First name">
                  <input required name="firstName" className={inputCls} disabled={loading} />
                </Field>
                <Field label="Last name">
                  <input required name="lastName" className={inputCls} disabled={loading} />
                </Field>
                <Field label="Email" className="sm:col-span-2">
                  <input
                    required
                    name="email"
                    type="email"
                    className={inputCls}
                    placeholder="you@company.com"
                    disabled={loading}
                  />
                </Field>
                <Field label="Inquiry type" className="sm:col-span-2">
                  <select required name="inquiryType" className={inputCls} defaultValue="" disabled={loading}>
                    <option value="" disabled>
                      Select one…
                    </option>
                    <option>AI Evangelist</option>
                    <option>AI Expert</option>
                    <option>Tech Partner</option>
                    <option>Sponsor</option>
                  </select>
                </Field>
                <Field label="Message" className="sm:col-span-2">
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us how you'd like to partner…"
                    disabled={loading}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-brand-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] disabled:opacity-80 disabled:pointer-events-none"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-2xl border-0 bg-white/80 px-4 py-3 text-sm outline-none ring-1 ring-inset ring-border/60 focus:ring-2 focus:ring-primary";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/70">
        {label}
      </span>
      {children}
    </label>
  );
}
