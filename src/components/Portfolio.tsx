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
    img: "https://res.cloudinary.com/dddfxmqta/image/upload/v1781705847/banner_isrwxq.png",
  },
  {
    title: "Market Open Media",
    category: "Corporate Website + SEO",
    result: "Google Maps & LSA lead generation",
    description: "Website for a local marketing agency specializing in Google Maps SEO and Local Services Ads — focused on generating inbound leads.",
    url: "https://www.marketopenmedia.com",
    img: "/images/portfolio/workspace-2.png",
  },
];

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="portfolio" ref={ref} className="relative py-40 overflow-hidden min-h-screen flex flex-col justify-center">
      {projects.map((p, i) => (
        <motion.div key={i} className="absolute inset-0 z-0"
          animate={{ opacity: active === i ? 1 : 0 }} transition={{ duration: 0.8 }} style={{ y: bgY }}>
          <Image src={p.img} alt={p.title} fill className="object-cover object-center" quality={85} />
        </motion.div>
      ))}
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(135deg, rgba(10,13,31,0.85) 0%, rgba(38,33,92,0.5) 50%, rgba(10,13,31,0.85) 100%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--aurora-teal)" }}>Case studies</p>
          <h2 className="text-4xl md:text-6xl font-bold" style={{ color: "var(--snow)" }}>Our Work</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            {projects.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                onClick={() => setActive(i)}
                whileHover={{ x: 6 }}
                className="rounded-2xl p-6 cursor-pointer relative overflow-hidden"
                style={{
                  background: active === i ? "rgba(83,74,183,0.3)" : "rgba(10,13,31,0.5)",
                  border: active === i ? "1px solid rgba(175,169,236,0.6)" : "1px solid rgba(83,74,183,0.2)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {active === i && (
                  <motion.div layoutId="activeBar" className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ background: "var(--aurora-light)" }} />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs tracking-widest uppercase mb-1 block" style={{ color: "var(--aurora-teal)" }}>{p.category}</span>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--snow)" }}>{p.title}</h3>
                  </div>
                  <motion.span animate={{ x: active === i ? 4 : 0 }} style={{ color: "var(--aurora-light)", fontSize: "1.3rem" }}>→</motion.span>
                </div>
                <p className="text-sm mt-1 font-medium" style={{ color: "var(--aurora-teal)" }}>{p.result}</p>
                {active === i && (
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(175,169,236,0.7)" }}>{p.description}</p>
                )}
              </motion.div>
            ))}
            <motion.a href="#contacto"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="mt-4 px-8 py-4 rounded-full font-semibold text-center"
              style={{ border: "1px solid var(--aurora)", color: "var(--aurora-light)", background: "rgba(83,74,183,0.1)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--aurora)"; (e.currentTarget as HTMLElement).style.color = "var(--snow)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(83,74,183,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--aurora-light)"; }}
            >
              I want a project like this →
            </motion.a>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3]"
            style={{ border: "1px solid rgba(175,169,236,0.2)" }}>
            {projects.map((p, i) => (
              <motion.div key={i} className="absolute inset-0"
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
                transition={{ duration: 0.7 }}>
                <Image src={p.img} alt={p.title} fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,13,31,0.75) 0%, transparent 40%)" }} />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-xs tracking-widest uppercase" style={{ color: "var(--aurora-teal)" }}>{p.category}</span>
                    <p className="text-xl font-bold mt-1" style={{ color: "var(--snow)" }}>{p.title}</p>
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-full font-semibold shrink-0 ml-4 pointer-events-auto"
                    style={{ background: "rgba(83,74,183,0.5)", color: "var(--snow)", border: "1px solid rgba(175,169,236,0.3)", backdropFilter: "blur(8px)" }}>
                    View site →
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
