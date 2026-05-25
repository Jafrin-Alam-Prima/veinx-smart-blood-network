"use client";

import * as React from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Draggable bottom sheet with two snap points (peek / expanded).
 * Mobile-first; drag the handle or sheet to switch snaps, drag down past
 * the peek height to dismiss (if onClose provided).
 */
export function BottomSheet({
  open,
  onClose,
  peekHeight = 320,
  expandedVh = 88,
  children,
  className,
}: {
  open: boolean;
  onClose?: () => void;
  peekHeight?: number;
  expandedVh?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const [expanded, setExpanded] = React.useState(false);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 500) {
      if (expanded) setExpanded(false);
      else onClose?.();
    } else if (info.offset.y < -80 || info.velocity.y < -500) {
      setExpanded(true);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="sheet"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.18}
          onDragEnd={onDragEnd}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          style={{
            height: expanded ? `${expandedVh}vh` : peekHeight,
          }}
          className={cn(
            "pointer-events-auto fixed inset-x-0 bottom-0 z-30 flex flex-col rounded-t-3xl glass-strong shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)]",
            className,
          )}
        >
          <div
            className="flex shrink-0 cursor-grab justify-center py-3 active:cursor-grabbing"
            onClick={() => setExpanded((e) => !e)}
          >
            <div className="h-1.5 w-11 rounded-full bg-white/25" />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
