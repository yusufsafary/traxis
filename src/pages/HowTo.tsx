const C = { bg:"hsl(220,15%,7%)", card:"hsl(220,16%,10%)", border:"hsl(220,12%,16%)", red:"hsl(0,84%,55%)", muted:"hsl(210,15%,45%)", text:"hsl(210,20%,86%)", font:"'JetBrains Mono',monospace", inter:"'Inter',sans-serif" };

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom:"40px" }}>
    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
      <span style={{ color:C.red, fontFamily:C.font, fontSize:"10px", letterSpacing:"0.3em" }}>◈</span>
      <h2 style={{ color:C.text, fontFamily:C.font, fontSize:"12px", letterSpacing:"0.2em", textTransform:"uppercase", margin:0 }}>{title}</h2>
      <div style={{ flex:1, height:"1px", background:C.border }} />
    </div>
    {children}
  </div>
);

const Step = ({ n, title, desc }: { n: number; title: string; desc: string }) => (
  <div style={{ display:"flex", gap:"16px", marginBottom:"16px", padding:"16px", background:C.card, border:`1px solid ${C.border}` }}>
    <div style={{ width:"28px", height:"28px", background:"hsla(0,84%,55%,0.12)", border:`1px solid hsla(0,84%,55%,0.3)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:C.font, fontSize:"11px", fontWeight:700, color:C.red }}>{n}</div>
    <div>
      <div style={{ color:C.text, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"6px" }}>{title}</div>
      <div style={{ color:C.muted, fontFamily:C.inter, fontSize:"13px", lineHeight:"1.6" }}>{desc}</div>
    </div>
  </div>
);

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd style={{ background:"hsl(220,14%,14%)", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"1px 6px", fontFamily:C.font, fontSize:"11px", color:C.text }}>{children}</kbd>
);

export default function HowTo() {
  return (
    <div style={{ height:"100%", overflowY:"auto", background:C.bg }}>
      <div style={{ maxWidth:"760px", margin:"0 auto", padding:"48px 24px 80px" }}>

        <div style={{ marginBottom:"48px" }}>
          <div style={{ color:C.red, fontFamily:C.font, fontSize:"10px", letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:"8px" }}>Documentation</div>
          <h1 style={{ color:C.text, fontFamily:C.font, fontSize:"22px", fontWeight:700, letterSpacing:"0.1em", margin:"0 0 12px" }}>HOW TO USE TRAXIS</h1>
          <p style={{ color:C.muted, fontFamily:C.inter, fontSize:"14px", lineHeight:"1.7", margin:0 }}>
            A complete guide to navigating and interpreting the Traxis operational tracking simulator.
          </p>
        </div>

        <Section title="Getting Started">
          <Step n={1} title="Launch the simulator" desc="Click 'LIVE DEMO' in the navigation bar. The simulator initializes automatically and begins tracking 13 entities in real time across Singapore." />
          <Step n={2} title="Observe the map" desc="The central map panel shows all entities as colored circle markers. Blue = UAV, Green = Vehicle, Amber = Personnel, Red = Threat. Trails show recent movement paths." />
          <Step n={3} title="Select an entity" desc="Click any marker on the map or any row in the unit list to select it. The map auto-pans to follow it and the detail panel updates." />
          <Step n={4} title="Monitor the feed" desc="The system feed (right panel / FEED tab on mobile) shows live intelligence events generated for each entity — status changes, alerts, bearing reports." />
        </Section>

        <Section title="Interface Panels">
          {[
            ["Top Bar", "Shows operational status (LIVE/PAUSED), tracked unit count, threat count, and elapsed mission time. Use the Pause/Resume button to freeze the simulation."],
            ["Unit List (left / UNITS tab)", "A scrollable list of all tracked entities sorted by status. Threat entities are highlighted in red. Click any row to select and center the map."],
            ["Map (center)", "Interactive Leaflet map centered on Singapore. Zoom with scroll wheel or pinch gesture. Pan by dragging. Click markers to select entities."],
            ["Entity Detail (right)", "Shows full data for the selected entity: type, status, coordinates, speed, heading, altitude (UAVs only), and assigned notes."],
            ["System Feed (right / FEED tab)", "Live stream of operational events. Color-coded: blue = info, amber = warning, red = alert. Click any event to select the referenced entity."],
          ].map(([t, d]) => (
            <div key={t} style={{ marginBottom:"12px", padding:"14px 16px", background:C.card, border:`1px solid ${C.border}` }}>
              <div style={{ color:C.text, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"6px" }}>{t}</div>
              <div style={{ color:C.muted, fontFamily:C.inter, fontSize:"13px", lineHeight:"1.6" }}>{d}</div>
            </div>
          ))}
        </Section>

        <Section title="Entity Types & Status">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"10px", marginBottom:"20px" }}>
            {[["#3b82f6","UAV","Unmanned aerial vehicle. Includes altitude data. Highest speed range."],["#22c55e","VEH","Ground vehicle. Tracked by speed and route deviation."],["#f59e0b","PRS","Personnel unit. Slowest movement. Group-aware."],["#ef4444","THREAT","Any entity flagged as hostile. Overrides type color."],].map(([color, label, desc]) => (
              <div key={label} style={{ padding:"12px", background:C.card, border:`1px solid ${C.border}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"6px" }}>
                  <span style={{ width:"10px", height:"10px", borderRadius:"50%", background:color, display:"inline-block", flexShrink:0 }} />
                  <span style={{ color:C.text, fontFamily:C.font, fontSize:"11px", fontWeight:700, letterSpacing:"0.15em" }}>{label}</span>
                </div>
                <div style={{ color:C.muted, fontFamily:C.inter, fontSize:"12px", lineHeight:"1.5" }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ padding:"14px 16px", background:C.card, border:`1px solid ${C.border}` }}>
            <div style={{ color:C.text, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"8px" }}>Status Values</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:"6px" }}>
              {[["ACTIVE","Normal operation"],["MOVING","In transit"],["STATIONARY","No movement"],["LOST","Signal lost"],["THREAT","Hostile flag"],].map(([s, d]) => (
                <div key={s} style={{ fontFamily:C.font }}>
                  <span style={{ fontSize:"10px", fontWeight:600, color: s==="THREAT"||s==="LOST" ? C.red : C.text, letterSpacing:"0.1em" }}>{s}</span>
                  <span style={{ color:C.muted, fontFamily:C.inter, fontSize:"11px", display:"block" }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Mobile Usage">
          <p style={{ color:C.muted, fontFamily:C.inter, fontSize:"14px", lineHeight:"1.7", marginBottom:"16px" }}>
            On screens narrower than 700px, Traxis switches to a tab-based mobile layout:
          </p>
          {[["MAP tab","Full-screen map view. Tap any marker to select. Selected entity detail appears below the map."],["UNITS tab","Scrollable entity list. Tap any row to select and switch to the map view automatically."],["FEED tab","Live event stream. Tap any event to select the referenced entity and jump to the map."],].map(([t, d]) => (
            <div key={t} style={{ display:"flex", gap:"12px", marginBottom:"12px", padding:"12px 14px", background:C.card, border:`1px solid ${C.border}` }}>
              <span style={{ color:C.red, fontFamily:C.font, fontSize:"11px", fontWeight:700, flexShrink:0, minWidth:"60px" }}>{t}</span>
              <span style={{ color:C.muted, fontFamily:C.inter, fontSize:"13px", lineHeight:"1.5" }}>{d}</span>
            </div>
          ))}
        </Section>

        <Section title="Controls">
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {[
              [<><Kbd>Pause</Kbd> / <Kbd>Resume</Kbd></>, "Freeze or resume entity simulation. Feed events stop when paused."],
              [<><Kbd>Click marker</Kbd></>, "Select entity, auto-pan map, populate detail panel."],
              [<><Kbd>Scroll / Pinch</Kbd></>, "Zoom the map in or out."],
              [<><Kbd>Drag</Kbd></>, "Pan the map freely."],
            ].map(([k, d], i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"16px", padding:"10px 14px", background:C.card, border:`1px solid ${C.border}` }}>
                <div style={{ minWidth:"140px", flexShrink:0 }}>{k}</div>
                <div style={{ color:C.muted, fontFamily:C.inter, fontSize:"13px" }}>{d}</div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}
