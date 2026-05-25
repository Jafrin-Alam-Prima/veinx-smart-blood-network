"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            className: "glass-strong !rounded-xl !text-foreground",
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  );
}
