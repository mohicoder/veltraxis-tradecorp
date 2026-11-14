import {
  Accessibility, Boxes, BrickWall, Calculator, Car, ClipboardCheck, Cog, Factory, FileText, Globe, LayoutGrid, Layers,
  Package, PawPrint, PlaneLanding, PlaneTakeoff, Plug, Repeat, Ruler, Search, Shirt, Ship, Sparkles, SprayCan,
  Stethoscope, Tag, UserRound, Wheat, type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  stethoscope: Stethoscope, accessibility: Accessibility, sparkles: Sparkles, spray: SprayCan, wheat: Wheat, paw: PawPrint,
  shirt: Shirt, cog: Cog, plug: Plug, car: Car, brick: BrickWall, package: Package, search: Search, export: PlaneTakeoff,
  import: PlaneLanding, boxes: Boxes, tag: Tag, layers: Layers, file: FileText, ship: Ship, globe: Globe, grid: LayoutGrid,
  factory: Factory, ruler: Ruler, calculator: Calculator, clipboard: ClipboardCheck, user: UserRound, repeat: Repeat,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = map[name] ?? Package;
  return <C className={className} aria-hidden="true" strokeWidth={1.6} />;
}
