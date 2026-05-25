"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Logo } from "@/components/shared/logo";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

export function SiteHeader() {
  const { t } = useT();
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
    >
      <div className="glass flex w-full items-center justify-between rounded-2xl px-4 py-2.5">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Link href="/present">
            <Button size="sm" variant="ghost" className="hidden sm:inline-flex">
              Present
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="sm" variant="ghost" className="hidden sm:inline-flex">
              Demo
            </Button>
          </Link>
          <Link href="/request">
            <Button size="sm">{t("common.requestBlood")}</Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
