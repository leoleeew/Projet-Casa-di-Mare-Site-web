'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '#maisons',    label: 'Les Maisons' },
  { href: '#exterieur',  label: "L'Extérieur" },
  { href: '#tour',       label: 'Coins Cachés' },
  { href: '#alentours',  label: 'Alentours' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-12px)',
        pointerEvents: visible ? 'auto' : 'none',
        background: 'rgba(237, 229, 216, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(28, 28, 28, 0.07)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-serif text-base font-semibold tracking-tight" style={{ color: '#1C1C1C' }}>
          Casa di Mare
        </span>

        <ul className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative group text-xs uppercase tracking-[0.2em] transition-colors duration-200"
                style={{ color: 'rgba(28,28,28,0.55)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,28,0.55)')}
              >
                {l.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-terracotta transition-all duration-300 ease-out w-0 group-hover:w-full"
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="md:hidden text-xs uppercase tracking-widest font-medium"
          style={{ color: '#7A9E52' }}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
