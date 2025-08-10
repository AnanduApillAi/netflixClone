"use client";
import { useEffect } from "react";
import { ToastOnMount } from "@/components/ui/toast";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-6 py-8">
      <ToastOnMount title="Network error" description="Failed to load TV Shows." variant="error" />
      <p className="text-neutral-400">Something went wrong.</p>
    </div>
  );
}


