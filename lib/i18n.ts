import type { Bilingual, Lang } from "./content";

export function pick<T extends Bilingual>(value: T, lang: Lang): string {
  return value[lang];
}

export const ui = {
  nav: {
    home: { en: "Home", fr: "Accueil" },
    about: { en: "About", fr: "À propos" },
    services: { en: "Services", fr: "Services" },
    schedule: { en: "Schedule", fr: "Calendrier" },
    store: { en: "Store", fr: "Boutique" },
    testimonials: { en: "Reviews", fr: "Avis" },
    faq: { en: "FAQ", fr: "FAQ" },
    contact: { en: "Contact", fr: "Contact" },
    forOrganizations: {
      en: "For organizations",
      fr: "Pour les organismes",
    },
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
    missionHeading: { en: "Mission", fr: "Mission" },
    visionHeading: { en: "Vision", fr: "Vision" },
    teamHeading: { en: "The team", fr: "L'équipe" },
    projectsHeading: { en: "Past projects", fr: "Projets passés" },
  },
  services: {
    comingSoon: { en: "Coming soon", fr: "À venir" },
  },
  store: {
    contactToPurchase: {
      en: "Contact to purchase",
      fr: "Contacter pour acheter",
    },
    inquiryPrefix: { en: "Inquiry", fr: "Demande" },
  },
  testimonials: {
    empty: {
      en: "Reviews coming soon.",
      fr: "Avis à venir.",
    },
  },
  faq: {},
  socials: {},
  contact: {
    fields: {
      name: { en: "Name", fr: "Nom" },
      email: { en: "Email", fr: "Courriel" },
      phone: { en: "Phone (optional)", fr: "Téléphone (optionnel)" },
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
  organizations: {
    outcomesHeading: {
      en: "What participants take away",
      fr: "Ce que les participants en retirent",
    },
    formatsHeading: {
      en: "Workshop formats",
      fr: "Formats d'atelier",
    },
    practicalHeading: {
      en: "How it works",
      fr: "Comment ça fonctionne",
    },
    pdfHeading: {
      en: "Want a one-page summary?",
      fr: "Vous voulez un résumé d'une page?",
    },
    pdfBlurb: {
      en: "Download our program sheet to share with your team or funder.",
      fr: "Téléchargez notre fiche-programme pour la partager avec votre équipe ou votre bailleur de fonds.",
    },
    pdfDownload: {
      en: "Download program sheet (PDF)",
      fr: "Télécharger la fiche (PDF)",
    },
    pdfPending: {
      en: "Program sheet coming soon — contact us for a copy in the meantime.",
      fr: "Fiche-programme à venir — contactez-nous pour en obtenir une copie d'ici là.",
    },
    quoteHeading: {
      en: "Request a quote",
      fr: "Demander une soumission",
    },
    quoteIntro: {
      en: "Tell us about your group and we'll send a tailored quote within two business days.",
      fr: "Parlez-nous de votre groupe et nous vous enverrons une soumission sur mesure en deux jours ouvrables.",
    },
  },
  quote: {
    fields: {
      organizationName: {
        en: "Organization name",
        fr: "Nom de l'organisme",
      },
      contactName: { en: "Contact person", fr: "Personne-ressource" },
      email: { en: "Email", fr: "Courriel" },
      phone: { en: "Phone (optional)", fr: "Téléphone (optionnel)" },
      groupSize: {
        en: "Group size (e.g. 12-15)",
        fr: "Taille du groupe (ex. 12 à 15)",
      },
      ageRange: {
        en: "Age range (e.g. 14-18)",
        fr: "Tranche d'âge (ex. 14 à 18 ans)",
      },
      preferredDates: {
        en: "Preferred dates (optional)",
        fr: "Dates souhaitées (optionnel)",
      },
      venue: { en: "Where would the workshop run?", fr: "Lieu de l'atelier" },
      budgetRange: {
        en: "Budget range (optional)",
        fr: "Budget approximatif (optionnel)",
      },
      message: {
        en: "Anything else we should know? (optional)",
        fr: "Y a-t-il autre chose à savoir? (optionnel)",
      },
    },
    venueOptions: {
      ourStudio: { en: "At your Mile-End studio", fr: "À votre studio du Mile-End" },
      ourSite: { en: "At our site/location", fr: "Chez nous (sur place)" },
      either: { en: "Either works", fr: "L'un ou l'autre" },
    },
    budgetOptions: {
      under500: { en: "Under $500", fr: "Moins de 500 $" },
      r500_1000: { en: "$500 – $1,000", fr: "500 $ – 1 000 $" },
      r1000_2500: { en: "$1,000 – $2,500", fr: "1 000 $ – 2 500 $" },
      over2500: { en: "$2,500+", fr: "2 500 $ et plus" },
      open: { en: "Open / not sure yet", fr: "Ouvert / à discuter" },
    },
    submit: { en: "Request a quote", fr: "Demander une soumission" },
    submitting: { en: "Sending…", fr: "Envoi…" },
    success: {
      en: "Thanks! We'll get back to you within two business days.",
      fr: "Merci! Nous vous répondrons en deux jours ouvrables.",
    },
    error: {
      en: "Couldn't send. Please try again or email us directly.",
      fr: "Échec de l'envoi. Veuillez réessayer ou nous écrire directement.",
    },
  },
  footer: {
    admin: { en: "Admin login", fr: "Connexion admin" },
  },
};

export type UiStrings = typeof ui;
