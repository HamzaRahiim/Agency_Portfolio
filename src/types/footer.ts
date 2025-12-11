export interface Link {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface PhoneContact {
  display: string;
  href: string;
}

export interface EmailContact {
  display: string;
  href: string;
}

export interface Address {
  line1: string;
  line2: string;
  line3: string;
}

export interface ContactInfo {
  phone: PhoneContact;
  email: EmailContact;
  address: Address;
}

export interface Company {
  description: string;
}

export interface FooterData {
  company: Company;
  quickLinks: Link[];
  services: Link[];
  socialLinks: SocialLink[];
  contact: ContactInfo;
  footerLinks: Link[];
  copyright: string;
}

