"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "E-commerce de lujo",
    category: "Website + SEO",
    result: "+340% tráfico orgánico",
    img: "/images/portfolio/workspace.png",
  },
  {
    title: "Landing SaaS B2B",
    category: "Landing Page",
    result: "4.2% tasa de conversión",
    img: "/images/portfolio/workspace-2.png",
  },
  {
    title: "Portal corporativo",
    category: "Website + Analytics",
    result: "Lighthouse 100/100",
    img: "/images/portfolio/workspace-3.png",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32" style={{ background: "var(--midnight)" }}>
      <div className="max-w-7xl mx-auto px-6">
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
            Casos de éxito
          </p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "var(--snow)" }}>
            Nuestro Portfolio
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl overflow-hidden group cursor-pointer"
              style={{ border: "1px solid rgba(83,74,183,0.2)" }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,13,31,0.9) 0%, transparent 60%)",
                  }}
                />
                <span
                  className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(83,74,183,0.7)",
                    color: "var(--lavender)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {p.category}
                </span>
              </div>
              <div
                className="p-6"
                style={{ background: "rgba(38,33,92,0.3)" }}
              >
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--snow)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--aurora-teal)" }}
                >
                  {p.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid var(--aurora)",
              color: "var(--aurora-light)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--aurora)";
              (e.currentTarget as HTMLElement).style.color = "var(--snow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--aurora-light)";
            }}
          >
            Quiero un proyecto así →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
