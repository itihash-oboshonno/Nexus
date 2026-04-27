import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Nexus — Premium Tech Marketplace",
  description: "Discover cutting-edge technology products curated for professionals and enthusiasts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AuthProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
              },
              success: { iconTheme: { primary: "var(--success)", secondary: "var(--bg)" } },
              error: { iconTheme: { primary: "var(--danger)", secondary: "var(--bg)" } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
