import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Layer Lab - Fragrance Layering Companion",
  description: "Discover perfect fragrance combinations. Extract notes from your favorite perfumes and get personalized layering recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
