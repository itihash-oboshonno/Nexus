"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Zap, ChevronDown, User, Plus, LayoutGrid, LogOut } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Products" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropOpen(false);
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="navbar">
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "8px",
            background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Zap size={18} color="#07070d" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--text)" }}>
            Nexus
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center items-center gap-4">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: "8px 16px", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 500,
              color: isActive(href) ? "var(--accent)" : "var(--text-muted)",
              background: isActive(href) ? "var(--accent-glow)" : "transparent",
              textDecoration: "none", transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { if (!isActive(href)) (e.target as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={e => { if (!isActive(href)) (e.target as HTMLElement).style.color = "var(--text-muted)"; }}
            >{label}</Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <div ref={dropRef} style={{ position: "relative" }} className="hidden md:block">
              <button onClick={() => setDropOpen(!dropOpen)} style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "var(--surface-2)", border: "1px solid var(--border)",
                borderRadius: "40px", padding: "6px 16px 6px 8px", cursor: "pointer",
                color: "var(--text)", transition: "all 0.2s ease",
              }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "var(--accent)", display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#07070d" }}>
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 500, maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <ChevronDown size={14} color="var(--text-muted)" style={{ transition: "transform 0.2s", transform: dropOpen ? "rotate(180deg)" : "none" }} />
              </button>
              {dropOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", minWidth: "220px",
                  padding: "8px", boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                  animation: "fadeIn 0.15s ease",
                }}>
                  <div style={{ padding: "10px 12px 14px", borderBottom: "1px solid var(--border)", marginBottom: "6px" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "2px" }}>Signed in as</div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
                  </div>
                  {[
                    { href: "/items/add", icon: <Plus size={15} />, label: "Add Product" },
                    { href: "/items/manage", icon: <LayoutGrid size={15} />, label: "Manage Products" },
                  ].map(item => (
                    <Link key={item.href} href={item.href} onClick={() => setDropOpen(false)} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "9px 12px", borderRadius: "var(--radius-sm)",
                      color: "var(--text-muted)", fontSize: "0.875rem", textDecoration: "none",
                      transition: "all 0.15s ease",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                    >
                      {item.icon}{item.label}
                    </Link>
                  ))}
                  <div style={{ height: "1px", background: "var(--border)", margin: "6px 0" }} />
                  <button onClick={handleLogout} style={{
                    display: "flex", alignItems: "center", gap: "10px", width: "100%",
                    padding: "9px 12px", borderRadius: "var(--radius-sm)",
                    color: "var(--danger)", fontSize: "0.875rem",
                    background: "transparent", border: "none", cursor: "pointer", transition: "all 0.15s ease",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(224,85,85,0.08)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <LogOut size={15} />Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center gap-4">
              <Link href="/login" className="btn-ghost">Sign in</Link>
              <Link href="/register" className="btn-primary" style={{ padding: "9px 20px", fontSize: "0.85rem" }}>Get Started</Link>
            </div>
          )}

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "8px", cursor: "pointer", color: "var(--text)",
            display: "flex", alignItems: "center",
          }} className="flex md:hidden">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "16px",
          animation: "fadeUp 0.2s ease",
        }} className="md:hidden">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "12px 16px", borderRadius: "8px",
              color: isActive(href) ? "var(--accent)" : "var(--text)",
              background: isActive(href) ? "var(--accent-glow)" : "transparent",
              textDecoration: "none", fontWeight: 500, marginBottom: "4px",
            }}>{label}</Link>
          ))}
          <div style={{ height: "1px", background: "var(--border)", margin: "12px 0" }} />
          {user ? (
            <>
              <Link href="/items/add" onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 16px", color: "var(--text)", textDecoration: "none", fontWeight: 500, borderRadius: "8px" }}>
                Add Product
              </Link>
              <Link href="/items/manage" onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 16px", color: "var(--text)", textDecoration: "none", fontWeight: 500, borderRadius: "8px" }}>
                Manage Products
              </Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{
                display: "block", width: "100%", textAlign: "left", padding: "12px 16px",
                color: "var(--danger)", fontWeight: 500, background: "none", border: "none",
                cursor: "pointer", borderRadius: "8px", fontSize: "1rem",
              }}>Sign out</button>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-secondary" style={{ textAlign: "center", justifyContent: "center" }}>Sign in</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
