"use client";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const dummyImages = [
  {
    src: "https://images.unsplash.com/photo-1513258496099-48168024aec0",
    alt: "Student with books",
    company: "Paytm",
  },
  {
    src: "https://w7.pngwing.com/pngs/502/348/png-transparent-student-girl-holding-books.png",
    alt: "Student holding books",
    company: "NTT DATA",
  },
  {
    src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
    alt: "Student with backpack",
    company: "Amazon",
  },
  {
    src: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    alt: "Student outdoors",
    company: "MetLife",
  },
  {
    src: "https://images.unsplash.com/photo-1503676382389-4809596d5290",
    alt: "Student reading",
    company: "PaisaBazaar",
  },
  {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    alt: "Student at desk",
    company: "InfoEdge",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    alt: "Student smiling",
    company: "MagicBricks",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    alt: "Student with notebook",
    company: "Paytm",
  },
  {
    src: "https://images.unsplash.com/photo-1519340333755-c4c2b6a7a81e",
    alt: "Student in library",
    company: "NTT DATA",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    alt: "Student with laptop",
    company: "Amazon",
  },
];

export function InfiniteScrollCarousel() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [scrollPosition1, setScrollPosition1] = useState(0);
  const [scrollPosition2, setScrollPosition2] = useState(0);
  const [direction1, setDirection1] = useState(1);
  const [direction2, setDirection2] = useState(-1);

  useEffect(() => {
    const SCROLL_SPEED = 1;
    const ANIMATION_INTERVAL = 20;

    const interval = setInterval(() => {
      if (row1Ref.current && row2Ref.current) {
        // Row 1 animation
        setScrollPosition1((prev) => {
          const maxScroll =
            row1Ref.current!.scrollWidth - row1Ref.current!.clientWidth;
          let newPos = prev + SCROLL_SPEED * direction1;

          if (newPos >= maxScroll) {
            setDirection1(-1);
            newPos = maxScroll;
          } else if (newPos <= 0) {
            setDirection1(1);
            newPos = 0;
          }

          row1Ref.current!.scrollLeft = newPos;
          return newPos;
        });

        // Row 2 animation (opposite direction)
        setScrollPosition2((prev) => {
          const maxScroll =
            row2Ref.current!.scrollWidth - row2Ref.current!.clientWidth;
          let newPos = prev + SCROLL_SPEED * direction2;

          if (newPos >= maxScroll) {
            setDirection2(-1);
            newPos = maxScroll;
          } else if (newPos <= 0) {
            setDirection2(1);
            newPos = 0;
          }

          row2Ref.current!.scrollLeft = newPos;
          return newPos;
        });
      }
    }, ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  }, [direction1, direction2]);

  const images = Array(10).fill(dummyImages).flat();
  // Split images into 2 rows
  const half = Math.ceil(images.length / 2);
  const row1 = images.slice(0, half);
  const row2 = images.slice(half);

  return (
    <section className="w-full bg-background py-10">
      <h2 className="text-3xl font-bold text-center mb-4 text-primary">
        100000+ Students ne Chuna
      </h2>
      <p className="text-center mb-8 text-muted-foreground">
        Sahi Course, Sahi University aur Career Path
      </p>
      <div className="flex flex-col gap-6 px-4">
        <div
          ref={row1Ref}
          className="flex gap-6 overflow-x-auto no-scrollbar infinite-carousel-row"
        >
          {row1.map((img, idx) => (
            <Card
              key={idx}
              className="min-w-[140px] max-w-[140px] flex flex-col items-center justify-center py-4 px-2 bg-white shadow-md"
            >
              <img
                src={img.src}
                alt={img.alt}
                width={80}
                height={80}
                className="rounded mb-2 object-cover"
                loading="lazy"
              />
              <span className="text-xs font-semibold text-center text-primary">
                {img.company}
              </span>
            </Card>
          ))}
        </div>
        <div
          ref={row2Ref}
          className="flex gap-6 overflow-x-auto no-scrollbar infinite-carousel-row"
        >
          {row2.map((img, idx) => (
            <Card
              key={idx}
              className="min-w-[140px] max-w-[140px] flex flex-col items-center justify-center py-4 px-2 bg-white shadow-md"
            >
              <img
                src={img.src}
                alt={img.alt}
                width={80}
                height={80}
                className="rounded mb-2 object-cover"
                loading="lazy"
              />
              <span className="text-xs font-semibold text-center text-primary">
                {img.company}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
