import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropMark } from "@/components/shared/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center justify-center px-6 text-center">
      <DropMark className="mb-6 size-16" pulse />
      <h1 className="text-4xl font-black">404</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        This page slipped out of circulation. Let&apos;s get you back to safety.
      </p>
      <Link href="/" className="mt-6">
        <Button size="lg">Back to VeinX</Button>
      </Link>
    </div>
  );
}
