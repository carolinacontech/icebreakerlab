"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const services = [
  { icon: "🧊", title: "Landing Pages", description: "High-converting pages built to capture leads and drive sales. Under 2 seconds load time, every time.", tags: ["Conversion", "A/B Testing", "CRO"] },
  { icon: "🌊", title: "Corporate Websites", description: "Your complete digital presence — professional, scalable, and custom-built. No templates. No compromises.", tags: ["Custom design", "CMS", "Scalable"] },
  { icon: "🔍", title: "Technical SEO", description: "We rank your business on Google organically. Full audit, optimization, and continuous growth.", tags: ["On-page", "Core Web Vitals", "Schema"] },
  { icon: "⚡", title: "Performance", description: "Lighthouse 100/100. Extreme speed that Google rewards with higher rankings.", tags: ["Lighthouse 100", "CDN", "Caching"] },
  { icon: "📊", title: "Analytics & Growth", description: "Real data for real decisions. GA4, heatmaps, and monthly growth reports.", tags: ["GA4", "Heatmaps", "Reports"] },
  { icon: "🔮", title: "Digital Strategy", description: "We don't just build. We design the full strategy so your website works for you 24/7.", tags: ["Strategy", "Funnel", "Automation"] },
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--aurora-teal)" }}>What's beneath</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: "var(--snow)" }}>Our Services</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--ice-blue)" }}>
            Like the iceberg, 90% of the work is invisible — SEO, performance, architecture and strategy beneath every pixel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="rounded-2xl p-8 relative overflow-hidden cursor-default"
              style={{ background: "rgba(10,13,31,0.55)", border: "1px solid rgba(83,74,183,0.25)", backdropFilter: "blur(20px)" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.background = `radial-gradient(220px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(83,74,183,0.3), rgba(10,13,31,0.55) 70%)`;
                e.currentTarget.style.borderColor = "rgba(175,169,236,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(10,13,31,0.55)";
                e.currentTarget.style.borderColor = "rgba(83,74,183,0.25)";
              }}
            >
              <div className="text-4xl mb-5">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--snow)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--aurora-light)" }}>{s.description}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "rgba(93,202,165,0.12)", color: "var(--aurora-teal)", border: "1px solid rgba(93,202,165,0.2)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
