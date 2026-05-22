'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Waves, Eye, Home, Umbrella, MapPin } from 'lucide-react';

const features = [
  { icon: Waves,    label: 'Piscine privée',    detail: 'Vue mer, eau filtrée'      },
  { icon: Eye,      label: 'Vue panoramique',   detail: 'Palombaggia & le golfe'    },
  { icon: Home,     label: '2 Maisons',         detail: "Jusqu'à 8 personnes"       },
  { icon: Umbrella, label: 'Grandes terrasses', detail: 'Repas & détente dehors'    },
  { icon: MapPin,   label: 'Palombaggia',       detail: '5 min en voiture'          },
];

const itemVariants = {
  hidden:   { opacity: 0, y: 14 },
  visible:  { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 20 } },
};

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section
      ref={ref}
      style={{ background: '#2D4A3E', borderTop: '1px solid rgba(245,239,230,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.ul
          className="grid grid-cols-2 md:grid-cols-5"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
        >
          {features.map(({ icon: Icon, label, detail }, i) => (
            <motion.li
              key={label}
              variants={itemVariants}
              className="flex flex-col gap-3 py-8 px-5 group cursor-default"
              style={{
                borderRight: i < features.length - 1
                  ? '1px solid rgba(245,239,230,0.07)'
                  : 'none',
              }}
            >
              <Icon
                size={17}
                strokeWidth={1.4}
                style={{ color: '#7A9E52' }}
                className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-0.5"
              />
              <div>
                <p
                  className="text-sm font-medium tracking-tight"
                  style={{ color: 'rgba(245,239,230,0.88)' }}
                >
                  {label}
                </p>
                <p
                  className="text-xs mt-0.5 leading-snug"
                  style={{ color: 'rgba(245,239,230,0.35)' }}
                >
                  {detail}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
