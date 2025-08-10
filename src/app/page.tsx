"use client"
import { useEffect, useRef, useState } from "react";
import HeroNav from "@/components/landing/HeroNav";
import HeroPills from "@/components/landing/HeroPills";
import HeroCarousel from "@/components/landing/HeroCarousel";

export default function HomePage() {

  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.offsetHeight || 0
      setVal(window.innerHeight - height / 2);
    }
  }, [ref.current?.offsetHeight]);
  window.addEventListener("resize", () => {
    if (ref.current) {
      const height = ref.current.offsetHeight || 0
      setVal(window.innerHeight - height / 2);
    }
  })
  
  return (
    <main className="min-h-screen text-[#0B0F19] relative  bg-white h-screen overflow-hidden">
      {/* Outer framed canvas */}
      <div className=" w-full lg:w-[min(1280px,100%-16px)] bg-white mx-auto">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <HeroNav />
          <h1 className="text-center font-extrabold text-[36px] leading-[1.05] mt-6 mb-6 lg:text-[56px]">
            Discover Unlimited Content
          </h1>
          <div className="flex justify-center">
            <HeroPills />
          </div>

          
          
        </div>
      </div>
      <div 
      ref={ref}
      className="left-0 w-full absolute lg:mt-[10rem]"
      style={{ top: val }}>
          <HeroCarousel />
      </div>
    </main>
  );
}
