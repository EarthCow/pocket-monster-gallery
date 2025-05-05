import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import TopButtons from "@/components/TopButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monster Gallery",
  description: "A gallery of pocket monsters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `
    (function() {
      try {
        const theme = localStorage.PMG_theme;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (theme === "dark" || (!theme && prefersDark)) {
          document.documentElement.classList.add("dark");
        }
      } catch (_) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopButtons />
        {children}
      </body>
    </html>
  );
}
