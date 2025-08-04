"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

const TopBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <header className="w-full bg-gradient-to-b from-[#f8f9fa] to-[#ededed] py-3 px-4 flex items-center justify-between shadow-sm text-[#222]">
      <div className="flex items-center gap-4">
        <img
          src="https://d1aeya7jd2fyco.cloudfront.net/logo/universal-logo-new.png"
          alt="College Vidya Logo"
          width={120}
          height={40}
          loading="eager"
          className="min-w-[80px]"
        />
        <span className="ml-2 text-lg font-medium text-primary hidden sm:inline cursor-pointer">
          #ChunoApnaSahi
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Dark Mode</span>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-base text-muted-foreground">Joe</span>
          <span className="text-base text-muted-foreground">|</span>
          <span className="text-base text-muted-foreground">Male</span>
          <span className="text-base text-muted-foreground">|</span>
          <span className="text-base text-muted-foreground">25 Yrs</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="font-semibold flex items-center gap-2 cursor-pointer"
            onClick={() => alert("Important Facts clicked!")}
          >
            <span role="img" aria-label="bulb">
              💡
            </span>{" "}
            Important Facts
          </Button>
        </div>
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <nav className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center gap-8 animate-in fade-in">
          <button
            className="absolute top-4 right-4 p-2 rounded focus:outline-none"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=""
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <span className="text-xl font-bold text-primary">Joe</span>
          <span className="text-base text-muted-foreground">Male | 25 Yrs</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="font-semibold flex items-center gap-2 cursor-pointer"
            onClick={() => alert("Important Facts clicked!")}
          >
            <span role="img" aria-label="bulb">
              💡
            </span>{" "}
            Important Facts
          </Button>
        </nav>
      )}
    </header>
  );
};

export { TopBar };
