import { useState, useEffect, useCallback, useRef } from "react";
import { Entity, FeedEvent, createInitialEntities, stepEntities, generateFeedEvent } from "../lib/simulation";
import MapView from "../components/MapView";
import EntityList from "../components/EntityList";
import EntityDetail from "../components/EntityDetail";
import SystemFeed from "../components/SystemFeed";
import TopBar from "../components/TopBar";

const MAX_FEED = 40;

export default function Simulator() {
  const [entities, setEntities] = useState<Entity[]>(() => createInitialEntities());
  const [feed, setFeed] = useState<FeedEvent[]>([]);
  const [selected, setSelected] = useState<Entity | null>(null);
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  return (
    <div style={{ height:"100vh", width:"100vw", display:"flex", flexDirection:"column", background:"hsl(220,15%,7%)", overflow:"hidden", fontFamily:"'JetBrains Mono',monospace" }}>
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
