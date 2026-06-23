import type { Page } from "../App";

interface Props { onNav: (p: Page) => void; }

const C = {
  bg: "#ffffff",
  card: "hsl(220,14%,97%)",
  border: "hsl(220,12%,88%)",
  red: "hsl(0,84%,45%)",
  muted: "hsl(220,10%,52%)",
  text: "hsl(220,15%,14%)",
  font: "'JetBrains Mono',monospace",
  inter: "'Inter',sans-serif",
};

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

export default function About({ onNav }: Props) {
  return (
    <div style={{ height:"100%", overflowY:"auto", overflowX:"hidden", background:C.bg }}>
      <div style={{ maxWidth:"760px", margin:"0 auto", padding:"48px 16px 80px" }}>

        {/* Hero */}
        <div style={{ marginBottom:"56px", textAlign:"center" }}>
          <div style={{ color:C.red, fontFamily:C.font, fontSize:"clamp(20px,5vw,28px)", fontWeight:700, letterSpacing:"0.3em", marginBottom:"12px" }}>TRAXIS</div>
          <p style={{ color:C.muted, fontFamily:C.inter, fontSize:"clamp(13px,2vw,16px)", lineHeight:"1.7", maxWidth:"520px", margin:"0 auto 24px" }}>
            A real-time drone, vehicle and personnel tracking simulator built for operational awareness training and demonstration.
          </p>
          <button
            onClick={() => onNav("simulator")}
            style={{ background:C.red, border:"none", color:"#fff", fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", padding:"10px 28px", cursor:"pointer", transition:"opacity 0.15s" }}
            onMouseOver={e => (e.currentTarget.style.opacity="0.85")}
            onMouseOut={e => (e.currentTarget.style.opacity="1")}
          >
            Launch Simulator
          </button>
        </div>

        <Section title="What is Traxis">
          <p style={{ color:C.muted, fontFamily:C.inter, fontSize:"14px", lineHeight:"1.8", margin:"0 0 12px" }}>
            Traxis is a browser-based real-time tracking simulator that demonstrates live operational awareness across multiple entity types, including unmanned aerial vehicles (UAVs), ground vehicles, and personnel units.
          </p>
          <p style={{ color:C.muted, fontFamily:C.inter, fontSize:"14px", lineHeight:"1.8", margin:0 }}>
            The simulator runs entirely in the browser. No data is transmitted externally. All entities, movements, and events are procedurally generated using a realistic physics model centered on Singapore's urban grid.
          </p>
        </Section>

        <Section title="Key Capabilities">
          {[
            ["Live Entity Tracking", "Monitor 13 or more entities simultaneously, including drones, vehicles, and personnel, with real-time position updates every 2 seconds."],
            ["Threat Detection", "Entities are dynamically flagged as threats based on behavioral patterns. Threat events are surfaced immediately in the system feed."],
            ["Trail Visualization", "Each entity renders a historical trail on the map, showing movement trajectory over the last 22 data points."],
            ["System Feed", "A live event stream generates contextual intelligence reports for each entity, covering bearing, speed, status changes, and alerts."],
            ["Operational HUD", "Heads-up display overlays provide grid reference, projection, and legend, replicating a real-world C2 interface."],
            ["Mobile Ready", "Full responsive layout with tab-based navigation on mobile and a multi-panel desktop layout on larger screens."],
          ].map(([t, d]) => (
            <div key={t} style={{ display:"flex", gap:"16px", marginBottom:"16px", padding:"16px", background:C.card, border:`1px solid ${C.border}` }}>
              <span style={{ color:C.red, fontFamily:C.font, fontSize:"12px", flexShrink:0, marginTop:"2px" }}>▸</span>
              <div>
                <div style={{ color:C.text, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"6px" }}>{t}</div>
                <div style={{ color:C.muted, fontFamily:C.inter, fontSize:"13px", lineHeight:"1.6" }}>{d}</div>
              </div>
            </div>
          ))}
        </Section>

        <Section title="Technology">
          {[
            ["React 18 + TypeScript", "Frontend framework with strict typing"],
            ["Leaflet 1.9", "Open-source interactive mapping"],
            ["OpenStreetMap", "Tile data with no API key required"],
            ["Vite 6", "Build tooling with HMR"],
            ["Tailwind CSS", "Utility-first styling"],
          ].map(([t, d]) => (
            <div key={t} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${C.border}`, flexWrap:"wrap", gap:"6px" }}>
              <span style={{ color:C.text, fontFamily:C.font, fontSize:"11px", letterSpacing:"0.1em" }}>{t}</span>
              <span style={{ color:C.muted, fontFamily:C.inter, fontSize:"12px" }}>{d}</span>
            </div>
          ))}
        </Section>

        <Section title="Disclaimer">
          <div style={{ padding:"16px", background:"hsla(0,84%,45%,0.05)", border:`1px solid hsla(0,84%,45%,0.18)` }}>
            <p style={{ color:C.muted, fontFamily:C.inter, fontSize:"13px", lineHeight:"1.7", margin:0 }}>
              Traxis is a <strong style={{ color:C.text }}>demonstration simulator only</strong>. All entities, positions, events, and intelligence reports are entirely fictional and procedurally generated. This tool does not interface with any real tracking system, live sensor network, or operational database. It is intended for educational, portfolio, and demonstration purposes.
            </p>
          </div>
        </Section>

        <div style={{ textAlign:"center", paddingTop:"16px", display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => onNav("howto")} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted, fontFamily:C.font, fontSize:"10px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", padding:"8px 20px", cursor:"pointer", transition:"color 0.15s, border-color 0.15s" }}
            onMouseOver={e => { e.currentTarget.style.color=C.text; e.currentTarget.style.borderColor=C.muted; }}
            onMouseOut={e => { e.currentTarget.style.color=C.muted; e.currentTarget.style.borderColor=C.border; }}>
            How To Use
          </button>
          <button onClick={() => onNav("legal")} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.muted, fontFamily:C.font, fontSize:"10px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", padding:"8px 20px", cursor:"pointer", transition:"color 0.15s, border-color 0.15s" }}
            onMouseOver={e => { e.currentTarget.style.color=C.text; e.currentTarget.style.borderColor=C.muted; }}
            onMouseOut={e => { e.currentTarget.style.color=C.muted; e.currentTarget.style.borderColor=C.border; }}>
            Legal
          </button>
        </div>
      </div>
    </div>
  );
}
