import TraxisLogo from "./TraxisLogo";

interface Props {
  running: boolean; onToggle: () => void;
  elapsed: number; entityCount: number; activeCount: number; threatCount: number;
  compact?: boolean;
}

function fmt(s: number) {
  const h = String(Math.floor(s/3600)).padStart(2,"0");
  const m = String(Math.floor((s%3600)/60)).padStart(2,"0");
  const sec = String(s%60).padStart(2,"0");
  return `${h}:${m}:${sec}`;
}

const S: Record<string, React.CSSProperties> = {
  bar: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 14px", height:"40px", background:"hsl(220,16%,97%)", borderBottom:"1px solid hsl(220,12%,88%)", flexShrink:0, userSelect:"none", fontFamily:"'JetBrains Mono',monospace" },
  statLabel: { color:"hsl(220,10%,55%)", fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase" },
  statVal: { color:"hsl(220,15%,14%)", fontWeight:600 },
  threat: { color:"hsl(0,84%,45%)", fontWeight:700, fontSize:"11px" },
  btn: { display:"flex", alignItems:"center", gap:"6px", padding:"0 11px", height:"24px", fontSize:"10px", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", border:"1px solid", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", background:"transparent", transition:"all 0.15s" },
};

export default function TopBar({ running, onToggle, elapsed, entityCount, activeCount, threatCount, compact }: Props) {
  return (
    <div style={S.bar}>
      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
        <TraxisLogo size={22} showText={false} animate={running} />
        {!compact && (
          <span style={{ color:"hsl(220,10%,62%)", fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase", borderLeft:"1px solid hsl(220,12%,88%)", paddingLeft:"10px" }}>
            Operation Blackedge
          </span>
        )}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap: compact ? "12px" : "20px", fontSize:"11px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
          <span style={{ width:"7px", height:"7px", borderRadius:"50%", display:"inline-block", background: running ? "#16a34a" : "hsl(220,10%,68%)", animation: running ? "pulse-dot 2s ease-in-out infinite" : "none" }} />
          <span style={S.statLabel}>{running ? "LIVE" : "PAUSED"}</span>
        </div>
        {!compact && (
          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            <span style={S.statLabel}>Tracked:</span>
            <span style={S.statVal}>{activeCount}/{entityCount}</span>
          </div>
        )}
        {threatCount > 0 && (
          <span style={S.threat}>⚠ {threatCount} THREAT{threatCount > 1 ? "S" : ""}</span>
        )}
        {!compact && <span style={S.statLabel}>T+<span style={S.statVal}>{fmt(elapsed)}</span></span>}
      </div>

      <button onClick={onToggle}
        style={{ ...S.btn, borderColor: running ? "hsl(220,12%,82%)" : "hsl(0,84%,45%)", color: running ? "hsl(220,10%,52%)" : "hsl(0,84%,45%)" }}>
        {running ? "⏸ Pause" : "▶ Resume"}
      </button>
    </div>
  );
}
