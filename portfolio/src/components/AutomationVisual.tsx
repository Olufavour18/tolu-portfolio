import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Editable workflow steps — change labels/captions/positions without touching animation logic.
 * Example: Form → n8n → Sheets → Slack
 */
const FLOW_STEPS = [
  { label: "Lead", caption: "Inbound", x: 70, y: 200, captionAbove: true },
  { label: "Agent", caption: "Qualify & reply", x: 170, y: 110, captionAbove: true },
  { label: "CRM", caption: "Record updated", x: 280, y: 200, captionAbove: false },
  { label: "Sent", caption: "WhatsApp reply", x: 360, y: 110, captionAbove: true },
] as const;

const CYCLE_MS = 8000;
const VIEW_W = 420;
const VIEW_H = 340;

type NetNode = { x: number; y: number; vx: number; vy: number };
type NetEdge = { a: number; b: number; t: number; speed: number };

function curvedPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = mx - dy * 0.18;
  const cy = my + dx * 0.18;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

function pointOnQuadratic(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number
): { x: number; y: number } {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = mx - dy * 0.18;
  const cy = my + dx * 0.18;
  const u = 1 - t;
  return {
    x: u * u * x1 + 2 * u * t * cx + t * t * x2,
    y: u * u * y1 + 2 * u * t * cy + t * t * y2,
  };
}

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

