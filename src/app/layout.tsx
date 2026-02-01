import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Layer Lab - Fragrance Layering Companion",
  description: "Discover perfect fragrance combinations. Build personalized layering recipes with smart recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
