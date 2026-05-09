import contentJson from "@/data/content.json";

export type Lang = "en" | "fr";

export type Bilingual = { en: string; fr: string };

export type TeamMember = {
  id: string;
  name: string;
  role: Bilingual;
  bio: Bilingual;
  photo: string;
};

export type PastProject = {
  id: string;
  title: Bilingual;
  description: Bilingual;
  image: string;
};

export type ServiceItem = {
  id: string;
  name: Bilingual;
  description: Bilingual;
  price: string;
  image: string;
  comingSoon?: boolean;
};

export type StoreItem = {
  id: string;
  name: Bilingual;
  description: Bilingual;
  price: string;
  image: string;
};

export type Testimonial = {
  id: string;
  quote: Bilingual;
  author: string;
  role?: Bilingual;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type UpcomingWorkshop = {
  id: string;
  serviceId: string;
  date: string;
  time?: string;
  location: Bilingual;
  note?: Bilingual;
};

export type FaqItem = {
  id: string;
  question: Bilingual;
  answer: Bilingual;
};

export type OrganizationsContent = {
  intro: Bilingual;
  outcomes: Array<{ id: string; text: Bilingual }>;
  practicalItems: Array<{ id: string; text: Bilingual }>;
  pdfUrl: { en: string; fr: string };
};

export type SectionLabels = {
  eyebrow?: Bilingual;
  title?: Bilingual;
  intro?: Bilingual;
};

export type AboutLabels = SectionLabels & {
  missionHeading?: Bilingual;
  visionHeading?: Bilingual;
  teamHeading?: Bilingual;
  projectsHeading?: Bilingual;
};

export type TestimonialsLabels = SectionLabels & {
  empty?: Bilingual;
};

export type SectionLabelKey =
  | "about"
  | "services"
  | "store"
  | "testimonials"
  | "faq"
  | "socials"
  | "contact"
  | "organizations";

export type NavLabels = {
  home?: Bilingual;
  about?: Bilingual;
  services?: Bilingual;
  schedule?: Bilingual;
  store?: Bilingual;
  testimonials?: Bilingual;
  faq?: Bilingual;
  contact?: Bilingual;
  forOrganizations?: Bilingual;
};

export type Labels = {
  about: AboutLabels;
  services: SectionLabels;
  store: SectionLabels;
  testimonials: TestimonialsLabels;
  faq: SectionLabels;
  socials: SectionLabels;
  contact: SectionLabels;
  organizations: SectionLabels;
  nav: NavLabels;
};

export type BusinessInfo = {
  legalName: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  telephone: string;
  geo: { lat: number; lng: number };
  openingHours: string[];
  priceRange: string;
};

export type Content = {
  hero: {
    title: Bilingual;
    tagline: Bilingual;
    ctaLabel: Bilingual;
    backgroundImage: string;
  };
  about: {
    mission: Bilingual;
    vision: Bilingual;
    team: TeamMember[];
    pastProjects: PastProject[];
  };
  services: ServiceItem[];
  store: StoreItem[];
  testimonials: Testimonial[];
  contact: {
    intro: Bilingual;
    recipientEmail: string;
  };
  socials: SocialLink[];
  upcomingWorkshops: UpcomingWorkshop[];
  faq: FaqItem[];
  business: BusinessInfo;
  organizations: OrganizationsContent;
  labels: Labels;
  footer: {
    tagline: Bilingual;
  };
};

export const content: Content = contentJson as Content;
