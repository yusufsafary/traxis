import { useEffect, useRef } from "react";
import { Entity, EntityType } from "../lib/simulation";

interface Props { entities: Entity[]; selected: Entity | null; onSelect: (e: Entity) => void; }

const TYPE_COLOR: Record<EntityType,string> = { drone:"#3b82f6", vehicle:"#22c55e", personnel:"#f59e0b" };
const THREAT = "#ef4444";

declare const L: {
  map: (el: HTMLElement, opts: object) => MapInstance;
  tileLayer: (url: string, opts: object) => { addTo: (m: MapInstance) => void };
  circleMarker: (latlng: [number,number], opts: object) => MarkerInstance;
  polyline: (latlngs: [number,number][], opts: object) => PolylineInstance;
};

interface MapInstance { setView: (...a: unknown[]) => MapInstance; on: (...a: unknown[]) => void; remove: () => void; panTo: (ll: [number,number], opts: object) => void; }
interface MarkerInstance { addTo: (m: MapInstance) => MarkerInstance; setLatLng: (ll: [number,number]) => void; setStyle: (s: object) => void; bindTooltip: (text: string, opts: object) => MarkerInstance; on: (ev: string, fn: () => void) => void; remove: () => void; }
interface PolylineInstance { addTo: (m: MapInstance) => PolylineInstance; setLatLngs: (lls: [number,number][]) => void; setStyle: (s: object) => void; remove: () => void; }

// Singapore city center
const SG_LAT = 1.3521;
const SG_LNG = 103.8198;

export default function MapView({ entities, selected, onSelect }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const markersRef = useRef<Map<string, MarkerInstance>>(new Map());
  const trailsRef = useRef<Map<string, PolylineInstance>>(new Map());
  const initRef = useRef(false);

  useEffect(() => {
    if (!divRef.current || initRef.current) return;
    initRef.current = true;
    const map = L.map(divRef.current, { center: [SG_LAT, SG_LNG], zoom: 14, zoomControl: true, attributionControl: false } as object);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 } as object).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; initRef.current = false; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    entities.forEach(entity => {
      const color = entity.threat || entity.status === "THREAT" ? THREAT : TYPE_COLOR[entity.type];
      const isSel = selected?.id === entity.id;
      const lost = entity.status === "LOST";

      if (entity.trail.length > 1) {
        const t = trailsRef.current.get(entity.id);
        if (t) { t.setLatLngs(entity.trail); t.setStyle({ color, opacity: isSel ? 0.7 : 0.28 }); }
        else {
          const trail = L.polyline(entity.trail, { color, weight: 1.5, opacity: isSel ? 0.7 : 0.28, dashArray: "4 4" } as object).addTo(map);
          trailsRef.current.set(entity.id, trail);
        }
      }

      const m = markersRef.current.get(entity.id);
      const opts = {
        radius: isSel ? 9 : entity.type === "personnel" ? 5 : 7,
        color: isSel ? "#fff" : color, fillColor: color,
        fillOpacity: lost ? 0.12 : isSel ? 0.9 : 0.72,
        weight: isSel ? 2.5 : 1, opacity: lost ? 0.3 : 1
      };
      if (m) { m.setLatLng([entity.lat, entity.lng]); m.setStyle(opts); }
      else {
        const marker = L.circleMarker([entity.lat, entity.lng], opts as object)
          .addTo(map)
          .bindTooltip(entity.label, { permanent: false, direction: "top", className: "traxis-tooltip", offset: [0, -8] } as object);
        marker.on("click", () => onSelect(entity));
        markersRef.current.set(entity.id, marker);
      }
    });

    markersRef.current.forEach((m, id) => { if (!entities.find(e => e.id === id)) { m.remove(); markersRef.current.delete(id); } });
    trailsRef.current.forEach((t, id) => { if (!entities.find(e => e.id === id)) { t.remove(); trailsRef.current.delete(id); } });
  }, [entities, selected, onSelect]);

  useEffect(() => {
    if (mapRef.current && selected) mapRef.current.panTo([selected.lat, selected.lng], { animate: true, duration: 0.5 });
  }, [selected?.id]);

  const HUD: React.CSSProperties = { position:"absolute", zIndex:1000, pointerEvents:"none", background:"hsla(220,15%,7%,0.82)", border:"1px solid hsl(220,12%,16%)", padding:"3px 8px", fontSize:"10px", fontFamily:"'JetBrains Mono',monospace", color:"hsl(210,15%,48%)", letterSpacing:"0.12em", textTransform:"uppercase" };

  return (
    <div style={{ width:"100%", height:"100%", position:"relative" }}>
      <div ref={divRef} style={{ width:"100%", height:"100%" }} />
      <div style={{ ...HUD, top:10, left:10 }}>OPS AREA — SINGAPORE 01°N 103°E</div>
      <div style={{ ...HUD, top:10, right:10 }}>ALT: MSL · PROJ: WGS84</div>
      <div style={{ ...HUD, bottom:10, left:10, pointerEvents:"auto", display:"flex", gap:"12px", alignItems:"center" }}>
        {[["#3b82f6","UAV"],["#22c55e","VEH"],["#f59e0b","PRS"],["#ef4444","THREAT"]].map(([c,l]) => (
          <div key={l} style={{ display:"flex", alignItems:"center", gap:"4px" }}>
            <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:c, display:"inline-block" }} />
            <span style={{ fontSize:"10px", color:"hsl(210,15%,50%)" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
