"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Specialization {
  id: number;
  name: string;
  display_name: string;
  icon: string;
  thumbnail: string;
  slug: string;
  university_count: number;
  status: number;
  trending_course: any;
}

interface Course {
  id: number;
  lsq: number;
  name: string;
  display_name: string;
  domain_name: string;
  slug: string;
  icon: string;
  thumbnail: string;
  duration: string;
  university_count: number;
  age_limit: any;
  status: number;
  specializations: Specialization[];
}

interface MenuItem {
  id: number;
  name: string;
  active: number;
  courses: Course[];
}

const MenuCardSlider: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    feeRange: "all",
    duration: "all",
    universityType: "all",
  });

  useEffect(() => {
    fetch("https://admin.collegevidya.com/menu/")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      });
  }, []);

  // Filter function
  const filterCourses = (courses: Course[]) => {
    return courses.filter((course) => {
      const feeCheck =
        filters.feeRange === "all" ||
        (filters.feeRange === "low" && course.university_count > 50) ||
        (filters.feeRange === "medium" &&
          course.university_count >= 20 &&
          course.university_count <= 50) ||
        (filters.feeRange === "high" && course.university_count < 20);

      // Duration filter
      const durationCheck =
        filters.duration === "all" ||
        (filters.duration === "1-year" && course.duration.includes("1")) ||
        (filters.duration === "2-year" && course.duration.includes("2")) ||
        (filters.duration === "3+year" &&
          (course.duration.includes("3") || course.duration.includes("4")));

      // University type filter
      const universityTypeCheck =
        filters.universityType === "all" ||
        (filters.universityType === "government" &&
          course.university_count > 30) ||
        (filters.universityType === "private" && course.university_count <= 30);

      return feeCheck && durationCheck && universityTypeCheck;
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      feeRange: "all",
      duration: "all",
      universityType: "all",
    });
  };

  if (loading) {
    return <div className="w-full flex justify-center py-8">Loading...</div>;
  }

  const pgCourses = menuData.find((item) => item.name === "PG Courses");
  if (!pgCourses) return null;

  const filteredCourses = filterCourses(pgCourses.courses);

  return (
    <div className="w-full py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">PG Courses</h2>

      <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Fee Range
            </label>
            <select
              value={filters.feeRange}
              onChange={(e) => handleFilterChange("feeRange", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Fees</option>
              <option value="low">Low (₹0-3L)</option>
              <option value="medium">Medium (₹3-6L)</option>
              <option value="high">High (₹6L+)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration
            </label>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Durations</option>
              <option value="1-year">1 Year</option>
              <option value="2-year">2 Years</option>
              <option value="3+year">3+ Years</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              University Type
            </label>
            <select
              value={filters.universityType}
              onChange={(e) =>
                handleFilterChange("universityType", e.target.value)
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-transparent">
              Action
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="px-4 py-2"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredCourses.length} of {pgCourses.courses.length}{" "}
            courses
          </span>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="min-w-[220px] max-w-xs h-[260px] md:h-[280px] flex-shrink-0 flex flex-col p-0 shadow-md hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-900 overflow-hidden"
          >
            <div className="w-full h-[78px] md:h-[84px] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <img
                src={course.thumbnail}
                alt={course.display_name + " thumbnail"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-1 p-2 h-[182px] md:h-[196px]">
              <img
                src={course.icon}
                alt={course.display_name + " icon"}
                className="w-10 h-10 object-contain rounded"
              />
              <h3 className="text-base font-semibold mb-0 text-center line-clamp-1">
                {course.display_name}
              </h3>
              <p className="text-xs text-muted-foreground mb-1 text-center">
                {course.duration}
              </p>
              <span className="text-xs text-primary mb-1">
                {course.university_count} Universities
              </span>
              <Button variant="outline" size="sm" className="mt-1 w-full">
                Explore
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuCardSlider;
