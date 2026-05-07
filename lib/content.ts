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
  footer: {
    tagline: Bilingual;
  };
};

export const content: Content = contentJson as Content;
