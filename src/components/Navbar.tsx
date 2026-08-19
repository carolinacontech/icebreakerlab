"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CrackLink } from "./IceCrack";

const links = [
  { label: "Services", href: "#servicios" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "#nosotros" },
  { label: "Contact", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // ScrollVideo section is 600vh — navbar only activates after it
    const handler = () => setScrolled(window.scrollY > window.innerHeight * 5.8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Background layer — always blurring, opacity controls visibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(10,13,31,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(83,74,183,0.2)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#">
          <Image
            src="/images/logo/logo.PNG"
            alt="Icebreaker Lab"
            width={224}
            height={44}
            className="object-contain"
            unoptimized
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(175,169,236,0.7)", letterSpacing: "0.01em" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--snow)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(175,169,236,0.7)")
              }
            >
              {l.label}
            </a>
          ))}
          <CrackLink
            href="#contacto"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
            style={{ background: "var(--aurora)", color: "var(--snow)", boxShadow: "0 0 20px rgba(83,74,183,0.4)" }}
          >
            Let's talk
          </CrackLink>
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
    </nav>
  );
}
