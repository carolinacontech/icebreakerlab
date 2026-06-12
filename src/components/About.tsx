"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "50+", label: "Proyectos entregados" },
  { value: "100%", label: "Clientes satisfechos" },
  { value: "3s", label: "Tiempo promedio de carga" },
  { value: "↑87%", label: "Mejora promedio en SEO" },
];

export default function About() {
  return (
    <section id="nosotros" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/silhouette.png"
          alt="Persona frente a la aurora boreal"
          fill
          className="object-cover object-center opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,13,31,0.9) 0%, rgba(38,33,92,0.6) 50%, rgba(10,13,31,0.9) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--aurora-teal)" }}
            >
              Quiénes somos
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: "var(--snow)" }}
            >
              Rompemos barreras de{" "}
              <span style={{ color: "var(--aurora-light)" }}>
                comunicación digital
              </span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "var(--ice-blue)" }}
            >
              Icebreaker Lab nació de una idea simple: la comunicación es el
              problema número uno de los negocios en internet. Muchas empresas
              tienen grandes productos pero sitios web que no conectan, no
              convencen y no convierten.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--aurora-light)" }}
            >
              Nosotros rompemos ese hielo. Creamos la infraestructura digital
              que hace que tu mensaje llegue claro, rápido y al lugar correcto
              en Google.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "rgba(83,74,183,0.15)",
                  border: "1px solid rgba(175,169,236,0.2)",
                }}
              >
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: "var(--aurora-light)" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--ice-blue)" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
