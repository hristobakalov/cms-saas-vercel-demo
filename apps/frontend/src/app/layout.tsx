import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.scss";
import { Body, ThemeProvider } from "@/components/theme";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { EnvTools } from "@remkoj/optimizely-one-nextjs/server";
import { OptimizelyOneProvider } from "@remkoj/optimizely-one-nextjs/client";

// Client side trackers
import { Scripts } from "@remkoj/optimizely-one-nextjs/server";
import GoogleAnalytics from "@/components/integrations/google-analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientComponent from "@/components/cms/element/ParagraphElement/personalizedComponent";
import { Suspense } from "react";

const figtree = Figtree({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN;
  const scheme =
    domain && (domain.startsWith("localhost") || domain.endsWith(".local"))
      ? "http"
      : "https";
  const base = domain ? new URL(`${scheme}://${domain}`) : undefined;
  return {
    metadataBase: base,
    title: {
      default: `Mosey Bank - An Optimizely Demo Company`,
      template: `%s | Mosey Bank - An Optimizely Demo Company`,
    },
    openGraph: {
      title: {
        default: `Mosey Bank - An Optimizely Demo Company`,
        template: `%s | Mosey Bank - An Optimizely Demo Company`,
      },
      siteName: "CJAM",
      images: [
        {
          url: "/apple-touch-icon.png",
        },
      ],
    },
    description:
      "A Demo showcasing the power of combining the Optimizely DXP with Next.JS",
    icons: {
      apple: { sizes: "180x180", url: "/apple-touch-icon.png" },
      icon: [
        { type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
        { type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
      ],
    },
    manifest: "/site.webmanifest",
  };
}

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const ga_id = EnvTools.readValue("GA_TRACKING_ID");
  return (
    <html style={{ overflowX: "hidden" }}>
      <head>
        <Scripts.Header experimentationAllowOverride={false} />
      </head>
      <ThemeProvider value={{ theme: "system" }}>
        <Body
          className={`${figtree.className} bg-ghost-white dark:bg-vulcan dark:text-white overflow-x-hidden`}
        >
          <div className="py-2 bg-[#0037ff] text-white w-screen flex items-center justify-center text-center">
            <div>
              Don&apos;t miss out during morning break!
              <br />
              10:15 - 10:45 &quot;Avoiding KPI tunnel vision for optimal
              business growth&quot;
            </div>
          </div>
          <div className="flex min-h-screen flex-col justify-between">
            <OptimizelyOneProvider value={{ debug: true }}>
              <Header />
              <Suspense fallback={<div>Loading...</div>}>
                <ClientComponent />
              </Suspense>
              <main
                className="grow bg-[#10141c] text-[#ffffff]"
                suppressHydrationWarning
              >
                {children}
              </main>
              <Footer />
            </OptimizelyOneProvider>
            <Scripts.Footer />
            <GoogleAnalytics measurementId={ga_id} />
            <SpeedInsights />
          </div>
        </Body>
      </ThemeProvider>
    </html>
  );
}
