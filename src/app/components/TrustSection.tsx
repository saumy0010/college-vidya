import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trustItems = [
  {
    title: "CV Placement Support",
    description: "Get placement support for your online MBA journey.",
  },
  {
    title: "Exclusive Telegram Community",
    description: "Join our exclusive CV Telegram group.",
  },
  {
    title: "Sample Papers & Notes",
    description: "Access sample papers and notes for your course.",
  },
  {
    title: "24x7 Student Support",
    description: "Our support team is available round the clock.",
  },
  {
    title: "CV BaseCamp & Networking",
    description: "Network with industry experts and peers.",
  },
];

export function TrustSection() {
  return (
    <section className="w-full max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Why should you trust College Vidya?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trustItems.map((item, idx) => (
          <Card key={idx} className="shadow-md">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
