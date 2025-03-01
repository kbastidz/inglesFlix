import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "App-InglesFlix",
  description: "App para repositorio de ingles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="bg-zinc-900">
      <body>
       
        {children}
        <Toaster />
      </body>
    </html>
  );
}
