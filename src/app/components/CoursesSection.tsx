import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const courses = [
  { key: "finance", name: "Finance", description: "MBA in Finance Management" },
  {
    key: "marketing",
    name: "Marketing",
    description: "MBA in Marketing Management",
  },
  { key: "hr", name: "HR", description: "MBA in HR Management" },
  {
    key: "operations",
    name: "Operations",
    description: "MBA in Operations Management",
  },
  {
    key: "it",
    name: "Information Technology",
    description: "MBA in IT Management",
  },
];

export function CoursesSection() {
  return (
    <section className="w-full max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center"></h2>
      <Tabs defaultValue="finance" className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
          {courses.map((course) => (
            <TabsTrigger
              key={course.key}
              value={course.key}
              className="px-4 py-2"
            >
              {course.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {courses.map((course) => (
          <TabsContent key={course.key} value={course.key}>
            <Card className="mx-auto max-w-md shadow-md">
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {course.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
