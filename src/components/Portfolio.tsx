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
    img: "/images/portfolio/mockups/nodo-academy.png",
  },
  {
    title: "Market Open Media",
    category: "Corporate Website + SEO",
    result: "Google Maps & LSA lead generation",
    description: "Website for a local marketing agency specializing in Google Maps SEO and Local Services Ads — focused on generating inbound leads.",
    url: "https://www.marketopenmedia.com",
    img: "/images/portfolio/mockups/market-open-media.png",
  },
];

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="portfolio" ref={ref} className="relative py-40 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background — original overlay */}
      {projects.map((p, i) => (
        <motion.div key={i} className="absolute inset-0 z-0"
          animate={{ opacity: active === i ? 1 : 0 }} transition={{ duration: 0.8 }} style={{ y: bgY }}>
          <Image src={p.img} alt={p.title} fill className="object-cover object-top" quality={85} />
        </motion.div>
      ))}
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(135deg, rgba(10,13,31,0.92) 0%, rgba(38,33,92,0.7) 50%, rgba(10,13,31,0.92) 100%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--aurora-teal)" }}>Case studies</p>
          <h2 className="text-4xl md:text-6xl font-bold" style={{ color: "var(--snow)" }}>Our Work</h2>
        </motion.div>

        {/* Project selector */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          {projects.map((p, i) => (
            <motion.button key={p.title}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all"
              style={{
                background: active === i ? "var(--aurora)" : "rgba(10,13,31,0.5)",
                border: active === i ? "1px solid rgba(175,169,236,0.6)" : "1px solid rgba(83,74,183,0.3)",
                color: active === i ? "var(--snow)" : "var(--aurora-light)",
                backdropFilter: "blur(20px)",
                boxShadow: active === i ? "0 0 30px rgba(83,74,183,0.4)" : "none",
              }}>
              {p.title}
            </motion.button>
          ))}
        </div>

        {/* Large mockup image */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden w-full"
          style={{ height: "520px", border: "1px solid rgba(175,169,236,0.2)", boxShadow: "0 0 60px rgba(83,74,183,0.15)" }}>
          {projects.map((p, i) => (
            <motion.div key={i} className="absolute inset-0"
              animate={{ opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.6 }}>
                  <Image src={p.img} alt={p.title} fill className="object-contain object-top" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,13,31,0.9) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
                <div>
                  <span className="text-xs tracking-widest uppercase mb-1 block" style={{ color: "var(--aurora-teal)" }}>{p.category}</span>
                  <p className="text-2xl font-bold mb-1" style={{ color: "var(--snow)" }}>{p.title}</p>
                  <p className="text-sm font-medium" style={{ color: "var(--aurora-teal)" }}>{p.result}</p>
                  <p className="text-xs mt-1 max-w-lg" style={{ color: "rgba(175,169,236,0.7)" }}>{p.description}</p>
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 ml-6 px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                  style={{ background: "var(--aurora)", color: "var(--snow)", boxShadow: "0 0 30px rgba(83,74,183,0.5)" }}>
                  View site →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mt-8">
          <motion.a href="#contacto"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-4 rounded-full font-semibold"
            style={{ border: "1px solid var(--aurora)", color: "var(--aurora-light)", background: "rgba(83,74,183,0.1)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--aurora)"; (e.currentTarget as HTMLElement).style.color = "var(--snow)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(83,74,183,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--aurora-light)"; }}>
            I want a project like this →
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
