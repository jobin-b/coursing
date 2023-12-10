import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
          "min-h-screen min-w-full text-neutral-100 bg-[#00274C]"
        }
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
