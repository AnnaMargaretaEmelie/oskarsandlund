import type { Metadata } from "next";
import { IBM_Plex_Sans, VT323, Moul } from "next/font/google";
import "@/styles/index.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

const moul = Moul({
  variable: "--font-moul",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Oskar Sandlund",
  description: "..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${moul.variable} ${vt323.variable} ${ibmPlexSans.variable}`}
    >
      <body>
        <a href="#main-content" className="skip">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
