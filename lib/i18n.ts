import type { Bilingual, Lang } from "./content";

export const LANG_COOKIE = "g101_lang";

export function pick<T extends Bilingual>(value: T, lang: Lang): string {
  return value[lang];
}

export const ui = {
  nav: {
    home: { en: "Home", fr: "Accueil" },
    about: { en: "About", fr: "À propos" },
    services: { en: "Services", fr: "Services" },
    store: { en: "Store", fr: "Boutique" },
    testimonials: { en: "Reviews", fr: "Avis" },
    contact: { en: "Contact", fr: "Contact" },
  },
  language: {
    label: { en: "Language", fr: "Langue" },
    en: { en: "EN", fr: "EN" },
    fr: { en: "FR", fr: "FR" },
  },
  hero: {
    secondaryCta: { en: "See what we offer", fr: "Voir nos services" },
  },
  about: {
    eyebrow: { en: "About", fr: "À propos" },
    title: { en: "Who we are", fr: "Qui sommes-nous" },
    missionHeading: { en: "Mission", fr: "Mission" },
    visionHeading: { en: "Vision", fr: "Vision" },
    teamHeading: { en: "The team", fr: "L'équipe" },
    projectsHeading: { en: "Past projects", fr: "Projets passés" },
  },
  services: {
    eyebrow: { en: "Services", fr: "Services" },
    title: { en: "What we offer", fr: "Ce que nous offrons" },
    intro: {
      en: "From a first-timer's introduction to private coaching for working writers — pricing in Canadian dollars, materials always included.",
      fr: "De l'introduction pour débutants au coaching privé pour artistes établis — prix en dollars canadiens, matériel toujours inclus.",
    },
    comingSoon: { en: "Coming soon", fr: "À venir" },
  },
  store: {
    eyebrow: { en: "Store", fr: "Boutique" },
    title: { en: "Take some home", fr: "Apportez-en chez vous" },
    intro: {
      en: "Pick something out — checkout happens by message. Tap any item below and we'll get back to you with shipping and payment options.",
      fr: "Choisissez un article — le paiement se fait par message. Cliquez sur un article ci-dessous et nous vous répondrons avec les options d'expédition et de paiement.",
    },
    contactToPurchase: {
      en: "Contact to purchase",
      fr: "Contacter pour acheter",
    },
    inquiryPrefix: { en: "Inquiry", fr: "Demande" },
  },
  testimonials: {
    eyebrow: { en: "Reviews", fr: "Avis" },
    title: { en: "What people say", fr: "Ce que les gens en disent" },
    empty: {
      en: "Reviews coming soon.",
      fr: "Avis à venir.",
    },
  },
  socials: {
    eyebrow: { en: "Follow", fr: "Suivez-nous" },
    title: { en: "Stay in the loop", fr: "Restez à l'affût" },
    intro: {
      en: "Latest pieces, workshop announcements, behind-the-scenes from sessions.",
      fr: "Dernières pièces, annonces d'ateliers, coulisses des sessions.",
    },
  },
  contact: {
    eyebrow: { en: "Contact", fr: "Contact" },
    title: { en: "Drop us a line", fr: "Écrivez-nous" },
    fields: {
      name: { en: "Name", fr: "Nom" },
      email: { en: "Email", fr: "Courriel" },
      subject: { en: "Subject", fr: "Sujet" },
      message: { en: "Message", fr: "Message" },
    },
    submit: { en: "Send message", fr: "Envoyer" },
    submitting: { en: "Sending…", fr: "Envoi…" },
    success: {
      en: "Message sent! We'll be in touch.",
      fr: "Message envoyé! Nous vous répondrons bientôt.",
    },
    error: {
      en: "Couldn't send. Please try again.",
      fr: "Échec de l'envoi. Veuillez réessayer.",
    },
  },
  footer: {
    admin: { en: "Admin login", fr: "Connexion admin" },
  },
};

export type UiStrings = typeof ui;
