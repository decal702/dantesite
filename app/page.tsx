import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Services from "./components/Services";
import Socials from "./components/Socials";
import Store from "./components/Store";
import Testimonials from "./components/Testimonials";
import UpcomingWorkshops from "./components/UpcomingWorkshops";
import { content } from "@/lib/content";
import { getLanguage } from "@/lib/i18n-server";

export default async function Home() {
  const lang = await getLanguage();
  return (
    <>
      <Nav lang={lang} />
      <main className="flex-1">
        <Hero data={content.hero} lang={lang} />
        <About data={content.about} lang={lang} />
        <Services data={content.services} lang={lang} />
        <UpcomingWorkshops
          data={content.upcomingWorkshops}
          services={content.services}
          lang={lang}
        />
        <Store data={content.store} lang={lang} />
        <Testimonials data={content.testimonials} lang={lang} />
        <Contact data={content.contact} lang={lang} />
        <Socials data={content.socials} lang={lang} />
      </main>
      <Footer data={content.footer} lang={lang} />
    </>
  );
}
