"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 35 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 35 });
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 18 });
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 18 });

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = wrapperRef.current;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (el) el.style.opacity = "1";
    };
    const hide = () => {
      if (el) el.style.opacity = "0";
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", hide, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} style={{ opacity: 0, transition: "opacity 0.3s" }}>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          border: "1px solid rgba(175,169,236,0.35)",
          boxShadow: "0 0 12px rgba(83,74,183,0.15)",
        }}
      />
      {/* Fast dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 7,
          height: 7,
          background: "#AFA9EC",
          boxShadow: "0 0 14px rgba(175,169,236,0.9), 0 0 4px rgba(93,202,165,0.5)",
        }}
      />
    </div>
  );
}
