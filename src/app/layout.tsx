import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeScript } from "@/components/chrome/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oscarospina.com"),
  title: {
    default: "Oscar Ospina — Senior Fullstack Developer",
    template: "%s · Oscar Ospina",
  },
  description:
    "Senior Fullstack Developer with 13+ years shipping distributed systems that scale to millions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-paper text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
