import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "My Task Manager",
  description: "A personalised task manager",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand={false}
        />
      </body>
    </html>
  );
}
