import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import About from "./pages/About";
import HowTo from "./pages/HowTo";
import Legal from "./pages/Legal";
import Navbar from "./components/Navbar";

export type Page = "home" | "simulator" | "about" | "howto" | "legal";

export default function App() {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    if ((window as unknown as Record<string,unknown>).L) { setReady(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);

  if (!ready) return (
    <div style={{ height:"100vh", width:"100vw", display:"flex", alignItems:"center", justifyContent:"center", background:"hsl(220,15%,7%)" }}>
      <div style={{ textAlign:"center", fontFamily:"'JetBrains Mono',monospace" }}>
        <div style={{ color:"hsl(0,84%,55%)", fontSize:"13px", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:"10px" }}>TRAXIS</div>
        <div style={{ color:"hsl(210,15%,45%)", fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase" }}>Initializing systems...</div>
      </div>
    </div>
  );

  return (
    <div style={{ height:"100vh", width:"100vw", display:"flex", flexDirection:"column", background:"hsl(220,15%,7%)", overflow:"hidden" }}>
      <Navbar current={page} onNav={setPage} />
      <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
        {page === "home"      && <Home onNav={setPage} />}
        {page === "simulator" && <Simulator />}
        {page === "about"     && <About onNav={setPage} />}
        {page === "howto"     && <HowTo />}
        {page === "legal"     && <Legal />}
      </div>
    </div>
  );
}
