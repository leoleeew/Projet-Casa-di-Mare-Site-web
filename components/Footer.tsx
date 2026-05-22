export default function Footer() {
  return (
    <footer
      className="px-6 py-10"
      style={{ background: '#2D4A3E', borderTop: '1px solid rgba(245,239,230,0.08)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">

        {/* Left — branding */}
        <div>
          <p
            className="font-serif text-lg tracking-tight"
            style={{ color: 'rgba(245,239,230,0.85)' }}
          >
            Casa di Mare
          </p>
          <p
            className="text-xs mt-1 uppercase tracking-[0.22em]"
            style={{ color: 'rgba(245,239,230,0.3)' }}
          >
            Palombaggia · Corse du Sud
          </p>
        </div>

        {/* Right — legal */}
        <p className="text-xs" style={{ color: 'rgba(245,239,230,0.2)' }}>
          Location saisonnière privée, non affiliée à une plateforme&nbsp;·&nbsp;
          <span suppressHydrationWarning>{new Date().getFullYear()}</span>
        </p>

      </div>
    </footer>
  );
}
