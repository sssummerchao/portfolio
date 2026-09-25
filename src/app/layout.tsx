import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const generalSans = localFont({
  src: [
    {
      path: "../fonts/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Summer Chao",
    template: "%s · Summer Chao",
  },
  description:
    "Interaction designer and prototyper exploring how technology can create more meaningful connections between people, environments, and intelligent systems.",
  metadataBase: new URL("https://www.notwinter.me"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={generalSans.variable}>
      <body>{children}</body>
    </html>
  );
}
