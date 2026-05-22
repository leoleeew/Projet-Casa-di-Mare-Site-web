'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, AtSign } from 'lucide-react';

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'a.ausseil24@gmail.com',
    href: 'mailto:a.ausseil24@gmail.com',
    description: 'Disponibilités & tarifs',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+33 6 10 27 85 26',
    href: 'tel:+33610278526',
    description: 'Ou par WhatsApp',
  },
  {
    icon: AtSign,
    label: 'Instagram',
    value: '@casadimare_palombaggia',
    href: 'https://instagram.com/casadimare_palombaggia',
    description: 'Suivez la maison',
  },
];

const spring = { type: 'spring' as const, stiffness: 80, damping: 20 };

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6"
      style={{ background: '#2D4A3E' }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-14 md:gap-24 items-start">

          {/* Left — heading block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={spring}
          >
            <p
              className="text-xs uppercase tracking-[0.3em] mb-5"
              style={{ color: 'rgba(157,196,160,0.8)' }}
            >
              Planifiez votre été
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-tight mb-6"
              style={{ color: '#F5EFE6' }}
            >
              Réservez<br />votre été
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'rgba(245,239,230,0.5)', maxWidth: '34ch' }}
            >
              Contactez-nous pour les disponibilités, les tarifs, et tout ce
              qu&apos;il vous faut savoir avant votre arrivée en Corse.
            </p>
          </motion.div>

          {/* Right — stacked contacts with divide-y, no equal cards */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
            style={{ borderTop: '1px solid rgba(245,239,230,0.1)' }}
          >
            {contacts.map(({ icon: Icon, label, value, href, description }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={{
                  hidden:  { opacity: 0, x: 18 },
                  visible: { opacity: 1, x: 0, transition: spring },
                }}
                className="flex items-center gap-6 py-7 group"
                style={{ borderBottom: '1px solid rgba(245,239,230,0.08)' }}
              >
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  style={{ color: '#7A9E52', flexShrink: 0 }}
                  className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-0.5"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs uppercase tracking-[0.2em] mb-1"
                    style={{ color: 'rgba(245,239,230,0.32)' }}
                  >
                    {label}
                  </p>
                  <p
                    className="font-medium text-sm truncate tracking-tight"
                    style={{ color: '#F5EFE6' }}
                  >
                    {value}
                  </p>
                </div>
                <p
                  className="text-xs hidden md:block flex-shrink-0"
                  style={{ color: 'rgba(245,239,230,0.3)' }}
                >
                  {description}
                </p>
              </motion.a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
