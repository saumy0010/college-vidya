import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Harishita Kumari",
    text: "Probably the best thing I have done in recent times is to...",
  },
  { name: "Vinay", text: "Sahi Course, Sahi University aur Career Path." },
  { name: "Pooja", text: "Great news! Special offers and support from CV!" },
];

export function TestimonialsSection() {
  return (
    <section className="w-full max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <Card key={idx} className="shadow-md">
            <CardHeader>
              <CardTitle>{t.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{t.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
