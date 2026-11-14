'use client';

import { useEffect, useRef } from 'react';
import { GLOBE_LAND_MASK, GLOBE_N } from '@/lib/globe-data';

type City = { name: string; lon: number; lat: number; label?: boolean };

const HUB: City = { name: 'India', lon: 72.9, lat: 19.5 };
const CITIES: City[] = [
  { name: 'Moscow', lon: 37.6, lat: 55.75, label: true },
  { name: 'St Petersburg', lon: 30.3, lat: 59.9 },
  { name: 'Minsk', lon: 27.6, lat: 53.9 },
  { name: 'Warsaw', lon: 21.0, lat: 52.2, label: true },
  { name: 'Bucharest', lon: 26.1, lat: 44.4 },
  { name: 'Almaty', lon: 76.9, lat: 43.2, label: true },
  { name: 'Tashkent', lon: 69.2, lat: 41.3 },
  { name: 'Baku', lon: 49.9, lat: 40.4 },
  { name: 'Dubai', lon: 55.3, lat: 25.2, label: true },
  { name: 'Riyadh', lon: 46.7, lat: 24.7 },
  { name: 'Cairo', lon: 31.2, lat: 30.0, label: true },
  { name: 'Casablanca', lon: -7.6, lat: 33.6 },
];

const RAD = Math.PI / 180;
type V3 = [number, number, number];
const toVec = (lon: number, lat: number): V3 => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)];

function landPoints(): Float32Array {
  const bin = atob(GLOBE_LAND_MASK);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const out: number[] = [];
  for (let i = 0; i < GLOBE_N; i++) {
    if (!(bin.charCodeAt(i >> 3) & (1 << (i & 7)))) continue;
    const y = 1 - ((i + 0.5) * 2) / GLOBE_N;
    const r = Math.sqrt(1 - y * y);
    const th = i * golden;
    out.push(r * Math.sin(th), y, r * Math.cos(th));
  }
  return new Float32Array(out);
}

/** Great-circle arc from a to b, lifted off the surface; returns points as unit-sphere vectors * radius. */
function arcPoints(a: V3, b: V3, steps = 64): V3[] {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  const s = Math.sin(omega) || 1;
  const lift = 0.06 + omega * 0.28;
  const pts: V3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const k1 = Math.sin((1 - t) * omega) / s;
    const k2 = Math.sin(t * omega) / s;
    const h = 1 + lift * Math.sin(Math.PI * t);
    pts.push([(a[0] * k1 + b[0] * k2) * h, (a[1] * k1 + b[1] * k2) * h, (a[2] * k1 + b[2] * k2) * h]);
  }
  return pts;
}

