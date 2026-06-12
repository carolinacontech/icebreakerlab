"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contacto"
      className="py-32"
      style={{ background: "var(--midnight)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--aurora-teal)" }}
          >
            Empecemos
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--snow)" }}
          >
            Rompamos el hielo
          </h2>
          <p style={{ color: "var(--ice-blue)" }}>
            Cuéntanos tu proyecto. Respondemos en menos de 24 horas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl p-10"
          style={{
            background: "rgba(38,33,92,0.25)",
            border: "1px solid rgba(83,74,183,0.3)",
            backdropFilter: "blur(20px)",
          }}
        >
          {sent ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🧊</div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: "var(--snow)" }}
              >
                ¡Hielo roto!
              </h3>
              <p style={{ color: "var(--aurora-light)" }}>
                Recibimos tu mensaje. Te contactamos en las próximas 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: "var(--aurora-light)" }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                    style={{
                      background: "rgba(10,13,31,0.6)",
                      border: "1px solid rgba(83,74,183,0.3)",
                      color: "var(--snow)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--aurora-light)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(83,74,183,0.3)")
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: "var(--aurora-light)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu@empresa.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                    style={{
                      background: "rgba(10,13,31,0.6)",
                      border: "1px solid rgba(83,74,183,0.3)",
                      color: "var(--snow)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--aurora-light)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(83,74,183,0.3)")
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "var(--aurora-light)" }}
                >
                  ¿Qué necesitas?
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(10,13,31,0.6)",
                    border: "1px solid rgba(83,74,183,0.3)",
                    color: "var(--aurora-light)",
                  }}
                >
                  <option value="">Selecciona un servicio</option>
                  <option>Landing Page</option>
                  <option>Website Corporativo</option>
                  <option>SEO Técnico</option>
                  <option>Estrategia Digital Completa</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "var(--aurora-light)" }}
                >
                  Cuéntanos tu proyecto
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe tu negocio, qué necesitas y cuándo quieres empezar..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300"
                  style={{
                    background: "rgba(10,13,31,0.6)",
                    border: "1px solid rgba(83,74,183,0.3)",
                    color: "var(--snow)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--aurora-light)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(83,74,183,0.3)")
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: "var(--aurora)",
                  color: "var(--snow)",
                  boxShadow: "0 0 40px rgba(83,74,183,0.35)",
                }}
              >
                Romper el hielo →
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
