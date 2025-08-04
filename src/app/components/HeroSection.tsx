import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full max-w-4xl mx-auto text-center py-10 flex flex-col gap-6">
      <h1 className="text-3xl md:text-5xl font-bold text-primary">
        Online MBA
      </h1>
      <p className="text-lg md:text-2xl text-muted-foreground">
        India’s #1 Largest Online Education Portal
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
        <Button size="lg" variant="default">
          Compare Universities
        </Button>
        <span className="text-base md:text-lg font-semibold">
          500+ Admissions every 1 hour
        </span>
        <span className="text-base md:text-lg font-semibold">
          100,000+ Students ne Chuna
        </span>
      </div>
    </section>
  );
}