export default function AutomationVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [tick, setTick] = useState(0);

  // Network layer state (refs so rAF can mutate without React churn)
  const netNodes = useRef<NetNode[]>([]);
  const netEdges = useRef<NetEdge[]>([]);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const paths = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < FLOW_STEPS.length - 1; i++) {
      const a = FLOW_STEPS[i];
      const b = FLOW_STEPS[i + 1];
      out.push(curvedPath(a.x, a.y, b.x, b.y));
    }
    return out;
  }, []);

  // Init network
  useEffect(() => {
    const nodes: NetNode[] = [];
    for (let i = 0; i < 10; i++) {
      nodes.push({
        x: 30 + Math.random() * (VIEW_W - 60),
        y: 30 + Math.random() * (VIEW_H - 60),
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      });
    }
    netNodes.current = nodes;
    const edges: NetEdge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.hypot(dx, dy) < 140) {
          edges.push({ a: i, b: j, t: Math.random(), speed: 0.002 + Math.random() * 0.003 });
        }
      }
    }
    netEdges.current = edges.slice(0, 14);
  }, []);

  // IntersectionObserver — pause when off-screen
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

  // Tab visibility
  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Animation loop
  useEffect(() => {
    if (reduced) return;

    const running = () => visible && tabVisible;

    const frame = (now: number) => {
      if (!running()) {
        startRef.current = null;
        rafRef.current = requestAnimationFrame(frame);
        return;
      }
      if (startRef.current == null) startRef.current = now;
      const elapsed = now - startRef.current;

      // Drift network nodes
      for (const n of netNodes.current) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 20 || n.x > VIEW_W - 20) n.vx *= -1;
        if (n.y < 20 || n.y > VIEW_H - 20) n.vy *= -1;
      }
      for (const e of netEdges.current) {
        e.t += e.speed;
        if (e.t > 1) e.t = 0;
      }

      setTick(elapsed % CYCLE_MS);
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, visible, tabVisible]);

  // Timeline progress 0..1 within cycle
  const t = reduced ? 1 : tick / CYCLE_MS;

  // Reveal nodes sequentially over first ~70% of cycle, then hold, then fade
  const nodeOpacity = (i: number) => {
    if (reduced) return 1;
    const appear = 0.06 + i * 0.14;
    const fadeStart = 0.82;
    if (t < appear) return 0;
    if (t < appear + 0.08) return (t - appear) / 0.08;
    if (t < fadeStart) return 1;
    return Math.max(0, 1 - (t - fadeStart) / 0.18);
  };

  const pathOpacity = (i: number) => {
    if (reduced) return 0.7;
    const appear = 0.1 + i * 0.14;
    const fadeStart = 0.82;
    if (t < appear) return 0;
    if (t < appear + 0.1) return ((t - appear) / 0.1) * 0.85;
    if (t < fadeStart) return 0.85;
    return Math.max(0, 0.85 * (1 - (t - fadeStart) / 0.18));
  };

  // Traveler along current segment
  let traveler: { x: number; y: number; on: boolean } = { x: 0, y: 0, on: false };
  if (!reduced && t > 0.08 && t < 0.78) {
    const local = (t - 0.08) / 0.7;
    const seg = Math.min(FLOW_STEPS.length - 2, Math.floor(local * (FLOW_STEPS.length - 1)));
    const segT = (local * (FLOW_STEPS.length - 1)) % 1;
    const a = FLOW_STEPS[seg];
    const b = FLOW_STEPS[seg + 1];
    const p = pointOnQuadratic(a.x, a.y, b.x, b.y, segT);
    traveler = { x: p.x, y: p.y, on: true };
  }

  const agentPulse =
    !reduced && t > 0.22 && t < 0.45
      ? 1 + 0.12 * Math.sin(((t - 0.22) / 0.23) * Math.PI * 4)
      : 1;

  const showCheck = (i: number) => {
    if (reduced) return i >= 2;
    // CRM (2) and Sent (3)
    if (i === 2) return t > 0.48 && t < 0.85;
    if (i === 3) return t > 0.62 && t < 0.85;
    return false;
  };

  const dashOffset = reduced ? 0 : -tick * 0.04;

  return (
    <div ref={rootRef} className="w-full h-full">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-full"
        role="img"
        aria-label="Animated automation workflow: a lead comes in, the AI agent qualifies and replies, the CRM record updates, and a WhatsApp reply is sent"
      >
        {/* Network layer (behind) */}
        <g aria-hidden="true" opacity={0.35}>
          {netEdges.current.map((e, i) => {
            const a = netNodes.current[e.a];
            const b = netNodes.current[e.b];
            if (!a || !b) return null;
            const px = a.x + (b.x - a.x) * e.t;
            const py = a.y + (b.y - a.y) * e.t;
            return (
              <g key={`ne-${i}`}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="var(--color-line)"
                  strokeWidth={1}
                />
                {!reduced && (
                  <circle cx={px} cy={py} r={1.6} fill="var(--color-pulse)" opacity={0.7} />
                )}
              </g>
            );
          })}
          {netNodes.current.map((n, i) => (
            <circle
              key={`nn-${i}`}
              cx={n.x}
              cy={n.y}
              r={2.2}
              fill="var(--color-text-faint)"
              opacity={0.5}
            />
          ))}
        </g>

        {/* Workflow paths */}
        <g fill="none" stroke="var(--color-line)" strokeWidth={1.5} strokeDasharray="5 5">
          {paths.map((d, i) => (
            <path
              key={`path-${i}`}
              d={d}
              opacity={pathOpacity(i)}
              strokeDashoffset={dashOffset}
            />
          ))}
        </g>

        {/* Traveler */}
        {traveler.on && (
          <g>
            <circle
              cx={traveler.x}
              cy={traveler.y}
              r={10}
              fill="var(--color-accent)"
              opacity={0.2}
            />
            <circle cx={traveler.x} cy={traveler.y} r={4.5} fill="var(--color-accent)" />
          </g>
        )}

        {/* Workflow nodes */}
        {FLOW_STEPS.map((step, i) => {
          const op = nodeOpacity(i);
          const scale = i === 1 ? agentPulse : 1;
          const r = 18 * scale;
          return (
            <g key={step.label} opacity={op}>
              <circle
                cx={step.x}
                cy={step.y}
                r={r + 4}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1}
                opacity={0.25}
              />
              <circle
                cx={step.x}
                cy={step.y}
                r={r}
                fill="var(--color-surface-2)"
                stroke="var(--color-accent)"
                strokeWidth={1.5}
              />
              <text
                x={step.x}
                y={step.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--color-text)"
                style={{ fontSize: 10, fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                {step.label}
              </text>
              <text
                x={step.x}
                y={step.captionAbove ? step.y - r - 10 : step.y + r + 14}
                textAnchor="middle"
                fill="var(--color-text-muted)"
                style={{ fontSize: 10, fontFamily: "var(--font-body)" }}
              >
                {step.caption}
              </text>
              {showCheck(i) && (
                <g transform={`translate(${step.x + r - 4}, ${step.y - r - 2})`}>
                  <circle r={7} fill="var(--color-pulse)" />
                  <path
                    d="M -3 0 L -1 2.5 L 3.5 -2.5"
                    fill="none"
                    stroke="var(--color-bg)"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
