import { FeedEvent, Entity } from "../lib/simulation";

interface Props { feed: FeedEvent[]; entities: Entity[]; onSelect: (e: Entity) => void; }

const LEVEL_DOT: Record<string,string> = { info:"hsl(220,10%,68%)", warn:"#ca8a04", alert:"hsl(0,84%,45%)" };
const LEVEL_TEXT: Record<string,string> = { info:"hsl(220,10%,45%)", warn:"#a16207", alert:"hsl(0,84%,45%)" };

export default function SystemFeed({ feed, entities, onSelect }: Props) {
  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", minHeight:0 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 12px", borderBottom:"1px solid hsl(220,12%,88%)", flexShrink:0 }}>
        <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.18em", color:"hsl(220,10%,52%)", textTransform:"uppercase" }}>System Feed</span>
        <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"hsl(0,84%,45%)", display:"inline-block", animation:"pulse-dot 2s ease-in-out infinite" }} />
          <span style={{ fontSize:"10px", color:"hsl(0,84%,45%)", letterSpacing:"0.15em", textTransform:"uppercase" }}>LIVE</span>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto" }}>
        {feed.length === 0 && (
          <div style={{ padding:"14px 12px", fontSize:"10px", color:"hsl(220,10%,58%)", fontStyle:"italic" }}>Awaiting signal...</div>
        )}
        {feed.map((event, i) => {
          const entity = event.entityId ? entities.find(e => e.id === event.entityId) : null;
          return (
            <button key={event.id} onClick={() => entity && onSelect(entity)}
              style={{ width:"100%", display:"flex", alignItems:"flex-start", gap:"6px", padding:"7px 12px", borderBottom:"1px solid hsla(220,12%,88%,0.6)", background:"transparent", border:"none", borderBottom:"1px solid hsla(220,12%,88%,0.6)", cursor:entity?"pointer":"default", textAlign:"left", animation:i===0?"feed-in 0.25s ease-out":"none" }}>
              <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:LEVEL_DOT[event.level], flexShrink:0, marginTop:"3px" }} />
              <div style={{ minWidth:0, flex:1 }}>
                <div style={{ fontSize:"9px", color:"hsl(220,10%,62%)", marginBottom:"2px", letterSpacing:"0.05em" }}>{event.timestamp}</div>
                <span style={{ fontSize:"11px", color:LEVEL_TEXT[event.level], lineHeight:"1.35", wordBreak:"break-word", display:"block" }}>{event.message}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ borderTop:"1px solid hsl(220,12%,88%)", padding:"6px 12px", flexShrink:0 }}>
        <span style={{ fontSize:"10px", color:"hsl(220,10%,55%)", letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer" }}>View Full Log ↑</span>
      </div>
    </div>
  );
}
