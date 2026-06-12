"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-aurora.png"
          alt="Aurora boreal sobre iceberg ártico"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,13,31,0.55) 0%, rgba(38,33,92,0.3) 50%, rgba(10,13,31,0.85) 100%)",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                i % 3 === 0
                  ? "var(--aurora-light)"
                  : i % 3 === 1
                  ? "var(--ice-blue)"
                  : "var(--aurora-teal)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-8"
          style={{
            background: "rgba(83,74,183,0.2)",
            border: "1px solid rgba(175,169,236,0.3)",
            color: "var(--aurora-light)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--aurora-teal)" }}
          />
          Agencia de Websites & SEO
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style={{ color: "var(--snow)" }}
        >
          Rompemos el hielo.
          <br />
          <span style={{ color: "var(--aurora-light)" }}>
            Tu negocio comunica.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--ice-blue)" }}
        >
          Como el iceberg, hay mucho más debajo de la superficie.
          Construimos websites que conquistan Google y convierten visitantes
          en clientes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contacto"
            className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--aurora)",
              color: "var(--snow)",
              boxShadow: "0 0 40px rgba(83,74,183,0.4)",
            }}
          >
            Empieza tu proyecto
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(175,169,236,0.4)",
              color: "var(--aurora-light)",
            }}
          >
            Ver nuestro trabajo
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--aurora-light)", opacity: 0.6 }}>
            Descubre más
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 rounded-full"
            style={{ background: "linear-gradient(to bottom, var(--aurora-light), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
