"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const plans = [
  {
    name: "Landing Page",
    tagline: "One page. One goal. One result.",
    description: "Perfect if you want one powerful page that grabs attention and turns visitors into leads or clients — fast.",
    featured: false,
    features: [
      "1 beautifully designed page",
      "Shows up on Google searches",
      "Looks great on phones & computers",
      "Loads in under 2 seconds",
      "Contact form so clients can reach you",
      "Connected to Google Analytics so you see your visits",
      "We help you write the content",
    ],
    cta: "Start your project",
    href: "#contacto",
  },
  {
    name: "Corporate Website",
    tagline: "Your complete online presence.",
    description: "3 to 5 pages that tell your full story, show your services, and help clients find you on Google — everything a serious business needs.",
    featured: true,
    features: [
      "3–5 beautifully designed pages",
      "Built so Google recommends your business",
      "Shows up when locals search for what you offer",
      "Looks perfect on phones & computers",
      "Loads in under 2 seconds",
      "Contact forms so clients can reach you easily",
      "Connected to Google so you can track your growth",
      "Clear, persuasive writing included",
    ],
    cta: "Start your project",
    href: "#contacto",
  },
  {
    name: "E-commerce",
    tagline: "Your store, open 24/7.",
    description: "A complete online store where your customers can browse your products and pay — right from your website, any time of day.",
    featured: false,
    features: [
      "Custom-designed online store",
      "Secure payment system included",
      "Your products showcased beautifully",
      "Built so Google recommends your store",
      "Looks great on phones & computers",
      "Easy to manage your orders",
      "Connected to Google so you track your sales",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`rounded-3xl flex flex-col relative ${plan.featured ? "pt-14 pb-10 px-8 md:-mt-4 md:-mb-4" : "p-8"}`}
              style={{
                background: plan.featured
                  ? "linear-gradient(160deg, rgba(83,74,183,0.35) 0%, rgba(40,30,120,0.5) 100%)"
                  : "rgba(10,13,31,0.75)",
                border: plan.featured
                  ? "1px solid rgba(175,169,236,0.5)"
                  : "1px solid rgba(83,74,183,0.18)",
                backdropFilter: "blur(28px)",
                boxShadow: plan.featured
                  ? "0 0 100px rgba(83,74,183,0.35), inset 0 1px 0 rgba(255,255,255,0.08)"
                  : "0 0 30px rgba(0,0,0,0.3)",
              }}
            >
              {/* Glow for featured */}
              {plan.featured && (
                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
                  background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(107,92,231,0.3) 0%, transparent 70%)"
                }} />
              )}

              {/* Most popular badge */}
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                    style={{ background: "linear-gradient(135deg, var(--aurora), #6B5CE7)", color: "var(--snow)", boxShadow: "0 4px 24px rgba(83,74,183,0.6)" }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="relative z-10 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--snow)" }}>{plan.name}</h3>
                  <p className="text-sm font-semibold mb-3" style={{ color: plan.featured ? "var(--aurora-teal)" : "rgba(93,202,165,0.7)" }}>{plan.tagline}</p>
                  <p className="text-sm leading-relaxed" style={{ color: plan.featured ? "rgba(240,244,255,0.85)" : "rgba(175,169,236,0.7)" }}>{plan.description}</p>
                </div>

                {/* Divider */}
                <div className="h-px mb-6" style={{ background: plan.featured ? "rgba(175,169,236,0.25)" : "rgba(83,74,183,0.15)" }} />

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm"
                      style={{ color: plan.featured ? "rgba(240,244,255,0.9)" : "rgba(175,169,236,0.75)" }}>
                      <span className="mt-0.5 shrink-0 font-bold" style={{ color: "var(--aurora-teal)" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href={plan.href}
                  className="w-full py-4 rounded-full font-semibold text-sm text-center transition-all hover:scale-[1.02] hover:opacity-90 block"
                  style={plan.featured
                    ? { background: "linear-gradient(135deg, #7C6FE8, #5DCAA5)", color: "var(--snow)", boxShadow: "0 0 40px rgba(83,74,183,0.5)", fontWeight: 700 }
                    : { background: "rgba(83,74,183,0.12)", color: "rgba(175,169,236,0.9)", border: "1px solid rgba(83,74,183,0.3)" }
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
