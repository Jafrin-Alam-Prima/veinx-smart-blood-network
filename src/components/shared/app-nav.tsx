"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Map, HeartHandshake, Building2, Plus, Wifi, WifiOff } from "lucide-react";
import { Logo } from "./logo";
import { LanguageToggle } from "./language-toggle";
import { useT } from "@/lib/i18n";
import { useUserStore } from "@/store/user-store";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

const NAV = [
  { href: "/map", icon: Map, labelKey: "nav.map", role: "patient" as Role },
  { href: "/donor", icon: HeartHandshake, labelKey: "nav.donor", role: "donor" as Role },
  { href: "/hospital", icon: Building2, labelKey: "nav.hospital", role: "hospital" as Role },
];

export function AppTopBar() {
  const isOnline = useUserStore((s) => s.isOnline);
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <div className="glass mx-auto flex max-w-3xl items-center justify-between rounded-2xl px-3 py-2">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium",
              isOnline
                ? "bg-success/15 text-success"
                : "bg-warning/15 text-warning",
            )}
          >
            {isOnline ? (
              <Wifi className="size-3" />
            ) : (
              <WifiOff className="size-3" />
            )}
            {isOnline ? "Live" : "Offline"}
          </span>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}

export function AppBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useT();
  const setRole = useUserStore((s) => s.setRole);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3">
      <div className="glass-strong mx-auto flex max-w-3xl items-center justify-around rounded-2xl p-1.5">
        {NAV.slice(0, 1).map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={t(item.labelKey)}
            active={pathname.startsWith(item.href)}
            onClick={() => setRole(item.role)}
          />
        ))}

        <Link
          href="/request"
          className="-mt-7 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_30px_-6px_rgba(255,45,85,0.7)] transition-transform active:scale-95"
          aria-label={t("common.requestBlood")}
        >
          <Plus className="size-6" />
        </Link>

        {NAV.slice(1).map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={t(item.labelKey)}
            active={pathname.startsWith(item.href)}
            onClick={() => {
              setRole(item.role);
              router.push(item.href);
            }}
          />
        ))}
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: typeof Map;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-medium transition-colors",
        active ? "text-primary-bright" : "text-muted-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 rounded-xl bg-primary/12"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <Icon className="relative size-5" />
      <span className="relative">{label}</span>
    </Link>
  );
}