export function Globe({ className = '', scale = 0.44, labels = {}, aria }: { className?: string; scale?: number; labels?: Record<string, string>; aria: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const land = landPoints();
    const hub = toVec(HUB.lon, HUB.lat);
    const routes = CITIES.map((c, i) => ({ city: c, v: toVec(c.lon, c.lat), pts: arcPoints(hub, toVec(c.lon, c.lat)), speed: 0.085 + (i % 5) * 0.018, offset: (i * 0.137) % 1 }));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      R = Math.min(W, H) * scale;
      cx = W / 2; cy = H / 2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // pointer parallax
    let px = 0, py = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const L: V3 = (() => { const v: V3 = [0.62, 0.38, 0.68]; const n = Math.hypot(...v); return [v[0] / n, v[1] / n, v[2] / n]; })();
    const BUCKETS = 7;
    const buckets: number[][] = Array.from({ length: BUCKETS }, () => []);

    let raf = 0, visible = true, start = performance.now();

    const draw = (now: number) => {
      const t = reduce ? 0 : (now - start) / 1000;
      px += (tx - px) * 0.04; py += (ty - py) * 0.04;
      const lon0 = (48 + Math.sin(t * 0.09) * 16 + px * 6) * RAD;
      const lat0 = (24 + py * -4) * RAD;
      const cl = Math.cos(lon0), sl = Math.sin(lon0), cp = Math.cos(lat0), sp = Math.sin(lat0);
      const rot = (x: number, y: number, z: number): V3 => {
        const x1 = x * cl - z * sl;
        const z1 = x * sl + z * cl;
        return [x1, y * cp - z1 * sp, y * sp + z1 * cp];
      };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // outer atmosphere glow
      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.35);
      halo.addColorStop(0, 'rgba(120,160,210,0.16)');
      halo.addColorStop(0.35, 'rgba(90,130,190,0.06)');
      halo.addColorStop(1, 'rgba(90,130,190,0)');
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2); ctx.fill();

      // sphere body — lit from upper right
      const body = ctx.createRadialGradient(cx + R * 0.42, cy - R * 0.3, R * 0.05, cx, cy, R);
      body.addColorStop(0, '#22344C');
      body.addColorStop(0.45, '#101B2A');
      body.addColorStop(1, '#05080D');
      ctx.fillStyle = body;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      // land dots, bucketed by brightness for fast drawing
      for (const b of buckets) b.length = 0;
      for (let i = 0; i < land.length; i += 3) {
        const [x, y, z] = rot(land[i], land[i + 1], land[i + 2]);
        if (z <= 0.02) continue;
        const light = Math.max(0, x * L[0] + y * L[1] + z * L[2]);
        const edge = Math.pow(z, 0.6);
        const b = Math.min(BUCKETS - 1, Math.floor((0.28 + light * 0.72) * edge * BUCKETS));
        buckets[b].push(cx + x * R, cy - y * R);
      }
      const ds = Math.max(1.2, R / 260);
      for (let b = 0; b < BUCKETS; b++) {
        const arr = buckets[b];
        if (!arr.length) continue;
        const a = 0.16 + (b / (BUCKETS - 1)) * 0.84;
        ctx.fillStyle = `rgba(196,214,235,${a.toFixed(3)})`;
        ctx.beginPath();
        for (let k = 0; k < arr.length; k += 2) ctx.rect(arr[k] - ds / 2, arr[k + 1] - ds / 2, ds, ds);
        ctx.fill();
      }

      // rim light on the lit edge
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
      const rim = ctx.createRadialGradient(cx - R * 0.28, cy + R * 0.16, R * 0.95, cx - R * 0.1, cy + R * 0.05, R * 1.22);
      rim.addColorStop(0, 'rgba(0,0,0,0)');
      rim.addColorStop(0.55, 'rgba(160,200,230,0.10)');
      rim.addColorStop(0.8, 'rgba(200,226,214,0.38)');
      rim.addColorStop(1, 'rgba(236,220,170,0.7)');
      ctx.fillStyle = rim;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      // night side
      const night = ctx.createLinearGradient(cx - R, cy + R * 0.4, cx + R * 0.4, cy - R * 0.3);
      night.addColorStop(0, 'rgba(3,5,9,0.55)');
      night.addColorStop(0.55, 'rgba(3,5,9,0)');
      ctx.fillStyle = night;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      ctx.restore();

      // routes
      const project = (p: V3) => {
        const [x, y, z] = rot(p[0], p[1], p[2]);
        const occluded = z < 0 && x * x + y * y < 1;
        return { x: cx + x * R, y: cy - y * R, z, occluded };
      };
      ctx.lineCap = 'round';
      for (const r of routes) {
        const pp = r.pts.map(project);
        // faint full path
        ctx.strokeStyle = 'rgba(214,190,128,0.22)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        let pen = false;
        for (const p of pp) {
          if (p.occluded) { pen = false; continue; }
          if (!pen) { ctx.moveTo(p.x, p.y); pen = true; } else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // travelling light
        const head = ((t * r.speed + r.offset) % 1.25);
        const tail = head - 0.28;
        const n = pp.length - 1;
        for (let i = Math.max(0, Math.floor(tail * n)); i < Math.min(n, Math.ceil(head * n)); i++) {
          const a = pp[i], b = pp[i + 1];
          if (a.occluded || b.occluded) continue;
          const f = (i / n - tail) / (head - tail);
          ctx.strokeStyle = `rgba(240,214,140,${(Math.max(0, f) * 0.95).toFixed(3)})`;
          ctx.lineWidth = 1 + f * 1.4;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
        if (head <= 1) {
          const hp = pp[Math.min(n, Math.round(head * n))];
          if (!hp.occluded) {
            const g = ctx.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, 7);
            g.addColorStop(0, 'rgba(255,240,200,0.95)');
            g.addColorStop(1, 'rgba(255,240,200,0)');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hp.x, hp.y, 7, 0, Math.PI * 2); ctx.fill();
          }
        }

        // destination marker
        const d = project(r.v);
        if (d.z > 0.05) {
          const pulse = reduce ? 0 : (t * 0.6 + r.offset) % 1;
          ctx.strokeStyle = `rgba(214,190,128,${(0.6 * (1 - pulse) * d.z).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(d.x, d.y, 3 + pulse * 9, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = `rgba(232,208,140,${(0.4 + 0.6 * d.z).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, 2.4, 0, Math.PI * 2); ctx.fill();
          if (r.city.label && R > 170) {
            ctx.font = '600 10.5px "Geist Variable", system-ui, sans-serif';
            ctx.fillStyle = `rgba(226,232,240,${(0.75 * d.z).toFixed(3)})`;
            ctx.fillText((labels[r.city.name] ?? r.city.name).toUpperCase(), d.x + 8, d.y + 3.5);
          }
        }
      }

      // hub
      const h = project(hub);
      if (h.z > 0) {
        const glow = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 34);
        glow.addColorStop(0, 'rgba(240,210,130,0.55)');
        glow.addColorStop(1, 'rgba(240,210,130,0)');
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(h.x, h.y, 34, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#F6E3A8';
        ctx.beginPath(); ctx.arc(h.x, h.y, 4.2, 0, Math.PI * 2); ctx.fill();
        if (R > 170) {
          ctx.font = '700 11.5px "Geist Variable", system-ui, sans-serif';
          ctx.fillStyle = 'rgba(246,227,168,0.95)';
          ctx.fillText((labels.India ?? 'India').toUpperCase(), h.x + 10, h.y + 16);
        }
      }

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting && document.visibilityState === 'visible';
      if (visible && !was && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    const onVis = () => {
      const was = visible;
      visible = document.visibilityState === 'visible';
      if (visible && !was && !reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(draw);
    let staticRo: ResizeObserver | null = null;
    if (reduce) {
      // no animation loop: redraw once whenever the size changes
      ro.disconnect();
      staticRo = new ResizeObserver(() => { resize(); draw(performance.now()); });
      staticRo.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      staticRo?.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [scale, labels]);

  return <canvas ref={canvasRef} className={className} role="img" aria-label={aria} />;
}
