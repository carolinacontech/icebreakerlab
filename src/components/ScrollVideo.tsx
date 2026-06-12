"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function once<T extends EventTarget>(
  el: T,
  event: string,
  fn: EventListenerOrEventListenerObject
) {
  const wrapped = (e: Event) => {
    el.removeEventListener(event, wrapped);
    (fn as (e: Event) => void)(e);
  };
  el.addEventListener(event, wrapped);
}

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let src = video.currentSrc || video.src;

    // iOS activation
    once(document.documentElement, "touchstart", () => {
      video.play();
      video.pause();
    });

    const tl = gsap.timeline({
      defaults: { duration: 1 },
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
            once(document.documentElement, "touchstart", () => {
              video.play();
              video.pause();
            });
            video.setAttribute("src", blobURL);
            video.currentTime = t + 0.01;
          });
      }
    }, 800);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} id="scroll-container" style={{ height: "500vh" }} className="relative">
      {/* Sticky video wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/video/iceberg.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,13,31,0.35) 0%, transparent 30%, transparent 70%, rgba(10,13,31,0.7) 100%)",
          }}
        />

        {/* HERO text — fades out as you scroll */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
          style={{ pointerEvents: "none" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-8"
            style={{
              background: "rgba(83,74,183,0.2)",
              border: "1px solid rgba(175,169,236,0.3)",
              color: "var(--aurora-light)",
              pointerEvents: "auto",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--aurora-teal)" }}
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Agencia de Websites & SEO
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{
              color: "var(--snow)",
              textShadow: "0 0 80px rgba(83,74,183,0.5)",
            }}
          >
            Rompemos el hielo.
            <br />
            <motion.span
              style={{ color: "var(--aurora-light)" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Tu negocio comunica.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "var(--ice-tip)", opacity: 0.85 }}
          >
            Como el iceberg, hay mucho más debajo de la superficie.
            Construimos websites que conquistan Google y convierten visitantes en clientes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ pointerEvents: "auto" }}
          >
            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-semibold text-base"
              style={{
                background: "var(--aurora)",
                color: "var(--snow)",
                boxShadow: "0 0 50px rgba(83,74,183,0.55)",
              }}
            >
              Empieza tu proyecto
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-semibold text-base"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(175,169,236,0.45)",
                color: "var(--aurora-light)",
              }}
            >
              Ver nuestro trabajo
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight * 1.5, behavior: "smooth" })
          }
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: "1.5px solid rgba(175,169,236,0.4)" }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: "var(--aurora-light)" }}
              animate={{ opacity: [1, 0, 1], y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--aurora-light)", opacity: 0.5 }}
          >
            Scroll
          </span>
        </motion.div>
      </div>
    </div>
  );
}
