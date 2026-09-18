import {
  LayoutDashboard,
  FlaskConical,
  SunMedium,
  MapPin,
  Network,
  BookOpen,
  Radio,
  ShieldAlert,
  FolderGit2,
  FileText,
  GraduationCap,
  Settings,
  HelpCircle,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Assess", href: "/assess/chemical", icon: FlaskConical },
  { name: "Weather & WBGT", href: "/weather", icon: SunMedium },
  { name: "Installations", href: "/installations", icon: MapPin },
  { name: "Organization Context", href: "/organization-context", icon: Network },
  { name: "Hazard Library", href: "/hazard-library", icon: BookOpen },
  { name: "Public Situational Awareness", href: "/public-situational-awareness", icon: Radio },
  { name: "FPCON Reference", href: "/fpcon", icon: ShieldAlert },
  { name: "Scenarios", href: "/scenarios", icon: FolderGit2 },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Training & Education", href: "/training", icon: GraduationCap },
  { name: "Administration", href: "/admin", icon: Settings },
  { name: "Help & Limitations", href: "/limitations", icon: HelpCircle },
];

export const MOBILE_PRIMARY_NAV: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Assess", href: "/assess/chemical", icon: FlaskConical },
  { name: "Weather", href: "/weather", icon: SunMedium },
  { name: "Library", href: "/hazard-library", icon: BookOpen },
  { name: "Scenarios", href: "/scenarios", icon: FolderGit2 },
];
