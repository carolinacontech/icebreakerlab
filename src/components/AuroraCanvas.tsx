"use client";
import { useEffect, useRef } from "react";

export default function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const waves = [
      { color: "83,74,183",  speed: 0.0008, amp: 120, y: 0.35, alpha: 0.18 },
      { color: "175,169,236", speed: 0.0006, amp: 80,  y: 0.28, alpha: 0.12 },
      { color: "93,202,165", speed: 0.0010, amp: 60,  y: 0.42, alpha: 0.08 },
      { color: "24,95,165",  speed: 0.0007, amp: 100, y: 0.20, alpha: 0.10 },
      { color: "83,74,183",  speed: 0.0005, amp: 140, y: 0.55, alpha: 0.07 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      waves.forEach((w) => {
        const baseY = canvas.height * w.y;
        ctx.beginPath();
        ctx.moveTo(0, baseY);

        for (let x = 0; x <= canvas.width; x += 4) {
          const y =
            baseY +
            Math.sin(x * 0.003 + t * w.speed * 1000) * w.amp +
            Math.sin(x * 0.007 + t * w.speed * 700) * (w.amp * 0.4);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - w.amp, 0, baseY + w.amp);
        grad.addColorStop(0, `rgba(${w.color}, 0)`);
        grad.addColorStop(0.5, `rgba(${w.color}, ${w.alpha})`);
        grad.addColorStop(1, `rgba(${w.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
