import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionLabel, AnimatedNumber } from "@/components/shared/utils"

const metrics = [
  { label: 'Market Demand', value: 82, color: '#0B5D3B' },
  { label: 'Competition', value: 61, color: '#C8860A' },
  { label: 'Pricing', value: 72, color: '#6B8F71' },
  { label: 'Supply', value: 79, color: '#0B5D3B' },
  { label: 'Financial Fit', value: 81, color: '#8B6914' },
  { label: 'Risk', value: 52, color: '#C8860A' },
]

function RadialGauge({ value, color, label, delay }: { value: number; color: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-5% 0px" })
  const circumference = 2 * Math.PI * 38
  const offset = circumference - (value / 100) * circumference

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          <circle cx="48" cy="48" r="38" fill="none" stroke="#E2DDD4" strokeWidth="3" opacity="0.5" />
          <motion.circle
            cx="48" cy="48" r="38"
            fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold font-display" style={{ color }}>
            <AnimatedNumber value={value} duration={1.5} />
          </span>
        </div>
      </div>
      <div className="text-xs text-[#5A5A5A] mt-2 text-center">{label}</div>
    </div>
  )
}

export function ViabilityScore() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#F7F5EF' }}
      id="viability"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-8 text-center">
          <SectionLabel>Business Viability Score</SectionLabel>
        </motion.div>

        {/* Huge score */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(11, 93, 59, 0.08) 0%, transparent 60%)' }} />
            </div>
            <div className="relative">
              <div className="font-display text-[clamp(120px,20vw,240px)] leading-none font-bold"
                style={{ color: '#0B5D3B' }}>
                <AnimatedNumber value={78} duration={2} />
              </div>
              <div className="absolute top-0 right-0 -translate-x-4 translate-y-4">
                <span className="text-2xl font-display text-[#6B6B6B]">/ 100</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-sm text-sm font-bold tracking-wide"
              style={{ backgroundColor: 'rgba(11, 93, 59, 0.1)', color: '#0B5D3B' }}>
              GOOD POTENTIAL
            </span>
          </motion.div>
        </div>

        {/* Metric gauges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
            >
              <RadialGauge value={metric.value} color={metric.color} label={metric.label} delay={0.8 + i * 0.1} />
            </motion.div>
          ))}
        </div>

        {/* Analysis note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-16 max-w-[600px] mx-auto text-center"
        >
          <p className="text-[16px] leading-relaxed" style={{ color: '#5A5A5A' }}>
            Our AI engine synthesizes 847 data points into a single, actionable score — combining market demand, competitive density, pricing power, supply reliability, financial fit, and risk exposure.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
