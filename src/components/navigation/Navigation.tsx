import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useScroll } from "framer-motion"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 60))
  }, [scrollY])

  const navLinks = [
    { label: "Intelligence", href: "#intelligence" },
    { label: "Market", href: "#market" },
    { label: "Finance", href: "#finance" },
    { label: "About", href: "#about" },
  ]

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        backgroundColor: scrolled ? 'rgba(252, 251, 247, 0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(226, 221, 212, 0.8)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" style={{ cursor: 'none' }}>
          <div className="w-8 h-8 rounded-sm flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: '#0B5D3B' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="2.5" fill="white" opacity="0.9" />
              <circle cx="9" cy="9" r="5.5" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              <circle cx="9" cy="9" r="8" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>
          <div>
            <div className="font-display text-base font-bold leading-none" style={{ color: '#0B5D3B' }}>
              GramIntel
            </div>
            <div className="text-[9px] tracking-[0.15em] uppercase leading-none mt-0.5" style={{ color: '#6B6B6B' }}>
              Enterprise Intelligence
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#0B5D3B]"
              style={{ color: '#2C2C2C', cursor: 'none' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#analyze"
            className="px-5 py-2 text-sm font-semibold rounded-sm transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: '#0B5D3B',
              color: '#F7F5EF',
              cursor: 'none',
            }}
          >
            Analyze Business →
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 relative"
          style={{ cursor: 'none' }}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              className="block h-px w-full bg-[#2C2C2C] origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block h-px w-full bg-[#2C2C2C]"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              className="block h-px w-full bg-[#2C2C2C] origin-center"
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: 'rgba(252, 251, 247, 0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-4 border-t border-[#E2DDD4]">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                  className="text-base font-medium py-1" style={{ color: '#2C2C2C', cursor: 'none' }}>
                  {link.label}
                </a>
              ))}
              <a href="#analyze" onClick={() => setMenuOpen(false)}
                className="mt-2 px-5 py-3 text-sm font-semibold text-center rounded-sm"
                style={{ backgroundColor: '#0B5D3B', color: '#F7F5EF', cursor: 'none' }}>
                Analyze Business →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
