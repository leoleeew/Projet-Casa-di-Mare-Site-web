import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import Navigation from '@/components/Navigation';
import Introduction from '@/components/Introduction';
import Features from '@/components/Features';
import RoomTour from '@/components/RoomTour';
import Palombaggia from '@/components/Palombaggia';
import Alentours from '@/components/Alentours';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      {/* Hero — scroll-expansion animation */}
      <ScrollExpandMedia
        bgImageSrc="/images/exterieur/IMG_4290.jpeg"
        mediaSrc="/images/exterieur/IMG_6074.jpeg"
        title="Casa di Mare"
        /* Option B (English, uncomment and comment above to use):
           title="A Corsican Summer" */
        subtitle="Palombaggia, Corse du Sud"
        scrollToExpand="Défiler pour découvrir ↓"
      >
        {/* Fades in once hero is fully expanded */}
        <div className="flex flex-col items-center py-16 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-5">
            {/* EN: Discover the property */}
            Découvrir la maison
          </p>
          <a
            href="#maisons"
            className="inline-block px-8 py-3 text-sm uppercase tracking-[0.2em] text-white border border-white/40 hover:bg-white hover:text-charcoal transition-colors duration-300"
          >
            {/* EN: Explore */}
            Explorer
          </a>
        </div>
      </ScrollExpandMedia>

      {/* Sticky nav — appears after hero */}
      <Navigation />

      <main>
        <section id="maisons">
          <Introduction />
          <Features />
          <RoomTour />
        </section>

        <Palombaggia />

        <Alentours />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
