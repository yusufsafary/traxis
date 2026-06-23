import type { Page } from "../App";
import TraxisLogo from "../components/TraxisLogo";

interface Props { onNav: (p: Page) => void; }

const C = {
  bg: "#ffffff",
  card: "hsl(220,14%,97%)",
  border: "hsl(220,12%,88%)",
  red: "hsl(0,84%,45%)",
  muted: "hsl(220,10%,52%)",
  mutedHi: "hsl(220,10%,38%)",
  text: "hsl(220,15%,14%)",
  font: "'JetBrains Mono',monospace",
  inter: "'Inter',sans-serif",
};

const FEATURES = [
  { icon: "◉", label: "Real-Time Tracking", desc: "13+ entities updated every 2 seconds, including UAVs, vehicles, and personnel, all rendered live on an interactive map." },
  { icon: "⚠", label: "Threat Detection", desc: "Dynamic threat flagging based on behavioral patterns. Alerts surface instantly in the system event feed." },
  { icon: "▸", label: "Trail Visualization", desc: "Each entity renders a 22-point movement trail on the map, showing full trajectory history at a glance." },
  { icon: "≡", label: "System Feed", desc: "Live operational intelligence stream: bearing reports, speed anomalies, status changes, and hostile activity." },
  { icon: "◫", label: "C2 HUD Overlay", desc: "Heads-up display replicates a real command-and-control interface with grid reference and projection data." },
  { icon: "⊡", label: "Mobile Ready", desc: "Fully responsive. Tab-based MAP / UNITS / FEED layout on mobile. Multi-panel desktop view on larger screens." },
];

const STATS = [
  { val: "13+", label: "Live Entities" },
  { val: "2s",  label: "Update Rate" },
  { val: "3",   label: "Entity Types" },
  { val: "100%",label: "Client-Side" },
];

function LiveDot() {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"4px 10px", background:"hsla(142,60%,42%,0.08)", border:"1px solid hsla(142,60%,42%,0.2)" }}>
      <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#16a34a", display:"inline-block", animation:"pulse-dot 2s ease-in-out infinite" }} />
      <span style={{ fontFamily:C.font, fontSize:"9px", fontWeight:600, letterSpacing:"0.2em", color:"#16a34a", textTransform:"uppercase" }}>Live</span>
    </span>
  );
}

