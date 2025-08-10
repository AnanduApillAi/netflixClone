"use client";
import { useCallback } from "react";

export default function HeroPills() {
  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const btn = target.closest("button[data-pill]") as HTMLButtonElement | null;
    if (!btn) return;
    const root = btn.parentElement as HTMLElement;
    const buttons = Array.from(root.querySelectorAll("button[data-pill]"));
    buttons.forEach((b) => {
      b.classList.remove("bg-purple", "bg-[#6C5CE7]", "text-white");
      b.classList.add("bg-[#F4F5F7]", "text-[#111827]");
    });
    btn.classList.add("bg-[#6C5CE7]", "text-white");
    btn.classList.remove("bg-[#F4F5F7]", "text-[#111827]");
    const ev = new CustomEvent('hero:pill', { detail: { value: btn.dataset.value } });
    window.dispatchEvent(ev);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 sm:gap-[10px] flex-wrap" role="tablist" aria-label="Filters" onClick={onClick}>
      <button
        data-pill
        data-value="popular"
        className="h-8 sm:h-9 px-3 sm:px-4 rounded-full text-[12px] sm:text-[14px] font-medium bg-[#6C5CE7] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7] focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer"
      >
        Popular
      </button>
      <button
        data-pill
        data-value="latest"
        className="h-8 sm:h-9 px-3 sm:px-4 rounded-full text-[12px] sm:text-[14px] font-medium bg-[#F4F5F7] text-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7] focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer"
      >
        Latest
      </button>
      <button
        data-pill
        data-value="top_rated"
        className="h-8 sm:h-9 px-3 sm:px-4 rounded-full text-[12px] sm:text-[14px] font-medium bg-[#F4F5F7] text-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7] focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer"
      >
        Top Rated
      </button>
      <button
        data-pill
        data-value="recommended"
        className="h-8 sm:h-9 px-3 sm:px-4 rounded-full text-[12px] sm:text-[14px] font-medium bg-[#F4F5F7] text-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C5CE7] focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer"
      >
        Recommended
      </button>
    </div>
  );
}


