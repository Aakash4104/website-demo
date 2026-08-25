import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionLabel } from "@/components/shared/utils"

const gridNodes = Array.from({ length: 60 }, (_, i) => ({
  x: 50 + (i % 10) * 45 + Math.sin(i * 0.7) * 12,
  y: 40 + Math.floor(i / 10) * 42 + Math.cos(i * 0.5) * 10,
  inGap: i >= 22 && i <= 28,
}))

export function OpportunityDetection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#071A14' }}
      id="opportunity"
    >
      {/* Background radial glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200, 134, 10, 0.12) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-24 text-center w-full">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-6">
          <SectionLabel light>Opportunity Detection</SectionLabel>
        </motion.div>

        {/* Dense market visualization */}
        <div className="relative w-full max-w-[600px] mx-auto h-[280px] mb-8">
          <svg width="100%" height="100%" viewBox="0 0 500 280">
            {/* Grid lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 42} y1="0" x2={i * 42} y2="280"
                stroke="white" strokeWidth="0.2" opacity="0.05" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 42} x2="500" y2={i * 42}
                stroke="white" strokeWidth="0.2" opacity="0.05" />
            ))}

            {/* Muted nodes */}
            {gridNodes.map((node, i) => (
              <motion.circle
                key={i}
                cx={node.x} cy={node.y}
                r="3"
                fill={node.inGap ? '#C8860A' : 'rgba(255,255,255,0.15)'}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? {
                  scale: 1,
                  opacity: node.inGap ? 0.9 : 0.15
                } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.015 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            ))}

            {/* Highlight region */}
            <motion.ellipse
              cx="285" cy="160" rx="120" ry="80"
              fill="#C8860A" opacity="0"
              animate={inView ? { opacity: 0.06 } : {}}
              transition={{ delay: 1.2, duration: 1 }}
            />
            <motion.ellipse
              cx="285" cy="160" rx="80" ry="55"
              fill="none" stroke="#C8860A" strokeWidth="1" strokeDasharray="4 3"
              opacity="0"
              animate={inView ? { opacity: 0.4 } : {}}
              transition={{ delay: 1.5, duration: 0.8 }}
            />

            {/* Pulse on highlighted region */}
            {inView && [0, 1, 2].map(i => (
              <motion.circle
                key={i} cx="285" cy="160" r="20"
                fill="none" stroke="#C8860A" strokeWidth="1.5"
                animate={{ r: [20, 90], opacity: [0.6, 0] }}
                transition={{ duration: 2.5, delay: i * 0.8 + 1.5, repeat: Infinity }}
              />
            ))}
          </svg>
        </div>

        {/* Reveal text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block px-5 py-2 rounded-sm mb-6"
            style={{ backgroundColor: 'rgba(200, 134, 10, 0.15)', border: '1px solid rgba(200, 134, 10, 0.3)' }}>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: '#C8860A' }}>
              Underserved Market Detected
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(32px,5vw,64px)] leading-[1.1] text-white mb-4"
        >
          Value-added dairy products
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">Estimated Opportunity:</span>
            <span className="text-lg font-bold font-display" style={{ color: '#C8860A' }}>HIGH</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-white/20" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">Market Gap Score:</span>
            <span className="text-lg font-bold font-display text-white">87/100</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
