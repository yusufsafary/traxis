import { Entity, EntityType } from "../lib/simulation";

interface Props { entity: Entity | null; }

const TYPE_ICON: Record<EntityType,string> = { drone:"✈", vehicle:"🚗", personnel:"👤" };
const STATUS_BG: Record<string,string> = {
  ACTIVE:"hsla(142,70%,45%,0.08)", MOVING:"hsla(220,80%,55%,0.08)",
  STATIONARY:"hsla(47,96%,53%,0.08)", LOST:"hsla(220,12%,88%,0.6)", THREAT:"hsla(0,84%,45%,0.08)"
};
const STATUS_COLOR: Record<string,string> = {
  ACTIVE:"#16a34a", MOVING:"#2563eb", STATIONARY:"#ca8a04", LOST:"hsl(220,10%,55%)", THREAT:"hsl(0,84%,45%)"
};

function Row({ label, value, red }: { label: string; value: string; red?: boolean }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:"1px solid hsla(220,12%,88%,0.7)" }}>
      <span style={{ fontSize:"10px", color:"hsl(220,10%,55%)", letterSpacing:"0.12em", textTransform:"uppercase" }}>{label}</span>
      <span style={{ fontSize:"11px", fontFamily:"'JetBrains Mono',monospace", color:red?"hsl(0,84%,45%)":"hsl(220,15%,14%)", fontWeight:red?700:400 }}>{value}</span>
    </div>
  );
}

export default function EntityDetail({ entity }: Props) {
  if (!entity) return (
    <div style={{ padding:"12px", borderBottom:"1px solid hsl(220,12%,88%)", flexShrink:0, background:"#ffffff" }}>
      <div style={{ fontSize:"10px", color:"hsl(220,10%,55%)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"8px" }}>Entity Detail</div>
      <div style={{ fontSize:"11px", color:"hsl(220,10%,55%)", fontStyle:"italic" }}>No entity selected</div>
      <div style={{ fontSize:"10px", color:"hsl(220,10%,68%)", marginTop:"4px" }}>Click entity on map or list</div>
    </div>
  );

  const icon = TYPE_ICON[entity.type];

  return (
    <div style={{ borderBottom:"1px solid hsl(220,12%,88%)", flexShrink:0, background:"#ffffff" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 12px", borderBottom:"1px solid hsla(220,12%,88%,0.6)" }}>
        <span style={{ fontSize:"10px", color:"hsl(220,10%,55%)", letterSpacing:"0.18em", textTransform:"uppercase" }}>Entity Detail</span>
        <span style={{ fontSize:"10px", color:"hsl(220,10%,62%)" }}>▼</span>
      </div>

      <div style={{ padding:"10px 12px", borderBottom:"1px solid hsla(220,12%,88%,0.6)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"6px" }}>
              <span style={{ fontSize:"13px" }}>{icon}</span>
              <span style={{ fontSize:"13px", fontWeight:700, letterSpacing:"0.08em", color:entity.threat?"hsl(0,84%,45%)":"hsl(220,15%,14%)" }}>{entity.label}</span>
            </div>
            <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"2px 6px", background:STATUS_BG[entity.status], color:STATUS_COLOR[entity.status], border:`1px solid ${STATUS_COLOR[entity.status]}30` }}>
              {entity.status}
            </span>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:"10px", color:"hsl(220,10%,55%)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"2px" }}>Type</div>
            <div style={{ fontSize:"10px", color:"hsl(220,15%,14%)", textTransform:"uppercase", fontWeight:600 }}>{entity.type}</div>
          </div>
        </div>
      </div>

      <div style={{ padding:"2px 12px 6px" }}>
        <Row label="Speed" value={`${Math.round(entity.speed)} km/h`} />
        <Row label="Heading" value={`${Math.round(entity.heading)}°`} />
        {entity.altitude != null && <Row label="Altitude" value={`${Math.round(entity.altitude)} m`} />}
        <Row label="GPS" value={`${entity.lat.toFixed(4)}, ${entity.lng.toFixed(4)}`} />
        <Row label="Last Seen" value={entity.lastSeen} />
      </div>

      {entity.notes.length > 0 && (
        <div style={{ padding:"6px 12px 8px" }}>
          <div style={{ fontSize:"10px", color:"hsl(220,10%,55%)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"6px" }}>Markers</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
            {entity.notes.map(note => (
              <span key={note} style={{ fontSize:"10px", padding:"2px 6px", border:`1px solid ${["ARMED","HOSTILE","EW-ACTIVE"].includes(note)?"hsl(0,84%,45%)":"hsl(220,12%,82%)"}`, color:["ARMED","HOSTILE","EW-ACTIVE"].includes(note)?"hsl(0,84%,45%)":"hsl(220,10%,52%)", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                {note}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding:"6px 12px", borderTop:"1px solid hsla(220,12%,88%,0.6)" }}>
        <button style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", background:"transparent", border:"none", cursor:"pointer", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", color:"hsl(0,84%,45%)", fontFamily:"'JetBrains Mono',monospace" }}>
          <span>View Full Profile</span>
          <span>⚡</span>
        </button>
      </div>
    </div>
  );
}
