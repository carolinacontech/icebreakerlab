"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const projects = [
  {
    title: "NODO Jiu Jitsu Academy",
    category: "Website + Local SEO",
    result: "More visibility, traffic & class signups",
    description: "Full website for a Brazilian Jiu Jitsu academy in Panama City — built to rank on Google and convert visitors into students.",
    url: "https://www.nodoacademy.com",
    mockup: "/images/portfolio/mockups/nodo-academy.png",
    bg: "/images/portfolio/workspace.png",
  },
  {
    title: "Market Open Media",
    category: "Corporate Website + SEO",
    result: "Google Maps & LSA lead generation",
    description: "Website for a local marketing agency specializing in Google Maps SEO and Local Services Ads — focused on generating inbound leads.",
    url: "https://www.marketopenmedia.com",
    mockup: "/images/portfolio/mockups/market-open-media.png",
    bg: "/images/portfolio/workspace-2.png",
  },
];

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const p = projects[active];

  return (
    <section id="portfolio" ref={ref} className="relative py-40 overflow-hidden flex flex-col justify-center">
      {/* Background */}
      {projects.map((proj, i) => (
        <motion.div key={i} className="absolute inset-0 z-0"
          animate={{ opacity: active === i ? 1 : 0 }} transition={{ duration: 0.8 }} style={{ y: bgY }}>
          <Image src={proj.bg} alt={proj.title} fill className="object-cover object-center" quality={85} />
        </motion.div>
      ))}
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(135deg, rgba(10,13,31,0.92) 0%, rgba(38,33,92,0.7) 50%, rgba(10,13,31,0.92) 100%)"
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--aurora-teal)" }}>Case studies</p>
          <h2 className="text-4xl md:text-6xl font-bold" style={{ color: "var(--snow)" }}>Our Work</h2>
        </motion.div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {projects.map((proj, i) => (
            <button key={proj.title} onClick={() => setActive(i)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: active === i ? "var(--aurora)" : "rgba(10,13,31,0.5)",
                border: active === i ? "1px solid rgba(175,169,236,0.5)" : "1px solid rgba(83,74,183,0.3)",
                color: active === i ? "var(--snow)" : "var(--aurora-light)",
                backdropFilter: "blur(16px)",
                boxShadow: active === i ? "0 0 24px rgba(83,74,183,0.4)" : "none",
              }}>
              {proj.title}
            </button>
          ))}
        </div>

        {/* Mockup — full natural size */}
        <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden w-full mb-5"
          style={{ border: "1px solid rgba(175,169,236,0.18)", boxShadow: "0 8px 60px rgba(0,0,0,0.5)" }}>
          <Image src={p.mockup} alt={p.title} width={1456} height={816}
            className="w-full h-auto block" quality={90} />
        </motion.div>

        {/* Info card — separate below */}
        <motion.div key={`info-${active}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ background: "rgba(10,13,31,0.65)", border: "1px solid rgba(83,74,183,0.25)", backdropFilter: "blur(20px)" }}>
          <div>
            <span className="text-xs tracking-widest uppercase mb-1 block" style={{ color: "var(--aurora-teal)" }}>{p.category}</span>
            <p className="text-xl font-bold mb-1" style={{ color: "var(--snow)" }}>{p.title}</p>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--aurora-teal)" }}>{p.result}</p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(175,169,236,0.7)" }}>{p.description}</p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <a href={p.url} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-semibold text-center transition-transform hover:scale-105"
              style={{ background: "var(--aurora)", color: "var(--snow)", boxShadow: "0 0 24px rgba(83,74,183,0.4)" }}>
              View site →
            </a>
            <a href="#contacto"
              className="px-6 py-3 rounded-full text-sm font-semibold text-center"
              style={{ border: "1px solid rgba(83,74,183,0.35)", color: "var(--aurora-light)", background: "rgba(83,74,183,0.1)" }}>
              I want this →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
