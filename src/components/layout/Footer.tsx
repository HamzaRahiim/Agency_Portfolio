"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, LucideIcon } from "lucide-react";
import type { FooterData } from "@/types/footer";
import { getCurrentYear } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
};

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch footer data from API route
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/footer`);

        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }

        const data: FooterData = await response.json();
        setFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="relative border-t border-border/40 bg-linear-to-b from-background via-background to-muted text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 items-start">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-1 flex flex-col">
            {/* Logo - Aligned with headings */}
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src={resolvedTheme === "dark" ? "/logo-white.svg" : "/logo.svg"}
                  alt="Fast Line Logo"
                  width={200}
                  height={200}
                  className="transition-opacity duration-300w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Description */}
            {footerData?.company.description && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-8">
                {footerData.company.description}
              </p>
            )}

            {/* Social Media */}
            <div>
              <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-primary pb-5">
                Follow Us On:
              </h4>
              <div className="flex gap-3">
                {footerData?.socialLinks.map((social, index) => {
                  const IconComponent = iconMap[social.icon];
                  return IconComponent ? (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg border border-border bg-muted text-foreground hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all duration-200 hover:scale-105"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" strokeWidth={2.5} />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          {/* Middle Column 1 - Quick Links */}
          <div className="pt-8 lg:pt-20">
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-primary md:pb-16 pb-8">
              Quick Links
            </h4>
            <ul className="">
              {footerData?.quickLinks.map((link, index) => (
                <li key={index} className="pb-2">
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200 "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Column 2 - Services */}
          <div className="pt-8 lg:pt-20">
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-primary md:pb-16 pb-8">
              Services
            </h4>
            <ul >
              {footerData?.services.map((service, index) => (
                <li key={index} className="pb-2">
                  <Link
                    href={service.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contact */}
          <div className="pt-8 lg:pt-20">
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-primary md:pb-16 pb-8">
              Contact
            </h4>
            <ul >
              {footerData?.contact.phone && (
                <li className="flex items-start gap-3 pb-2">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5 animate-pulse" strokeWidth={2.5} />
                  <a
                    href={footerData.contact.phone.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {footerData.contact.phone.display}
                  </a>
                </li>
              )}
              {footerData?.contact.email && (
                <li className="flex items-start gap-3 pb-2">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                  <a
                    href={footerData.contact.email.href}
                    className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {footerData.contact.email.display}
                  </a>
                </li>
              )}
              {footerData?.contact.address && (
                <li className="flex items-start gap-3 pb-2">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-2">
                    {footerData.contact.address.line1}
                    <br />
                    {footerData.contact.address.line2}
                    <br />
                    {footerData.contact.address.line3}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/50 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            {footerData?.copyright && (
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                {footerData.copyright.replace("2024", getCurrentYear().toString())}
              </p>
            )}

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              {footerData?.footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

