interface Props {
  size?: number;
  color?: string;
  showText?: boolean;
  textSize?: number;
  animate?: boolean;
}

export default function TraxisLogo({
  size = 28,
  color = "hsl(0,84%,55%)",
  showText = true,
  textSize = 13,
  animate = false,
}: Props) {
  const r1 = 10;   // outer ring radius
  const r2 = 6.5;  // inner ring radius
  const r3 = 2.8;  // center ring
  const gap = 18;  // gap angle in degrees at each quadrant

  // Arc helper: draw arc from startAngle to endAngle on radius r (SVG coords, center at 0,0)
  function arc(radius: number, startDeg: number, endDeg: number) {
    const s = (startDeg * Math.PI) / 180;
    const e = (endDeg * Math.PI) / 180;
    const x1 = radius * Math.cos(s);
    const y1 = radius * Math.sin(s);
    const x2 = radius * Math.cos(e);
    const y2 = radius * Math.sin(e);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  }

  const half = gap / 2;
  // 4 arcs for outer ring, gaps at top/right/bottom/left
  const outerArcs = [
    arc(r1, 90 + half, 180 - half),  // bottom-left
    arc(r1, 180 + half, 270 - half), // top-left
    arc(r1, 270 + half, 360 - half), // top-right
    arc(r1, 0 + half, 90 - half),    // bottom-right
  ];

  // Inner dashes
  const innerArcs = [
    arc(r2, 90 + half * 1.5, 180 - half * 1.5),
    arc(r2, 180 + half * 1.5, 270 - half * 1.5),
    arc(r2, 270 + half * 1.5, 360 - half * 1.5),
    arc(r2, 0 + half * 1.5, 90 - half * 1.5),
  ];

  // Crosshair lines - slightly beyond outer ring, gap near center
  const ch = r1 + 3.5;
  const cg = r3 + 1.2; // gap near center

  // 45° tick marks
  const tickOuter = r1 + 1.8;
  const tickInner = r1 + 0.2;
  const ticks45 = [45, 135, 225, 315].map(deg => {
    const rad = (deg * Math.PI) / 180;
    return {
      x1: tickInner * Math.cos(rad),
      y1: tickInner * Math.sin(rad),
      x2: tickOuter * Math.cos(rad),
      y2: tickOuter * Math.sin(rad),
    };
  });

  // Small corner markers at 45° on outer ring
  const cornerSize = 1.6;
  const corners = [45, 135, 225, 315].map(deg => {
    const rad = (deg * Math.PI) / 180;
    const cx = (r1 - 0.5) * Math.cos(rad);
    const cy = (r1 - 0.5) * Math.sin(rad);
    return { cx, cy };
  });

  const viewSize = (r1 + 5) * 2;
  const vb = viewSize;
  const svgSize = size;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: `${Math.round(size * 0.35)}px`, flexShrink: 0 }}>
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`${-vb / 2} ${-vb / 2} ${vb} ${vb}`}
        fill="none"
        style={{ flexShrink: 0, overflow: "visible" }}
      >
        {/* Outer glow */}
        <circle cx="0" cy="0" r={r1 + 1} stroke={color} strokeWidth="0.4" opacity="0.12" />

        {/* Outer ring arcs */}
        {outerArcs.map((d, i) => (
          <path key={`o${i}`} d={d} stroke={color} strokeWidth="1.1" strokeLinecap="square" />
        ))}

        {/* Inner ring arcs */}
        {innerArcs.map((d, i) => (
          <path key={`i${i}`} d={d} stroke={color} strokeWidth="0.65" strokeLinecap="square" opacity="0.6" />
        ))}

        {/* 45° tick marks */}
        {ticks45.map((t, i) => (
          <line key={`t${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={color} strokeWidth="0.8" opacity="0.55" />
        ))}

        {/* Crosshairs */}
        {/* Horizontal */}
        <line x1={-ch} y1="0" x2={-cg} y2="0" stroke={color} strokeWidth="0.7" />
        <line x1={cg} y1="0" x2={ch} y2="0" stroke={color} strokeWidth="0.7" />
        {/* Vertical */}
        <line x1="0" y1={-ch} x2="0" y2={-cg} stroke={color} strokeWidth="0.7" />
        <line x1="0" y1={cg} x2="0" y2={ch} stroke={color} strokeWidth="0.7" />

        {/* Center ring */}
        <circle cx="0" cy="0" r={r3} stroke={color} strokeWidth="0.8" />

        {/* Center dot */}
        <circle cx="0" cy="0" r="1.1" fill={color}
          style={animate ? { animation: "traxis-pulse 2.2s ease-in-out infinite" } : {}}
        />

        {/* Corner bracket markers */}
        {corners.map((c, i) => (
          <rect key={`c${i}`}
            x={c.cx - cornerSize / 2}
            y={c.cy - cornerSize / 2}
            width={cornerSize}
            height={cornerSize}
            fill={color} opacity="0.35"
            transform={`rotate(${i * 90} ${c.cx} ${c.cy})`}
          />
        ))}

        {/* Scan line (animated) */}
        {animate && (
          <line x1="0" y1="0" x2={r1} y2="0" stroke={color} strokeWidth="0.6" opacity="0.5"
            style={{ transformOrigin: "0 0", animation: "traxis-scan 3s linear infinite" }}
          />
        )}
      </svg>

      {showText && (
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: `${textSize}px`,
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color,
          lineHeight: 1,
        }}>
          TRAXIS
        </span>
      )}

      <style>{`
        @keyframes traxis-pulse {
          0%, 100% { opacity: 1; r: 1.1; }
          50% { opacity: 0.5; r: 1.5; }
        }
        @keyframes traxis-scan {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
