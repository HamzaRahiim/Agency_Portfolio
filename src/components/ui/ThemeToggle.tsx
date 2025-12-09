"use client";

import { useTheme } from "../providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    // Only toggle between light and dark (no system option)
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md p-2 text-foreground hover:bg-muted transition-colors focus:outline-none"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Moon className="w-5 h-5" strokeWidth={2.5} />
      ) : (
        <Sun className="w-5 h-5" strokeWidth={2.5} />
      )}
    </button>
  );
}

