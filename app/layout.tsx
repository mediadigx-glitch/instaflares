import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instaflares | Earn by providing promotion services",
  description: "Earn by providing promotion services with Instaflares",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </head>
      <body className={`antialiased`}>
        {children}
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script>
          AOS.init();
        </script>
      </body>
    </html>
  );
}
