import type { Page } from "../App";

interface Props { onNav: (p: Page) => void; }

const C = {
  bg: "hsl(220,15%,7%)",
  card: "hsl(220,16%,10%)",
  border: "hsl(220,12%,16%)",
  red: "hsl(0,84%,55%)",
  muted: "hsl(210,15%,45%)",
  mutedHi: "hsl(210,15%,58%)",
  text: "hsl(210,20%,88%)",
  font: "'JetBrains Mono',monospace",
  inter: "'Inter',sans-serif",
};

const FEATURES = [
  { icon: "◉", label: "Real-Time Tracking", desc: "13+ entities updated every 2 seconds — UAVs, vehicles, personnel — all rendered live on an interactive map." },
  { icon: "⚠", label: "Threat Detection", desc: "Dynamic threat flagging based on behavioral patterns. Alerts surface instantly in the system event feed." },
  { icon: "▸", label: "Trail Visualization", desc: "Each entity renders a 22-point movement trail on the map, showing full trajectory history at a glance." },
  { icon: "≡", label: "System Feed", desc: "Live operational intelligence stream: bearing reports, speed anomalies, status changes, and hostile activity." },
  { icon: "◫", label: "C2 HUD Overlay", desc: "Heads-up display replicates a real command-and-control interface with grid reference and projection data." },
  { icon: "⊡", label: "Mobile Ready", desc: "Fully responsive. Tab-based MAP / UNITS / FEED layout on mobile. Multi-panel desktop view on larger screens." },
];

const STATS = [
  { val: "13+", label: "Live Entities" },
  { val: "2s", label: "Update Rate" },
  { val: "3", label: "Entity Types" },
  { val: "100%", label: "Client-Side" },
];

function LiveDot() {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"4px 10px", background:"hsla(134,60%,42%,0.1)", border:"1px solid hsla(134,60%,42%,0.25)", borderRadius:"2px" }}>
      <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"pulse-dot 2s ease-in-out infinite" }} />
      <span style={{ fontFamily:C.font, fontSize:"9px", fontWeight:600, letterSpacing:"0.2em", color:"#4ade80", textTransform:"uppercase" }}>Live</span>
    </span>
  );
}

