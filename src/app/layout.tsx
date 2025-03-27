import type { Metadata } from "next";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/entities/providers/theme-provider";
import { Navbar } from "@/widgets/navbar/ui";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Socially",
  description: "A modern social media application powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
        <body className={` antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <NextTopLoader
                color="#f11946"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl
                easing="ease"
                speed={200}
                zIndex={1600}
                showAtBottom={false}
                showSpinner={false}
              />
              <Navbar />

              <main className="py-8">
                {/* container to center the content */}
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="hidden lg:block lg:col-span-3">
                      <Sidebar />
                    </div>
                    <div className="lg:col-span-9">{children}</div>
                  </div>
                </div>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
