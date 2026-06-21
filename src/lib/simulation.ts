export type EntityType = "drone" | "vehicle" | "personnel";
export type EntityStatus = "ACTIVE" | "MOVING" | "STATIONARY" | "LOST" | "THREAT";

export interface Entity {
  id: string;
  label: string;
  type: EntityType;
  status: EntityStatus;
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  altitude?: number;
  lastSeen: string;
  trail: [number, number][];
  notes: string[];
  threat: boolean;
}

export interface FeedEvent {
  id: string;
  timestamp: string;
  message: string;
  level: "info" | "warn" | "alert";
  entityId?: string;
}

// Singapore city center
const CENTER_LAT = 1.3521;
const CENTER_LNG = 103.8198;
const SPREAD = 0.045;
const DEG_PER_METER = 1 / 111320;

const LABELS: Record<EntityType, string[]> = {
  drone: ["UAV-01","UAV-02","UAV-03","UAV-04"],
  vehicle: ["VH-11","VH-12","VH-21","VH-22","VH-31"],
  personnel: ["PRS-A1","PRS-A2","PRS-B1","PRS-C1"],
};

const NOTES: Record<EntityType, string[]> = {
  drone: ["OPTICAL","THERMAL","SIGINT","EW-ACTIVE"],
  vehicle: ["ARMED","CIVILIAN","MILITARY","UNKNOWN"],
  personnel: ["ARMED","UNARMED","HOSTILE","FRIENDLY"],
};

const STATUSES: EntityStatus[] = ["ACTIVE","MOVING","STATIONARY","MOVING","ACTIVE"];

function rnd(min: number, max: number) { return min + Math.random() * (max - min); }
function ts() { return new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }); }

export function createInitialEntities(): Entity[] {
  const configs: { type: EntityType; idx: number }[] = [
    {type:"drone",idx:0},{type:"drone",idx:1},{type:"drone",idx:2},{type:"drone",idx:3},
    {type:"vehicle",idx:0},{type:"vehicle",idx:1},{type:"vehicle",idx:2},{type:"vehicle",idx:3},{type:"vehicle",idx:4},
    {type:"personnel",idx:0},{type:"personnel",idx:1},{type:"personnel",idx:2},{type:"personnel",idx:3},
  ];

  return configs.map(({ type, idx }, i) => {
    const lat = CENTER_LAT + rnd(-SPREAD, SPREAD);
    const lng = CENTER_LNG + rnd(-SPREAD, SPREAD);
    const threat = Math.random() < 0.18;
    const labels = LABELS[type];
    const label = labels[idx % labels.length];
    return {
      id: `${type}-${i}`,
      label,
      type,
      status: threat ? "THREAT" : STATUSES[Math.floor(Math.random() * STATUSES.length)],
      lat, lng,
      speed: type === "drone" ? rnd(45, 130) : type === "vehicle" ? rnd(20, 85) : rnd(3, 14),
      heading: rnd(0, 360),
      altitude: type === "drone" ? rnd(60, 420) : undefined,
      lastSeen: ts(),
      trail: [[lat, lng]],
      notes: NOTES[type].slice(0, 2 + Math.floor(Math.random() * 2)),
      threat,
    };
  });
}

export function stepEntities(entities: Entity[]): Entity[] {
  return entities.map((e) => {
    let heading = e.heading;
    if (Math.random() < 0.08) heading += rnd(-35, 35);

    let status = e.status;
    if (Math.random() < 0.025 && status !== "THREAT") {
      status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    }
    if (Math.random() < 0.006) status = "LOST";
    if (status === "LOST" && Math.random() < 0.25) status = "ACTIVE";

    const speedMps = (e.speed * 1000) / 3600;
    const dist = speedMps * 2;
    const rad = (heading * Math.PI) / 180;
    let lat = e.lat + Math.cos(rad) * dist * DEG_PER_METER;
    let lng = e.lng + Math.sin(rad) * dist * (DEG_PER_METER / Math.cos((e.lat * Math.PI) / 180));

    if (Math.abs(lat - CENTER_LAT) > SPREAD * 1.6) heading = (heading + 180) % 360;
    if (Math.abs(lng - CENTER_LNG) > SPREAD * 1.6) heading = (heading + 180) % 360;
    heading = ((heading % 360) + 360) % 360;

    return {
      ...e,
      lat, lng, heading, status,
      speed: Math.max(1, e.speed + rnd(-2, 2)),
      lastSeen: ts(),
      trail: [...e.trail.slice(-22), [lat, lng] as [number, number]],
    };
  });
}

const FEED_MSGS: Record<EntityType, string[]> = {
  drone: ["entered restricted airspace","signal acquired — bearing {hdg}°","altitude change detected","thermal signature confirmed","transponder offline","waypoint updated","new contact established"],
  vehicle: ["speed {spd} km/h","stopped at grid {grid}","route deviation detected","new contact identified","lost contact","convoy formation observed","license plate unreadable"],
  personnel: ["movement detected","armed status confirmed","group of {n} identified","lost contact","new contact — bearing {hdg}°","activity spike","perimeter breach"],
};

export function generateFeedEvent(entities: Entity[]): FeedEvent | null {
  if (Math.random() > 0.55) return null;
  const e = entities[Math.floor(Math.random() * entities.length)];
  let msg = FEED_MSGS[e.type][Math.floor(Math.random() * FEED_MSGS[e.type].length)];
  msg = msg
    .replace("{hdg}", Math.round(e.heading).toString())
    .replace("{spd}", Math.round(e.speed).toString())
    .replace("{grid}", `${(e.lat).toFixed(3)}/${(e.lng).toFixed(3)}`)
    .replace("{n}", (2 + Math.floor(Math.random() * 5)).toString());

  const level: FeedEvent["level"] =
    e.threat || msg.includes("armed") || msg.includes("restricted") || msg.includes("breach") ? "alert"
    : msg.includes("deviation") || msg.includes("offline") || msg.includes("lost") ? "warn"
    : "info";

  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    timestamp: ts(),
    message: `${e.label} — ${msg}`,
    level,
    entityId: e.id,
  };
}
