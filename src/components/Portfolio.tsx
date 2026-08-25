"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const projects = [
  {
    title: "NODO Jiu Jitsu Academy",
    category: "Website + Local SEO",
    result: "More visibility, traffic & class signups",
    description: "Full website for a Brazilian Jiu Jitsu academy in Panama City — built to rank on Google and convert visitors into students.",
    url: "https://www.nodoacademy.com",
    mockup: "/images/portfolio/mockups/nodo-academy.png",
    mobile: "/images/portfolio/mockups/nodo-academy.png",
    bg: "/images/portfolio/workspace.png",
  },
  {
    title: "Market Open Media",
    category: "Corporate Website + SEO",
    result: "Google Maps & LSA lead generation",
    description: "Website for a local marketing agency specializing in Google Maps SEO and Local Services Ads — focused on generating inbound leads.",
    url: "https://www.marketopenmedia.com",
    mockup: "/images/portfolio/mockups/market-open-media.png",
    mobile: "/images/portfolio/mockups/market-open-media.png",
    bg: "/images/portfolio/workspace-2.png",
  },
  {
    title: "Kings Tree Services",
    category: "Website + Local SEO",
    result: "Top Google rankings for North Texas & DFW",
    description: "Full website for a tree services company covering North Texas & DFW — built to rank locally, generate free estimate leads, and convert emergency calls 24/7.",
    url: "https://www.kingstreeservices.com",
    mockup: "/images/portfolio/mockups/tree-services.png",
    mobile: "/images/portfolio/mockups/tree-services.png",
    bg: "/images/portfolio/workspace.png",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState(0);

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden" style={{ background: "var(--night)" }}>
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(83,74,183,0.12) 0%, transparent 70%)"
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="section-eyebrow mb-4">Case studies</p>
          <h2 className="section-title">Our Work</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left — project list (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {projects.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                onClick={() => setActive(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); } }}
                role="button"
                tabIndex={0}
                aria-pressed={active === i}
                whileHover={{ x: 6 }}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: active === i ? "rgba(83,74,183,0.25)" : "rgba(10,13,31,0.5)",
                  border: active === i ? "1px solid rgba(175,169,236,0.5)" : "1px solid rgba(83,74,183,0.2)",
                  backdropFilter: "blur(20px)",
                }}>
                {active === i && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ background: "var(--aurora-light)" }} />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs tracking-widest uppercase mb-1 block" style={{ color: "var(--aurora-teal)" }}>{p.category}</span>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--snow)" }}>{p.title}</h3>
                  </div>
                  <span style={{ color: "var(--aurora-light)", fontSize: "1.3rem" }}>→</span>
                </div>
                <p className="text-sm mt-2 font-medium" style={{ color: "var(--aurora-teal)" }}>{p.result}</p>
                {active === i && (
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(175,169,236,0.7)" }}>{p.description}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right — mockup preview (3/5) */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="lg:col-span-3 flex flex-col gap-4"
            style={{ overflow: "visible" }}>
          <div className="relative rounded-2xl aspect-video"
            style={{ border: "1px solid rgba(175,169,236,0.15)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)", overflow: "visible" }}>

            {/* Desktop mockup */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {projects.map((p, i) => (
                <motion.div key={i} className="absolute inset-0"
                  animate={{ opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.6 }}>
                  <Image src={p.mockup} alt={p.title} fill className="object-cover" style={{ objectPosition: "50% 20%" }} />
                </motion.div>
              ))}
            </div>

            {/* Mobile phone overlay — bottom-right corner */}
            <div className="absolute z-20"
              style={{ bottom: "-20px", right: "-16px", width: "112px", height: "218px" }}>
              {/* Phone shell */}
              <div className="relative w-full h-full rounded-[22px]"
                style={{
                  background: "#08071a",
                  border: "2px solid rgba(175,169,236,0.35)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}>
                {/* Dynamic Island */}
                <div className="absolute left-1/2 -translate-x-1/2"
                  style={{ top: "8px", width: "26px", height: "7px", background: "#08071a", borderRadius: "4px", zIndex: 3 }} />
                {/* Screen area */}
                <div className="absolute overflow-hidden rounded-[20px]"
                  style={{ inset: "2px" }}>
                  {projects.map((p, i) => (
                    <motion.div key={i} className="absolute inset-0"
                      animate={{ opacity: active === i ? 1 : 0 }}
                      transition={{ duration: 0.6 }}>
                      <Image src={p.mobile} alt={`${p.title} mobile`} fill className="object-cover object-top" />
                    </motion.div>
                  ))}
                </div>
                {/* Home indicator */}
                <div className="absolute left-1/2 -translate-x-1/2"
                  style={{ bottom: "5px", width: "28px", height: "3px", background: "rgba(175,169,236,0.4)", borderRadius: "2px" }} />
              </div>
            </div>
          </div>

          {/* Buttons below mockup */}
          <div className="flex gap-3 pt-6">
            <a href={projects[active].url} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-105"
              style={{ background: "var(--aurora)", color: "var(--snow)", boxShadow: "0 0 24px rgba(83,74,183,0.4)" }}>
              View site →
            </a>
            <a href="#contact"
              className="px-6 py-3 rounded-full text-sm font-semibold"
              style={{ border: "1px solid rgba(83,74,183,0.4)", color: "var(--aurora-light)", background: "rgba(83,74,183,0.1)" }}>
              I want this →
            </a>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
