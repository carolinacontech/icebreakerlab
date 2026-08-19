"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const values = [
  { icon: "🎨", title: "Custom built", body: "No templates. Every site is designed from scratch around your brand." },
  { icon: "🔍", title: "Google ready", body: "Built to rank from day one — no extra setup or plugins needed." },
  { icon: "⚡", title: "Fast launch", body: "From first call to live website in 3–4 weeks." },
  { icon: "🎯", title: "Built to convert", body: "Every page designed to turn visitors into real clients." },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="nosotros" ref={ref} className="relative py-24 overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: 1.2 }}>
        <Image src="/images/about/silhouette.png" alt="Arctic aurora silhouette" fill className="object-cover object-center" quality={85} />
      </motion.div>
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(135deg, rgba(10,13,31,0.88) 0%, rgba(38,33,92,0.55) 50%, rgba(10,13,31,0.88) 100%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p className="section-eyebrow mb-4">Who we are</p>
            <h2 className="section-title mb-6">
              We remove the barriers between{" "}
              <span style={{ color: "var(--aurora-light)" }}>great businesses and great websites.</span>
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--ice-blue)" }}>
              Icebreaker Lab was born from a simple truth: communication is the number one problem for businesses online. Great products, invisible websites.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--aurora-light)" }}>
              We break that ice. We build the digital infrastructure that makes your message reach the right people, fast — and in the right place on Google.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-2xl p-6"
                style={{ background: "rgba(10,13,31,0.55)", border: "1px solid rgba(83,74,183,0.25)", backdropFilter: "blur(20px)" }}>
                <div className="text-2xl mb-3">{v.icon}</div>
                <div className="font-semibold mb-1" style={{ color: "var(--snow)", fontSize: "15px" }}>{v.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: "rgba(175,169,236,0.75)" }}>{v.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
