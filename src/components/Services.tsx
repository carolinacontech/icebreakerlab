"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const plans = [
  {
    name: "Landing Page",
    tagline: "One page. One goal. Maximum impact.",
    description: "Perfect for businesses that need a focused, high-converting page to capture leads or promote a single offer.",
    featured: false,
    features: [
      "1 custom-designed page",
      "SEO optimized",
      "Mobile first",
      "Fast load — under 2s",
      "Contact or lead capture form",
      "Google Analytics setup",
      "Copy guidance included",
    ],
    cta: "Start your project",
    href: "#contacto",
  },
  {
    name: "Corporate Website",
    tagline: "Your complete digital presence.",
    description: "3 to 5 pages built to rank on Google and turn visitors into clients. The complete package for serious businesses.",
    featured: true,
    features: [
      "3–5 custom-designed pages",
      "Full SEO optimization",
      "Local SEO setup",
      "Mobile first",
      "Fast load — under 2s",
      "Contact & lead capture forms",
      "Google Analytics + Search Console",
      "Copy that converts",
      "Schema markup",
    ],
    cta: "Start your project",
    href: "#contacto",
  },
  {
    name: "E-commerce",
    tagline: "Sell online. Get paid. Grow.",
    description: "A complete online store with payment gateway integration — built to rank on Google and convert visitors into buyers.",
    featured: false,
    features: [
      "Custom store design",
      "Payment gateway integration",
      "Product catalog setup",
      "SEO optimized",
      "Mobile first",
      "Fast load",
      "Order & inventory management",
      "Google Analytics setup",
    ],
    cta: "Start your project",
    href: "#contacto",
  },
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--aurora-teal)" }}>What we build</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: "var(--snow)" }}>Our Services</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--aurora-light)" }}>
            Every website we build is custom-designed, SEO-optimized, and built to convert. Choose the right fit for your business.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`rounded-3xl flex flex-col relative ${plan.featured ? "pt-12 pb-8 px-8" : "p-8"}`}
              style={{
                background: plan.featured ? "rgba(83,74,183,0.18)" : "rgba(10,13,31,0.6)",
                border: plan.featured ? "1px solid rgba(83,74,183,0.6)" : "1px solid rgba(83,74,183,0.2)",
                backdropFilter: "blur(24px)",
                boxShadow: plan.featured ? "0 0 80px rgba(83,74,183,0.2)" : "none",
              }}
            >
              {/* Glow for featured */}
              {plan.featured && (
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(83,74,183,0.25) 0%, transparent 70%)"
                }} />
              )}

              {/* Most popular badge */}
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                    style={{ background: "var(--aurora)", color: "var(--snow)", boxShadow: "0 0 30px rgba(83,74,183,0.5)" }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="relative z-10 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--snow)" }}>{plan.name}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: "var(--aurora-teal)" }}>{plan.tagline}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--aurora-light)", opacity: 0.8 }}>{plan.description}</p>
                </div>

                {/* Divider */}
                <div className="h-px mb-6" style={{ background: "rgba(83,74,183,0.25)" }} />

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--aurora-light)" }}>
                      <span className="mt-0.5 shrink-0" style={{ color: "var(--aurora-teal)" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href={plan.href}
                  className="w-full py-3.5 rounded-full font-semibold text-sm text-center transition-transform hover:scale-[1.02] block"
                  style={plan.featured
                    ? { background: "linear-gradient(135deg, var(--aurora), #6B5CE7)", color: "var(--snow)", boxShadow: "0 0 40px rgba(83,74,183,0.45)" }
                    : { background: "rgba(83,74,183,0.15)", color: "var(--aurora-light)", border: "1px solid rgba(83,74,183,0.35)" }
                  }>
                  {plan.cta} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm mt-10" style={{ color: "rgba(175,169,236,0.45)" }}>
          All projects include SEO optimization, mobile-first design, and fast load times — from day one.
        </motion.p>

      </div>
    </section>
  );
}
