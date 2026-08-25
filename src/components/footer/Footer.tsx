export function Footer() {
  const links = {
    Product: ['Intelligence Engine', 'Market Analysis', 'Financial Planning', 'Scheme Router'],
    Company: ['About', 'Mission', 'Team', 'Careers'],
    Resources: ['Documentation', 'Case Studies', 'API', 'Support'],
    Legal: ['Privacy', 'Terms', 'Security', 'Licenses'],
  }

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#071A14' }}>
      {/* Topographic pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="footer-topo" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="0.5" fill="white" />
              <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="0.2" />
              <circle cx="30" cy="30" r="25" fill="none" stroke="white" strokeWidth="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-topo)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Large wordmark */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#0B5D3B' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="3" fill="white" opacity="0.9" />
                <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <circle cx="11" cy="11" r="10" stroke="white" strokeWidth="0.5" opacity="0.3" />
              </svg>
            </div>
            <div className="font-display text-[clamp(48px,10vw,120px)] font-bold leading-none" style={{ color: 'white' }}>
              GramIntel
            </div>
          </div>
          <div className="text-[11px] tracking-[0.25em] uppercase text-white/40 ml-14">
            Hyper-Local Enterprise Intelligence
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-4">
                {category}
              </div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" style={{ cursor: 'none' }}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/40">
            © 2026 GramIntel. Built for rural India.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" style={{ cursor: 'none' }} className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" style={{ cursor: 'none' }} className="text-xs text-white/40 hover:text-white/70 transition-colors">Terms</a>
            <a href="#" style={{ cursor: 'none' }} className="text-xs text-white/40 hover:text-white/70 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
