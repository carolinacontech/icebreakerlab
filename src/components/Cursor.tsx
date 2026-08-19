"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 35 });
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 35 });
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 18 });
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const hide = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, [mouseX, mouseY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}>
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
