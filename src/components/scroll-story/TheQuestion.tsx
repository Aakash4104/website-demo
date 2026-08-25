import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionLabel } from "@/components/shared/utils"

const words = [
  { text: "Before you borrow,", delay: 0 },
  { text: "understand", delay: 0.3 },
  { text: "what you're", delay: 0.5 },
  { text: "building.", delay: 0.7 },
]

export function TheQuestionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#071A14' }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="topo-dark" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="0.6" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo-dark)" />
        </svg>
      </div>

      {/* Glowing center light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(11, 93, 59, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12 py-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionLabel light>The Problem</SectionLabel>
        </motion.div>

        <div className="space-y-2">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: word.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span
                  className={`block font-display text-[clamp(36px,6vw,80px)] leading-[1.1] ${
                    i === 0 ? 'italic font-light text-white/60' :
                    i === 1 ? 'font-bold text-white' :
                    i === 2 ? 'italic font-light text-white/60' :
                    'font-bold'
                  }`}
                  style={{
                    color: i === 3 ? '#C8860A' : undefined,
                  }}
                >
                  {word.text}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-12 text-[18px] leading-relaxed max-w-[540px] mx-auto"
          style={{ color: 'rgba(247, 245, 239, 0.5)' }}
        >
          Millions of rural entrepreneurs take on significant financial risk with incomplete, often zero, market intelligence. GramIntel changes that.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 h-px max-w-[120px] mx-auto"
          style={{ backgroundColor: '#C8860A', transformOrigin: 'left' }}
        />
      </div>
    </section>
  )
}

// ---- PROBLEM → INTELLIGENCE (Sticky Scroll) ----

function ScatterData({ progress }: { progress: number }) {
  const dots = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: 20 + Math.sin(i * 2.3) * 35 + Math.cos(i * 1.7) * 25,
    y: 20 + Math.cos(i * 1.9) * 35 + Math.sin(i * 2.1) * 25,
    color: i < 8 ? '#C8860A' : i < 16 ? '#0B5D3B' : i < 24 ? '#6B8F71' : '#2C4A38',
    size: 3 + Math.sin(i) * 1.5,
    category: i % 4,
  }))

  // Organized positions for high progress
  const organized = [
    { x: 30, y: 50 }, { x: 25, y: 35 }, { x: 35, y: 65 }, { x: 20, y: 55 },
    { x: 28, y: 42 }, { x: 32, y: 60 }, { x: 22, y: 45 }, { x: 38, y: 55 },
    { x: 65, y: 30 }, { x: 70, y: 45 }, { x: 60, y: 40 }, { x: 75, y: 35 },
    { x: 62, y: 55 }, { x: 68, y: 25 }, { x: 72, y: 50 }, { x: 58, y: 45 },
    { x: 50, y: 65 }, { x: 45, y: 75 }, { x: 55, y: 70 }, { x: 48, y: 80 },
    { x: 52, y: 60 }, { x: 42, y: 68 }, { x: 58, y: 78 }, { x: 46, y: 72 },
    { x: 80, y: 65 }, { x: 85, y: 55 }, { x: 78, y: 75 }, { x: 82, y: 70 },
    { x: 88, y: 60 }, { x: 76, y: 68 }, { x: 84, y: 78 }, { x: 90, y: 65 },
    { x: 50, y: 20 }, { x: 45, y: 12 }, { x: 55, y: 15 }, { x: 48, y: 25 },
    { x: 52, y: 10 }, { x: 42, y: 18 }, { x: 58, y: 22 }, { x: 46, y: 8 },
  ]

  const isOrganized = progress > 0.5
  const showOpportunity = progress > 0.8

  return (
    <div className="relative w-full h-[400px]">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Cluster labels */}
        {isOrganized && (
          <>
            {['Consumers', 'Competitors', 'Markets', 'Suppliers', 'Demand'].map((label, i) => {
              const positions = [
                { x: 28, y: 28 }, { x: 67, y: 20 }, { x: 50, y: 88 },
                { x: 82, y: 48 }, { x: 50, y: 5 },
              ]
              return (
                <motion.text
                  key={label}
                  x={positions[i].x} y={positions[i].y}
                  textAnchor="middle" fontSize="4"
                  fill={i === 1 ? '#C8860A' : '#0B5D3B'}
                  fontFamily="Inter, sans-serif"
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {label}
                </motion.text>
              )
            })}
          </>
        )}

        {/* Opportunity highlight */}
        {showOpportunity && (
          <motion.circle
            cx="35" cy="35" r="18"
            fill="#C8860A" opacity="0"
            animate={{ opacity: 0.1, r: [15, 18] }}
            transition={{ duration: 0.8 }}
          />
        )}

        {dots.map((dot, i) => {
          const target = organized[i]
          const tx = isOrganized ? target.x : dot.x
          const ty = isOrganized ? target.y : dot.y

          return (
            <motion.circle
              key={dot.id}
              r={dot.size * 0.35}
              fill={dot.color}
              opacity={0.7}
              animate={{ cx: tx, cy: ty }}
              transition={{ duration: 0.8, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
            />
          )
        })}

        {/* Decision signal */}
        {showOpportunity && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <circle cx="35" cy="35" r="4" fill="#C8860A" />
            <text x="35" y="48" textAnchor="middle" fontSize="4"
              fill="#C8860A" fontFamily="Inter" fontWeight="700">
              OPPORTUNITY
            </text>
          </motion.g>
        )}
      </svg>

      {showOpportunity && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute top-4 right-4 px-3 py-2 rounded-sm text-[11px] font-bold tracking-wider"
          style={{ backgroundColor: '#0B5D3B', color: '#F7F5EF' }}
        >
          DECISION SIGNAL FOUND
        </motion.div>
      )}
    </div>
  )
}

