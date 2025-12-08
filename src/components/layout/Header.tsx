"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/components/providers/ThemeProvider";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 50) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border/60"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/">
              <Image
                src={resolvedTheme === "dark" ? "/logo-white.svg" : "/logo.svg"}
                alt="Fast Line Logo"
                width={160}
                height={160}
                className="transition-opacity duration-300"
                priority
              />
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-lg font-medium">
            <Link
              href="/"
              className={`relative transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${pathname === "/"
                ? "text-foreground after:w-full"
                : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
                }`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`relative transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${pathname === "/services"
                ? "text-foreground after:w-full"
                : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
                }`}
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className={`relative transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${pathname === "/portfolio"
                ? "text-foreground after:w-full"
                : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
                }`}
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className={`relative transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${pathname === "/about"
                ? "text-foreground after:w-full"
                : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
                }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`relative transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${pathname === "/contact"
                ? "text-foreground after:w-full"
                : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone/WhatsApp Icon + Number */}
            <a
              href="tel:+1234567890"
              className="hidden md:flex items-center gap-2 text-lg transition-colors"
              style={{
                color: 'var(--muted-foreground)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted-foreground)';
              }}
              aria-label="Call us"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-lg font-medium hidden xl:inline">
                +1 (234) 567-890
              </span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button - Blue */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold text-primary-foreground transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              style={{
                backgroundColor: 'var(--primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
              }}
            >
              Get Free Consultation
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="mt-2 rounded-xl border border-border bg-background/95 backdrop-blur-md shadow-lg">
              <nav className="flex flex-col px-4 py-3 space-y-2 text-sm font-medium">
                <Link
                  href="/"
                  className="py-2 text-foreground/90 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="py-2 text-foreground/90 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/portfolio"
                  className="py-2 text-foreground/90 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  href="/about"
                  className="py-2 text-foreground/90 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="py-2 text-foreground/90 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Free Consultation
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


