import { useEffect, useRef, useState } from "react";

const VIEW_W = 300;
const VIEW_H = 240;
const CYCLE_MS = 9000;
const PULSE_EVERY_MS = 4500;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function AboutOverlapVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [t, setT] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const frame = (now: number) => {
      if (!(visible && tabVisible)) {
        startRef.current = null;
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      if (startRef.current == null) startRef.current = now;
      setT((now - startRef.current) % CYCLE_MS);
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduced, visible, tabVisible]);

  // Drift a few pixels toward/away over the 9s cycle
  const drift = reduced ? 0 : Math.sin((t / CYCLE_MS) * Math.PI * 2) * 6;
  const leftCx = 118 - drift;
  const rightCx = 182 + drift;
  const cy = 115;
  const r = 62;

  // Soft ring pulse every ~4.5s in the overlap
  const pulsePhase = reduced ? -1 : (t % PULSE_EVERY_MS) / PULSE_EVERY_MS;
  const pulseActive = pulsePhase >= 0 && pulsePhase < 0.35;
  const pulseR = pulseActive ? 4 + pulsePhase * 40 : 0;
  const pulseOp = pulseActive ? Math.max(0, 1 - pulsePhase / 0.35) : 0;

  return (
    <div ref={rootRef} className="w-full max-w-[260px] md:max-w-none">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Two overlapping circles: Automation and Data, joined in the middle by the systems Tolu builds"
      >
        <g aria-hidden="true">
          {/* Left — Automation (primary blue) */}
          <circle
            cx={leftCx}
            cy={cy}
            r={r}
            fill="var(--color-accent)"
            fillOpacity={0.16}
            stroke="var(--color-accent)"
            strokeWidth={1.5}
          />
          {/* Right — Data (theme foreground / white in dark) */}
          <circle
            cx={rightCx}
            cy={cy}
            r={r}
            fill="var(--color-text)"
            fillOpacity={0.16}
            stroke="var(--color-text)"
            strokeWidth={1.5}
          />

          {/* Pulse ring in overlap */}
          {pulseActive && (
            <>
              <circle
                cx={(leftCx + rightCx) / 2}
                cy={cy}
                r={pulseR}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                opacity={pulseOp * 0.7}
              />
              <circle
                cx={(leftCx + rightCx) / 2}
                cy={cy}
                r={3.5}
                fill="var(--color-accent)"
                opacity={pulseOp}
              />
            </>
          )}
          {!pulseActive && !reduced && (
            <circle
              cx={(leftCx + rightCx) / 2}
              cy={cy}
              r={3}
              fill="var(--color-accent)"
              opacity={0.85}
            />
          )}
          {reduced && (
            <circle
              cx={(leftCx + rightCx) / 2}
              cy={cy}
              r={3}
              fill="var(--color-accent)"
              opacity={0.85}
            />
          )}

          <text
            x={leftCx - 18}
            y={cy - 4}
            textAnchor="middle"
            fill="var(--color-accent)"
            style={{ fontSize: 12, fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            Automation
          </text>
          <text
            x={leftCx - 18}
            y={cy + 14}
            textAnchor="middle"
            fill="var(--color-text-muted)"
            style={{ fontSize: 9, fontFamily: "var(--font-body)" }}
          >
            n8n, AI agents
          </text>

          <text
            x={rightCx + 18}
            y={cy - 4}
            textAnchor="middle"
            fill="var(--color-text)"
            style={{ fontSize: 12, fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            Data
          </text>
          <text
            x={rightCx + 18}
            y={cy + 14}
            textAnchor="middle"
            fill="var(--color-text-muted)"
            style={{ fontSize: 9, fontFamily: "var(--font-body)" }}
          >
            SQL, Power BI
          </text>

          <text
            x={(leftCx + rightCx) / 2}
            y={cy + 36}
            textAnchor="middle"
            fill="var(--color-text-muted)"
            style={{ fontSize: 10, fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Systems
          </text>
        </g>
      </svg>
    </div>
  );
}
