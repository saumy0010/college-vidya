"use client";
export const dynamic = "force-dynamic";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface College {
  id: string;
  name: string;
  logo: string;
  rating: string;
  fee: number;
}

function CollegeDetails() {
  const searchParams = useSearchParams();
  const collegeId = searchParams.get("id");
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collegeId) {
      setError("No college selected.");
      setLoading(false);
      return;
    }
    fetch(
      `https://admin.collegevidya.com/listuserbyuniversity/467d8841-b3c3-42cc-a439-ee4d912bf1c6/1/`
    )
      .then((res) => res.json())
      .then((data) => {
        const found = Array.isArray(data?.data)
          ? data.data.find(
              (item: any) => item.university?.id?.toString() === collegeId
            )
          : null;
        if (found) {
          setCollege({
            id: found.university?.id?.toString() ?? "",
            name: found.university?.name ?? "College Name",
            logo: found.university?.logo ?? "",
            rating: found.university?.cv_rating ?? "N/A",
            fee: Number(found.fee ?? 0),
          });
        } else {
          setError("College not found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch college details.");
        setLoading(false);
      });
  }, [collegeId]);

  return (
    <section className="w-full max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Explore College</h2>
      {loading ? (
        <div className="text-center py-10">Loading college details...</div>
      ) : error ? (
        <div className="text-center py-10 text-destructive">{error}</div>
      ) : college ? (
        <Card className="shadow-md">
          <CardHeader className="flex flex-col items-center">
            {college.logo && (
              <img
                src={college.logo}
                alt={college.name}
                width={80}
                height={80}
                className="mb-2 rounded object-contain"
                loading="lazy"
              />
            )}
            <CardTitle className="text-center text-lg">
              {college.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 items-center">
              <span className="text-yellow-500 font-bold text-base">
                ⭐ {college.rating}
              </span>
              <span className="text-primary font-semibold text-base">
                Fee: ₹{college.fee.toLocaleString()}
              </span>
              <Button size="sm" variant="default" className="mt-4">
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}

export default function ExploreCollegePage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <CollegeDetails />
    </Suspense>
  );
}
