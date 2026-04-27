"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Zap, ChevronDown, Plus, LayoutGrid, LogOut } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Products" },
  { href: "/about", label: "About" },
];

const dropLinks = [
  { href: "/items/add", icon: <Plus size={15} />, label: "Add Product" },
  { href: "/items/manage", icon: <LayoutGrid size={15} />, label: "Manage Products" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropOpen(false);
    setMenuOpen(false);
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinkClass = (href: string) =>
    isActive(href)
      ? "px-4 py-2 rounded-lg text-sm font-medium text-amber-400 bg-amber-400/10 transition-all duration-200"
      : "px-4 py-2 rounded-lg text-sm font-medium text-[#7a7a9a] hover:text-[#e8e8f0] hover:bg-[#16162a] transition-all duration-200";

  const mobileLinkClass = (href: string) =>
    isActive(href)
      ? "block px-4 py-3 rounded-lg font-medium text-amber-400 bg-amber-400/10 mb-1 no-underline transition-all duration-200"
      : "block px-4 py-3 rounded-lg font-medium text-[#e8e8f0] hover:bg-[#16162a] mb-1 no-underline transition-all duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-[#07070d]/85 backdrop-blur-xl border-b border-[#1e1e35]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[68px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-[34px] h-[34px] rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
            <Zap size={18} color="#07070d" strokeWidth={2.5} />
          </div>
          <span className="font-serif text-[1.3rem] font-bold text-[#e8e8f0]">
            Nexus
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={navLinkClass(href)}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Logged-in user dropdown */}
          {user ? (
            <div ref={dropRef} className="relative hidden md:block">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2.5 bg-[#16162a] border border-[#1e1e35] rounded-full pl-2 pr-4 py-1.5 cursor-pointer text-[#e8e8f0] hover:border-[#2a2a45] transition-all duration-200"
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#07070d]">
                    {user.displayName?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      "U"}
                  </span>
                </div>
                {/* Display name */}
                <span className="text-sm font-medium max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-[#7a7a9a] transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown panel */}
              {dropOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] bg-[#0f0f1a] border border-[#1e1e35] rounded-xl min-w-[220px] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User info */}
                  <div className="px-3 py-2.5 border-b border-[#1e1e35] mb-1.5">
                    <p className="text-xs text-[#7a7a9a] mb-0.5">Signed in as</p>
                    <p className="text-sm font-semibold text-[#e8e8f0] overflow-hidden text-ellipsis">
                      {user.email}
                    </p>
                  </div>

                  {/* Drop links */}
                  {dropLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#7a7a9a] hover:text-[#e8e8f0] hover:bg-[#16162a] no-underline transition-all duration-150"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}

                  <div className="h-px bg-[#1e1e35] my-1.5" />

                  {/* Sign out */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-[#e05555] hover:bg-[#e05555]/10 bg-transparent border-none cursor-pointer transition-all duration-150"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Guest auth buttons */
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#7a7a9a] hover:text-[#e8e8f0] hover:bg-[#16162a] transition-all duration-200 no-underline"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-amber-400 text-[#07070d] hover:bg-amber-300 hover:shadow-[0_8px_24px_rgba(240,165,0,0.3)] transition-all duration-200 no-underline"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#16162a] border border-[#1e1e35] text-[#e8e8f0] cursor-pointer hover:border-[#2a2a45] transition-all duration-200"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1e1e35] bg-[#0f0f1a] px-4 py-4">
          {/* Nav links */}
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={mobileLinkClass(href)}
            >
              {label}
            </Link>
          ))}

          <div className="h-px bg-[#1e1e35] my-3" />

          {user ? (
            <>
              {/* Logged-in user info */}
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#07070d]">
                    {user.displayName?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      "U"}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-[#e8e8f0] leading-tight truncate">
                    {user.displayName || user.email?.split("@")[0]}
                  </p>
                  <p className="text-xs text-[#7a7a9a] truncate">{user.email}</p>
                </div>
              </div>

              {dropLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium text-[#e8e8f0] hover:bg-[#16162a] no-underline mb-1 transition-all duration-150"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-4 py-3 rounded-lg text-sm font-medium text-[#e05555] hover:bg-[#e05555]/10 bg-transparent border-none cursor-pointer transition-all duration-150"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium text-[#e8e8f0] border border-[#2a2a45] hover:border-amber-400 hover:text-amber-400 no-underline transition-all duration-200"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold bg-amber-400 text-[#07070d] hover:bg-amber-300 no-underline transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
