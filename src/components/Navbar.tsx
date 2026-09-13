"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CrackLink } from "./IceCrack";

// About y Contact son anclas que solo existen en la home, así que fuera de ella
// se reemplazan por un enlace a Home.
const homeLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const innerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const links = isHome ? homeLinks : innerLinks;

  useEffect(() => {
    // En la home el ScrollVideo ocupa 600vh, así que el navbar recién se activa
    // después. En el resto de páginas no existe: basta un scroll normal.
    const handler = () =>
      setScrolled(window.scrollY > (isHome ? window.innerHeight * 5.8 : 40));
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

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
        <a href="/" aria-label="Icebreaker Lab — Home">
          <Image
            src="/images/logo/logo.png"
            alt="Icebreaker Lab"
            width={224}
            height={44}
            className="object-contain"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm font-medium"
              style={{ letterSpacing: "0.01em" }}
            >
              {l.label}
            </a>
          ))}
          <CrackLink
            href={isHome ? "#contact" : "/#contact"}
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
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{ background: "var(--aurora-light)", transform: open ? "translateY(4px) rotate(45deg)" : "none" }} />
          <span className="block w-6 h-0.5 transition-all duration-300"
            style={{ background: "var(--aurora-light)", opacity: open ? 0 : 1 }} />
          <span className="block w-6 h-0.5 transition-all duration-300 origin-center"
            style={{ background: "var(--aurora-light)", transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }} />
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
