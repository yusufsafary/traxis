import { useState, useMemo } from "react";
import { Entity, EntityType } from "../lib/simulation";

interface Props { entities: Entity[]; selected: Entity | null; onSelect: (e: Entity) => void; }

const STATUS_DOT: Record<string,string> = {
  ACTIVE:"#4ade80", MOVING:"#60a5fa", STATIONARY:"#facc15", LOST:"hsl(210,15%,35%)", THREAT:"hsl(0,84%,55%)"
};
const STATUS_COLOR: Record<string,string> = {
  ACTIVE:"#4ade80", MOVING:"#60a5fa", STATIONARY:"#facc15", LOST:"hsl(210,15%,45%)", THREAT:"hsl(0,84%,55%)"
};
const TYPE_LABEL: Record<EntityType,string> = { drone:"UAV", vehicle:"VEH", personnel:"PRS" };

type TypeFilter = "all" | EntityType;
const TYPE_FILTERS: { id: TypeFilter; label: string }[] = [
  { id:"all", label:"ALL" },
  { id:"drone", label:"UAV" },
  { id:"vehicle", label:"VEH" },
  { id:"personnel", label:"PRS" },
];

const C = {
  bg: "hsl(220,16%,8%)",
  border: "hsl(220,12%,16%)",
  muted: "hsl(210,15%,45%)",
  red: "hsl(0,84%,55%)",
  font: "'JetBrains Mono',monospace",
};

