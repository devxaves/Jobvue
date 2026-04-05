import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Sora, Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JobVue AI — Your City. Your Work. Your Future.",
  description:
    "JobVue AI connects local students and freelancers with real opportunities nearby — and helps you ace every interview with AI-powered practice.",
  keywords: [
    "jobs",
    "freelance",
    "hyperlocal",
    "interview prep",
    "AI interview",
    "students",
    "gigs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "16px",
              border: "2px solid #DBEAFE",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
