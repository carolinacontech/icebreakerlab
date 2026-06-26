"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const included = [
  { icon: "🎨", title: "Custom Design", body: "No templates. Every page is designed from scratch around your brand and your ideal customer." },
  { icon: "🔍", title: "SEO Optimization", body: "Built to rank. Every page is structured so Google understands who you are and what you offer." },
  { icon: "⚡", title: "Speed & Performance", body: "Under 2 seconds load time. Google rewards fast sites — and so do your visitors." },
  { icon: "📱", title: "Mobile First", body: "Over 70% of your customers browse on their phone. Your site will look perfect on every screen." },
  { icon: "📍", title: "Local SEO", body: "We optimize for local searches so people in your city find you first — not your competition." },
  { icon: "📋", title: "Copy That Converts", body: "Clear, persuasive copy written to turn visitors into calls, leads, and clients." },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.2, 1.1]);

  return (
    <section id="servicios" ref={ref} className="relative py-40 overflow-hidden min-h-screen flex flex-col justify-center">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        <Image src="/images/services/underwater.png" alt="Iceberg underwater" fill className="object-cover object-center" quality={85} />
      </motion.div>
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(to bottom, rgba(10,13,31,0.88) 0%, rgba(10,22,40,0.7) 50%, rgba(10,13,31,0.88) 100%)"
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--aurora-teal)" }}>What we do</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: "var(--snow)" }}>One service.<br />Done right.</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--aurora-light)" }}>
            We don't do everything. We do one thing exceptionally well — websites built to rank on Google and convert visitors into clients.
          </p>
        </motion.div>

        {/* Main service card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-3xl p-10 mb-10 text-center relative overflow-hidden"
          style={{
            background: "rgba(10,13,31,0.7)",
            border: "1px solid rgba(83,74,183,0.5)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 0 80px rgba(83,74,183,0.15)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(83,74,183,0.2) 0%, transparent 70%)"
          }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-8"
              style={{ background: "rgba(93,202,165,0.12)", border: "1px solid rgba(93,202,165,0.3)", color: "var(--aurora-teal)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--aurora-teal)" }} />
              Our service
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--snow)" }}>
              SEO Website — 3 to 5 Pages
            </h3>
            <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: "var(--aurora-light)" }}>
              A complete, custom-designed website of 3 to 5 pages — fully optimized for Google from day one. Built to rank, built to convert, built to grow your business.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Custom Design", "SEO Optimized", "Mobile Ready", "Fast Load", "Local SEO", "Converts Visitors"].map((tag) => (
                <span key={tag} className="text-sm px-4 py-1.5 rounded-full font-medium"
                  style={{ background: "rgba(83,74,183,0.18)", color: "var(--aurora-light)", border: "1px solid rgba(83,74,183,0.35)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href="#contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-transform hover:scale-105"
              style={{ background: "var(--aurora)", color: "var(--snow)", boxShadow: "0 0 40px rgba(83,74,183,0.5)" }}>
              Start your project →
            </a>
          </div>
        </motion.div>

        {/* What's included grid */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8">
          <p className="text-sm tracking-widest uppercase" style={{ color: "rgba(175,169,236,0.5)" }}>Everything included</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {included.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(10,13,31,0.5)", border: "1px solid rgba(83,74,183,0.2)", backdropFilter: "blur(16px)" }}
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h4 className="font-semibold mb-2" style={{ color: "var(--snow)" }}>{item.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--aurora-light)", opacity: 0.8 }}>{item.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