export default function Home({ onNav }: Props) {
  return (
    <div style={{ height:"100%", overflowY:"auto", background:C.bg, fontFamily:C.inter }}>

      {/* ── HERO ── */}
      <div style={{ minHeight:"90vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 24px 60px", textAlign:"center", position:"relative", overflow:"hidden" }}>

        {/* Subtle grid background */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize:"48px 48px", opacity:0.35, pointerEvents:"none" }} />

        {/* Glow */}
        <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)", width:"600px", height:"400px", background:"radial-gradient(ellipse, hsla(0,84%,55%,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:1, maxWidth:"680px" }}>
          <div style={{ marginBottom:"20px" }}>
            <LiveDot />
          </div>

          <div style={{ color:C.red, fontFamily:C.font, fontSize:"clamp(36px,8vw,64px)", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:"8px", lineHeight:1 }}>
            ◈ TRAXIS
          </div>

          <div style={{ color:C.muted, fontFamily:C.font, fontSize:"clamp(9px,2vw,11px)", letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:"32px" }}>
            straxis.xyz
          </div>

          <h1 style={{ color:C.text, fontSize:"clamp(20px,4vw,30px)", fontWeight:300, lineHeight:1.4, margin:"0 0 16px", letterSpacing:"-0.01em" }}>
            Real-time drone, vehicle &amp; personnel<br />
            <strong style={{ fontWeight:700 }}>tracking simulator</strong>
          </h1>

          <p style={{ color:C.muted, fontSize:"clamp(13px,2vw,15px)", lineHeight:1.7, maxWidth:"500px", margin:"0 auto 44px" }}>
            A browser-native operational awareness dashboard — live entity tracking, threat detection, and C2-style HUD, built entirely client-side with React and Leaflet.
          </p>

          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <button
              onClick={() => onNav("simulator")}
              style={{ background:C.red, border:"none", color:"#fff", fontFamily:C.font, fontSize:"11px", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", padding:"14px 36px", cursor:"pointer", transition:"opacity 0.15s", flexShrink:0 }}
              onMouseOver={e => (e.currentTarget.style.opacity="0.85")}
              onMouseOut={e => (e.currentTarget.style.opacity="1")}
            >
              ▶ Launch Simulator
            </button>
            <button
              onClick={() => onNav("about")}
              style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.mutedHi, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", padding:"14px 28px", cursor:"pointer", transition:"border-color 0.15s, color 0.15s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor=C.muted; e.currentTarget.style.color=C.text; }}
              onMouseOut={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.mutedHi; }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, background:C.card }}>
        <div style={{ maxWidth:"960px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", padding:"0 24px" }}>
          {STATS.map(({ val, label }) => (
            <div key={label} style={{ padding:"28px 20px", textAlign:"center", borderRight:`1px solid ${C.border}` }}>
              <div style={{ color:C.red, fontFamily:C.font, fontSize:"clamp(24px,4vw,36px)", fontWeight:700, letterSpacing:"0.08em", marginBottom:"6px" }}>{val}</div>
              <div style={{ color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ maxWidth:"960px", margin:"0 auto", padding:"80px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:"56px" }}>
          <div style={{ color:C.red, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:"12px" }}>Capabilities</div>
          <h2 style={{ color:C.text, fontFamily:C.font, fontSize:"clamp(16px,3vw,22px)", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", margin:0 }}>What Traxis Does</h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1px", background:C.border }}>
          {FEATURES.map(({ icon, label, desc }) => (
            <div key={label} style={{ background:C.bg, padding:"28px 24px", transition:"background 0.15s" }}
              onMouseOver={e => (e.currentTarget.style.background = C.card)}
              onMouseOut={e => (e.currentTarget.style.background = C.bg)}
            >
              <div style={{ color:C.red, fontFamily:C.font, fontSize:"18px", marginBottom:"14px", display:"block" }}>{icon}</div>
              <div style={{ color:C.text, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"10px" }}>{label}</div>
              <div style={{ color:C.muted, fontSize:"13px", lineHeight:1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background:C.card, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"760px", margin:"0 auto", padding:"80px 24px" }}>
          <div style={{ textAlign:"center", marginBottom:"48px" }}>
            <div style={{ color:C.red, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:"12px" }}>Quick Start</div>
            <h2 style={{ color:C.text, fontFamily:C.font, fontSize:"clamp(16px,3vw,20px)", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", margin:0 }}>Up &amp; Running in 3 Steps</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"20px" }}>
            {[
              ["01", "Open Simulator", "Click 'Launch Simulator' above or 'LIVE DEMO' in the nav bar."],
              ["02", "Select an Entity", "Click any marker on the map or any row in the unit list to inspect it."],
              ["03", "Monitor the Feed", "Watch the live system feed for threat alerts, bearing updates, and status events."],
            ].map(([n, t, d]) => (
              <div key={n} style={{ padding:"24px", background:C.bg, border:`1px solid ${C.border}` }}>
                <div style={{ color:C.red, fontFamily:C.font, fontSize:"28px", fontWeight:700, letterSpacing:"0.1em", marginBottom:"12px", opacity:0.6 }}>{n}</div>
                <div style={{ color:C.text, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"8px" }}>{t}</div>
                <div style={{ color:C.muted, fontSize:"13px", lineHeight:1.6 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:"40px" }}>
            <button
              onClick={() => onNav("howto")}
              style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.mutedHi, fontFamily:C.font, fontSize:"10px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", padding:"10px 24px", cursor:"pointer", transition:"border-color 0.15s, color 0.15s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor=C.muted; e.currentTarget.style.color=C.text; }}
              onMouseOut={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.mutedHi; }}
            >
              Full Documentation →
            </button>
          </div>
        </div>
      </div>

      {/* ── MAP PREVIEW BANNER ── */}
      <div style={{ maxWidth:"960px", margin:"0 auto", padding:"80px 24px" }}>
        <div style={{ position:"relative", border:`1px solid ${C.border}`, overflow:"hidden", background:C.card, minHeight:"180px", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"20px", padding:"48px 24px", textAlign:"center" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize:"32px 32px", opacity:0.25 }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:"16px" }}>OPS AREA — SINGAPORE 01°N 103°E</div>
            <div style={{ color:C.text, fontFamily:C.font, fontSize:"clamp(16px,3vw,22px)", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"8px" }}>
              Live Tracking Active
            </div>
            <div style={{ color:C.muted, fontSize:"13px", marginBottom:"28px" }}>13 entities currently being simulated across Singapore's urban grid</div>
            <button
              onClick={() => onNav("simulator")}
              style={{ background:C.red, border:"none", color:"#fff", fontFamily:C.font, fontSize:"11px", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", padding:"12px 32px", cursor:"pointer", transition:"opacity 0.15s" }}
              onMouseOver={e => (e.currentTarget.style.opacity="0.85")}
              onMouseOut={e => (e.currentTarget.style.opacity="1")}
            >
              ▶ Open Live View
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop:`1px solid ${C.border}`, background:C.card }}>
        <div style={{ maxWidth:"960px", margin:"0 auto", padding:"28px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <span style={{ color:C.red, fontFamily:C.font, fontSize:"11px", fontWeight:700, letterSpacing:"0.25em" }}>◈ TRAXIS</span>
            <span style={{ color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.1em" }}>— Demonstration Simulator Only</span>
          </div>
          <div style={{ display:"flex", gap:"20px" }}>
            {([["about","About"],["howto","How To"],["legal","Legal"]] as [Page,string][]).map(([p,l]) => (
              <button key={p} onClick={() => onNav(p)} style={{ background:"transparent", border:"none", cursor:"pointer", color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", padding:0, transition:"color 0.15s" }}
                onMouseOver={e => (e.currentTarget.style.color=C.text)}
                onMouseOut={e => (e.currentTarget.style.color=C.muted)}>
                {l}
              </button>
            ))}
          </div>
          <div style={{ color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.1em" }}>© 2026 straxis.xyz</div>
        </div>
      </div>

      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
