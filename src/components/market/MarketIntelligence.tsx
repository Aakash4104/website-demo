import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionLabel, AnimatedNumber } from "@/components/shared/utils"

interface MapPoint {
  x: number
  y: number
  type: 'consumer' | 'competitor' | 'supplier' | 'market' | 'transport'
}

const pointTypes: Record<string, { color: string; label: string }> = {
  consumer: { color: '#6B8F71', label: 'Consumer' },
  competitor: { color: '#C8860A', label: 'Competitor' },
  supplier: { color: '#8B6914', label: 'Supplier' },
  market: { color: '#0B5D3B', label: 'Market' },
  transport: { color: '#6B8F71', label: 'Transport' },
}

const points: MapPoint[] = [
  { x: 180, y: 120, type: 'consumer' }, { x: 220, y: 100, type: 'consumer' },
  { x: 250, y: 140, type: 'consumer' }, { x: 300, y: 110, type: 'consumer' },
  { x: 350, y: 150, type: 'consumer' }, { x: 160, y: 180, type: 'consumer' },
  { x: 280, y: 90, type: 'competitor' }, { x: 320, y: 130, type: 'competitor' },
  { x: 380, y: 100, type: 'competitor' }, { x: 420, y: 140, type: 'competitor' },
  { x: 200, y: 220, type: 'competitor' }, { x: 340, y: 200, type: 'competitor' },
  { x: 400, y: 250, type: 'competitor' }, { x: 250, y: 260, type: 'competitor' },
  { x: 150, y: 250, type: 'supplier' }, { x: 180, y: 290, type: 'supplier' },
  { x: 380, y: 300, type: 'supplier' }, { x: 420, y: 280, type: 'supplier' },
  { x: 300, y: 320, type: 'market' }, { x: 350, y: 340, type: 'market' },
  { x: 200, y: 350, type: 'market' }, { x: 270, y: 380, type: 'market' },
  { x: 120, y: 200, type: 'transport' }, { x: 440, y: 200, type: 'transport' },
  { x: 280, y: 420, type: 'transport' },
]

export function MarketIntelligence() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  const legendItems = [
    { type: 'consumer', count: 124 },
    { type: 'competitor', count: 12 },
    { type: 'supplier', count: 8 },
    { type: 'market', count: 5 },
    { type: 'transport', count: 3 },
  ]

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#071A14' }}
      id="market"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-4">
            <SectionLabel light>Market Intelligence</SectionLabel>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(36px,5vw,64px)] leading-[1.05] text-white"
            >
              Your village is <span className="italic font-light" style={{ color: '#C8860A' }}>your market.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : {}}
              transition={{ delay: 0.3 }}
              className="text-[17px] leading-relaxed text-white/60"
            >
              Understand the economic signals around you. Every consumer, competitor, supplier and market within a 10 km radius — mapped, measured, and analyzed.
            </motion.p>
          </div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-lg overflow-hidden border border-white/10"
          style={{ backgroundColor: 'rgba(11, 26, 20, 0.6)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
            {/* Map canvas */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[500px]">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-[0.08]">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="market-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#market-grid)" />
                </svg>
              </div>

              {/* Topographic rings */}
              <svg width="100%" height="100%" viewBox="0 0 560 460" className="absolute inset-0">
                {[80, 130, 180].map((r, i) => (
                  <motion.circle
                    key={i}
                    cx="280" cy="230" r={r}
                    fill="none" stroke="#0B5D3B" strokeWidth="0.5"
                    strokeDasharray="4 4" opacity="0.2"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: '280px 230px' }}
                  />
                ))}

                {/* Radius labels */}
                <text x="280" y="150" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="Inter">5 KM</text>
                <text x="280" y="100" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="Inter">8 KM</text>
                <text x="280" y="50" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="Inter">10 KM</text>

                {/* Center marker */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ transformOrigin: '280px 230px' }}
                >
                  <circle cx="280" cy="230" r="12" fill="#0B5D3B" opacity="0.15" />
                  <circle cx="280" cy="230" r="6" fill="#0B5D3B" />
                  <circle cx="280" cy="230" r="2.5" fill="white" />
                  {[0, 1].map(i => (
                    <motion.circle
                      key={i} cx="280" cy="230" r="6"
                      fill="none" stroke="#0B5D3B" strokeWidth="1.5"
                      animate={{ r: [6, 30], opacity: [0.6, 0] }}
                      transition={{ duration: 2, delay: i * 1, repeat: Infinity }}
                    />
                  ))}
                </motion.g>

                {/* Data points */}
                {points.map((p, i) => {
                  const info = pointTypes[p.type]
                  return (
                    <motion.g key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 0.8 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                    >
                      <circle cx={p.x} cy={p.y} r="5" fill={info.color} opacity="0.1" />
                      <circle cx={p.x} cy={p.y} r="3" fill={info.color} opacity="0.85" />
                    </motion.g>
                  )
                })}

                {/* Connection lines from center */}
                {points.filter((_, i) => i % 3 === 0).map((p, i) => (
                  <motion.line
                    key={i}
                    x1="280" y1="230" x2={p.x} y2={p.y}
                    stroke={pointTypes[p.type].color} strokeWidth="0.5" opacity="0.2"
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.05 }}
                  />
                ))}
              </svg>
            </div>

            {/* Legend sidebar */}
            <div className="p-6 border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-5">
                10 KM Market Radius
              </div>
              <div className="space-y-4">
                {legendItems.map((item) => {
                  const info = pointTypes[item.type]
                  return (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: info.color }} />
                        <span className="text-sm text-white/80">{info.label}s</span>
                      </div>
                      <span className="text-sm font-bold font-display" style={{ color: info.color }}>
                        {item.count}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-3">
                  Market Potential
                </div>
                <div className="text-3xl font-bold font-display text-white mb-1">
                  <AnimatedNumber value={42} suffix="L" prefix="₹" />
                </div>
                <div className="text-xs text-white/40">Annual estimated revenue</div>
              </div>

              <div className="mt-6 p-4 rounded-sm" style={{ backgroundColor: 'rgba(200, 134, 10, 0.1)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#C8860A' }} />
                  <span className="text-[10px] font-bold tracking-wider" style={{ color: '#C8860A' }}>
                    UNDERSERVED GAP
                  </span>
                </div>
                <div className="text-sm text-white/80">Value-added dairy products</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
