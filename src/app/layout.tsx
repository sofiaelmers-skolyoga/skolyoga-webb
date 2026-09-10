import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Skolyoga - Vi utbildar skolpersonal i livsförmågor",
  description:
    "Evidensbaserade, korta rörelse- och fokusövningar (1–5 minuter) för klassrummet. Skapa trygghet, studiero och självreglering för alla elever.",
  keywords: ["skolyoga", "yoga i skolan", "studiero", "NPF", "fokus i klassrummet", "livsförmågor"],
  openGraph: {
    title: "Skolyoga - Vi utbildar skolpersonal i livsförmågor",
    description: "Korta övningar för klassrummet som främjar studiero och trygghet.",
    url: "https://skolyoga.se",
    siteName: "Skolyoga",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-[#22252a] antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
