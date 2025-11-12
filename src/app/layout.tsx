import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "stay calm $calm | In the mayhem, stay calm",
  description: "In the chaos of crypto, there's one thing to remember: just stay calm. $calm on Pump.fun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
