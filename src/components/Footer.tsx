"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden py-12 px-6">
      <div className="absolute inset-0 z-0">
        <Image src="/images/textures/ice-macro-2.png" alt="Textura hielo" fill className="object-cover opacity-10" />
        <div className="absolute inset-0" style={{ background: "rgba(10,13,31,0.96)", borderTop: "1px solid rgba(83,74,183,0.15)" }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image src="/images/logo/logo.png" alt="Icebreaker Lab" width={28} height={28} className="rounded-lg object-cover" />
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--ice-tip)", letterSpacing: "0.2em" }}>
            Icebreaker Lab
          </span>
        </div>
        <p className="text-xs" style={{ color: "var(--aurora-light)", opacity: 0.4 }}>
          © 2025 Icebreaker Lab · Websites that break the ice
        </p>
        <div className="flex gap-6">
          {["Instagram", "LinkedIn", "Behance"].map((s) => (
            <a key={s} href="#" className="text-xs transition-all duration-200"
              style={{ color: "var(--aurora-light)", opacity: 0.5 }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.color = "var(--aurora-light)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "0.5"; }}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
