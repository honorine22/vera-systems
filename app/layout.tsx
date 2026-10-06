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

  title: {
    default: "Vera Systems Rwanda | Food Safety, HACCP & ISO 22000",
    template: "%s | Vera Systems Rwanda",
  },

  description:
    "Vera Systems is a Kigali-based food safety consultancy and digital intelligence company helping businesses across Rwanda and Africa with HACCP, ISO 22000, food safety audits, training, monitoring and compliance technology.",

  applicationName: "Vera Systems",

  authors: [
    {
      name: "Vera Systems",
      url: siteConfig.url,
    },
  ],

  creator: "Vera Systems",
  publisher: "Vera Systems",

  category: "Food Safety Consulting",

  keywords: [
    "Vera Systems",
    "Vera Systems Rwanda",
    "food safety Rwanda",
    "food safety Kigali",
    "HACCP Rwanda",
    "ISO 22000 Rwanda",
    "food safety consulting Rwanda",
    "food safety audits",
    "food safety training",
    "food safety compliance",
    "food safety technology",
    "CCP monitoring",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_RW",
    url: siteConfig.url,
    siteName: "Vera Systems",
    title: "Vera Systems Rwanda | Food Safety, HACCP & ISO 22000",
    description:
      "Food safety consultancy, HACCP, ISO 22000, training and real-time compliance technology for food businesses in Rwanda and Africa.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vera Systems Rwanda",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vera Systems Rwanda | Food Safety, HACCP & ISO 22000",
    description:
      "Food safety consultancy, HACCP, ISO 22000 and compliance technology in Rwanda.",
    images: ["/opengraph-image"],
  },

  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "L7Tf2Dq-JHZY6HPQ6iCA-uP96PDLPh3YIT4gLvr8csE",
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

  icons: {
    icon: "/logos/vera-logo-blue-transparent.png",
  },

  manifest: "/manifest.webmanifest",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#organization`,

        name: "Vera Systems",
        legalName: siteConfig.legalName,

        alternateName: [
          "Vera Systems Rwanda",
          ...(siteConfig.alternateNames || []),
        ],

        url: siteConfig.url,

        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/logos/vera-logo-blue-transparent.png`,
        },

        description: siteConfig.description,

        email: siteConfig.email,
        telephone: siteConfig.telephone,

        address: {
          "@type": "PostalAddress",
          addressLocality: "Kigali",
          addressRegion: "Kigali City",
          addressCountry: "RW",
        },

        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: siteConfig.telephone,
          email: siteConfig.email,
          availableLanguage: ["English", "French", "Kinyarwanda"],
          areaServed: ["RW", "Africa"],
        },

        sameAs: [siteConfig.linkedIn],

        areaServed: [
          {
            "@type": "Country",
            name: "Rwanda",
          },
          {
            "@type": "Place",
            name: "East Africa",
          },
          {
            "@type": "Place",
            name: "Africa",
          },
        ],

        knowsAbout: [
          "Food Safety",
          "HACCP",
          "ISO 22000",
          "Food Safety Management Systems",
          "Critical Control Point Monitoring",
          "Food Safety Auditing",
          "Food Safety Training",
          "Food Safety Compliance Technology",
        ],

        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Vera Systems Food Safety Services",

          itemListElement: [
            "Food safety consulting and auditing",
            "HACCP implementation",
            "ISO 22000 implementation",
            "Food safety data and real-time monitoring",
            "Food safety training and certification",
            "Food safety communications",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
              provider: {
                "@id": `${siteConfig.url}/#organization`,
              },
            },
          })),
        },
      },

      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,

        url: siteConfig.url,

        name: "Vera Systems",

        alternateName: [
          "Vera Systems Rwanda",
          ...(siteConfig.alternateNames || []),
        ],

        description: siteConfig.description,

        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },

        inLanguage: "en-RW",
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
