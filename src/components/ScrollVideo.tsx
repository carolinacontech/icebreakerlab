"use client";
import { useEffect, useRef } from "react";
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

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let src = video.currentSrc || video.src;

    once(document.documentElement, "touchstart", () => { video.play(); video.pause(); });

    // Video scrub timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    once(video, "loadedmetadata", () => {
      tl.fromTo(video, { currentTime: 0 }, { currentTime: video.duration || 1 });
    });

    // Preload blob for smooth scrubbing
    setTimeout(() => {
      if (typeof window.fetch === "function") {
        fetch(src)
          .then((r) => r.blob())
          .then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            const t = video.currentTime;
            once(document.documentElement, "touchstart", () => { video.play(); video.pause(); });
            video.setAttribute("src", blobURL);
            video.currentTime = t + 0.01;
          });
      }
    }, 800);

    // Set initial state for all slides BEFORE revealing container
    const totalSlides = slides.length;
    slides.forEach((slide, i) => {
      const el = document.getElementById(slide.id);
      if (!el) return;
      gsap.set(el, i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 });
    });

    // Reveal container now that all initial states are locked in
    if (slidesRef.current) {
      slidesRef.current.style.opacity = "1";
      slidesRef.current.style.transition = "opacity 0.4s ease";
    }

    // Text slide animations
    slides.forEach((slide, i) => {
      const el = document.getElementById(slide.id);
      if (!el) return;

      const start = i === 0 ? "top top" : `${(i / totalSlides) * 100}% top`;
      const end = i === totalSlides - 1 ? "bottom bottom" : `${((i + 1) / totalSlides) * 100}% top`;

      // Fade in (all except first)
      if (i > 0) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: container,
              start,
              end: `+=${window.innerHeight * 0.3}`,
              scrub: true,
            },
          }
        );
      }

      // Fade out (all except last)
      if (i < totalSlides - 1) {
        gsap.fromTo(
          el,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -40,
            duration: 0.4,
            scrollTrigger: {
              trigger: container,
              start: end,
              end: `+=${window.innerHeight * 0.3}`,
              scrub: true,
            },
          }
        );
      }
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "600vh" }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Video */}
        <video
          ref={videoRef}
          src="/video/iceberg.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Base dark overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "rgba(10,13,31,0.55)" }} />
        {/* Edge gradient for cinematic feel */}
        <div className="absolute inset-0 z-[11]" style={{
          background: "linear-gradient(to bottom, rgba(10,13,31,0.4) 0%, transparent 20%, transparent 75%, rgba(10,13,31,0.6) 100%)",
        }} />

        {/* Text slides — hidden until GSAP initializes to prevent flash */}
        <div ref={slidesRef} className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none" style={{ opacity: 0 }}>
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              id={slide.id}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {/* Label pill */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-8"
                style={{
                  background: "rgba(83,74,183,0.2)",
                  border: "1px solid rgba(175,169,236,0.3)",
                  color: "var(--aurora-light)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--aurora-teal)" }} />
                {slide.label}
              </div>

              {/* Title */}
              <h2
                className="font-bold mb-4 leading-tight"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  color: "var(--snow)",
                  textShadow: "0 0 80px rgba(83,74,183,0.5)",
                  whiteSpace: "pre-line",
                  maxWidth: "800px",
                }}
              >
                {slide.title}
              </h2>

              {/* Subtitle */}
              {slide.subtitle && (
                <h3
                  className="font-semibold mb-6"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--aurora-light)" }}
                >
                  {slide.subtitle}
                </h3>
              )}

              {/* Body */}
              <p
                className="max-w-xl mx-auto mb-10 leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "var(--ice-tip)", opacity: 0.85 }}
              >
                {slide.body}
              </p>

              {/* CTA */}
              {slide.cta && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                  <a
                    href={slide.cta.href}
                    className="px-8 py-4 rounded-full font-semibold text-base transition-transform hover:scale-105"
                    style={{
                      background: "var(--aurora)",
                      color: "var(--snow)",
                      boxShadow: "0 0 50px rgba(83,74,183,0.55)",
                    }}
                  >
                    {slide.cta.label}
                  </a>
                  <a
                    href="#portfolio"
                    className="px-8 py-4 rounded-full font-semibold text-base transition-transform hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(175,169,236,0.45)",
                      color: "var(--aurora-light)",
                    }}
                  >
                    See our work
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Scroll indicator — first slide only */}
        <div
          id="scroll-indicator"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: "1.5px solid rgba(175,169,236,0.4)" }}
          >
            <div
              className="w-1 h-2 rounded-full animate-bounce"
              style={{ background: "var(--aurora-light)" }}
            />
          </div>
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--aurora-light)", opacity: 0.45 }}>
            Scroll to explore
          </span>
        </div>
      </div>
    </div>
  );
}
