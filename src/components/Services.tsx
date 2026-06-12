"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const services = [
  {
    icon: "🧊",
    title: "Landing Pages",
    description:
      "Páginas de conversión diseñadas para capturar leads y vender. Cargamos en menos de 2 segundos.",
    tags: ["Conversión", "A/B Testing", "CRO"],
  },
  {
    icon: "🌊",
    title: "Websites Corporativos",
    description:
      "Tu presencia digital completa, profesional y escalable. Diseño a medida, sin templates genéricos.",
    tags: ["Diseño custom", "CMS", "Escalable"],
  },
  {
    icon: "🔍",
    title: "SEO Técnico",
    description:
      "Posicionamos tu negocio en Google de forma orgánica. Auditoría, optimización y crecimiento continuo.",
    tags: ["On-page", "Core Web Vitals", "Schema"],
  },
  {
    icon: "⚡",
    title: "Performance",
    description:
      "Lighthouse 100/100. Velocidad extrema que Google premia con mejores posiciones en el ranking.",
    tags: ["Lighthouse 100", "CDN", "Caché"],
  },
  {
    icon: "📊",
    title: "Analytics & Growth",
    description:
      "Datos reales para decisiones reales. Configuramos GA4, heatmaps y reportes mensuales de crecimiento.",
    tags: ["GA4", "Heatmaps", "Reportes"],
  },
  {
    icon: "🔮",
    title: "Estrategia Digital",
    description:
      "No solo construimos. Diseñamos la estrategia completa para que tu web trabaje para ti 24/7.",
    tags: ["Estrategia", "Funnel", "Automatización"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="servicios" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background image with scroll parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: 1.15 }}>
          <Image
            src="/images/services/underwater.png"
            alt="Iceberg bajo el agua"
            fill
            className="object-cover object-center opacity-20"
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--night) 0%, rgba(10,13,31,0.7) 50%, var(--night) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--aurora-teal)" }}
          >
            Lo que hay debajo
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--snow)" }}>
            Nuestros Servicios
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--ice-blue)" }}
          >
            Como el iceberg, el 90% del trabajo es invisible. SEO, rendimiento,
            arquitectura y estrategia debajo de cada pixel.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl p-8 cursor-default relative overflow-hidden"
              style={{
                background: "rgba(38,33,92,0.2)",
                border: "1px solid rgba(83,74,183,0.25)",
                backdropFilter: "blur(10px)",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(83,74,183,0.25), rgba(38,33,92,0.2) 70%)`;
                e.currentTarget.style.borderColor = "rgba(175,169,236,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(38,33,92,0.2)";
                e.currentTarget.style.borderColor = "rgba(83,74,183,0.25)";
              }}
            >
              <div className="text-4xl mb-5">{s.icon}</div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: "var(--snow)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--aurora-light)" }}
              >
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(93,202,165,0.1)",
                      color: "var(--aurora-teal)",
                      border: "1px solid rgba(93,202,165,0.2)",
                    }}
                  >
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
