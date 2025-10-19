import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { ConvexClientProvider } from "@/components/convex-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "AI Creator Platform - Create & Share Content with AI",
    template: "%s | AI Creator Platform",
  },
  description:
    "Create amazing blog posts with AI-powered content generation. Upload images with smart transformations, build your audience, and share your ideas with the world.",
  keywords: [
    "AI content creation",
    "blog platform",
    "AI writing assistant",
    "content creator",
    "image editing",
    "social platform",
  ],
  authors: [{ name: "AI Creator Platform" }],
  creator: "AI Creator Platform",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "AI Creator Platform - Create & Share Content with AI",
    description:
      "Create amazing blog posts with AI-powered content generation. Upload images with smart transformations, build your audience, and share your ideas with the world.",
    siteName: "AI Creator Platform",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "AI Creator Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Creator Platform - Create & Share Content with AI",
    description:
      "Create amazing blog posts with AI-powered content generation. Upload images with smart transformations.",
    images: ["/banner.jpg"],
    creator: "@your_twitter",
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
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* <link rel="icon" href="/logo-text.png" sizes="any" /> */}</head>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            appearance={{
              baseTheme: shadesOfPurple,
            }}
          >
            <ConvexClientProvider>
              <Header />
              <main className="bg-slate-900 min-h-screen text-white overflow-x-hidden">
                <Toaster richColors />

                {children}
              </main>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
