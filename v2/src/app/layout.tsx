import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { ViewTransitions } from "next-view-transitions";
export const metadata: Metadata = {
  title: "Netflix Clone",
  description:
    "A modern Netflix clone built with Next.js App Router, Tailwind CSS, and TMDB API.",
  icons: { icon: "/favicon.ico" },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-white">
      <body className="antialiased text-neutral-100 bg-white">
        <ViewTransitions>
          <ToastProvider>{children}</ToastProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
