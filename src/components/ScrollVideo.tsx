"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const particles = [
  { x: "12%", y: "30%", delay: 0, size: 3, color: 0 },
  { x: "78%", y: "25%", delay: 1.5, size: 2, color: 1 },
  { x: "45%", y: "65%", delay: 0.7, size: 4, color: 0 },
  { x: "88%", y: "58%", delay: 2.5, size: 2, color: 1 },
  { x: "22%", y: "70%", delay: 3.2, size: 3, color: 0 },
  { x: "60%", y: "18%", delay: 1.1, size: 2, color: 1 },
  { x: "35%", y: "45%", delay: 2, size: 2, color: 0 },
  { x: "70%", y: "80%", delay: 0.5, size: 3, color: 1 },
];

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSlide, setActiveSlide] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 22 });

  const orb1X = useTransform(springX, [-1, 1], [-30, 30]);
  const orb1Y = useTransform(springY, [-1, 1], [-20, 20]);
  const orb2X = useTransform(springX, [-1, 1], [35, -35]);
  const orb2Y = useTransform(springY, [-1, 1], [22, -22]);
  const orb3X = useTransform(springX, [-1, 1], [-18, 18]);
  const orb3Y = useTransform(springY, [-1, 1], [-12, 12]);
  const rotateX = useTransform(springY, [-1, 1], [4, -4]);
  const rotateY = useTransform(springX, [-1, 1], [-5, 5]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setMounted(true);
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const src = video.currentSrc || video.src;
    once(document.documentElement, "touchstart", () => { video.play(); video.pause(); });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: container, start: "top top", end: "bottom bottom", scrub: true },
    });
    once(video, "loadedmetadata", () => {
      tl.fromTo(video, { currentTime: 0 }, { currentTime: video.duration || 1 });
    });

    setTimeout(() => {
      if (typeof window.fetch === "function") {
        fetch(src).then(r => r.blob()).then(blob => {
          const blobURL = URL.createObjectURL(blob);
          const t = video.currentTime;
          video.setAttribute("src", blobURL);
          video.currentTime = t + 0.01;
        });
      }
    }, 800);

    const totalSlides = slides.length;
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      setScrollProgress(progress);

      if (progress < 0.32) {
        setActiveSlide(-1);
      } else {
        const textProgress = (progress - 0.32) / 0.68;
        const index = Math.min(totalSlides - 1, Math.floor(textProgress * totalSlides));
        setActiveSlide(index);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Veil: invisible until 15% scroll, fully opaque at 40%
  const overlayOpacity = Math.min(0.72, Math.max(0, (scrollProgress - 0.15) / 0.25));
  const elementsOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.20) / 0.15));

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
        />

        {/* Dark veil — fades in with scroll */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(10,13,31,1)", opacity: overlayOpacity, transition: "opacity 0.05s linear" }}
        />

        {/* Edge gradients */}
        <div className="absolute inset-0 z-[11] pointer-events-none" style={{
          background: "linear-gradient(to bottom, rgba(10,13,31,0.25) 0%, transparent 12%, transparent 82%, rgba(10,13,31,0.6) 100%)",
        }} />

        {/* Orbs with mouse parallax */}
        {mounted && (
          <div className="absolute inset-0 z-[12] pointer-events-none" style={{ opacity: elementsOpacity }}>
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 700, height: 700,
                left: "-8%", top: "-15%",
                x: orb1X, y: orb1Y,
                background: "radial-gradient(circle, rgba(83,74,183,0.2) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 500, height: 500,
                right: "-6%", bottom: "5%",
                x: orb2X, y: orb2Y,
                background: "radial-gradient(circle, rgba(93,202,165,0.14) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
              animate={{ scale: [1, 1.14, 1] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 320, height: 320,
                right: "22%", top: "8%",
                x: orb3X, y: orb3Y,
                background: "radial-gradient(circle, rgba(175,169,236,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{ x: [0, 18, -12, 0], y: [0, -14, 18, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            {/* Floating particles */}
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: p.size * 3,
                  height: p.size * 3,
                  left: p.x,
                  top: p.y,
                  background: p.color === 0 ? "rgba(175,169,236,0.85)" : "rgba(93,202,165,0.85)",
                  boxShadow: `0 0 ${p.size * 5}px ${p.color === 0 ? "rgba(175,169,236,0.7)" : "rgba(93,202,165,0.7)"}`,
                }}
                animate={{ y: [0, -28, 0], opacity: [0.25, 0.9, 0.25], scale: [1, 1.5, 1] }}
                transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
              />
            ))}
          </div>
        )}

        {/* Slide content */}
        <div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence mode="wait">
            {slide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 70, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.96 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-widest uppercase mb-8"
                  style={{
                    background: "rgba(83,74,183,0.22)",
                    border: "1px solid rgba(175,169,236,0.35)",
                    color: "var(--aurora-light)",
                    backdropFilter: "blur(16px)",
                    transform: "translateZ(40px)",
                    boxShadow: "0 0 30px rgba(83,74,183,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}>
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.6, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ background: "var(--aurora-teal)" }}
                  />
                  {slide.label}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold mb-5 leading-none"
                  style={{
                    fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)",
                    color: "var(--snow)",
                    textShadow: "0 0 100px rgba(83,74,183,0.75), 0 2px 40px rgba(0,0,0,0.9), 0 0 4px rgba(175,169,236,0.4)",
                    whiteSpace: "pre-line",
                    maxWidth: "900px",
                    transform: "translateZ(65px)",
                    letterSpacing: "-0.03em",
                  }}>
                  {slide.title}
                </motion.h2>

                {slide.subtitle && (
                  <motion.h3
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24, duration: 0.55 }}
                    className="font-semibold mb-6"
                    style={{
                      fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
                      color: "var(--aurora-light)",
                      transform: "translateZ(48px)",
                      textShadow: "0 0 40px rgba(83,74,183,0.4)",
                    }}>
                    {slide.subtitle}
                  </motion.h3>
                )}

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="max-w-xl mx-auto mb-10 leading-relaxed"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                    color: "rgba(240,244,255,0.72)",
                    transform: "translateZ(32px)",
                  }}>
                  {slide.body}
                </motion.p>

                {slide.cta && (
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.38, duration: 0.55 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
                    style={{ transform: "translateZ(80px)" }}>
                    <a href={slide.cta.href}
                      className="px-10 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #534AB7, #6B5CE7)",
                        color: "var(--snow)",
                        boxShadow: "0 0 60px rgba(83,74,183,0.65), 0 0 120px rgba(83,74,183,0.25)",
                        letterSpacing: "0.01em",
                      }}>
                      {slide.cta.label}
                    </a>
                    <a href="#portfolio"
                      className="px-10 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(175,169,236,0.4)",
                        color: "var(--aurora-light)",
                        backdropFilter: "blur(16px)",
                      }}>
                      See our work
                    </a>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Slide progress dots */}
        {activeSlide >= 0 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 items-center"
          >
            {slides.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full w-[3px]"
                animate={{
                  height: i === activeSlide ? 28 : 8,
                  opacity: i === activeSlide ? 1 : 0.3,
                  background: i === activeSlide ? "var(--aurora-teal)" : "rgba(175,169,236,0.6)",
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}

        {/* Scroll indicator */}
        {activeSlide === -1 && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
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
