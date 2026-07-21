"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

function once<T extends EventTarget>(el: T, event: string, fn: (e: Event) => void) {
  const wrapped = (e: Event) => { el.removeEventListener(event, wrapped); fn(e); };
  el.addEventListener(event, wrapped);
}

const slides = [
  {
    id: "slide-0",
    label: "Websites & SEO Agency",
    title: "We break the ice.",
    subtitle: "Your business, finally heard.",
    body: "Most websites exist. Ours convert.",
    cta: null,
  },
  {
    id: "slide-1",
    label: "The surface",
    title: "You're only showing\nthe tip.",
    subtitle: null,
    body: "Great product. Invisible online. Your website should be your best salesperson — not your best-kept secret.",
    cta: null,
  },
  {
    id: "slide-2",
    label: "The depth",
    title: "The real work\nhappens below.",
    subtitle: null,
    body: "SEO, architecture, performance, strategy — invisible to the eye. Everything to Google.",
    cta: null,
  },
  {
    id: "slide-3",
    label: "The result",
    title: "Ranked by Google.\nChosen by people.",
    subtitle: null,
    body: "We build the digital infrastructure that makes your message reach the right people, at the right time.",
    cta: { label: "Start your project", href: "#servicios" },
  },
];

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSlide, setActiveSlide] = useState(-1);
  const [mounted, setMounted] = useState(false);

  // Framer Motion scroll — no React re-renders
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Scroll-driven values (pure CSS, zero re-renders)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15, 0.42], [0, 0, 0.75]);
  const elementsOpacity = useTransform(scrollYProgress, [0.22, 0.38], [0, 1]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 25 });

  const orb1X = useTransform(springX, [-1, 1], [-25, 25]);
  const orb1Y = useTransform(springY, [-1, 1], [-15, 15]);
  const orb2X = useTransform(springX, [-1, 1], [30, -30]);
  const orb2Y = useTransform(springY, [-1, 1], [18, -18]);
  const rotateX = useTransform(springY, [-1, 1], [3, -3]);
  const rotateY = useTransform(springX, [-1, 1], [-4, 4]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setMounted(true);
    const video = videoRef.current;
    if (!video) return;

    once(document.documentElement, "touchstart", () => { video.play(); video.pause(); });

    // Single scroll subscriber — drives both video scrub and slide index
    const totalSlides = slides.length;
    const unsubscribe = scrollYProgress.on("change", (p) => {
      // Video scrub
      if (video.readyState >= 2 && video.duration) {
        video.currentTime = p * video.duration;
      }
      // Slide index
      if (p < 0.32) {
        setActiveSlide(prev => prev !== -1 ? -1 : prev);
      } else {
        const idx = Math.min(totalSlides - 1, Math.floor(((p - 0.32) / 0.68) * totalSlides));
        setActiveSlide(prev => prev !== idx ? idx : prev);
      }
    });

    return () => { unsubscribe(); };
  }, [scrollYProgress]);

  const slide = activeSlide >= 0 ? slides[activeSlide] : null;

  return (
    <div ref={containerRef} style={{ height: "700vh" }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden" onMouseMove={handleMouseMove}>

        {/* Video */}
        <video
          ref={videoRef}
          src="/video/iceberg.mp4"
          muted playsInline preload="auto"
          poster="/images/hero/hero-aurora.png"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "auto" }}
        />

        {/* Dark veil — GPU-accelerated, zero re-renders */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(10,13,31,1)", opacity: overlayOpacity, willChange: "opacity" }}
        />

        {/* Edge gradient */}
        <div className="absolute inset-0 z-[11] pointer-events-none" style={{
          background: "linear-gradient(to bottom, rgba(10,13,31,0.2) 0%, transparent 12%, transparent 84%, rgba(10,13,31,0.55) 100%)",
        }} />

        {/* Orbs — appear with veil, respond to mouse */}
        <motion.div className="absolute inset-0 z-[12] pointer-events-none" style={{ opacity: elementsOpacity }}>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 650, height: 650,
              left: "-5%", top: "-12%",
              x: orb1X, y: orb1Y,
              background: "radial-gradient(circle, rgba(83,74,183,0.18) 0%, transparent 70%)",
              filter: "blur(70px)",
              willChange: "transform",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 480, height: 480,
              right: "-4%", bottom: "8%",
              x: orb2X, y: orb2Y,
              background: "radial-gradient(circle, rgba(93,202,165,0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
              willChange: "transform",
            }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />

          {/* Particles — only 5, GPU-composited */}
          {mounted && [
            { x: "14%", y: "32%", delay: 0, color: "rgba(175,169,236,0.85)" },
            { x: "80%", y: "24%", delay: 1.8, color: "rgba(93,202,165,0.85)" },
            { x: "60%", y: "68%", delay: 0.9, color: "rgba(175,169,236,0.85)" },
            { x: "25%", y: "72%", delay: 2.4, color: "rgba(93,202,165,0.85)" },
            { x: "72%", y: "48%", delay: 1.2, color: "rgba(175,169,236,0.85)" },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 8, height: 8,
                left: p.x, top: p.y,
                background: p.color,
                boxShadow: `0 0 12px ${p.color}`,
                willChange: "transform, opacity",
              }}
              animate={{ y: [0, -22, 0], opacity: [0.2, 0.85, 0.2] }}
              transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))}
        </motion.div>

        {/* Slide content */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none" style={{ perspective: "1200px" }}>
          <AnimatePresence mode="wait">
            {slide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              >
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-widest uppercase mb-8"
                  style={{
                    transform: "translateZ(35px)",
                    background: "rgba(83,74,183,0.22)",
                    border: "1px solid rgba(175,169,236,0.35)",
                    color: "var(--aurora-light)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 0 24px rgba(83,74,183,0.2)",
                  }}>
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{ background: "var(--aurora-teal)" }}
                  />
                  {slide.label}
                </div>

                <h2
                  className="font-bold mb-5 leading-none"
                  style={{
                    fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)",
                    color: "var(--snow)",
                    textShadow: "0 0 80px rgba(83,74,183,0.7), 0 2px 30px rgba(0,0,0,0.9)",
                    whiteSpace: "pre-line",
                    maxWidth: "900px",
                    transform: "translateZ(55px)",
                    letterSpacing: "-0.03em",
                  }}>
                  {slide.title}
                </h2>

                {slide.subtitle && (
                  <h3
                    className="font-semibold mb-6"
                    style={{
                      fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
                      color: "var(--aurora-light)",
                      transform: "translateZ(42px)",
                    }}>
                    {slide.subtitle}
                  </h3>
                )}

                <p
                  className="max-w-xl mx-auto mb-10 leading-relaxed"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                    color: "rgba(240,244,255,0.72)",
                    transform: "translateZ(28px)",
                  }}>
                  {slide.body}
                </p>

                {slide.cta && (
                  <div
                    className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
                    style={{ transform: "translateZ(70px)" }}>
                    <a href={slide.cta.href}
                      className="px-10 py-4 rounded-full font-bold text-base transition-transform hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #534AB7, #6B5CE7)",
                        color: "var(--snow)",
                        boxShadow: "0 0 50px rgba(83,74,183,0.6)",
                      }}>
                      {slide.cta.label}
                    </a>
                    <a href="#portfolio"
                      className="px-10 py-4 rounded-full font-semibold text-base transition-transform hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(175,169,236,0.4)",
                        color: "var(--aurora-light)",
                        backdropFilter: "blur(14px)",
                      }}>
                      See our work
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        {activeSlide >= 0 && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 items-center">
            {slides.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full w-[3px]"
                animate={{
                  height: i === activeSlide ? 26 : 8,
                  opacity: i === activeSlide ? 1 : 0.3,
                  background: i === activeSlide ? "var(--aurora-teal)" : "rgba(175,169,236,0.5)",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        {activeSlide === -1 && mounted && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
          >
            <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
              style={{ border: "1.5px solid rgba(175,169,236,0.45)" }}>
              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 rounded-full"
                style={{ background: "var(--aurora-light)" }}
              />
            </div>
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--aurora-light)", opacity: 0.45 }}>
              Scroll to explore
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
