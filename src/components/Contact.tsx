"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="contacto" ref={ref} className="relative py-40 overflow-hidden min-h-screen flex flex-col justify-center">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: 1.15 }}>
        <Image src="/images/textures/ice-macro.png" alt="Ice texture" fill className="object-cover object-center" quality={85} />
      </motion.div>
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(to bottom, rgba(10,13,31,0.92) 0%, rgba(38,33,92,0.75) 50%, rgba(10,13,31,0.92) 100%)"
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--aurora-teal)" }}>Let's begin</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--snow)" }}>Break the ice.</h2>
          <p style={{ color: "var(--ice-blue)" }}>Tell us about your project. We respond within 24 hours.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl p-10"
          style={{ background: "rgba(10,13,31,0.6)", border: "1px solid rgba(83,74,183,0.3)", backdropFilter: "blur(24px)" }}>
          {sent ? (
            <div className="text-center py-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                className="text-6xl mb-6">🧊</motion.div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--snow)" }}>Ice broken!</h3>
              <p style={{ color: "var(--aurora-light)" }}>We got your message. We'll reach out within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[{ label: "Name", type: "text", placeholder: "Your name" }, { label: "Email", type: "email", placeholder: "you@company.com" }].map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm mb-2" style={{ color: "var(--aurora-light)" }}>{f.label}</label>
                    <input type={f.type} required placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(83,74,183,0.3)", color: "var(--snow)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--aurora-light)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(83,74,183,0.3)")} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: "var(--aurora-light)" }}>What do you need?</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(83,74,183,0.3)", color: "var(--aurora-light)" }}>
                  <option value="">Select a service</option>
                  <option>Landing Page</option>
                  <option>Corporate Website</option>
                  <option>Technical SEO</option>
                  <option>Full Digital Strategy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: "var(--aurora-light)" }}>Tell us about your project</label>
                <textarea rows={5} required placeholder="Describe your business, what you need, and when you want to start..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(83,74,183,0.3)", color: "var(--snow)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--aurora-light)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(83,74,183,0.3)")} />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-full font-semibold text-base"
                style={{ background: "var(--aurora)", color: "var(--snow)", boxShadow: "0 0 40px rgba(83,74,183,0.4)" }}>
                Break the ice →
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