export default function Home({ onNav }: Props) {
  return (
    <div style={{ height:"100%", overflowY:"auto", overflowX:"hidden", background:C.bg, fontFamily:C.inter }}>

      {/* ── HERO ── */}
      <div style={{ minHeight:"90vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 20px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>

        {/* Grid bg */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`, backgroundSize:"48px 48px", opacity:0.5, pointerEvents:"none" }} />
        {/* Glow */}
        <div style={{ position:"absolute", top:"35%", left:"50%", transform:"translate(-50%,-50%)", width:"min(700px,100vw)", height:"500px", background:"radial-gradient(ellipse, hsla(0,84%,45%,0.04) 0%, transparent 68%)", pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:1, maxWidth:"640px", width:"100%" }}>
          <div style={{ marginBottom:"20px" }}>
            <LiveDot />
          </div>

          {/* Big Logo */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"24px" }}>
            <TraxisLogo size={56} textSize={32} animate color="hsl(0,84%,45%)" />
          </div>

          <p style={{ color:C.muted, fontFamily:C.font, fontSize:"clamp(9px,2vw,11px)", letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:"10px" }}>
            straxis.xyz
          </p>

          <h1 style={{ color:C.text, fontSize:"clamp(16px,4vw,26px)", fontWeight:300, lineHeight:1.5, margin:"0 0 12px", letterSpacing:"-0.01em", fontFamily:C.inter }}>
            Real-time drone, vehicle &amp; personnel<br />
            <strong style={{ fontWeight:700 }}>tracking simulator</strong>
          </h1>

          <p style={{ color:C.muted, fontSize:"clamp(13px,2vw,15px)", lineHeight:1.7, maxWidth:"480px", margin:"0 auto 32px", fontFamily:C.inter, padding:"0 4px" }}>
            A browser-native operational awareness dashboard with live entity tracking, threat detection, and a C2-style HUD. Built entirely client-side with React and Leaflet.
          </p>

          {/* CTA Buttons */}
          <div style={{ display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap", marginBottom:"28px" }}>
            <button onClick={() => onNav("simulator")}
              style={{ background:C.red, border:"none", color:"#fff", fontFamily:C.font, fontSize:"11px", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", padding:"14px 32px", cursor:"pointer", transition:"opacity 0.15s", flex:"1 1 auto", maxWidth:"220px" }}
              onMouseOver={e => (e.currentTarget.style.opacity="0.85")}
              onMouseOut={e => (e.currentTarget.style.opacity="1")}>
              ▶ Launch Simulator
            </button>
            <button onClick={() => onNav("about")}
              style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.mutedHi, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", padding:"14px 24px", cursor:"pointer", transition:"border-color 0.15s,color 0.15s", flex:"1 1 auto", maxWidth:"160px" }}
              onMouseOver={e => { e.currentTarget.style.borderColor=C.muted; e.currentTarget.style.color=C.text; }}
              onMouseOut={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.mutedHi; }}>
              Learn More
            </button>
          </div>

          {/* ── BADGES: Kickstart + X ── */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"10px" }}>
            <span style={{ fontSize:"9px", fontFamily:C.font, letterSpacing:"0.2em", textTransform:"uppercase", color:"hsl(220,10%,68%)" }}>Backed by</span>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap", justifyContent:"center" }}>
              {/* Kickstart badge */}
              <a
                href="https://kickstart.easya.io/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  padding:"7px 14px 7px 10px",
                  background:"hsl(220,14%,97%)",
                  border:`1px solid ${C.border}`,
                  borderRadius:"4px",
                  textDecoration:"none",
                  transition:"border-color 0.15s, box-shadow 0.15s",
                  flexShrink:0,
                }}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor="hsl(148,74%,62%)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 1px 6px hsla(148,74%,42%,0.15)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor=C.border; (e.currentTarget as HTMLAnchorElement).style.boxShadow="none"; }}
              >
                <img
                  src="/kickstart-logo.png"
                  alt="EasyA Kickstart"
                  style={{ height:"22px", width:"auto", display:"block" }}
                />
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontFamily:C.font, fontSize:"9px", fontWeight:700, letterSpacing:"0.12em", color:C.text, lineHeight:1.2 }}>EasyA Kickstart</div>
                  <div style={{ fontFamily:C.inter, fontSize:"8px", color:C.muted, lineHeight:1.2, marginTop:"1px" }}>kickstart.easya.io</div>
                </div>
              </a>

              {/* X / Twitter badge */}
              <a
                href="https://x.com/straxisxyz"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:"inline-flex", alignItems:"center", gap:"7px",
                  padding:"7px 14px 7px 10px",
                  background:"hsl(220,14%,97%)",
                  border:`1px solid ${C.border}`,
                  borderRadius:"4px",
                  textDecoration:"none",
                  transition:"border-color 0.15s, box-shadow 0.15s",
                  flexShrink:0,
                }}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor="hsl(220,10%,65%)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 1px 6px rgba(0,0,0,0.08)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor=C.border; (e.currentTarget as HTMLAnchorElement).style.boxShadow="none"; }}
              >
                {/* X logo SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill={C.text} style={{ flexShrink:0 }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontFamily:C.font, fontSize:"9px", fontWeight:700, letterSpacing:"0.12em", color:C.text, lineHeight:1.2 }}>@straxisxyz</div>
                  <div style={{ fontFamily:C.inter, fontSize:"8px", color:C.muted, lineHeight:1.2, marginTop:"1px" }}>Follow on X</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, background:C.card }}>
        <div style={{ maxWidth:"960px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", padding:"0 16px" }}>
          {STATS.map(({ val, label }) => (
            <div key={label} style={{ padding:"24px 16px", textAlign:"center", borderRight:`1px solid ${C.border}` }}>
              <div style={{ color:C.red, fontFamily:C.font, fontSize:"clamp(22px,4vw,34px)", fontWeight:700, letterSpacing:"0.08em", marginBottom:"6px" }}>{val}</div>
              <div style={{ color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ maxWidth:"960px", margin:"0 auto", padding:"60px 16px" }}>
        <div style={{ textAlign:"center", marginBottom:"48px" }}>
          <div style={{ color:C.red, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:"12px" }}>Capabilities</div>
          <h2 style={{ color:C.text, fontFamily:C.font, fontSize:"clamp(14px,3vw,22px)", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", margin:0 }}>What Traxis Does</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"1px", background:C.border }}>
          {FEATURES.map(({ icon, label, desc }) => (
            <div key={label} style={{ background:C.bg, padding:"24px 20px", transition:"background 0.15s", cursor:"default" }}
              onMouseOver={e => (e.currentTarget.style.background=C.card)}
              onMouseOut={e => (e.currentTarget.style.background=C.bg)}>
              <div style={{ color:C.red, fontFamily:C.font, fontSize:"18px", marginBottom:"12px" }}>{icon}</div>
              <div style={{ color:C.text, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"8px" }}>{label}</div>
              <div style={{ color:C.muted, fontSize:"13px", lineHeight:1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background:C.card, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:"760px", margin:"0 auto", padding:"60px 16px" }}>
          <div style={{ textAlign:"center", marginBottom:"40px" }}>
            <div style={{ color:C.red, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:"12px" }}>Quick Start</div>
            <h2 style={{ color:C.text, fontFamily:C.font, fontSize:"clamp(14px,3vw,20px)", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", margin:0 }}>Up &amp; Running in 3 Steps</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"16px" }}>
            {[
              ["01","Open Simulator","Click 'Launch Simulator' above or 'LIVE DEMO' in the nav bar."],
              ["02","Select an Entity","Click any marker on the map or any row in the unit list to inspect it."],
              ["03","Monitor the Feed","Watch the live system feed for threat alerts, bearing updates, and status events."],
            ].map(([n,t,d]) => (
              <div key={n} style={{ padding:"20px", background:C.bg, border:`1px solid ${C.border}` }}>
                <div style={{ color:C.red, fontFamily:C.font, fontSize:"26px", fontWeight:700, letterSpacing:"0.1em", marginBottom:"10px", opacity:0.5 }}>{n}</div>
                <div style={{ color:C.text, fontFamily:C.font, fontSize:"11px", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"6px" }}>{t}</div>
                <div style={{ color:C.muted, fontSize:"13px", lineHeight:1.6 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:"36px" }}>
            <button onClick={() => onNav("howto")}
              style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.mutedHi, fontFamily:C.font, fontSize:"10px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", padding:"10px 24px", cursor:"pointer", transition:"border-color 0.15s,color 0.15s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor=C.muted; e.currentTarget.style.color=C.text; }}
              onMouseOut={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.mutedHi; }}>
              Full Documentation →
            </button>
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div style={{ maxWidth:"960px", margin:"0 auto", padding:"60px 16px" }}>
        <div style={{ position:"relative", border:`1px solid ${C.border}`, overflow:"hidden", background:C.card, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"16px", padding:"48px 20px", textAlign:"center" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`, backgroundSize:"32px 32px", opacity:0.4 }} />
          <div style={{ position:"relative", zIndex:1, width:"100%" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"16px" }}>
              <TraxisLogo size={36} showText={false} animate color="hsl(0,84%,45%)" />
            </div>
            <div style={{ color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:"12px" }}>OPS AREA, SINGAPORE 01°N 103°E</div>
            <div style={{ color:C.text, fontFamily:C.font, fontSize:"clamp(14px,3vw,22px)", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"8px" }}>Live Tracking Active</div>
            <div style={{ color:C.muted, fontSize:"13px", marginBottom:"24px" }}>13 entities currently being simulated across Singapore's urban grid</div>
            <button onClick={() => onNav("simulator")}
              style={{ background:C.red, border:"none", color:"#fff", fontFamily:C.font, fontSize:"11px", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", padding:"12px 32px", cursor:"pointer", transition:"opacity 0.15s" }}
              onMouseOver={e => (e.currentTarget.style.opacity="0.85")}
              onMouseOut={e => (e.currentTarget.style.opacity="1")}>
              ▶ Open Live View
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop:`1px solid ${C.border}`, background:C.card }}>
        <div style={{ maxWidth:"960px", margin:"0 auto", padding:"20px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
          <TraxisLogo size={18} textSize={10} color="hsl(0,84%,45%)" />
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
            {(["about","howto","legal"] as Page[]).map((p) => (
              <button key={p} onClick={() => onNav(p)}
                style={{ background:"transparent", border:"none", cursor:"pointer", color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", padding:0, transition:"color 0.15s" }}
                onMouseOver={e => (e.currentTarget.style.color=C.text)}
                onMouseOut={e => (e.currentTarget.style.color=C.muted)}>
                {p === "howto" ? "How To" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
            <a href="https://x.com/straxisxyz" target="_blank" rel="noopener noreferrer"
              style={{ color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", textDecoration:"none", transition:"color 0.15s" }}
              onMouseOver={e => ((e.currentTarget as HTMLAnchorElement).style.color=C.text)}
              onMouseOut={e => ((e.currentTarget as HTMLAnchorElement).style.color=C.muted)}>
              @straxisxyz
            </a>
          </div>
          <div style={{ color:C.muted, fontFamily:C.font, fontSize:"9px", letterSpacing:"0.1em" }}>© 2026 straxis.xyz</div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
        @media (max-width: 480px) {
          .hero-logo { transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
