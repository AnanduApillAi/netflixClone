"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { poster } from "@/lib/api";
import { useTransitionRouter } from "next-view-transitions";

import { HeroItem, HeroPillEvent } from "@/lib/types";

export default function HeroCarousel() {
  const [items, setItems] = useState<HeroItem[]>([]);
  const [restItems, setRestItems] = useState<HeroItem[]>([]);
  const [loading, setLoading] = useState(false);
  const stepDeg = 36; // rotation per interaction
  const [stepOffset, setStepOffset] = useState(0); // number of steps rotated
  const [selectedIndex, setSelectedIndex] = useState(7); // selected card state, starting at 7
  const [animCycle, setAnimCycle] = useState(0); // increments to retrigger entrance animation
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [mounted, setMounted] = useState(false);
  const router = useTransitionRouter();
  const wheelLockRef = useRef(false);
  const touchRef = useRef<{ x: number; y: number; triggered: boolean } | null>(null);

  // Responsive sizing based on viewport width
  const isSmall = viewportWidth < 640;
  const isXSmall = viewportWidth < 400;
  const isMedium = viewportWidth >= 640 && viewportWidth < 1024;
  // Slightly larger cards for <650 as requested
  const cardWidth = isXSmall ? Math.min(160, viewportWidth - 40) : isSmall ? 200 : isMedium ? 220 : 260; // px width of each card, clamp for tiny screens
  const cardHeight = Math.round(cardWidth * 1.5); // maintain 2:3 ratio
  const numSides = 10; // number of sides in a decagon
  // Base radius per breakpoint, then clamp to viewport so axis stays centered on tiny screens
  const baseRadius = isXSmall ? 160 : isSmall ? 220 : isMedium ? 320 : 400;
  const maxRadiusByViewport = Math.max(140, Math.floor((viewportWidth - 24) / 2));
  const radius = Math.min(baseRadius, maxRadiusByViewport);

  const load = async (kind: string) => {
    setLoading(true);
    
    try {
      const res = await fetch(`/api/tmdb?kind=${encodeURIComponent(kind)}`);
      const data = await res.json();
      const list: HeroItem[] = Array.isArray(data.results) ? data.results.slice(0, 10) : [];
      // add the rest of the items to another array
      const rest = Array.isArray(data.results) ? data.results.slice(10) : [];
      setRestItems(rest);
      setItems(list);
      console.log(list,'list')
      console.log(rest,'rest')
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    load("popular");
    const onPill = (e: Event) => {
      const customEvent = e as HeroPillEvent;
      load(customEvent.detail?.value || "popular");
    };
    window.addEventListener("hero:pill", onPill);
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener("hero:pill", onPill);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // When data finishes loading, trigger a new animation cycle. Also ensures skeleton shows first.
  useEffect(() => {
    if (!loading && items.length > 0) {
      setAnimCycle((c) => c + 1);
    }
  }, [loading, items.length]);
  
  

  function step( direction: "up" | "down") {
    const computedRemoveIndex = (selectedIndex + 4) % numSides;

    let nextItems = items;
    let nextRest = restItems;

    if (items.length === numSides && items[computedRemoveIndex]) {
      if (restItems.length > 0) {
        const [firstFromRest, ...restTail] = restItems;
        nextItems = [...items];
        nextItems[computedRemoveIndex] = firstFromRest;
        nextRest = [...restTail, items[computedRemoveIndex]];
      }
    }

    setItems(nextItems);
    setRestItems(nextRest);
    if (direction === "up") {
      setStepOffset((prev) => prev + 1);
      setSelectedIndex((prev) => (prev === 0 ? 9 : prev - 1));
    } else {
      setStepOffset((prev) => prev - 1);
      setSelectedIndex((prev) => (prev === 9 ? 0 : prev + 1));
    }
  }

  function onWheel(e: React.WheelEvent) {
    // Disable wheel-triggered rotation on mobile-sized viewports
    if (viewportWidth < 768) return;
    if (wheelLockRef.current) return;
    wheelLockRef.current = true;
    step(e.deltaY > 0 ? "up" : "down");
    setTimeout(() => (wheelLockRef.current = false), 220);
  }

  function onTouchMove(e: React.TouchEvent) {
    const t = touchRef.current;
    if (t == null || t.triggered) return;
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const dx = x - t.x;
    const dy = y - t.y;
    // Detect horizontal intent and trigger once
    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      step(dx > 0 ? "up" : "down");
      touchRef.current = { ...t, triggered: true };
    }
  }


  function onTouchStart(e: React.TouchEvent) {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, triggered: false };
  }
  function onTouchEnd() {
    touchRef.current = null;
  }

  const currentRotation = 18 + stepOffset * stepDeg; // keep existing base offset

  const showSkeleton = mounted && (loading || items.length === 0);
  const renderItems: HeroItem[] = showSkeleton
    ? Array.from({ length: numSides }).map((_, i) => ({ id: i }))
    : items;

  if (!mounted) {
    return <div className="h-screen w-full"></div>;
  }

  return (
    <section className="mt-6 select-none" onWheel={onWheel} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}>
      
      <div className="flex justify-center items-center relative w-full" style={{ minHeight: `${2 * radius}px` }}>
        <motion.div
          key={animCycle}
          className={`relative ${viewportWidth < 350 ? 'top-[10rem]': viewportWidth < 400 ? 'top-[14rem]' : 'top-[12rem] sm:top-[12rem] lg:top-[12rem]'}`}
          style={{ width: `${2 * radius}px`, height: `${2 * radius}px`, transformOrigin: `${radius}px ${radius}px` }}
          initial={{ rotate: (loading || items.length === 0) ? currentRotation : currentRotation - 180 }}
          animate={{ rotate: currentRotation }}
          transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.8 }}
        >
          {renderItems.map((item, idx) => {
            const angle = (idx * 360) / numSides;
            const rotateAngle = angle + 90;
            const isSelected = !showSkeleton && idx === selectedIndex;
            const hasPoster = !showSkeleton && Boolean(item?.poster_path);
            const languageLabel = (item?.original_language || "")?.toUpperCase();
            const releaseOrFirstAir = item?.release_date || item?.first_air_date || "";
            const yearLabel = releaseOrFirstAir ? String(releaseOrFirstAir).slice(0, 4) : "";
            const bgImage = showSkeleton
              ? 'linear-gradient(180deg, #9CA3AF 0%, #6B7280 100%)'
              : hasPoster
              ? `url('${poster(item?.poster_path, 'w500')}')`
              : isSelected
              ? 'linear-gradient(180deg, #F5C555 0%, #D8942A 100%)'
              : 'linear-gradient(180deg, #9CA3AF 0%, #6B7280 100%)';

            // Center the cards with respect to the container
            const centerX = radius;
            const centerY = radius;
            const xPosition = centerX + radius * Math.cos((angle * Math.PI) / 180) - cardWidth / 2;
            const yPosition = centerY + radius * Math.sin((angle * Math.PI) / 180) - cardHeight / 2;

            return (
              <div
                key={item.id}
                className="absolute group"
                                 style={{
                   left: `${xPosition}px`,
                   top: `${yPosition}px`,
                   transform: `rotate(${rotateAngle}deg)`,
                   width: `${cardWidth}px`,
                   height: `${cardHeight}px`,
                   // make selected card stand out
                   zIndex: isSelected ? 50 : 10,
                   filter: isSelected ? 'grayscale(0%)' : 'grayscale(100%)',
                   transition: 'filter 1000ms ease',
                   cursor: isSelected ? 'pointer' : 'default',
                 }}
                data-index={idx}
                data-selected={selectedIndex}
                onClick={() => router.push(`/movie/${item.id}`)}
              >
                <div
                  className={
                    `relative rounded-[22px] overflow-hidden w-full h-full ` +
                    (isSelected
                      ? 'shadow-[0_20px_40px_rgba(16,24,40,0.25)]'
                      : 'shadow-[0_12px_28px_rgba(16,24,40,0.18)]')
                  }
                >
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{
                      backgroundImage: bgImage,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />

                  {/* Content overlay with inner padding only for selected card */}
                  {isSelected && (
                    <div className="absolute inset-0 flex flex-col justify-between px-[22px] pb-6 ">
                      {/* Top badges row */}
                      <div className="pt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2"> 
                          {languageLabel && (
                            <div className="h-[22px] px-2 rounded-full bg-white/70 backdrop-blur flex items-center">
                              <span className="text-[12px] font-medium text-[#0B0F19]">{languageLabel}</span>
                            </div>
                          )}
                        </div>
                        {yearLabel && (
                          <div className="h-[22px] px-2 rounded-full bg-[#111827]/[0.86] flex items-center">
                            <span className="text-[12px] font-medium text-white">{yearLabel}</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom title; reveal on hover on selected */}
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="text-xs sm:text-sm font-medium line-clamp-2">{item?.title || item?.name}</div>
                      </div>
                    </div>
                  )}

                  {/* Overlays: hover darken only on selected; constant gray shade on side cards */}
                  {showSkeleton ? (
                    <div className="absolute inset-0 bg-gray-300/70"  style={{width: `${cardWidth}px`, height: `${cardHeight}px`}}/>
                  ) : isSelected ? (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" style={{width: `${cardWidth}px`, height: `${cardHeight}px`}} />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200/40" style={{width: `${cardWidth}px`, height: `${cardHeight}px`}} />
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>


    </section>
  );
}


