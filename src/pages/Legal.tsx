import { useState } from "react";

const C = { bg:"hsl(220,15%,7%)", card:"hsl(220,16%,10%)", border:"hsl(220,12%,16%)", red:"hsl(0,84%,55%)", muted:"hsl(210,15%,45%)", text:"hsl(210,20%,86%)", font:"'JetBrains Mono',monospace", inter:"'Inter',sans-serif" };

type Tab = "privacy" | "terms" | "cookies";
const TABS: { id: Tab; label: string }[] = [
  { id:"privacy", label:"Privacy Policy" },
  { id:"terms",   label:"Terms of Use" },
  { id:"cookies", label:"Cookie Policy" },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ color:C.text, fontFamily:C.font, fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", margin:"28px 0 10px", borderLeft:`3px solid ${C.red}`, paddingLeft:"10px" }}>{children}</h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color:C.muted, fontFamily:C.inter, fontSize:"13px", lineHeight:"1.8", margin:"0 0 14px" }}>{children}</p>
);

const UPDATED = "21 June 2026";

const Privacy = () => <>
  <P>This Privacy Policy describes how Traxis (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Service&rdquo;), accessible at <strong style={{color:C.text}}>straxis.xyz</strong>, handles information when you use our website.</P>
  <H2>Information We Collect</H2>
  <P>Traxis is a <strong style={{color:C.text}}>static, client-side simulator</strong>. We do not collect, store, or process any personal data. No accounts, registration, or login are required. No form submissions are accepted. No user-generated data is transmitted to any server.</P>
  <H2>Local Storage &amp; Cookies</H2>
  <P>Traxis does not use cookies, local storage, session storage, or any other persistent browser storage mechanism. All simulation state is held in memory and is lost when the tab is closed or refreshed.</P>
  <H2>Third-Party Services</H2>
  <P>The simulator loads map tiles from <strong style={{color:C.text}}>OpenStreetMap</strong> (openstreetmap.org) via their tile servers. When map tiles are fetched, your IP address may be visible to OpenStreetMap's servers as part of standard HTTP requests. Please review OpenStreetMap's privacy policy at openstreetmap.org/copyright.</P>
  <P>Fonts are loaded from <strong style={{color:C.text}}>Google Fonts</strong> (fonts.googleapis.com). Google may collect connection data. Please review Google's privacy policy for details.</P>
  <H2>Analytics</H2>
  <P>We do not use any analytics platform, tracking pixel, or telemetry service. No data about your usage, device, or browsing behavior is collected.</P>
  <H2>Children's Privacy</H2>
  <P>Traxis does not knowingly collect information from children under 13. If you believe a child has provided personal information, please contact us immediately.</P>
  <H2>Changes</H2>
  <P>We may update this policy at any time. Material changes will be reflected in the &ldquo;Last updated&rdquo; date above. Continued use of the site after changes constitutes acceptance.</P>
  <H2>Contact</H2>
  <P>For privacy-related questions, please open an issue on our <strong style={{color:C.text}}>GitHub repository</strong> at github.com/yusufsafary/traxis.</P>
</>;

const Terms = () => <>
  <P>By accessing or using Traxis at <strong style={{color:C.text}}>straxis.xyz</strong>, you agree to be bound by these Terms of Use. If you do not agree, please do not use the Service.</P>
  <H2>Nature of the Service</H2>
  <P>Traxis is a <strong style={{color:C.text}}>demonstration simulator only</strong>. All entities, positions, events, and intelligence data displayed are entirely fictional and procedurally generated. The Service does not interface with any real tracking system, live sensor network, operational database, military system, or law enforcement platform of any kind.</P>
  <H2>Permitted Use</H2>
  <P>You may use Traxis for lawful, non-commercial, and educational purposes — including personal learning, portfolio demonstration, and academic reference. You may share or link to the site freely.</P>
  <H2>Prohibited Use</H2>
  <P>You may not: (a) represent Traxis as a real surveillance or tracking system to any third party; (b) use the simulated output as evidence, intelligence, or decision support in any real operational context; (c) attempt to reverse-engineer, scrape, or automate the Service; (d) use the Service in any way that violates applicable law.</P>
  <H2>Intellectual Property</H2>
  <P>The source code for Traxis is open source and available at github.com/yusufsafary/traxis under its stated license. Map tile data is © OpenStreetMap contributors, licensed under the Open Database Licence (ODbL). Font assets are provided by Google Fonts under their respective licenses.</P>
  <H2>Disclaimer of Warranties</H2>
  <P>The Service is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that any simulated data represents any real-world condition.</P>
  <H2>Limitation of Liability</H2>
  <P>To the maximum extent permitted by law, Traxis and its authors shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Service.</P>
  <H2>Governing Law</H2>
  <P>These Terms are governed by the laws of the jurisdiction in which the author resides, without regard to conflict of law provisions.</P>
  <H2>Changes</H2>
  <P>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the revised Terms.</P>
