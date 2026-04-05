"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Zap, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user?: { name: string; email: string; id: string } | null;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/intervue-ai", label: "IntervueAI" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/intervue-ai") {
      return (
        pathname.startsWith("/intervue-ai") || pathname.startsWith("/interview")
      );
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <nav
      className={`navbar-glass transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-brand-blue-bright rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span
            className="text-xl font-bold text-brand-blue-dark"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Job<span className="text-brand-blue-bright">Vue AI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "text-brand-blue-bright bg-blue-50"
                  : "text-brand-text-secondary hover:text-brand-blue-bright hover:bg-blue-50/50"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-blue-bright rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue-bright to-brand-purple flex items-center justify-center text-white text-sm font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-brand-text max-w-[120px] truncate">
                  {user.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-text-secondary transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-brand-border shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-brand-border">
                      <p className="text-sm font-semibold text-brand-text truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-brand-text-secondary truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-brand-text-secondary hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-brand-blue-bright hover:bg-blue-50 rounded-xl transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="btn-jobvue-primary !px-4 !py-2 !text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-blue-50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-brand-text" />
          ) : (
            <Menu className="w-6 h-6 text-brand-text" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1 pt-4 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-brand-blue-bright bg-blue-50"
                      : "text-brand-text-secondary hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-brand-border mt-2 pt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2">
                      <p className="text-sm font-semibold text-brand-text">
                        {user.name}
                      </p>
                      <p className="text-xs text-brand-text-secondary">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 px-4">
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileOpen(false)}
                      className="btn-jobvue-secondary text-center !text-sm"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileOpen(false)}
                      className="btn-jobvue-primary text-center !text-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
