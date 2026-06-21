import { useState, useEffect, useCallback, useRef } from "react";
import { Entity, FeedEvent, createInitialEntities, stepEntities, generateFeedEvent } from "../lib/simulation";
import MapView from "../components/MapView";
import EntityList from "../components/EntityList";
import EntityDetail from "../components/EntityDetail";
import SystemFeed from "../components/SystemFeed";
import TopBar from "../components/TopBar";

const MAX_FEED = 40;

type MobileTab = "map" | "list" | "feed";

export default function Simulator() {
  const [entities, setEntities] = useState<Entity[]>(() => createInitialEntities());
  const [feed, setFeed] = useState<FeedEvent[]>([]);
  const [selected, setSelected] = useState<Entity | null>(null);
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [mobileTab, setMobileTab] = useState<MobileTab>("map");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const tick = useCallback(() => {
    setEntities((prev) => {
      const next = stepEntities(prev);
      const event = generateFeedEvent(next);
      if (event) setFeed((f) => [event, ...f].slice(0, MAX_FEED));
      setSelected((sel) => sel ? (next.find((e) => e.id === sel.id) ?? null) : null);
      return next;
    });
  }, []);

  useEffect(() => {
    if (running) tickRef.current = setInterval(tick, 2000);
    else if (tickRef.current) clearInterval(tickRef.current);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [running, tick]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const threatCount = entities.filter((e) => e.threat || e.status === "THREAT").length;
  const activeCount = entities.filter((e) => e.status !== "LOST").length;

  const BASE: React.CSSProperties = { height:"100%", width:"100%", display:"flex", flexDirection:"column", background:"hsl(220,15%,7%)", overflow:"hidden", fontFamily:"'JetBrains Mono',monospace" };
  const TAB_BTN = (active: boolean): React.CSSProperties => ({
    flex: 1, background: active ? "hsl(220,14%,12%)" : "transparent", border: "none", borderTop: active ? "2px solid hsl(0,84%,55%)" : "2px solid transparent",
    color: active ? "hsl(210,20%,88%)" : "hsl(210,15%,45%)", fontFamily:"'JetBrains Mono',monospace", fontSize:"10px", fontWeight:600,
    letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer", padding:"10px 0", transition:"all 0.15s",
  });

  if (isMobile) {
    return (
      <div style={BASE}>
        <TopBar running={running} onToggle={() => setRunning(r => !r)} elapsed={elapsed} entityCount={entities.length} activeCount={activeCount} threatCount={threatCount} compact />
        {/* Mobile tabs */}
        <div style={{ display:"flex", borderBottom:"1px solid hsl(220,12%,16%)", flexShrink:0 }}>
          <button style={TAB_BTN(mobileTab === "map")} onClick={() => setMobileTab("map")}>MAP</button>
          <button style={TAB_BTN(mobileTab === "list")} onClick={() => setMobileTab("list")}>UNITS</button>
          <button style={TAB_BTN(mobileTab === "feed")} onClick={() => setMobileTab("feed")}>FEED</button>
        </div>
        <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
          {mobileTab === "map" && (
            <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
              <div style={{ flex:1, position:"relative" }}>
                <MapView entities={entities} selected={selected} onSelect={(e) => { setSelected(e); }} />
              </div>
              {selected && (
                <div style={{ maxHeight:"200px", overflowY:"auto", borderTop:"1px solid hsl(220,12%,16%)" }}>
                  <EntityDetail entity={selected} />
                </div>
              )}
            </div>
          )}
          {mobileTab === "list" && (
            <div style={{ height:"100%", overflowY:"auto" }}>
              <EntityList entities={entities} selected={selected} onSelect={(e) => { setSelected(e); setMobileTab("map"); }} />
            </div>
          )}
          {mobileTab === "feed" && (
            <div style={{ height:"100%", overflowY:"auto" }}>
              <SystemFeed feed={feed} entities={entities} onSelect={(e) => { setSelected(e); setMobileTab("map"); }} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={BASE}>
      <TopBar running={running} onToggle={() => setRunning(r => !r)} elapsed={elapsed} entityCount={entities.length} activeCount={activeCount} threatCount={threatCount} />
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        <div style={{ width:"224px", display:"flex", flexDirection:"column", borderRight:"1px solid hsl(220,12%,16%)", background:"hsl(220,16%,8%)", overflow:"hidden", flexShrink:0 }}>
          <EntityList entities={entities} selected={selected} onSelect={setSelected} />
        </div>
        <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
          <MapView entities={entities} selected={selected} onSelect={setSelected} />
        </div>
        <div style={{ width:"256px", display:"flex", flexDirection:"column", borderLeft:"1px solid hsl(220,12%,16%)", background:"hsl(220,16%,8%)", overflow:"hidden", flexShrink:0 }}>
          <EntityDetail entity={selected} />
          <SystemFeed feed={feed} entities={entities} onSelect={setSelected} />
        </div>
      </div>
    </div>
  );
}
