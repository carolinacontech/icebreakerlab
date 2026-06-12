"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "assistant" | "user"; text: string };

const PHASES = [
  { label: "About you", icon: "👤" },
  { label: "The website", icon: "🌐" },
  { label: "Style & inspiration", icon: "🎨" },
  { label: "Project details", icon: "📋" },
];

const QUESTIONS = [
  // Phase 0 — About you
  { phase: 0, key: "name", text: "Hi! I'm Frost, Icebreaker Lab's project assistant 🧊\n\nI'll ask you a few questions so our team can craft the perfect website for you. Ready? First — what's your name?" },
  { phase: 0, key: "business_name", text: (a: Record<string,string>) => `Great to meet you, ${a.name}! 👋\n\nWhat's the name of your business or project?` },
  { phase: 0, key: "business_description", text: (a: Record<string,string>) => `Love it — ${a.business_name}! ✨\n\nTell me what ${a.business_name} does. What product or service do you offer?` },
  { phase: 0, key: "target_audience", text: "Who are your ideal customers? Describe them — age, industry, interests, pain points." },

  // Phase 1 — The website
  { phase: 1, key: "website_type", text: "Now let's talk about the website itself.\n\nWhat type do you need?\n→ Landing page (single page, focused on one goal)\n→ Full website (multiple pages)\n→ E-commerce (online store)\n→ Portfolio\n→ Something else — describe it!" },
  { phase: 1, key: "website_goal", text: "What's the #1 goal of the website? What do you want visitors to do when they land on it?" },
  { phase: 1, key: "pages", text: "How many pages do you think you need? Even a rough idea helps.\n(e.g. Home, About, Services, Contact — or just one powerful landing page)" },
  { phase: 1, key: "features", text: "What features do you need? Pick all that apply or describe:\n→ Contact form\n→ Blog\n→ Online store / payments\n→ Booking / calendar\n→ Portfolio gallery\n→ Animations / interactions\n→ Multilingual\n→ Other?" },

  // Phase 2 — Style & inspiration
  { phase: 2, key: "inspiration_sites", text: "Now the fun part 🎨\n\nShare 2–3 websites you love the look or feel of. What do you like about them specifically? (links or names work)" },
  { phase: 2, key: "vibe", text: "How would you describe the vibe you want for your site?\n\nExamples: Modern & minimal / Bold & creative / Corporate & professional / Warm & approachable / Luxury & premium / Dark & dramatic\n\nOr use your own words — the more specific, the better!" },
  { phase: 2, key: "colors", text: "Do you have brand colors? Share the hex codes or describe them.\n\nIf not — what colors feel right for your brand? (e.g. deep blues, earthy tones, black & gold...)" },
  { phase: 2, key: "imagery", text: "What kind of imagery fits your brand?\n\nPhotography style, illustrations, icons, video, 3D? Dark or light backgrounds? Minimal or content-heavy?\n\nFeel free to describe a mood board in words." },
  { phase: 2, key: "logo", text: "Do you already have a logo and brand identity?\n\nIf yes — great, we'll use it. If not — do you need one created too?" },

  // Phase 3 — Project details
  { phase: 3, key: "content", text: "For the content — do you have the text/copy written, or will you need help with that?\n\nAnd do you have professional photos/images, or will we need to source or create them?" },
  { phase: 3, key: "domain", text: "Do you have a domain name already? (e.g. yourbusiness.com)\n\nAnd do you have hosting, or will you need that set up too?" },
  { phase: 3, key: "competitors", text: "Who are your main competitors online? Drop their URLs if you can.\n\nThis helps us understand your market and make sure your site stands out." },
  { phase: 3, key: "timeline", text: "What's your ideal timeline for launch?\n\n→ ASAP (rush project)\n→ 1 month\n→ 2–3 months\n→ No hard deadline" },
  { phase: 3, key: "budget", text: "And the final question — what's your budget range for this project?\n\n→ Under $1,000\n→ $1,000 – $3,000\n→ $3,000 – $7,000\n→ $7,000+\n→ Not sure yet — open to a proposal\n\nNo wrong answer, this just helps us tailor our recommendation." },
  { phase: 3, key: "extra", text: "Almost done! 🎉\n\nAnything else you'd like us to know? Any specific challenges, requests, or things that are non-negotiable for this project?" },
];

