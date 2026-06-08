'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const links = [
  { href: '#maisons',    label: 'Les Maisons' },
  { href: '#exterieur',  label: "L'Extérieur" },
  { href: '#tour',       label: 'Coins Cachés' },
  { href: '#alentours',  label: 'Alentours' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(237, 229, 216, 0.94)'
          : 'rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled
          ? '1px solid rgba(28, 28, 28, 0.07)'
          : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo + nom */}
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="rounded-full overflow-hidden flex-shrink-0 bg-white" style={{ width: 36, height: 36 }}>
            <Image
              src="/images/logo.jpeg"
              alt="Casa di Mare — Palombaggia"
              width={36}
              height={36}
              className="w-full h-full"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <span
            className="font-serif text-base font-semibold tracking-tight hidden sm:block transition-colors duration-500"
            style={{ color: scrolled ? '#1C1C1C' : 'rgba(245,239,230,0.92)' }}
          >
            Casa di Mare
          </span>
        </a>

        {/* Liens desktop */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative group text-xs uppercase tracking-[0.2em] transition-colors duration-300"
                style={{ color: scrolled ? 'rgba(28,28,28,0.55)' : 'rgba(245,239,230,0.75)' }}
                onMouseEnter={e => (e.currentTarget.style.color = scrolled ? '#1C1C1C' : '#F5EFE6')}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'rgba(28,28,28,0.55)' : 'rgba(245,239,230,0.75)')}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px bg-terracotta transition-all duration-300 ease-out w-0 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA mobile */}
        <a
          href="#contact"
          className="md:hidden text-xs uppercase tracking-widest font-medium transition-colors duration-300"
          style={{ color: scrolled ? '#7A9E52' : 'rgba(245,239,230,0.85)' }}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
