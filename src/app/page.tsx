import HeroNav from "@/components/landing/HeroNav";
import HeroPills from "@/components/landing/HeroPills";
import HeroCarousel from "@/components/landing/HeroCarousel";

export default function HomePage() {
  return (
    <main className="min-h-screen text-[#0B0F19]  bg-white bg-white">
      {/* Outer framed canvas */}
      <div className=" w-full lg:w-[min(1280px,100%-16px)] bg-white mx-auto">
        <div className="mx-auto max-w-[1200px] h-screen overflow-hidden px-5 lg:px-8">
          <HeroNav />
          <h1 className="text-center font-extrabold text-[36px] leading-[1.05] mt-6 mb-6 lg:text-[56px]">
            Discover Unlimited Content
          </h1>
          <div className="flex justify-center">
            <HeroPills />
          </div>
          <HeroCarousel />
        </div>
      </div>
    </main>
  );
}
