"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ToastVariant = "info" | "success" | "error";
type Toast = { id: number; title: string; description?: string; variant: ToastVariant };

type ToastContextValue = {
  addToast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(1);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = idRef.current++;
    setToasts((prev) => [...prev, { id, ...toast }]);
    // auto-dismiss
    setTimeout(() => remove(id), 4000);
  }, [remove]);

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              "pointer-events-auto w-80 rounded border p-3 shadow-lg",
              "bg-neutral-900/95 border-white/10 text-white",
              t.variant === "error" ? "border-red-500/40" : t.variant === "success" ? "border-emerald-500/40" : "border-white/10",
            ].join(" ")}
          >
            <div className="text-sm font-medium">{t.title}</div>
            {t.description && <div className="mt-1 text-xs text-neutral-300">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function ToastOnMount({ title, description, variant = "error" }: { title: string; description?: string; variant?: ToastVariant }) {
  const { addToast } = useToast();
  useEffect(() => {
    addToast({ title, description, variant });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}


