import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { SectionLabel } from "@/components/shared/utils"

// SVG Map Visualization
function HeroMap({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2400),
      setTimeout(() => setPhase(5), 3000),
      setTimeout(() => setPhase(6), 3600),
      setTimeout(() => setPhase(7), 4000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const cx = 220
  const cy = 220
  const nodes = [
    { id: 'consumers', x: 130, y: 110, label: 'Consumers', r: 6, color: '#6B8F71' },
    { id: 'suppliers', x: 310, y: 100, label: 'Suppliers', r: 5, color: '#8B6914' },
    { id: 'competitors', x: 350, y: 220, label: 'Competitors', r: 7, color: '#C8860A' },
    { id: 'transport', x: 300, y: 330, label: 'Transport', r: 5, color: '#6B8F71' },
    { id: 'markets', x: 130, y: 320, label: 'Markets', r: 6, color: '#0B5D3B' },
    { id: 'demand', x: 90, y: 200, label: 'Demand', r: 5, color: '#C8860A' },
  ]

  const parallaxX = (mouseX - 0.5) * 12
  const parallaxY = (mouseY - 0.5) * 8

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background grid dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.3 : 0 }}
        transition={{ duration: 1.5 }}
        style={{ transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)` }}
        className="absolute inset-0"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="0.8" fill="#0B5D3B" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Topographic lines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.15 : 0 }}
        transition={{ duration: 2 }}
        style={{ transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)` }}
        className="absolute inset-0"
      >
        <svg width="100%" height="100%" viewBox="0 0 440 440">
          {[80, 110, 145, 180, 215].map((r, i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.7}
              fill="none" stroke="#0B5D3B" strokeWidth="0.5"
              strokeDasharray={`${6 - i} 4`} opacity={0.4} />
          ))}
        </svg>
      </motion.div>

      {/* Main visualization SVG */}
      <motion.div
        style={{
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
          width: '440px', height: '440px', position: 'absolute'
        }}
      >
        <svg width="440" height="440" viewBox="0 0 440 440">
          {/* Radius rings */}
          {[60, 100, 140].map((r, i) => (
            <motion.circle
              key={i} cx={cx} cy={cy} r={r}
              fill="none"
              stroke={i === 2 ? '#0B5D3B' : '#0B5D3B'}
              strokeWidth={i === 2 ? 0.8 : 0.5}
              opacity={i === 2 ? 0.3 : 0.15}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: phase >= 3 ? 1 : 0,
                opacity: phase >= 3 ? (i === 2 ? 0.3 : 0.15) : 0
              }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* Connection paths */}
          {phase >= 4 && nodes.map((node, i) => {
            return (
              <motion.path
                key={node.id}
                d={`M ${cx} ${cy} L ${node.x} ${node.y}`}
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                opacity="0.4"
                strokeDasharray="4 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
              />
            )
          })}

          {/* Data nodes */}
          {phase >= 5 && nodes.map((node, i) => (
            <g key={node.id}>
              <motion.circle
                cx={node.x} cy={node.y} r={node.r * 2}
                fill={node.color} opacity="0"
                animate={{ opacity: [0, 0.15, 0] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.circle
                cx={node.x} cy={node.y} r={node.r}
                fill={node.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.85 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              <motion.text
                x={node.x + (node.x > cx ? 10 : -10)} y={node.y + 4}
                textAnchor={node.x > cx ? 'start' : 'end'}
                fontSize="9" fill="#2C2C2C" fontFamily="Inter, sans-serif"
                opacity="0"
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
              >
                {node.label}
              </motion.text>
            </g>
          ))}

          {/* Demand signals */}
          {phase >= 6 && (
            <>
              <motion.circle
                cx={cx} cy={cy} r="70"
                fill="none" stroke="#C8860A" strokeWidth="1.5" opacity="0.4"
                strokeDasharray="6 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.6 }}
              />
              {[0, 1, 2].map(i => (
                <motion.circle
                  key={i} cx={cx} cy={cy} r="20"
                  fill="#C8860A" opacity="0"
                  animate={{ r: [20, 80], opacity: [0.4, 0] }}
                  transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
            </>
          )}

          {/* Center village marker */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase >= 2 ? 1 : 0, opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <circle cx={cx} cy={cy} r="14" fill="#0B5D3B" opacity="0.12" />
            <circle cx={cx} cy={cy} r="7" fill="#0B5D3B" opacity="0.9" />
            <circle cx={cx} cy={cy} r="3" fill="white" />
            {phase >= 2 && [0, 1].map(i => (
              <motion.circle
                key={i} cx={cx} cy={cy} r="7"
                fill="none" stroke="#0B5D3B" strokeWidth="1.5"
                animate={{ r: [7, 35], opacity: [0.6, 0] }}
                transition={{ duration: 2, delay: i * 1, repeat: Infinity }}
              />
            ))}
          </motion.g>

          {/* "Opportunity Detected" badge */}
          {phase >= 7 && (
            <motion.g
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <rect x={cx - 75} y={cy + 155} width="150" height="26" rx="4"
                fill="#0B5D3B" />
              <text x={cx} y={cy + 173} textAnchor="middle"
                fontSize="10" fontWeight="600" fill="white" fontFamily="Inter, sans-serif"
                letterSpacing="0.08em">
                OPPORTUNITY DETECTED
              </text>
              <circle cx={cx - 58} cy={cy + 168} r="3" fill="#C8860A" />
              <circle cx={cx - 58} cy={cy + 168} r="6" fill="#C8860A" opacity="0.3" />
            </motion.g>
          )}
        </svg>
      </motion.div>

      {/* Stats overlay */}
      {phase >= 7 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-6 right-0 flex flex-col gap-2"
        >
          {[
            { label: 'Market Radius', value: '10 KM' },
            { label: 'Data Points', value: '847' },
            { label: 'Competitors', value: '12' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/80 backdrop-blur-sm border border-[#E2DDD4] rounded-sm px-3 py-1.5 text-right">
              <div className="text-[10px] text-[#6B6B6B] tracking-wide">{stat.label}</div>
              <div className="text-sm font-semibold text-[#0B5D3B] font-display">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

// Word-by-word headline animation
function AnimatedHeadline() {
  const lines = [
    { text: "Turn Local", style: "italic" },
    { text: "Opportunity", style: "normal" },
    { text: "Into a Sustainable", style: "small" },
    { text: "Business.", style: "accent" },
  ]

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.4 + i * 0.18,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <span
              className={`font-display block leading-[1.1] ${
                line.style === 'italic' ? 'italic font-light' :
                line.style === 'small' ? 'text-[0.65em] font-normal not-italic' :
                line.style === 'accent' ? 'font-bold' :
                'font-bold'
              }`}
              style={{
                fontSize: line.style === 'small' ? undefined : undefined,
                color: line.style === 'accent' ? '#0B5D3B' : '#1A1A1A',
              }}
            >
              {line.text}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#FCFBF7' }}
    >
      {/* Background topo pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="topo" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="0.5" fill="#0B5D3B" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      {/* Subtle gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(11, 93, 59, 0.06) 0%, transparent 60%)`,
          transition: 'background 0.4s ease',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-6rem)]">

          {/* LEFT - Content */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3">
                <div className="w-6 h-px" style={{ backgroundColor: '#0B5D3B' }} />
                <SectionLabel>AI for Grassroots Entrepreneurship</SectionLabel>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="mb-8 text-[clamp(52px,7vw,96px)]">
              <AnimatedHeadline />
            </div>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="text-[18px] leading-relaxed mb-10 max-w-[440px]"
              style={{ color: '#5A5A5A' }}
            >
              Hyper-local enterprise intelligence for rural India. Understand your market, your competition, your opportunity — before you borrow a single rupee.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#analyze"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#0B5D3B]/20 active:scale-95"
                style={{
                  backgroundColor: '#0B5D3B',
                  color: '#F7F5EF',
                  cursor: 'none',
                }}
              >
                <span>Analyze My Business</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
              <a
                href="#intelligence"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#0B5D3B]"
                style={{ color: '#5A5A5A', cursor: 'none' }}
              >
                <span>See How It Works</span>
                <span>↓</span>
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-12 pt-8 border-t border-[#E2DDD4] flex items-center gap-8"
            >
              {[
                { value: '847+', label: 'Data Points Per Location' },
                { value: '22', label: 'Indian States Covered' },
                { value: '98%', label: 'Decision Accuracy' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold font-display" style={{ color: '#0B5D3B' }}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[#6B6B6B] tracking-wide mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT - Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center h-[480px] lg:h-auto lg:min-h-[540px]"
          >
            <div className="w-full h-[480px] lg:h-[560px]">
              <HeroMap mouseX={mousePos.x} mouseY={mousePos.y} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#6B6B6B' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, #0B5D3B, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
