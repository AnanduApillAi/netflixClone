"use client";
import { Link } from "next-view-transitions"
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HeroNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const router = useTransitionRouter();
  let query = "";
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") || "").trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }
  return (
    <nav className="h-14 sm:h-16 flex items-center justify-between">
      <div className="relative flex items-center gap-4 sm:gap-7">
        <button ref={btnRef} onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/2 cursor-pointer">
        <svg fill="#000000" height="174px" width="174px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="-6.56 -6.56 29.12 29.12" stroke="#000000" stroke-width="0.144" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.384"></g><g id="SVGRepo_iconCarrier"> <path className="cls-1" d="M6.5,11A1.5,1.5,0,1,1,5,9.5,1.5,1.5,0,0,1,6.5,11ZM5,3.5A1.5,1.5,0,1,0,6.5,5,1.5,1.5,0,0,0,5,3.5ZM12.5,11A1.5,1.5,0,1,1,11,9.5,1.5,1.5,0,0,1,12.5,11ZM11,3.5A1.5,1.5,0,1,0,12.5,5,1.5,1.5,0,0,0,11,3.5Z"></path> </g></svg>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              id="hero-menu"
              ref={menuRef}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute left-0 top-10 z-50 w-[200px] rounded-xl border border-[#E5E7EB] bg-white shadow-[0_12px_28px_rgba(16,24,40,0.18)] p-1 text-[13px]"
            >
              <Link onClick={() => setOpen(false)} href="/" className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-black hover:bg-[#F4F5F7] ${isActive("/") ? "font-bold" : ""}`}>Home</Link>
              <Link onClick={() => setOpen(false)} href="/movies" className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-black hover:bg-[#F4F5F7] ${isActive("/movies") ? "font-bold" : ""}`}>Movies</Link>
              <Link onClick={() => setOpen(false)} href="/tvshows" className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-black hover:bg-[#F4F5F7] ${isActive("/tvshows") ? "font-bold" : ""}`}>TV Shows</Link>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <div className="relative">
            <input name="q" placeholder="Search" autoComplete="off" className="w-[140px] sm:w-[180px] lg:w-[220px] h-9 rounded-lg border border-black/10 pl-9 pr-3 text-[13px] sm:text-[14px] outline-none text-black" />
            <svg className="absolute left-2 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B0F19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </form>
      </div>
    </nav>
  );
}


