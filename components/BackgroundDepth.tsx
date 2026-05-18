"use client";

import { useEffect, useRef } from "react";

/**
 * BackgroundDepth
 *
 * Slow-moving constellation/node-link mesh rendered to a fixed canvas behind
 * the entire site. Pure black base, transparent baby-blue + white nodes and
 * faint connecting traces. Opacity stays in the 5-15% band so high-contrast
 * white and ice-blue foreground text reads cleanly on top.
 *
 * Behavior:
 *  - prefers-reduced-motion: reduce -> renders one static dot field, no rAF.
 *  - device pixel ratio aware; capped at 1.75 to keep paint cheap on hi-DPI.
 *  - pauses rAF when document is hidden.
 */
export default function BackgroundDepth() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    type Node = { x: number; y: number; vx: number; vy: number; r: number; warm: boolean };
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;

    const seed = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density tuned for sparse / professional feel: ~ 1 node per 18,000 px^2
      const target = Math.max(28, Math.min(110, Math.round((width * height) / 18000)));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        // Slow drift; baseline ~6-12 seconds across one viewport
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.6 + Math.random() * 1.1,
        warm: Math.random() < 0.18, // ~18% pure white, rest ice-blue
      }));
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.warm ? "rgba(238, 244, 250, 0.55)" : "rgba(143, 216, 255, 0.55)";
        ctx.fill();
      }
    };

    const drawAnimated = () => {
      ctx.clearRect(0, 0, width, height);

      // Faint connecting traces — only close pairs, low alpha
      const linkDistance = 130;
      const linkDistSq = linkDistance * linkDistance;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dsq = dx * dx + dy * dy;
          if (dsq < linkDistSq) {
            const alpha = (1 - dsq / linkDistSq) * 0.085;
            ctx.strokeStyle = `rgba(143, 216, 255, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.warm
          ? "rgba(238, 244, 250, 0.55)"
          : "rgba(143, 216, 255, 0.55)";
        ctx.fill();
      }
    };

    seed();
    if (reducedMotion) {
      drawStatic();
    } else {
      const tick = () => {
        if (!running) return;
        drawAnimated();
        frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }

    const handleResize = () => {
      seed();
      if (reducedMotion) drawStatic();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        if (frame) window.cancelAnimationFrame(frame);
      } else if (!reducedMotion && !running) {
        running = true;
        const tick = () => {
          if (!running) return;
          drawAnimated();
          frame = window.requestAnimationFrame(tick);
        };
        frame = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="bg-depth"
      aria-hidden="true"
      style={{ opacity: 0.11 }}
    />
  );
}
