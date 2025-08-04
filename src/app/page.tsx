import { HeroSection } from "./components/HeroSection";
import { TrustSection } from "./components/TrustSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CoursesSection } from "./components/CoursesSection";
import { CollegesSection } from "./components/CollegesSection";
import { CoursesApiSection } from "./components/CoursesApiSection";
import { InfiniteScrollCarousel } from "./components/InfiniteScrollCarousel";
import { TopBar } from "./components/TopBar";
import MenuCardSlider from "./components/MenuCardSlider";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-background text-foreground">
      <main className="flex flex-col gap-10 items-center w-full">
        <TopBar />
        <div className="p-5 flex flex-col gap-10 items-center w-full">
          <HeroSection />
          <TrustSection />
          <TestimonialsSection />
          <MenuCardSlider />
          <CoursesSection />
          <CoursesApiSection />
          <CollegesSection />
          <InfiniteScrollCarousel />
        </div>
      </main>
      <footer className="mt-10 py-6 border-t text-center text-xs text-muted-foreground">
        College Vidya © 2025. All Rights Reserved. | info@collegevidya.com |
        Toll Free: 1800-420-5757
      </footer>
    </div>
  );
}
