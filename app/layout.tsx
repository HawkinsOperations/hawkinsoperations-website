import type { Metadata, Viewport } from "next";
import Header from "@components/Header";
import Footer from "@components/Footer";
import "./globals.css";
import { siteUrl } from "@config/site";

const displayName = "HawkinsOperations";
const defaultDescription =
  "HawkinsOperations: governed detection engineering and security operations workflow with separated truth surfaces and proof-bound public claims.";

const socialImage = `${siteUrl}/og-preview.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // Browser-tab title kept short. Pages set their own concise titles.
    default: "HawkinsOperations",
    template: "%s",
  },
  description: defaultDescription,
  applicationName: "HawkinsOperations",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon-32x32.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: displayName,
    title: displayName,
    description: defaultDescription,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "HawkinsOperations monogram preview for governed detection engineering and SOC automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: displayName,
    description: defaultDescription,
    images: [socialImage],
  },
  other: {
    "msapplication-TileColor": "#000205",
    "apple-mobile-web-app-title": "HawkinsOperations",
  },
};

export const viewport: Viewport = {
  themeColor: "#000205",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://hawkinsoperations.com/#website",
      name: displayName,
      url: "https://hawkinsoperations.com/",
      description: defaultDescription,
      publisher: { "@id": "https://hawkinsoperations.com/#organization" },
      image: socialImage,
    },
    {
      "@type": "Organization",
      "@id": "https://hawkinsoperations.com/#organization",
      name: "HawkinsOperations",
      url: "https://hawkinsoperations.com/",
      logo: socialImage,
      sameAs: ["https://github.com/HawkinsOperations"],
    },
    {
      "@type": "Person",
      "@id": "https://hawkinsoperations.com/#raylee-hawkins",
      name: "Raylee Hawkins",
      url: "https://hawkinsoperations.com/about/",
      jobTitle: "Detection Engineer",
      knowsAbout: [
        "Detection engineering",
        "SOC automation",
        "Detection-as-code",
        "AI labor under human governance",
        "Public proof boundaries",
      ],
      sameAs: [
        "https://github.com/raylee-hawkins",
        "https://www.linkedin.com/in/raylee-hawkins",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="site-shell">
          <Header />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </div>
        {/* Scroll reveal + spotlight pointer tracking — tiny, no dependency. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  if (typeof window === 'undefined') return;
  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (rm || !('IntersectionObserver' in window)) {
    els.forEach(function(el){ el.classList.add('is-revealed'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    els.forEach(function(el){ io.observe(el); });
  }
  // Spotlight pointer tracking — sets --mx / --my CSS vars per .spotlight card
  var spots = document.querySelectorAll('.spotlight');
  spots.forEach(function(el){
    el.addEventListener('pointermove', function(ev){
      var r = el.getBoundingClientRect();
      var x = ((ev.clientX - r.left) / r.width) * 100;
      var y = ((ev.clientY - r.top) / r.height) * 100;
      el.style.setProperty('--mx', x + '%');
      el.style.setProperty('--my', y + '%');
    });
    el.addEventListener('pointerleave', function(){
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    });
  });
})();
            `.trim(),
          }}
        />
      </body>
    </html>
  );
}