</>;

const Cookies = () => <>
  <P>This Cookie Policy explains how Traxis uses cookies and similar tracking technologies at <strong style={{color:C.text}}>straxis.xyz</strong>.</P>
  <H2>Our Cookie Usage</H2>
  <P><strong style={{color:C.text}}>Traxis does not use cookies.</strong> We do not set first-party cookies, session cookies, persistent cookies, or any tracking identifiers in your browser.</P>
  <H2>Third-Party Cookies</H2>
  <P>While we do not set cookies ourselves, third-party services loaded by the page may set their own:</P>
  <div style={{ padding:"16px", background:C.card, border:`1px solid ${C.border}`, marginBottom:"14px" }}>
    {[["OpenStreetMap tile servers","May log IP addresses as part of HTTP tile requests. No cookies are set by tile servers under normal operation."],["Google Fonts","Fonts loaded from fonts.googleapis.com may result in Google setting cookies or recording connection data in accordance with Google's policies."],].map(([t, d]) => (
      <div key={t} style={{ marginBottom:"12px", paddingBottom:"12px", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ color:C.text, fontFamily:C.font, fontSize:"10px", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"4px" }}>{t}</div>
        <div style={{ color:C.muted, fontFamily:C.inter, fontSize:"13px", lineHeight:"1.6" }}>{d}</div>
      </div>
    ))}
    <P>Neither service is used for advertising or behavioral tracking purposes within Traxis.</P>
  </div>
  <H2>Your Choices</H2>
  <P>Since Traxis does not set cookies, there is nothing to opt out of on our end. You can configure your browser to block third-party resources if desired. Note that blocking OpenStreetMap tile servers will disable the map display.</P>
  <H2>Contact</H2>
  <P>Questions about this policy? Open an issue at github.com/yusufsafary/traxis.</P>
</>;

export default function Legal() {
  const [tab, setTab] = useState<Tab>("privacy");

  return (
    <div style={{ height:"100%", overflowY:"auto", background:C.bg }}>
      <div style={{ maxWidth:"760px", margin:"0 auto", padding:"48px 24px 80px" }}>

        <div style={{ marginBottom:"32px" }}>
          <div style={{ color:C.red, fontFamily:C.font, fontSize:"10px", letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:"8px" }}>Legal</div>
          <h1 style={{ color:C.text, fontFamily:C.font, fontSize:"22px", fontWeight:700, letterSpacing:"0.1em", margin:"0 0 8px" }}>LEGAL INFORMATION</h1>
          <div style={{ color:C.muted, fontFamily:C.inter, fontSize:"12px" }}>Last updated: {UPDATED}</div>
        </div>

        {/* Tab bar */}
        <div style={{ display:"flex", borderBottom:`1px solid ${C.border}`, marginBottom:"32px", overflowX:"auto" }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background:"transparent", border:"none", cursor:"pointer",
                fontFamily:C.font, fontSize:"10px", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase",
                padding:"10px 20px", whiteSpace:"nowrap",
                color: tab === t.id ? C.text : C.muted,
                borderBottom: tab === t.id ? `2px solid ${C.red}` : "2px solid transparent",
                marginBottom:"-1px", transition:"color 0.15s",
              }}
            >{t.label}</button>
          ))}
        </div>

        <div>
          {tab === "privacy" && <Privacy />}
          {tab === "terms"   && <Terms />}
          {tab === "cookies" && <Cookies />}
        </div>

      </div>
    </div>
  );
}
