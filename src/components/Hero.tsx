"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import AuroraCanvas from "./AuroraCanvas";

type Particle = {
  width: number;
  height: number;
  left: string;
  top: string;
  color: string;
  duration: number;
  delay: number;
};

const COLORS = ["var(--aurora-light)", "var(--ice-blue)", "var(--aurora-teal)"];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    width: Math.random() * 3 + 1,
    height: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    color: COLORS[i % 3],
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
  }));
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(18));
  }, []);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const imgX = useTransform(springX, [-0.5, 0.5], ["-2%", "2%"]);
  const imgY = useTransform(springY, [-0.5, 0.5], ["-2%", "2%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(clientX / width - 0.5);
    mouseY.set(clientY / height - 0.5);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background image with mouse parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: imgX, y: imgY, scale: 1.06 }}
      >
        <Image
          src="/images/hero/hero-aurora.png"
          alt="Aurora boreal sobre iceberg ártico"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
      </motion.div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,13,31,0.5) 0%, rgba(38,33,92,0.25) 50%, rgba(10,13,31,0.82) 100%)",
        }}
      />

      {/* Animated aurora waves */}
      <AuroraCanvas />

      {/* Floating particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
              background: p.color,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 text-center">
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
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--aurora-teal)" }}
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
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
          <motion.span
            style={{ color: "var(--aurora-light)" }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Tu negocio comunica.
          </motion.span>
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
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full font-semibold text-base"
            style={{
              background: "var(--aurora)",
              color: "var(--snow)",
              boxShadow: "0 0 40px rgba(83,74,183,0.5)",
            }}
          >
            Empieza tu proyecto
          </motion.a>
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full font-semibold text-base"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(175,169,236,0.4)",
              color: "var(--aurora-light)",
            }}
          >
            Ver nuestro trabajo
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--aurora-light)", opacity: 0.5 }}
        >
          Descubre más
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, var(--aurora-light), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
