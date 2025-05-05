'use client';
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";

export default function ThemeToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setIsDarkTheme(
          localStorage.getItem("PMG_theme") === "dark" ||
          (localStorage.getItem("PMG_theme") !== "light" && matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
  }, []);

  function toggleTheme() {
    if (isDarkTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("PMG_theme", "light");
      setIsDarkTheme(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("PMG_theme", "dark");
      setIsDarkTheme(true);
    }
  }

  return (
      <Button variant={"outline"} onClick={toggleTheme} className="cursor-pointer">
        {isDarkTheme ? (
            <Sun></Sun>
        ) : (
            <Moon></Moon>
        )}
      </Button>
  );
}