import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FaGithubSquare } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coursing",
  description:
    "Import your courses to Google Calendar. For University of Michigan students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          "min-w-screen min-h-[90%] text-neutral-100 bg-[#00274C]"
        }
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <footer className="w-full p-2 flex justify-end">
          <a
            href="https://github.com/jobin-b/coursing"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github link"
          >
            <FaGithubSquare
              className="h-12 w-12 text-neutral-300 hover:text-[#FFCB05] hover:opacity-100 transition-all opacity-50"
              alt="github link"
            />
          </a>
        </footer>
      </body>
    </html>
  );
}
