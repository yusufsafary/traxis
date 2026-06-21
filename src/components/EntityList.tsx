import { useState } from "react";
import { Entity, EntityType } from "../lib/simulation";

interface Props { entities: Entity[]; selected: Entity | null; onSelect: (e: Entity) => void; }

const STATUS_DOT: Record<string,string> = {
  ACTIVE:"#4ade80", MOVING:"#60a5fa", STATIONARY:"#facc15", LOST:"hsl(210,15%,35%)", THREAT:"hsl(0,84%,55%)"
};
const STATUS_COLOR: Record<string,string> = {
  ACTIVE:"#4ade80", MOVING:"#60a5fa", STATIONARY:"#facc15", LOST:"hsl(210,15%,45%)", THREAT:"hsl(0,84%,55%)"
};
const TYPE_ICON: Record<EntityType,string> = { drone:"✈", vehicle:"🚗", personnel:"👤" };
const GROUPS: { label:string; type:EntityType }[] = [
  { label:"UAV / DRONE", type:"drone" },
  { label:"VEHICLE", type:"vehicle" },
  { label:"PERSONNEL", type:"personnel" },
];

export default function EntityList({ entities, selected, onSelect }: Props) {
  const [collapsed, setCollapsed] = useState<Record<string,boolean>>({});
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      <div style={{ padding:"8px 12px", borderBottom:"1px solid hsl(220,12%,16%)", flexShrink:0, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.18em", color:"hsl(210,15%,50%)", textTransform:"uppercase" }}>Tracked Entities</span>
        <span style={{ fontSize:"11px", color:"hsl(210,20%,85%)", fontWeight:600 }}>{entities.length}</span>
      </div>
      <div style={{ flex:1, overflowY:"auto" }}>
        {GROUPS.map(({ label, type }) => {
          const group = entities.filter(e => e.type === type);
          const isCollapsed = collapsed[type];
          const threats = group.filter(e => e.threat || e.status === "THREAT").length;
          return (
            <div key={type}>
              <button onClick={() => setCollapsed(c => ({...c,[type]:!c[type]}))}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"5px 12px", background:"hsla(220,12%,13%,0.8)", borderBottom:"1px solid hsl(220,12%,16%)", cursor:"pointer", border:"none", borderBottom:"1px solid hsl(220,12%,16%)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                  <span style={{ fontSize:"11px" }}>{TYPE_ICON[type]}</span>
                  <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.15em", color:"hsl(210,15%,48%)", textTransform:"uppercase" }}>{label}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  {threats > 0 && <span style={{ fontSize:"10px", color:"hsl(0,84%,55%)", fontWeight:700 }}>{threats}T</span>}
                  <span style={{ fontSize:"10px", color:"hsl(210,15%,45%)" }}>{group.length}</span>
                  <span style={{ fontSize:"10px", color:"hsl(210,15%,40%)", transform:isCollapsed?"rotate(-90deg)":"none", display:"inline-block", transition:"transform 0.15s" }}>▼</span>
                </div>
              </button>
              {!isCollapsed && group.map(entity => {
                const isSel = selected?.id === entity.id;
                return (
                  <button key={entity.id} onClick={() => onSelect(entity)}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:"8px", padding:"8px 12px", borderBottom:"1px solid hsla(220,12%,16%,0.4)", background:isSel?"hsla(0,84%,55%,0.08)":"transparent", borderLeft:`2px solid ${isSel?"hsl(0,84%,55%)":"transparent"}`, cursor:"pointer", border:"none", borderBottom:"1px solid hsla(220,12%,16%,0.4)", borderLeft:`2px solid ${isSel?"hsl(0,84%,55%)":"transparent"}`, textAlign:"left" }}>
                    <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:STATUS_DOT[entity.status], flexShrink:0, animation:entity.status==="THREAT"?"blink 1.4s ease-in-out infinite":"none" }} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:"11px", fontWeight:700, color:entity.threat?"hsl(0,84%,55%)":"hsl(210,20%,90%)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{entity.label}</span>
                        <span style={{ fontSize:"10px", color:STATUS_COLOR[entity.status], fontWeight:600, marginLeft:"4px", flexShrink:0 }}>{entity.status}</span>
                      </div>
                      <div style={{ fontSize:"10px", color:"hsl(210,15%,45%)", marginTop:"2px" }}>{Math.round(entity.speed)} km/h · {Math.round(entity.heading)}°</div>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div style={{ borderTop:"1px solid hsl(220,12%,16%)", padding:"6px 12px", flexShrink:0 }}>
        <span style={{ fontSize:"10px", color:"hsl(210,15%,40%)", letterSpacing:"0.1em", textTransform:"uppercase" }}>View All ↑</span>
      </div>
    </div>
  );
}
