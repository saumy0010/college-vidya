"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

interface Course {
  id: string;
  name: string;
  description: string;
}

export function CoursesApiSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    fetch(
      "https://admin.collegevidya.com/listuserbyuniversity/467d8841-b3c3-42cc-a439-ee4d912bf1c6/1/"
    )
      .then((res) => res.json())
      .then((data) => {
        const courseList = Array.isArray(data)
          ? data.map((item: any) => ({
              id: item.id?.toString() ?? item.course_id?.toString() ?? "",
              name: item.name ?? item.course_name ?? "Course Name",
              description:
                item.description ??
                item.course_description ??
                "No description available.",
            }))
          : [];
        setCourses(courseList);
        setActiveTab(courseList[0]?.id || "");
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch courses.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading courses...</div>;
  if (error)
    return <div className="text-center py-10 text-destructive">{error}</div>;
  if (!courses.length)
    return <div className="text-center py-10">No courses found.</div>;

  return (
    <section className="w-full max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center">Courses from API</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Dark Mode</span>
          <button
            type="button"
            className="relative inline-flex items-center cursor-pointer focus:outline-none bg-transparent border-none"
            aria-label="Toggle dark mode"
            onClick={(e) => {
              e.preventDefault();
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            tabIndex={0}
          >
            <span
              className={`w-11 h-6 rounded-full transition-all flex items-center ${
                theme === "dark" ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute left-1 top-1 bg-white border border-gray-300 rounded-full h-4 w-4 transition-transform ${
                  theme === "dark" ? "translate-x-5" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-6">
          {courses.map((course) => (
            <TabsTrigger
              key={course.id}
              value={course.id}
              className="px-4 py-2"
            >
              {course.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {courses.map((course) => (
          <TabsContent key={course.id} value={course.id}>
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
