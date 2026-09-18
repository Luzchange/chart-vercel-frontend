import {
  LayoutDashboard,
  FlaskConical,
  SunMedium,
  MapPin,
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
  { name: "CBRN Assessment", href: "/hazard-library", icon: ShieldAlert },
  { name: "Public Situational Awareness", href: "/public-situational-awareness", icon: Radio },
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
  { name: "CBRN", href: "/hazard-library", icon: ShieldAlert },
  { name: "Scenarios", href: "/scenarios", icon: FolderGit2 },
];
