import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skolyoga.se"),
  title: {
    default: "Skolyoga – Stresshantering, trygghet & studieteknik i skolan",
    template: "%s | Skolyoga",
  },
  description:
    "Evidensbaserade, korta rörelse- och återhämtningsövningar (1–5 minuter) vid skolbänken. Stärk fokus, trygghet, studieteknik och självreglering i förskola och skola.",
  keywords: [
    "skolyoga",
    "yoga i skolan",
    "rörelsepauser i klassrummet",
    "brain breaks skola",
    "studieteknik",
    "NPF anpassning skola",
    "fokus i klassrummet",
    "självledarskap",
    "stresshantering elever",
    "återhämtning i skolan",
    "problematisk skolfrånvaro",
    "hemmayoga",
    "yoga i förskolan",
    "yoga i lågstadiet",
  ],
  alternates: {
    canonical: "https://skolyoga.se",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/emblem_turquoise.png",
    apple: "/images/app_icon_512.png",
  },
  openGraph: {
    title: "Skolyoga – Stresshantering, trygghet & studieteknik i skolan",
    description:
      "Korta, evidensbaserade övningar för klassrummet som stärker återhämtning, studieteknik och trygghet för elever och skolpersonal.",
    url: "https://skolyoga.se",
    siteName: "Skolyoga",
    locale: "sv_SE",
    type: "website",
    images: [
      {
        url: "/images/feature_graphic_1024x500.jpg",
        width: 1024,
        height: 500,
        alt: "Skolyoga – Evidensbaserade verktyg för skolan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skolyoga – Stresshantering, trygghet & studieteknik i skolan",
    description:
      "Korta, evidensbaserade övningar för klassrummet som främjar studieteknik, återhämtning och trygghet.",
    images: ["/images/feature_graphic_1024x500.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://skolyoga.se/#organization",
      name: "Skolyoga",
      url: "https://skolyoga.se",
      logo: "https://skolyoga.se/images/logo_purple.png",
      email: "hej@skolyoga.se",
      description:
        "Skolyoga utbildar skolpersonal och erbjuder evidensbaserade digitala och analoga verktyg för stresshantering, trygghet, återhämtning och studieteknik i skolan.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gröndalsvägen 159",
        postalCode: "117 69",
        addressLocality: "Stockholm",
        addressCountry: "SE",
      },
      sameAs: [
        "https://www.instagram.com/skolyoga/",
        "https://www.facebook.com/skolyoga/",
        "https://www.youtube.com/channel/UCXkuMhAmgWoc41O3n5XsJUw",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://skolyoga.se/#website",
      url: "https://skolyoga.se",
      name: "Skolyoga",
      publisher: {
        "@id": "https://skolyoga.se/#organization",
      },
      inLanguage: "sv-SE",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-sand text-brand-dark antialiased">
        <AnalyticsTracker />
        {/* Skip to Content Link (WCAG 2.4.1 Bypass Blocks) */}
        <a href="#main-content" className="skip-link">
          Hoppa till huvudinnehåll
        </a>

        <AuthProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
