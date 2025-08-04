"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface College {
  id: string;
  name: string;
  logo: string;
  rating: string;
  fee: number;
  duration?: string;
  universityType?: string;
}

export function CollegesSection() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    feeRange: "all",
    duration: "all",
    universityType: "all",
  });

  useEffect(() => {
    fetch(
      "https://admin.collegevidya.com/listuserbyuniversity/467d8841-b3c3-42cc-a439-ee4d912bf1c6/1/"
    )
      .then((res) => res.json())
      .then((data) => {
        const collegeList = Array.isArray(data?.data)
          ? data.data.map((item: any) => ({
              id: item.university?.id?.toString() ?? "",
              name: item.university?.name ?? "College Name",
              logo: item.university?.logo ?? "",
              rating: item.university?.cv_rating ?? "N/A",
              fee: Number(item.fee ?? 0),
              duration: item.duration ?? "2 Years", // Mock data - replace with actual
              universityType:
                item.university?.type ??
                (Math.random() > 0.5 ? "Private" : "Government"), // Mock data
            }))
          : [];
        setColleges(collegeList);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch colleges.");
        setLoading(false);
      });
  }, []);

  // Filter function
  const filterColleges = (colleges: College[]) => {
    return colleges.filter((college) => {
      // Fee range filter
      const feeCheck =
        filters.feeRange === "all" ||
        (filters.feeRange === "low" && college.fee <= 300000) ||
        (filters.feeRange === "medium" &&
          college.fee > 300000 &&
          college.fee <= 600000) ||
        (filters.feeRange === "high" && college.fee > 600000);

      // Duration filter
      const durationCheck =
        filters.duration === "all" ||
        (filters.duration === "1-year" && college.duration?.includes("1")) ||
        (filters.duration === "2-year" && college.duration?.includes("2")) ||
        (filters.duration === "3+year" &&
          (college.duration?.includes("3") || college.duration?.includes("4")));

      // University type filter
      const universityTypeCheck =
        filters.universityType === "all" ||
        (filters.universityType === "government" &&
          college.universityType?.toLowerCase().includes("government")) ||
        (filters.universityType === "private" &&
          college.universityType?.toLowerCase().includes("private"));

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

  const filteredColleges = filterColleges(colleges);

  return (
    <section className="w-full max-w-6xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Best Colleges for Online MBA
      </h2>

      {/* Filter Controls */}
      <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
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
            Showing {filteredColleges.length} of {colleges.length} colleges
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading colleges...</div>
      ) : error ? (
        <div className="text-center py-10 text-destructive">{error}</div>
      ) : !filteredColleges.length ? (
        <div className="text-center py-10">
          {colleges.length === 0
            ? "No colleges found."
            : "No colleges match your filters. Try adjusting your criteria."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <Card
              key={college.id}
              className="shadow-md flex flex-col justify-between"
            >
              <CardHeader className="flex flex-col items-center">
                {college.logo && (
                  <img
                    src={college.logo}
                    alt={college.name}
                    width={64}
                    height={64}
                    className="mb-2 rounded object-contain"
                    loading="lazy"
                  />
                )}
                <CardTitle className="text-center text-base">
                  {college.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <span className="text-yellow-500 font-bold text-sm">
                    ⭐ {college.rating}
                  </span>
                  <span className="text-primary font-semibold text-sm">
                    Fee: ₹{college.fee.toLocaleString()}
                  </span>
                  <span className="text-blue-600 text-sm">
                    Duration: {college.duration}
                  </span>
                  <span className="text-green-600 text-sm">
                    Type: {college.universityType}
                  </span>
                  <Link href={`/explore-college?id=${college.id}`}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="cursor-pointer mt-2"
                    >
                      Explore
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
