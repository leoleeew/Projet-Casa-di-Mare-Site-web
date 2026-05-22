'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function Palombaggia() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="exterieur" ref={ref}>

      {/* Full-bleed atmospheric image */}
      <div className="relative h-[65vh] md:h-[75vh] overflow-hidden">
        <Image
          src="/images/exterieur/palombaggia-plage-porto-vecchio-3.jpg"
          alt="Vue panoramique sur la baie de Palombaggia depuis la maison, mer turquoise et maquis corse"
          fill
          className="object-cover"
          loading="lazy"
        />
        {/* Dark gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.75) 0%, rgba(28,28,28,0.1) 60%, transparent 100%)' }}
        />
        {/* Overlay text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 px-8 pb-12 md:px-16 md:pb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'rgba(245,239,230,0.6)' }}>
            {/* EN: 5 minutes away */}
            À 5 minutes
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-2" style={{ color: '#F5EFE6' }}>
            Palombaggia
          </h2>
          <p className="text-sm md:text-base max-w-lg" style={{ color: 'rgba(245,239,230,0.7)', lineHeight: '1.7' }}>
            {/* EN: One of the most beautiful beaches in France — turquoise water, pine forest, white sand. */}
            L&apos;une des plus belles plages de France : eau turquoise, forêt de pins, sable blanc.
          </p>
        </motion.div>
      </div>

      {/* Text + map section */}
      <div className="py-20 px-6 max-w-6xl mx-auto" style={{ background: 'rgba(237, 229, 216, 0.82)' }}>
        <div className="grid md:grid-cols-2 gap-14 md:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-5 leading-[1.85]" style={{ color: 'rgba(28,28,28,0.7)' }}>
              <p>
                {/* EN: Named one of the most beautiful beaches in France, Palombaggia stretches in a sweep of fine white sand fringed by a forest of ancient umbrella pines. */}
                Classée parmi les plus belles plages de France, Palombaggia s&apos;étend en un arc de sable blanc fin, bordé d&apos;une forêt de pins parasols centenaires.
              </p>
              <p>
                {/* EN: The water, crystalline and impossibly turquoise, invites long swims between rocky coves. A few restaurants and beach bars complete the picture. */}
                L&apos;eau, cristalline et d&apos;un turquoise improbable, invite aux longues baignades entre les criques rocheuses. Quelques restaurants et bars de plage complètent le tableau.
              </p>
              <p>
                {/* EN: From Casa di Mare, you are there in five minutes — time enough to grab your hat and your book. */}
                Depuis Casa di Mare, vous y êtes en cinq minutes, le temps d&apos;attraper votre chapeau et votre livre.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Google Maps link */}
            <a
              href="https://maps.app.goo.gl/ptroTtaQFj9WUVnk9"
              target="_blank"
              rel="noopener noreferrer"
              className="h-52 flex flex-col items-center justify-center gap-3 group transition-colors duration-200"
              style={{ background: '#DDD4C4', border: '1px solid rgba(28,28,28,0.08)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7A9E52' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'rgba(28,28,28,0.6)' }}>
                Palombaggia, Porto-Vecchio
              </span>
              <span
                className="text-xs uppercase tracking-widest underline underline-offset-4 group-hover:text-terracotta transition-colors duration-200"
                style={{ color: 'rgba(28,28,28,0.4)' }}
              >
                Voir sur Google Maps →
              </span>
            </a>

            {/* Carte Google Maps interactive */}
            <div className="mt-3 overflow-hidden" style={{ border: '1px solid rgba(28,28,28,0.08)' }}>
              <iframe
                src="https://maps.google.com/maps?q=41.550279,9.2981759&hl=fr&z=15&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Casa di Mare — Palombaggia, Porto-Vecchio"
              />
            </div>

            {/* Quick info */}
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                { val: '5 min',  label: 'en voiture de la plage' },
                { val: '10 min', label: 'à pied par chemin semi-privé' },
                { val: '15 min', label: 'de Porto-Vecchio' },
              ].map(({ val, label }) => (
                <div key={label} className="py-4 px-2" style={{ background: '#DDD4C4' }}>
                  <p className="font-serif text-xl text-charcoal">{val}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(28,28,28,0.5)' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
