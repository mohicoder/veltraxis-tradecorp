import { LAND_DOTS, MAP_BOUNDS, MAP_H, MAP_W } from '@/lib/map-data';

type City = { name: string; lon: number; lat: number; dx?: number; dy?: number; anchor?: 'start' | 'end' | 'middle' };

const ORIGIN: City = { name: 'India', lon: 72.2, lat: 21.5 };

const DESTINATIONS: City[] = [
  { name: 'Moscow', lon: 37.6, lat: 55.75, dx: -8, dy: -8, anchor: 'end' },
  { name: 'St Petersburg', lon: 30.3, lat: 59.9, dx: -8, dy: -6, anchor: 'end' },
  { name: 'Minsk', lon: 27.6, lat: 53.9, dx: -8, dy: 4, anchor: 'end' },
  { name: 'Warsaw', lon: 21.0, lat: 52.2, dx: -8, dy: 4, anchor: 'end' },
  { name: 'Bucharest', lon: 26.1, lat: 44.4, dx: -8, dy: 4, anchor: 'end' },
  { name: 'Almaty', lon: 76.9, lat: 43.2, dx: 8, dy: 4, anchor: 'start' },
  { name: 'Tashkent', lon: 69.2, lat: 41.3, dx: -8, dy: -6, anchor: 'end' },
  { name: 'Baku', lon: 49.9, lat: 40.4, dx: 8, dy: -6, anchor: 'start' },
  { name: 'Dubai', lon: 55.3, lat: 25.2, dx: 0, dy: -11, anchor: 'middle' },
  { name: 'Riyadh', lon: 46.7, lat: 24.7, dx: -8, dy: 4, anchor: 'end' },
  { name: 'Cairo', lon: 31.2, lat: 30.0, dx: -8, dy: 4, anchor: 'end' },
  { name: 'Casablanca', lon: -7.6, lat: 33.6, dx: 0, dy: -11, anchor: 'middle' },
];

const project = (c: { lon: number; lat: number }) => ({
  x: ((c.lon - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * MAP_W,
  y: ((MAP_BOUNDS.north - c.lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * MAP_H,
});

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  // bend the arc "upwards" (towards north) by a fraction of its length
  let nx = -dy / dist;
  let ny = dx / dist;
  if (ny > 0) { nx = -nx; ny = -ny; }
  const k = Math.min(0.28 * dist, 120);
  const cx = mx + nx * k;
  const cy = my + ny * k;
  // approximate length of the quadratic curve
  let len = 0;
  let px = a.x, py = a.y;
  for (let i = 1; i <= 24; i++) {
    const t = i / 24;
    const x = (1 - t) ** 2 * a.x + 2 * (1 - t) * t * cx + t ** 2 * b.x;
    const y = (1 - t) ** 2 * a.y + 2 * (1 - t) * t * cy + t ** 2 * b.y;
    len += Math.hypot(x - px, y - py);
    px = x; py = y;
  }
  return { d: `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`, len: Math.ceil(len) };
}

export function RouteMap({ className = '' }: { className?: string }) {
  const o = project(ORIGIN);
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className={className} role="img" aria-label="Trade routes from India to Russia, the CIS, Eastern Europe, the Gulf and North Africa">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="routeGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#F1E2AE" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>

      <path d={LAND_DOTS} stroke="#9DB8CB" strokeOpacity="0.45" strokeWidth="3.2" strokeLinecap="round" fill="none" />

      <circle cx={o.x} cy={o.y} r="70" fill="url(#glow)" />

      {DESTINATIONS.map((c, i) => {
        const p = project(c);
        const { d, len } = arc(o, p);
        const delay = 0.15 + i * 0.12;
        return (
          <g key={c.name}>
            <path d={d} fill="none" stroke="#D4AF37" strokeOpacity="0.18" strokeWidth="1" />
            <path id={`r${i}`} d={d} fill="none" stroke="url(#routeGrad)" strokeWidth="1.5" strokeLinecap="round" className="route-path" style={{ ['--len' as string]: len, animationDelay: `${delay}s` }} />
            <circle className="route-ship" r="2.6" fill="#FCFAF4">
              <animateMotion dur={`${3.2 + (i % 4) * 0.7}s`} begin={`${delay + 1.4}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
            </circle>
            <circle cx={p.x} cy={p.y} r="3.4" fill="#D4AF37" />
            <circle cx={p.x} cy={p.y} r="3.4" fill="none" stroke="#D4AF37" strokeWidth="1" className="pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            <text x={p.x + (c.dx ?? 8)} y={p.y + (c.dy ?? 4)} textAnchor={c.anchor ?? 'start'} fill="#F6F1E4" fillOpacity="0.85" fontSize="14" fontWeight="600" fontFamily="Manrope Variable, Manrope, sans-serif">{c.name}</text>
          </g>
        );
      })}

      <circle cx={o.x} cy={o.y} r="7" fill="#D4AF37" stroke="#08151F" strokeWidth="2.5" />
      <circle cx={o.x} cy={o.y} r="7" fill="none" stroke="#D4AF37" strokeWidth="1.4" className="pulse" />
      <text x={o.x + 13} y={o.y + 19} fill="#E6CC77" fontSize="15" fontWeight="800" letterSpacing="2.5" fontFamily="Manrope Variable, Manrope, sans-serif">INDIA</text>
    </svg>
  );
}
