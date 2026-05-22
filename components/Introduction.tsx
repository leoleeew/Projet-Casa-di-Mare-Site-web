'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const spring = { type: 'spring' as const, stiffness: 72, damping: 20 };

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export default function Introduction() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-36 px-6 max-w-6xl mx-auto" ref={ref} style={{ background: 'rgba(237, 229, 216, 0.82)' }}>
      <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">

        {/* Text */}
        <motion.div
          className="md:pt-8"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-7">
            <div className="h-px w-8 bg-sage" />
            <p className="text-xs uppercase tracking-[0.3em] text-sage">
              L&apos;esprit des lieux
            </p>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.12] tracking-tight mb-8"
          >
            Un été entre<br />
            <em>maquis</em> et mer
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="space-y-5 leading-[1.85] text-[1.05rem]"
            style={{ color: 'rgba(28,28,28,0.65)' }}
          >
            <motion.p variants={itemVariants}>
              Le matin, le parfum du ciste et de l&apos;immortelle traverse la maison.
              Le café sur la terrasse, face à un horizon de turquoise que vous pensiez
              réservé aux cartes postales.
            </motion.p>
            <motion.p variants={itemVariants}>
              L&apos;après-midi, les cigales donnent le tempo. La piscine attend,
              l&apos;ombre des pins vous invite. Le temps ralentit, comme il se doit en Corse.
            </motion.p>
            <motion.p variants={itemVariants}>
              Casa di Mare, ce sont deux petites maisons qui partagent un secret :
              une vue sur Palombaggia qui vole chaque coucher de soleil.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 pt-10 border-t border-charcoal/10"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-stone">
              Corse du Sud · Près de Palombaggia
            </p>
          </motion.div>
        </motion.div>

        {/* Photo collage */}
        <div className="relative">
          {/* Main tall photo */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.12 }}
            className="relative h-[420px] md:h-[500px] overflow-hidden"
            style={{ borderRadius: '1px' }}
          >
            <Image
              src="/images/exterieur/IMG_2481.jpeg"
              alt="Terrasse avec vue sur la mer et le maquis corse"
              fill
              className="object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Second photo — offset bottom-left */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ ...spring, delay: 0.28 }}
            className="absolute -bottom-10 -left-6 w-44 h-36 md:w-52 md:h-44 overflow-hidden border-4 border-sand shadow-lg"
            style={{ borderRadius: '1px' }}
          >
            <Image
              src="/images/exterieur/IMG_5943.jpeg"
              alt="Vue sur le maquis et la mer turquoise de Palombaggia"
              fill
              className="object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Third photo — offset top-right */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ ...spring, delay: 0.22 }}
            className="absolute -top-8 -right-4 w-36 h-28 md:w-44 md:h-36 overflow-hidden border-4 border-sand shadow-lg"
            style={{ borderRadius: '1px' }}
          >
            <Image
              src="/images/piscine/IMG_7356.jpeg"
              alt="Piscine privée avec vue sur la Méditerranée"
              fill
              className="object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
