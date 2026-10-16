import {
  Award,
  BadgeDollarSign,
  BarChart3,
  Bot,
  Boxes,
  Brain,
  Bug,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  Cloud,
  Code2,
  Compass,
  Database,
  Eye,
  Factory,
  FileText,
  Gauge,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  Layers,
  LifeBuoy,
  Lightbulb,
  Link2,
  Lock,
  MessageSquare,
  Monitor,
  Network,
  PenTool,
  PiggyBank,
  Plug,
  Puzzle,
  Radio,
  RefreshCw,
  Rocket,
  Scale,
  Search,
  Server,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { iconFor, type IconKey } from "@/lib/home/icon-for";
import styles from "./card-icon-badge.module.css";

/**
 * Key → lucide glyph. Kept beside the badge rather than in `icon-for.ts` so
 * the picker stays a pure, React-free module the unit tests can import.
 */
export const ICON_COMPONENTS: Readonly<Record<IconKey, LucideIcon>> = {
  brain: Brain,
  sparkles: Sparkles,
  bot: Bot,
  cloud: Cloud,
  shield: ShieldCheck,
  lock: Lock,
  smartphone: Smartphone,
  globe: Globe,
  chart: BarChart3,
  database: Database,
  plug: Plug,
  users: Users,
  handshake: Handshake,
  clock: Clock,
  piggy: PiggyBank,
  dollar: BadgeDollarSign,
  check: CheckCircle2,
  bug: Bug,
  search: Search,
  pen: PenTool,
  code: Code2,
  rocket: Rocket,
  lifebuoy: LifeBuoy,
  compass: Compass,
  trending: TrendingUp,
  layers: Layers,
  refresh: RefreshCw,
  workflow: Workflow,
  server: Server,
  gauge: Gauge,
  target: Target,
  award: Award,
  lightbulb: Lightbulb,
  message: MessageSquare,
  file: FileText,
  eye: Eye,
  cart: ShoppingCart,
  truck: Truck,
  heart: HeartPulse,
  graduation: GraduationCap,
  building: Building2,
  landmark: Landmark,
  radio: Radio,
  factory: Factory,
  zap: Zap,
  puzzle: Puzzle,
  settings: Settings,
  clipboard: ClipboardList,
  monitor: Monitor,
  network: Network,
  boxes: Boxes,
  scale: Scale,
  link: Link2,
};

/**
 * A card's icon badge — the small accent-tinted rounded square that replaces
 * the "01"/"Step 02" ordinals the landing-page review asked to be retired.
 *
 * The glyph is picked from the card's own words by `iconFor` (see
 * `lib/home/icon-for.ts`), so no content module has to name one. Pass
 * `iconKey` to override the pick where a caller already knows better.
 *
 * Always `aria-hidden`: the card's heading names the subject, and a glyph read
 * aloud ("brain", "rocket") would only repeat or garble it.
 *
 * `size` is `md` by default (44px, the process-step size); `sm` (36px) suits
 * the denser card grids and the carousel's text band. Colours come from the
 * band's own tokens, so the badge re-tints itself inside a `.light` section.
 */
export default function CardIconBadge({
  title,
  body,
  iconKey,
  size = "md",
  className,
}: Readonly<{
  title: string;
  body?: string;
  iconKey?: IconKey;
  size?: "sm" | "md";
  className?: string;
}>) {
  const Icon = ICON_COMPONENTS[iconKey ?? iconFor(title, body)];
  return (
    <span
      className={[styles.badge, size === "sm" ? styles.sm : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <Icon className={styles.glyph} strokeWidth={1.7} aria-hidden focusable={false} />
    </span>
  );
}
