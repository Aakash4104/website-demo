import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { SectionLabel } from "@/components/shared/utils"

const stages = [
  {
    id: '01',
    title: 'Location',
    subtitle: 'Your Coordinates',
    desc: 'A precise GPS pin. Village, district, state. The intelligence begins here.',
    visual: 'location',
    color: '#0B5D3B',
  },
  {
    id: '02',
    title: 'Market',
    subtitle: 'Consumer Analysis',
    desc: 'Population density, income levels, purchasing power, consumer behavior in your 10km radius.',
    visual: 'market',
    color: '#6B8F71',
  },
  {
    id: '03',
    title: 'Competition',
    subtitle: 'Business Landscape',
    desc: 'Every registered business near you. Categories, density, gaps. Who is serving what.',
    visual: 'competition',
    color: '#C8860A',
  },
  {
    id: '04',
    title: 'Opportunity',
    subtitle: 'Gap Detection',
    desc: 'Where demand meets underservice. The exact intersection of need and absence.',
    visual: 'opportunity',
    color: '#0B5D3B',
  },
  {
    id: '05',
    title: 'Finance',
    subtitle: 'Viability & Funding',
    desc: 'Loan eligibility, scheme matching, repayment simulation. Full financial picture.',
    visual: 'finance',
    color: '#8B6914',
  },
]

