export interface NavLink {
  name: string;
  href: string;
}

export interface PhoneContact {
  display: string;
  href: string;
}

export interface CTA {
  text: string;
}

export interface Navigation {
  links: NavLink[];
}

export interface Contact {
  phone: PhoneContact;
}

export interface HeaderData {
  navigation: Navigation;
  contact: Contact;
  cta: CTA;
}

