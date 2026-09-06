import { useReducedMotion } from "framer-motion";

// A quiet line-art graphic of connected nodes, standing in for a workflow
// graph. Purely decorative — literal to the "automation" subject matter
// without leaning on glow or gradient effects.
export default function WorkflowBackground() {
  const prefersReducedMotion = useReducedMotion();

  const nodes = [
    { cx: 60, cy: 60 },
    { cx: 220, cy: 40 },
    { cx: 370, cy: 130 },
    { cx: 200, cy: 200 },
    { cx: 40, cy: 220 },
    { cx: 340, cy: 280 },
  ];

  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [1, 3],
    [3, 4],
    [2, 5],
    [3, 2],
  ];

  return (
    <svg
      viewBox="0 0 420 340"
      className="w-full h-full"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="var(--color-border)" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
          />
        ))}
      </g>
      {!prefersReducedMotion &&
        edges.map(([a, b], i) => (
          <circle key={`p-${i}`} r="2.5" fill="var(--color-accent-2)">
            <animateMotion
              dur={`${5 + i}s`}
              repeatCount="indefinite"
              path={`M${nodes[a].cx},${nodes[a].cy} L${nodes[b].cx},${nodes[b].cy}`}
            />
          </circle>
        ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={i === 1 || i === 3 ? 6 : 4}
          fill="var(--color-bg)"
          stroke={i === 1 || i === 3 ? "var(--color-accent)" : "var(--color-text-faint)"}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}
