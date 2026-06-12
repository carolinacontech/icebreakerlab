"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const stats = [
  { value: "50+", label: "Proyectos entregados" },
  { value: "100%", label: "Clientes satisfechos" },
  { value: "<2s", label: "Tiempo de carga" },
  { value: "+87%", label: "Mejora promedio en SEO" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="nosotros" ref={ref} className="relative py-40 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Full background with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: 1.2 }}>
        <Image src="/images/about/silhouette.png" alt="Silueta aurora boreal" fill className="object-cover object-center" quality={85} />
      </motion.div>
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(135deg, rgba(10,13,31,0.88) 0%, rgba(38,33,92,0.55) 50%, rgba(10,13,31,0.88) 100%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--aurora-teal)" }}>Quiénes somos</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: "var(--snow)" }}>
              Rompemos barreras de{" "}
              <span style={{ color: "var(--aurora-light)" }}>comunicación digital</span>
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--ice-blue)" }}>
              Icebreaker Lab nació de una idea simple: la comunicación es el problema número uno de los negocios en internet. Muchas empresas tienen grandes productos pero sitios que no conectan, no convencen y no convierten.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--aurora-light)" }}>
              Nosotros rompemos ese hielo. Creamos la infraestructura digital que hace que tu mensaje llegue claro, rápido y al lugar correcto en Google.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="rounded-2xl p-6 text-center"
                style={{ background: "rgba(10,13,31,0.5)", border: "1px solid rgba(175,169,236,0.2)", backdropFilter: "blur(20px)" }}
              >
                <div className="text-3xl font-bold mb-2" style={{ color: "var(--aurora-light)" }}>{s.value}</div>
                <div className="text-sm" style={{ color: "var(--ice-blue)" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
