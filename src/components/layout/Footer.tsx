"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Amazon Wholesale FBA", href: "/services/amazon-wholesale" },
  { name: "TikTok Shop Automation", href: "/services/tiktok-automation" },
  { name: "Shopify Dropshipping", href: "/services/shopify-dropshipping" },
  { name: "Walmart Automation", href: "/services/walmart-automation" },
  { name: "Amazon Private Label", href: "/services/amazon-private-label" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61584115540162",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com", // Update with your Instagram profile URL
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: Youtube,
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              <Link href="/" className="flex items-center gap-3">
                {/* TODO: Replace with your actual logo image */}
                {/* <Image src="/logo.svg" alt="Fast Line Logo" width={40} height={40} /> */}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">Fast Line</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                    Build, Scale, Evolve
                  </span>
                </div>
              </Link>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
              We help brands scale and succeed on Amazon, Walmart, Shopify, and
              TikTok with AI-driven automation, expert marketing, and seamless
              store management—maximizing growth, efficiency, and profitability.
            </p>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-5">
                Follow Us On:
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column 1 - Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Column 2 - Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
              Services
            </h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6">
              Contact
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 animate-pulse" strokeWidth={2.5} />
                <a
                  href="tel:+17195635059"
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
                >
                  +1 (719) 563-5059
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <a
                  href="mailto:hello@fastline.com"
                  className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-200"
                >
                  hello@fastline.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  2356 West Touhy Ave #1020
                  <br />
                  Chicago, IL 60645
                  <br />
                  United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © 2024 Fast Line. All Rights Reserved.
            </p>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms & Condition
              </Link>
              <Link
                href="/refund"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

