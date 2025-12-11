"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useModal } from "@/components/providers/ModalProvider";
import Image from "next/image";
import Lottie from "lottie-react";
import phoneAnimation from "@/assets/phone.json";
import type { HeaderData } from "@/types/header";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const { openModal } = useModal();

  const topLight = !isScrolled && resolvedTheme === "light";

  // Fetch header data from API route
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/header`);

        if (!response.ok) {
          throw new Error("Failed to fetch header data");
        }

        const data: HeaderData = await response.json();
        setHeaderData(data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  const navLinkClass = (href: string) => {
    const active = pathname === href;
    const activeClass = topLight || isScrolled
      ? "text-foreground after:w-full"
      : "text-white after:w-full";
    const inactiveClass = topLight || isScrolled
      ? "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
      : "text-white/80 after:w-0 hover:text-white hover:after:w-full";

    return `relative transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${active ? activeClass : inactiveClass}`;
  };

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
        : topLight
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/60"
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
            {headerData?.navigation.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone/WhatsApp Icon + Number */}
            {headerData?.contact.phone && (
              <a
                href={headerData.contact.phone.href}
                className={`hidden md:flex items-center gap-2 text-lg transition-colors ${
                  isScrolled || topLight
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/90 hover:text-white"
                }`}
                style={isScrolled || topLight ? {
                  color: 'var(--muted-foreground)',
                } : {}}
                onMouseEnter={(e) => {
                  if (isScrolled || topLight) {
                    e.currentTarget.style.color = 'var(--primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isScrolled || topLight) {
                    e.currentTarget.style.color = 'var(--muted-foreground)';
                  }
                }}
                aria-label="Call us"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Lottie 
                    animationData={phoneAnimation} 
                    loop={true}
                    autoplay={true}
                    style={{ width: '20px', height: '20px' }}
                  />
                </div>
                <span className="text-lg font-medium hidden xl:inline">
                  {headerData.contact.phone.display}
                </span>
              </a>
            )}

            {/* Theme Toggle */}
            <ThemeToggle className={isScrolled || topLight ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"} />

            {/* CTA Button - Blue */}
            {headerData?.cta && (
              <button
                onClick={openModal}
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                {headerData.cta.text}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 transition-colors ${
                isScrolled || topLight ? "text-foreground" : "text-white"
              }`}
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
                {headerData?.navigation.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-2 text-foreground/90 hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {headerData?.cta && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openModal();
                    }}
                    className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
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
                    {headerData.cta.text}
                  </button>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