function buildSummary(answers: Record<string, string>): string {
  return `
ICEBREAKER LAB — NEW PROJECT INQUIRY
=====================================

👤 ABOUT THE CLIENT
Name: ${answers.name || "—"}
Business: ${answers.business_name || "—"}
Description: ${answers.business_description || "—"}
Target audience: ${answers.target_audience || "—"}

🌐 THE WEBSITE
Type: ${answers.website_type || "—"}
Main goal: ${answers.website_goal || "—"}
Pages needed: ${answers.pages || "—"}
Features: ${answers.features || "—"}

🎨 STYLE & INSPIRATION
Inspiration websites: ${answers.inspiration_sites || "—"}
Vibe: ${answers.vibe || "—"}
Colors: ${answers.colors || "—"}
Imagery: ${answers.imagery || "—"}
Logo/Brand: ${answers.logo || "—"}

📋 PROJECT DETAILS
Content/Copy: ${answers.content || "—"}
Domain/Hosting: ${answers.domain || "—"}
Competitors: ${answers.competitors || "—"}
Timeline: ${answers.timeline || "—"}
Budget: ${answers.budget || "—"}
Extra notes: ${answers.extra || "—"}

=====================================
Sent from Icebreaker Lab chat widget
`.trim();
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQ = QUESTIONS[step];
  const currentPhase = currentQ?.phase ?? 3;
  const progress = Math.round((step / QUESTIONS.length) * 100);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      setTimeout(() => {
        const firstQ = QUESTIONS[0];
        setMessages([{ role: "assistant", text: typeof firstQ.text === "function" ? firstQ.text({}) : firstQ.text }]);
      }, 400);
    }
  }, [open, started]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, step]);

  const sendAnswer = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newAnswers = { ...answers, [currentQ.key]: trimmed };
    setAnswers(newAnswers);
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");

    const nextStep = step + 1;
    if (nextStep >= QUESTIONS.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `That's everything I need! 🧊✨\n\nI've put together a full brief for the Icebreaker Lab team. They'll review it and reach out to you shortly.\n\nClick below to send your brief — or copy it to keep a record.`,
          },
        ]);
        setDone(true);
      }, 500);
    } else {
      setTimeout(() => {
        const nextQ = QUESTIONS[nextStep];
        const text = typeof nextQ.text === "function" ? nextQ.text(newAnswers) : nextQ.text;
        setMessages((prev) => [...prev, { role: "assistant", text }]);
        setStep(nextStep);
      }, 500);
    }
  };

  const summary = buildSummary(answers);
  const mailtoHref = `mailto:hello@icebreakerlab.com?subject=New project inquiry — ${answers.business_name || "Website project"}&body=${encodeURIComponent(summary)}`;

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full font-semibold text-sm shadow-2xl"
        style={{ background: "var(--aurora)", color: "var(--snow)", boxShadow: "0 0 40px rgba(83,74,183,0.6)" }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span style={{ fontSize: "1.1rem" }}>🧊</span>
        Start your project
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex flex-col rounded-3xl overflow-hidden"
            style={{
              width: "min(420px, calc(100vw - 2rem))",
              height: "min(620px, calc(100vh - 8rem))",
              background: "rgba(10,13,31,0.97)",
              border: "1px solid rgba(83,74,183,0.35)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ borderBottom: "1px solid rgba(83,74,183,0.2)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "rgba(83,74,183,0.3)", border: "1px solid rgba(175,169,236,0.3)" }}>
                  🧊
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--snow)" }}>Frost</p>
                  <p className="text-xs" style={{ color: "var(--aurora-teal)" }}>Icebreaker Lab · Project intake</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all"
                style={{ color: "var(--aurora-light)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(83,74,183,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                ×
              </button>
            </div>

            {/* Phase indicators */}
            <div className="flex gap-1 px-5 py-3 shrink-0">
              {PHASES.map((ph, i) => (
                <div key={ph.label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-1 rounded-full transition-all duration-500"
                    style={{ background: i <= currentPhase ? "var(--aurora)" : "rgba(83,74,183,0.15)" }} />
                  <span className="text-xs hidden sm:block" style={{ color: i <= currentPhase ? "var(--aurora-light)" : "rgba(175,169,236,0.3)", fontSize: "10px" }}>
                    {ph.icon} {ph.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="px-5 pb-2 shrink-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: "rgba(175,169,236,0.5)" }}>Question {Math.min(step + 1, QUESTIONS.length)} of {QUESTIONS.length}</span>
                <span className="text-xs" style={{ color: "var(--aurora-teal)" }}>{progress}%</span>
              </div>
              <div className="w-full h-0.5 rounded-full" style={{ background: "rgba(83,74,183,0.15)" }}>
                <motion.div className="h-full rounded-full" style={{ background: "var(--aurora-teal)" }}
                  animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(83,74,183,0.3) transparent" }}>
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
                      style={m.role === "assistant"
                        ? { background: "rgba(83,74,183,0.18)", color: "var(--snow)", borderBottomLeftRadius: 4, border: "1px solid rgba(83,74,183,0.2)" }
                        : { background: "var(--aurora)", color: "var(--snow)", borderBottomRightRadius: 4 }
                      }>
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Done state */}
            {done ? (
              <div className="px-5 py-4 shrink-0 flex flex-col gap-3"
                style={{ borderTop: "1px solid rgba(83,74,183,0.2)" }}>
                <a href={mailtoHref}
                  className="w-full py-3 rounded-full font-semibold text-sm text-center transition-transform hover:scale-105"
                  style={{ background: "var(--aurora)", color: "var(--snow)", boxShadow: "0 0 30px rgba(83,74,183,0.4)" }}>
                  📨 Send my brief to Icebreaker Lab
                </a>
                <button
                  onClick={() => { navigator.clipboard.writeText(summary); }}
                  className="w-full py-3 rounded-full font-semibold text-sm text-center transition-all"
                  style={{ background: "rgba(83,74,183,0.15)", color: "var(--aurora-light)", border: "1px solid rgba(83,74,183,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(83,74,183,0.25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(83,74,183,0.15)")}>
                  📋 Copy brief to clipboard
                </button>
              </div>
            ) : (
              /* Input */
              <div className="px-4 py-4 shrink-0 flex gap-2"
                style={{ borderTop: "1px solid rgba(83,74,183,0.2)" }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAnswer(); } }}
                  placeholder="Type your answer..."
                  className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(83,74,183,0.3)", color: "var(--snow)" }}
                />
                <motion.button
                  onClick={sendAnswer}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: input.trim() ? "var(--aurora)" : "rgba(83,74,183,0.2)", color: "var(--snow)" }}
                >
                  →
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