export function ProblemIntelligenceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  const stages = [
    { label: "01", title: "Scattered Data", desc: "Entrepreneurs rely on word-of-mouth, guesswork, gut instinct. No structured intelligence." },
    { label: "02", title: "Market Signals", desc: "We scan hyper-local economic data. Consumer density, footfall, competitor activity, pricing signals." },
    { label: "03", title: "Intelligence Emerges", desc: "Patterns become visible. Gaps surface. Opportunities crystallize from the noise." },
    { label: "04", title: "Decision Signal", desc: "A clear, actionable intelligence report. Your market, your numbers, your opportunity." },
  ]

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#F7F5EF' }}
      id="intelligence"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left - Statement */}
          <div className="sticky top-32 self-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <SectionLabel>The Intelligence Gap</SectionLabel>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(32px,4vw,52px)] leading-[1.15]"
                style={{ color: '#1A1A1A' }}
              >
                Rural entrepreneurs make{' '}
                <span style={{ color: '#0B5D3B' }} className="italic">billion-rupee decisions</span>{' '}
                with almost no local data.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[17px] leading-relaxed mb-10"
              style={{ color: '#5A5A5A' }}
            >
              The information asymmetry between urban and rural entrepreneurs is enormous. GramIntel bridges that gap with hyperlocal AI intelligence.
            </motion.p>

            <div className="space-y-0">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="flex gap-4 py-4 border-b border-[#E2DDD4] last:border-0"
                >
                  <span className="text-[11px] font-bold tracking-wider mt-0.5" style={{ color: '#C8860A' }}>
                    {stage.label}
                  </span>
                  <div>
                    <div className="text-sm font-semibold mb-1" style={{ color: '#1A1A1A' }}>{stage.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>{stage.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-lg border border-[#E2DDD4] overflow-hidden"
              style={{ backgroundColor: '#FFFFFF' }}>
              <div className="px-5 py-4 border-b border-[#E2DDD4] flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E2DDD4]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E2DDD4]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E2DDD4]" />
                <span className="ml-2 text-[11px] text-[#6B6B6B] tracking-wide">MARKET INTELLIGENCE ENGINE</span>
              </div>
              <div className="p-6">
                <ScatterData progress={inView ? 1 : 0} />
              </div>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Data Sources', value: '47' },
                    { label: 'Market Signals', value: '832' },
                    { label: 'Accuracy', value: '98%' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-sm"
                      style={{ backgroundColor: '#F7F5EF' }}>
                      <div className="text-xl font-bold font-display" style={{ color: '#0B5D3B' }}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-[#6B6B6B] tracking-wide mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
