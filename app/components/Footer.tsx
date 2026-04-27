'use client'

import Link from "next/link";
import { Zap, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        marginTop: "auto",
      }}
    >
      <div className="container" style={{ padding: "60px 1.5rem 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={16} color="#07070d" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                Nexus
              </span>
            </Link>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                lineHeight: "1.7",
                maxWidth: "240px",
              }}
            >
              Your premium destination for cutting-edge tech. Curated products,
              unmatched quality.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {[FaGithub, FaTwitter, FaLinkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-muted)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Explore",
              links: [
                { href: "/", label: "Home" },
                { href: "/items", label: "Products" },
                { href: "/about", label: "About" },
              ],
            },
            {
              title: "Account",
              links: [
                { href: "/login", label: "Sign In" },
                { href: "/register", label: "Register" },
                { href: "/items/add", label: "Add Product" },
                { href: "/items/manage", label: "Manage" },
              ],
            },
            {
              title: "Categories",
              links: [
                { href: "/items?cat=Audio", label: "Audio" },
                { href: "/items?cat=Computing", label: "Computing" },
                { href: "/items?cat=Gaming", label: "Gaming" },
                { href: "/items?cat=Wearables", label: "Wearables" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  marginBottom: "16px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {col.title}
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Nexus Technologies, Inc. All rights
            reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (label) => (
                <a
                  key={label}
                  href="#"
                  style={{
                    color: "var(--text-dim)",
                    fontSize: "0.8rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-dim)")
                  }
                >
                  {label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
