import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { SectionLabel } from "@/components/shared/utils"

const languages = [
  { name: 'हिन्दी', label: 'Hindi', insight: 'आपका बाजार, आपका अवसर' },
  { name: 'తెలుగు', label: 'Telugu', insight: 'మీ మార్కెట్, మీ అవకాశం' },
  { name: 'தமிழ்', label: 'Tamil', insight: 'உங்கள் சந்தை, உங்கள் வாய்ப்பு' },
  { name: 'ಕನ್ನಡ', label: 'Kannada', insight: 'ನಿಮ್ಮ ಮಾರುಕಟ್ಟೆ, ನಿಮ್ಮ ಅವಕಾಶ' },
  { name: 'मराठी', label: 'Marathi', insight: 'तुमचा बाजार, तुमची संधी' },
  { name: 'English', label: 'English', insight: 'Your market, your opportunity' },
]

export function MultilingualSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const [activeLang, setActiveLang] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActiveLang(prev => (prev + 1) % languages.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FCFBF7' }}
      id="languages"
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-6">
          <SectionLabel>Multilingual Intelligence</SectionLabel>
        </motion.div>

        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(32px,5vw,64px)] leading-[1.1] mb-12"
          style={{ color: '#1A1A1A' }}
        >
          Intelligence should speak <span className="italic" style={{ color: '#0B5D3B' }}>your language.</span>
        </motion.h2>

        {/* Rotating insight */}
        <div className="relative h-[120px] mb-10 flex items-center justify-center">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.label}
              initial={false}
              animate={{
                opacity: activeLang === i ? 1 : 0,
                y: activeLang === i ? 0 : 20,
                scale: activeLang === i ? 1 : 0.9,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute ${activeLang === i ? 'block' : 'pointer-events-none'}`}
            >
              <div className="font-display text-[clamp(28px,4vw,48px)] leading-tight" style={{ color: '#0B5D3B' }}>
                {lang.insight}
              </div>
              <div className="text-sm text-[#6B6B6B] mt-3 tracking-wide">{lang.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Language pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {languages.map((lang, i) => (
            <button
              key={lang.label}
              onClick={() => setActiveLang(i)}
              className={`px-5 py-2.5 rounded-sm text-lg font-display transition-all duration-300 border ${
                activeLang === i
                  ? 'text-white'
                  : 'text-[#5A5A5A] hover:text-[#0B5D3B]'
              }`}
              style={{
                backgroundColor: activeLang === i ? '#0B5D3B' : 'transparent',
                borderColor: activeLang === i ? '#0B5D3B' : '#E2DDD4',
                cursor: 'none',
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
