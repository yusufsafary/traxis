import { useState } from "react";
import type { Page } from "../App";
import TraxisLogo from "./TraxisLogo";

interface Props { current: Page; onNav: (p: Page) => void; }

const LINKS: { id: Page; label: string }[] = [
  { id: "home",      label: "HOME" },
  { id: "simulator", label: "LIVE DEMO" },
  { id: "about",     label: "ABOUT" },
  { id: "howto",     label: "HOW TO" },
  { id: "legal",     label: "LEGAL" },
];

const C = {
  bg: "#ffffff",
  border: "hsl(220,12%,88%)",
  active: "hsl(0,84%,45%)",
  muted: "hsl(220,10%,52%)",
  font: "'JetBrains Mono',monospace",
};

export default function Navbar({ current, onNav }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background:C.bg, borderBottom:`1px solid ${C.border}`, flexShrink:0, position:"relative", zIndex:2000, fontFamily:C.font, boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 14px", height:"46px" }}>
        {/* Logo */}
        <button onClick={() => { onNav("home"); setOpen(false); }}
          style={{ display:"flex", alignItems:"center", gap:"10px", background:"transparent", border:"none", cursor:"pointer", padding:"0 2px" }}>
          <TraxisLogo size={26} textSize={12} animate={current === "simulator"} />
        </button>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display:"flex", alignItems:"center", gap:"2px" }}>
          {LINKS.map(l => (
            <button key={l.id} onClick={() => onNav(l.id)}
              style={{
                background:"transparent", border:"none", cursor:"pointer",
                fontFamily:C.font, fontSize:"10px", fontWeight:600,
                letterSpacing:"0.14em", textTransform:"uppercase", padding:"6px 11px",
                color: current === l.id ? C.active : C.muted,
                borderBottom: current === l.id ? `2px solid ${C.active}` : "2px solid transparent",
                transition:"color 0.15s, border-color 0.15s",
              }}>{l.label}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setOpen(o => !o)}
          style={{ display:"none", background:"transparent", border:"none", cursor:"pointer", padding:"4px", color:C.muted }}
          aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ background:C.bg, borderTop:`1px solid ${C.border}`, padding:"8px 0" }}>
          {LINKS.map(l => (
            <button key={l.id} onClick={() => { onNav(l.id); setOpen(false); }}
              style={{
                display:"block", width:"100%",
                background: current===l.id ? "hsla(0,84%,45%,0.07)" : "transparent",
                border:"none", cursor:"pointer", fontFamily:C.font, fontSize:"11px", fontWeight:600,
                letterSpacing:"0.14em", textTransform:"uppercase", padding:"12px 20px",
                color: current===l.id ? C.active : C.muted, textAlign:"left",
              }}>{l.label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 620px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