export default function EntityList({ entities, selected, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filtered = useMemo(() => {
    let list = entities;
    if (typeFilter !== "all") list = list.filter(e => e.type === typeFilter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(e =>
        e.label.toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q) ||
        TYPE_LABEL[e.type].toLowerCase().includes(q)
      );
    }
    // Sort: threats first, then by status, then label
    return [...list].sort((a, b) => {
      const aT = a.threat || a.status === "THREAT" ? 0 : a.status === "LOST" ? 2 : 1;
      const bT = b.threat || b.status === "THREAT" ? 0 : b.status === "LOST" ? 2 : 1;
      return aT - bT || a.label.localeCompare(b.label);
    });
  }, [entities, query, typeFilter]);

  const threatCount = filtered.filter(e => e.threat || e.status === "THREAT").length;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden", fontFamily:C.font }}>

      {/* Header */}
      <div style={{ padding:"8px 10px 6px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
          <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.18em", color:C.muted, textTransform:"uppercase" }}>Tracked</span>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            {threatCount > 0 && <span style={{ fontSize:"10px", color:C.red, fontWeight:700 }}>⚠ {threatCount}</span>}
            <span style={{ fontSize:"11px", color:"hsl(210,20%,85%)", fontWeight:600 }}>{filtered.length}<span style={{ color:C.muted, fontWeight:400 }}>/{entities.length}</span></span>
          </div>
        </div>

        {/* Search input */}
        <div style={{ position:"relative", marginBottom:"6px" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ position:"absolute", left:"8px", top:"50%", transform:"translateY(-50%)", color:C.muted, pointerEvents:"none" }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search units..."
            style={{
              width:"100%", boxSizing:"border-box",
              background:"hsl(220,14%,11%)", border:`1px solid ${C.border}`,
              borderRadius:0, outline:"none", color:"hsl(210,20%,88%)",
              fontFamily:C.font, fontSize:"10px", letterSpacing:"0.06em",
              padding:"5px 8px 5px 26px",
              transition:"border-color 0.15s",
            }}
            onFocus={e => (e.target.style.borderColor = "hsl(220,12%,28%)")}
            onBlur={e => (e.target.style.borderColor = C.border)}
          />
          {query && (
            <button onClick={() => setQuery("")}
              style={{ position:"absolute", right:"6px", top:"50%", transform:"translateY(-50%)", background:"transparent", border:"none", cursor:"pointer", color:C.muted, fontSize:"11px", padding:"0 2px", lineHeight:1 }}>
              ×
            </button>
          )}
        </div>

        {/* Type filter tabs */}
        <div style={{ display:"flex", gap:"2px" }}>
          {TYPE_FILTERS.map(f => {
            const count = f.id === "all" ? entities.length : entities.filter(e => e.type === f.id).length;
            const active = typeFilter === f.id;
            return (
              <button key={f.id} onClick={() => setTypeFilter(f.id)}
                style={{
                  flex:1, background: active ? "hsla(0,84%,55%,0.12)" : "transparent",
                  border:`1px solid ${active ? "hsla(0,84%,55%,0.4)" : C.border}`,
                  cursor:"pointer", fontFamily:C.font, fontSize:"9px", fontWeight:600,
                  letterSpacing:"0.12em", textTransform:"uppercase",
                  color: active ? C.red : C.muted,
                  padding:"3px 2px", textAlign:"center", transition:"all 0.12s",
                }}>
                {f.label}
                <span style={{ display:"block", fontSize:"9px", color: active ? "hsla(0,84%,55%,0.7)" : "hsl(210,15%,35%)", fontWeight:400, letterSpacing:0 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {filtered.length === 0 ? (
          <div style={{ padding:"28px 12px", textAlign:"center" }}>
            <div style={{ color:C.muted, fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"6px" }}>No results</div>
            <div style={{ color:"hsl(210,15%,35%)", fontSize:"10px" }}>Try a different query</div>
          </div>
        ) : filtered.map(entity => {
          const isSel = selected?.id === entity.id;
          const isThreat = entity.threat || entity.status === "THREAT";
          const isLost = entity.status === "LOST";
          return (
            <button key={entity.id} onClick={() => onSelect(entity)}
              style={{
                width:"100%", display:"flex", alignItems:"center", gap:"8px",
                padding:"8px 10px",
                borderBottom:`1px solid hsla(220,12%,16%,0.5)`,
                borderLeft:`2px solid ${isSel ? C.red : isThreat ? "hsla(0,84%,55%,0.35)" : "transparent"}`,
                background: isSel ? "hsla(0,84%,55%,0.08)" : isThreat ? "hsla(0,84%,55%,0.03)" : "transparent",
                cursor:"pointer", border:"none",
                borderBottom:`1px solid hsla(220,12%,16%,0.5)`,
                borderLeft:`2px solid ${isSel ? C.red : isThreat ? "hsla(0,84%,55%,0.3)" : "transparent"}`,
                textAlign:"left", transition:"background 0.1s",
              }}>
              {/* Status dot */}
              <span style={{
                width:"6px", height:"6px", borderRadius:"50%", flexShrink:0,
                background: STATUS_DOT[entity.status],
                animation: isThreat ? "blink 1.4s ease-in-out infinite" : "none",
              }} />

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"4px" }}>
                  <span style={{ fontSize:"11px", fontWeight:700, color: isThreat ? C.red : isLost ? C.muted : "hsl(210,20%,90%)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {entity.label}
                  </span>
                  <span style={{ fontSize:"9px", color: STATUS_COLOR[entity.status], fontWeight:600, flexShrink:0, letterSpacing:"0.08em" }}>
                    {entity.status}
                  </span>
                </div>
                <div style={{ display:"flex", gap:"8px", marginTop:"2px" }}>
                  <span style={{ fontSize:"9px", color:"hsl(210,15%,40%)", letterSpacing:"0.06em" }}>
                    {TYPE_LABEL[entity.type]}
                  </span>
                  <span style={{ fontSize:"9px", color:"hsl(210,15%,38%)" }}>
                    {Math.round(entity.speed)} km/h
                  </span>
                  <span style={{ fontSize:"9px", color:"hsl(210,15%,38%)" }}>
                    {Math.round(entity.heading)}°
                  </span>
                </div>
              </div>

              {isThreat && (
                <span style={{ fontSize:"9px", color:C.red, flexShrink:0, animation:"blink 1.4s ease-in-out infinite" }}>⚠</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ borderTop:`1px solid ${C.border}`, padding:"5px 10px", flexShrink:0, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:"9px", color:"hsl(210,15%,35%)", letterSpacing:"0.12em", textTransform:"uppercase" }}>
          {query || typeFilter !== "all" ? `Filtered` : "All Units"}
        </span>
        {(query || typeFilter !== "all") && (
          <button onClick={() => { setQuery(""); setTypeFilter("all"); }}
            style={{ background:"transparent", border:"none", cursor:"pointer", fontSize:"9px", color:"hsl(210,15%,40%)", fontFamily:C.font, letterSpacing:"0.1em", textTransform:"uppercase", padding:0, textDecoration:"underline" }}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
