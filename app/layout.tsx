import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "../lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s | Vera Systems" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Food safety and compliance",
  keywords: [...siteConfig.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/logos/vera-logo-blue-transparent.png" },
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: siteConfig.alternateNames,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logos/vera-logo-blue-transparent.png`,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.telephone,
        sameAs: [siteConfig.linkedIn],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kigali",
          addressCountry: "RW",
        },
        areaServed: [
          { "@type": "Country", name: "Rwanda" },
          { "@type": "Place", name: "East Africa" },
          { "@type": "Place", name: "Africa" },
        ],
        knowsAbout: [
          "HACCP",
          "ISO 22000",
          "Critical Control Point monitoring",
          "Food safety audits",
          "Food safety training",
          "Food safety compliance technology",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vera-theme');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){document.documentElement.classList.remove('dark')}})();`,
          }}
        />
      </head>
      <body className={`${montserrat.variable} ${plexMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
