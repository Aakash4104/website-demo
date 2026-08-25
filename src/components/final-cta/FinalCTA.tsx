import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const closingLines = [
  'Understand your market.',
  'Understand your opportunity.',
  'Understand your finances.',
]

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#071A14' }}
      id="analyze"
    >
      {/* Converging geographic lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const startX = 600 + Math.cos(angle) * 700
          const startY = 400 + Math.sin(angle) * 500
          return (
            <motion.line
              key={i}
              x1={startX} y1={startY}
              x2="600" y2="400"
              stroke="#0B5D3B" strokeWidth="0.5"
              strokeDasharray="4 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          )
        })}
        {/* Convergence point pulses */}
        {inView && [0, 1, 2].map(i => (
          <motion.circle
            key={i} cx="600" cy="400" r="20"
            fill="none" stroke="#C8860A" strokeWidth="1"
            animate={{ r: [20, 120], opacity: [0.4, 0] }}
            transition={{ duration: 3, delay: i * 1, repeat: Infinity }}
          />
        ))}
      </svg>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200, 134, 10, 0.1) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center py-24">
        {/* Headline 1 */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            initial={{ y: '100%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(40px,7vw,96px)] leading-[1.05] text-white"
          >
            Don't start with a loan.
          </motion.h2>
        </div>

        {/* Headline 2 */}
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: '100%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(40px,7vw,96px)] leading-[1.05] italic font-light"
            style={{ color: '#C8860A' }}
          >
            Start with a decision.
          </motion.h2>
        </div>

        {/* Supporting lines */}
        <div className="space-y-2 mb-16">
          {closingLines.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
              className="text-[18px] md:text-[20px] text-white/50"
            >
              {line}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#"
            className="group inline-flex items-center gap-4 px-10 py-5 rounded-sm text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[#C8860A]/30 active:scale-95"
            style={{
              backgroundColor: '#C8860A',
              color: '#FFFFFF',
              cursor: 'none',
            }}
          >
            <span>Analyze My Business</span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl"
            >
              →
            </motion.span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.4 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-8 text-sm text-white/40"
        >
          Free analysis. No login required. Intelligence in your language.
        </motion.p>
      </div>
    </section>
  )
}
