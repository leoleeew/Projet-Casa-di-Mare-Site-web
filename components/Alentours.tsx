'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const spring = { type: 'spring' as const, stiffness: 72, damping: 20 };

interface AlentoursItem {
  distance: string;
  name: string;
  type: string;
  description: string;
  image: string;
  gradient: string; // fallback if image not yet added
}

const items: AlentoursItem[] = [
  {
    distance: '5 min',
    name: 'Santa Giulia',
    type: 'Plage',
    description:
      'Eau cristalline dans un cadre protégé, idéale pour le snorkeling et les familles. L\'une des plus belles plages de Méditerranée.',
    image: '/images/alentours/Santa Giulia.jpg',
    gradient: 'linear-gradient(135deg, #4AABBA 0%, #2D7A8A 50%, #1C5A6E 100%)',
  },
  {
    distance: '15 min',
    name: 'Porto-Vecchio',
    type: 'Ville',
    description:
      'Citadelle génoise, marché estival, restaurants, boutiques. La ville haute offre une vue époustouflante sur le golfe.',
    image: '/images/alentours/porto-vecchio.jpg',
    gradient: 'linear-gradient(135deg, #C4956A 0%, #9A6840 50%, #6B4220 100%)',
  },
  {
    distance: '30 min',
    name: 'Bonifacio',
    type: 'Site incontournable',
    description:
      'Perchée sur des falaises de calcaire blanc à 70 mètres au-dessus de la mer, la vieille ville est l\'un des paysages les plus saisissants de Corse.',
    image: '/images/alentours/Bonifacio.jpg',
    gradient: 'linear-gradient(135deg, #A89880 0%, #7A6A58 50%, #4E4038 100%)',
  },
  {
    distance: '30 min',
    name: 'Plongée sous-marine',
    type: 'Activité',
    description:
      'Des spots parmi les plus beaux de Méditerranée : grottes, épaves, mérous, langoustes. Plusieurs centres de plongée à Porto-Vecchio et Bonifacio.',
    image: '/images/alentours/Plongée.jpg',
    gradient: 'linear-gradient(135deg, #1A4A6E 0%, #0D2E4A 50%, #061828 100%)',
  },
  {
    distance: '30 min',
    name: 'Criques en bateau',
    type: 'Excursion',
    description:
      'Tour des îles Lavezzi, calanques de Bonifacio ou criques secrètes — les sorties en bateau dévoilent une Corse inaccessible depuis la terre.',
    image: '/images/alentours/Crique Bateau.jpg',
    gradient: 'linear-gradient(135deg, #2A6A8A 0%, #1A4A6A 50%, #0D2A4A 100%)',
  },
  {
    distance: '1h',
    name: 'Forêt de l\'Ospedale',
    type: 'Nature & Montagne',
    description:
      'À 1 000 m d\'altitude, une forêt de pins laricio, un lac de barrage et des sentiers de randonnée offrent une fraîcheur bienvenue au cœur de l\'été.',
    image: "/images/alentours/L'Ospédale.jpg",
    gradient: 'linear-gradient(135deg, #3A6A3A 0%, #2D4A3E 50%, #1A2E22 100%)',
  },
];

function PhotoCard({ item, index, inView }: { item: AlentoursItem; index: number; inView: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      variants={{
        hidden:   { opacity: 0, y: 22 },
        visible:  { opacity: 1, y: 0, transition: { ...spring, delay: index * 0.08 } },
      }}
      className="group flex flex-col overflow-hidden"
      style={{ background: 'rgba(237, 229, 216, 0.9)' }}
    >
      {/* Photo */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: item.gradient }}
          />
        )}
        {/* Dark gradient overlay at bottom */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(28,28,28,0.55) 0%, transparent 60%)' }}
        />
        {/* Distance badge */}
        <span
          className="absolute top-3 right-3 text-xs uppercase tracking-widest px-2 py-1"
          style={{ background: '#7A9E52', color: '#F5EFE6' }}
        >
          {item.distance}
        </span>
      </div>

      {/* Text */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] mb-1" style={{ color: 'rgba(28,28,28,0.4)' }}>
            {item.type}
          </p>
          <h3 className="font-serif text-xl text-charcoal leading-tight tracking-tight">
            {item.name}
          </h3>
        </div>
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(28,28,28,0.62)' }}>
          {item.description}
        </p>
        {/* Animated bottom line on hover */}
        <div
          className="h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
          style={{ background: '#7A9E52' }}
        />
      </div>
    </motion.div>
  );
}

export default function Alentours() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="alentours"
      ref={ref}
      className="py-24 md:py-32 px-6"
      style={{ background: 'rgba(237, 229, 216, 0.82)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-terracotta" />
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
              Aux alentours
            </p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal tracking-tight">
            À découvrir<br />
            <em>autour de la maison</em>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {items.map((item, i) => (
            <PhotoCard key={item.name} item={item} index={i} inView={inView} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
