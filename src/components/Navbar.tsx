"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const links = [
  { label: "Services", href: "#servicios" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#nosotros" },
  { label: "Contact", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,13,31,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(83,74,183,0.2)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/images/logo/logo.png"
            alt="Icebreaker Lab"
            width={36}
            height={36}
            className="rounded-lg object-cover"
          />
          <span
            className="font-semibold tracking-widest text-sm uppercase"
            style={{ color: "var(--ice-tip)", letterSpacing: "0.2em" }}
          >
            Icebreaker Lab
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--aurora-light)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--snow)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--aurora-light)")
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              background: "var(--aurora)",
              color: "var(--snow)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "var(--aurora-light)";
              (e.target as HTMLElement).style.color = "var(--deep-aurora)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "var(--aurora)";
              (e.target as HTMLElement).style.color = "var(--snow)";
            }}
          >
            Let's talk
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-300"
              style={{ background: "var(--aurora-light)" }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(10,13,31,0.98)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm py-2"
              style={{ color: "var(--aurora-light)" }}
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