function StageVisual({ stage, active }: { stage: typeof stages[0]; active: boolean }) {
  if (stage.visual === 'location') {
    return (
      <svg viewBox="0 0 200 200" width="200" height="200">
        <circle cx="100" cy="100" r="3" fill="#0B5D3B" opacity={active ? 1 : 0.3} />
        {[20, 40, 60, 80].map((r, i) => (
          <motion.circle key={i} cx="100" cy="100" r={r}
            fill="none" stroke="#0B5D3B" strokeWidth="0.5"
            strokeDasharray="4 3"
            opacity={active ? 0.2 + i * 0.1 : 0.05}
            animate={active ? { rotate: i % 2 === 0 ? 360 : -360 } : {}}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '100px 100px' }}
          />
        ))}
        {active && (
          <motion.circle cx="100" cy="100" r="10"
            fill="#0B5D3B"
            animate={{ r: [8, 25], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <circle cx="100" cy="100" r="5" fill="#0B5D3B" opacity={active ? 0.9 : 0.2} />
        <circle cx="100" cy="100" r="2" fill="white" />
        {active && (
          <motion.text x="100" y="130" textAnchor="middle" fontSize="9"
            fill="#0B5D3B" fontFamily="Inter" fontWeight="600" letterSpacing="0.1em"
            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.5 }}>
            LOCATION CONFIRMED
          </motion.text>
        )}
      </svg>
    )
  }

  if (stage.visual === 'market') {
    const consumers = Array.from({ length: 24 }, (_, i) => ({
      x: 100 + Math.cos(i * Math.PI * 2 / 24) * (40 + Math.sin(i * 2.1) * 20),
      y: 100 + Math.sin(i * Math.PI * 2 / 24) * (40 + Math.cos(i * 1.7) * 20),
    }))
    return (
      <svg viewBox="0 0 200 200" width="200" height="200">
        <circle cx="100" cy="100" r="65" fill="none" stroke="#6B8F71" strokeWidth="0.5"
          strokeDasharray="3 3" opacity={active ? 0.4 : 0.1} />
        {consumers.map((c, i) => (
          <motion.circle key={i} cx={c.x} cy={c.y} r="2.5"
            fill="#6B8F71" opacity={active ? 0.6 : 0.1}
            initial={{ scale: 0 }}
            animate={active ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            style={{ transformOrigin: `${c.x}px ${c.y}px` }}
          />
        ))}
        <circle cx="100" cy="100" r="4" fill="#6B8F71" opacity={active ? 0.9 : 0.2} />
        {active && (
          <motion.text x="100" y="130" textAnchor="middle" fontSize="9"
            fill="#6B8F71" fontFamily="Inter" fontWeight="600"
            initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1 }}>
            12,400 CONSUMERS
          </motion.text>
        )}
      </svg>
    )
  }

  if (stage.visual === 'competition') {
    const businesses = [
      { x: 75, y: 65, r: 5, label: 'Retail' },
      { x: 130, y: 75, r: 4, label: 'Dairy' },
      { x: 60, y: 120, r: 6, label: 'Food' },
      { x: 140, y: 130, r: 4, label: 'Services' },
      { x: 100, y: 145, r: 5, label: 'Farm' },
      { x: 85, y: 85, r: 3, label: '' },
      { x: 118, y: 108, r: 3, label: '' },
    ]
    return (
      <svg viewBox="0 0 200 200" width="200" height="200">
        <circle cx="100" cy="100" r="65" fill="none" stroke="#C8860A" strokeWidth="0.5"
          strokeDasharray="3 3" opacity={active ? 0.3 : 0.1} />
        {businesses.map((b, i) => (
          <motion.g key={i}
            initial={{ scale: 0 }}
            animate={active ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${b.x}px ${b.y}px` }}
          >
            <circle cx={b.x} cy={b.y} r={b.r + 3} fill="#C8860A" opacity="0.1" />
            <circle cx={b.x} cy={b.y} r={b.r} fill="#C8860A" opacity="0.7" />
            {b.label && (
              <text x={b.x} y={b.y - b.r - 4} textAnchor="middle" fontSize="7"
                fill="#8B6914" fontFamily="Inter">{b.label}</text>
            )}
          </motion.g>
        ))}
        <circle cx="100" cy="100" r="4" fill="#0B5D3B" />
        <circle cx="100" cy="100" r="2" fill="white" />
      </svg>
    )
  }

  if (stage.visual === 'opportunity') {
    return (
      <svg viewBox="0 0 200 200" width="200" height="200">
        <circle cx="100" cy="100" r="65" fill="none" stroke="#0B5D3B" strokeWidth="0.5"
          opacity={active ? 0.3 : 0.1} />
        {active && (
          <>
            <motion.circle cx="65" cy="75" r="22" fill="#0B5D3B" opacity="0.08"
              animate={{ r: [20, 24] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }} />
            <motion.circle cx="65" cy="75" r="12" fill="#0B5D3B" opacity="0.25"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} />
            <motion.text x="65" y="110" textAnchor="middle" fontSize="8"
              fill="#0B5D3B" fontFamily="Inter" fontWeight="700"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              GAP DETECTED
            </motion.text>
            {[0, 1, 2].map(i => (
              <motion.circle key={i} cx="65" cy="75" r="10"
                fill="none" stroke="#C8860A" strokeWidth="1.5"
                animate={{ r: [10, 30], opacity: [0.8, 0] }}
                transition={{ duration: 2, delay: i * 0.7, repeat: Infinity }}
              />
            ))}
          </>
        )}
        <circle cx="100" cy="100" r="4" fill="#0B5D3B" />
        <circle cx="100" cy="100" r="2" fill="white" />
      </svg>
    )
  }

  if (stage.visual === 'finance') {
    return (
      <svg viewBox="0 0 200 200" width="200" height="200">
        {active && (
          <>
            <motion.rect x="60" y="90" width="80" height="40" rx="4"
              fill="#8B6914" opacity="0.15"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: '100px 130px' }}
            />
            <motion.rect x="60" y="90" width="80" height="40" rx="4"
              fill="none" stroke="#8B6914" strokeWidth="1"
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3 }}
            />
            <motion.text x="100" y="115" textAnchor="middle" fontSize="10"
              fill="#8B6914" fontFamily="Inter" fontWeight="700"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              ₹9,00,000
            </motion.text>
            <motion.text x="100" y="127" textAnchor="middle" fontSize="7"
              fill="#8B6914" fontFamily="Inter"
              initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.7 }}>
              LOAN ELIGIBLE
            </motion.text>
            {[{ x: 100, y: 65, label: 'SAFE' }].map(badge => (
              <motion.g key={badge.label}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                style={{ transformOrigin: `${badge.x}px ${badge.y}px` }}
              >
                <circle cx={badge.x} cy={badge.y} r="16" fill="#0B5D3B" opacity="0.15" />
                <circle cx={badge.x} cy={badge.y} r="12" fill="#0B5D3B" opacity="0.8" />
                <text x={badge.x} y={badge.y + 4} textAnchor="middle" fontSize="8"
                  fill="white" fontFamily="Inter" fontWeight="700">{badge.label}</text>
              </motion.g>
            ))}
          </>
        )}
        <circle cx="100" cy="100" r="4" fill="#0B5D3B" />
        <circle cx="100" cy="100" r="2" fill="white" />
      </svg>
    )
  }

  return null
}

export function HowGramIntelThinks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const [activeStage, setActiveStage] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % stages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#071A14' }}
      id="how-it-works"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid-dark" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="0.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dark)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="mb-4"
            >
              <SectionLabel light>How GramIntel Thinks</SectionLabel>
            </motion.div>
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(36px,5vw,64px)] leading-[1.1] text-white"
            >
              From a location,<br />
              <span className="italic font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>to a decision.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.6 } : {}}
            transition={{ delay: 0.3 }}
            className="text-[15px] leading-relaxed max-w-[320px] text-white/60"
          >
            A structured intelligence journey — 5 stages that transform raw coordinates into a confident business decision.
          </motion.p>
        </div>

        {/* Stage tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {stages.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(i)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 border ${
                activeStage === i
                  ? 'border-[#C8860A] text-white'
                  : 'border-white/10 text-white/40 hover:text-white/60'
              }`}
              style={{
                backgroundColor: activeStage === i ? 'rgba(200, 134, 10, 0.1)' : 'transparent',
                cursor: 'none',
              }}
            >
              <span className="text-[10px] font-bold tracking-wider"
                style={{ color: activeStage === i ? '#C8860A' : 'inherit' }}>
                {stage.id}
              </span>
              <span>{stage.title}</span>
            </button>
          ))}
        </div>

        {/* Main stage display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {stages.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={false}
                animate={{ opacity: activeStage === i ? 1 : 0, y: activeStage === i ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className={activeStage === i ? 'block' : 'hidden'}
              >
                <div className="mb-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: stage.color }}>
                    STAGE {stage.id} — {stage.subtitle}
                  </span>
                </div>
                <h3 className="font-display text-[clamp(40px,6vw,72px)] leading-none text-white mb-6">
                  {stage.title}
                </h3>
                <p className="text-[18px] leading-relaxed text-white/60 max-w-[440px]">
                  {stage.desc}
                </p>

                {/* Progress indicator */}
                <div className="mt-10 flex items-center gap-2">
                  {stages.map((_, j) => (
                    <div
                      key={j}
                      className="h-px transition-all duration-500"
                      style={{
                        width: j === activeStage ? '40px' : '16px',
                        backgroundColor: j === activeStage ? '#C8860A' : 'rgba(255,255,255,0.2)',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual */}
          <div className="flex items-center justify-center">
            <div
              className="relative w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at center, rgba(11, 93, 59, 0.15) 0%, transparent 70%)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  initial={false}
                  animate={{ opacity: activeStage === i ? 1 : 0, scale: activeStage === i ? 1 : 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 flex items-center justify-center ${activeStage === i ? '' : 'pointer-events-none'}`}
                >
                  <StageVisual stage={stage} active={activeStage === i} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
