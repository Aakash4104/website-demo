import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { SectionLabel } from "@/components/shared/utils"

const competitorData = [
  { name: 'Sharma General Store', type: 'Retail', distance: '0.8 km', x: 200, y: 180 },
  { name: 'Patel Dairy', type: 'Dairy', distance: '1.2 km', x: 320, y: 140 },
  { name: 'Krishna Kirana', type: 'Retail', distance: '1.5 km', x: 150, y: 280 },
  { name: 'Reddy Foods', type: 'Food', distance: '2.0 km', x: 380, y: 220 },
  { name: 'Lakshmi Services', type: 'Services', distance: '2.3 km', x: 250, y: 340 },
  { name: 'Singh Mart', type: 'Retail', distance: '2.8 km', x: 420, y: 160 },
  { name: 'Ganesh Dairy', type: 'Dairy', distance: '3.1 km', x: 180, y: 360 },
  { name: 'Sai Provision', type: 'Retail', distance: '3.5 km', x: 340, y: 300 },
  { name: 'Murthy Bakery', type: 'Food', distance: '3.8 km', x: 280, y: 200 },
  { name: 'Yadav Agri', type: 'Services', distance: '4.0 km', x: 400, y: 340 },
  { name: 'Bharat Stores', type: 'Retail', distance: '4.2 km', x: 220, y: 240 },
  { name: 'Vinayak Dairy', type: 'Dairy', distance: '4.5 km', x: 360, y: 260 },
]

const typeColors: Record<string, string> = {
  Retail: '#0B5D3B',
  Dairy: '#C8860A',
  Food: '#6B8F71',
  Services: '#8B6914',
}

export function CompetitorMap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= competitorData.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 200)
    return () => clearInterval(interval)
  }, [inView])

  const categories = [
    { type: 'Retail', count: 5, color: '#0B5D3B' },
    { type: 'Dairy', count: 3, color: '#C8860A' },
    { type: 'Food', count: 2, color: '#6B8F71' },
    { type: 'Services', count: 2, color: '#8B6914' },
  ]

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#F7F5EF' }}
      id="competitors"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left - Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-lg border border-[#E2DDD4] overflow-hidden"
              style={{ backgroundColor: '#FFFFFF' }}>
              <div className="px-5 py-4 border-b border-[#E2DDD4] flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wide" style={{ color: '#0B5D3B' }}>
                  COMPETITOR LANDSCAPE
                </span>
                <span className="text-sm font-bold font-display" style={{ color: '#1A1A1A' }}>
                  {visibleCount} <span className="text-xs font-normal text-[#6B6B6B]">/ 12 businesses</span>
                </span>
              </div>
              <div className="relative aspect-[4/3] p-4">
                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.06]">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="comp-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#0B5D3B" strokeWidth="0.3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#comp-grid)" />
                  </svg>
                </div>

                <svg width="100%" height="100%" viewBox="0 0 480 380" className="relative">
                  {/* Radius circles */}
                  <circle cx="240" cy="190" r="100" fill="none" stroke="#0B5D3B" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
                  <circle cx="240" cy="190" r="150" fill="none" stroke="#0B5D3B" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.1" />

                  {/* Center */}
                  <circle cx="240" cy="190" r="8" fill="#0B5D3B" opacity="0.15" />
                  <circle cx="240" cy="190" r="4" fill="#0B5D3B" />
                  <circle cx="240" cy="190" r="1.5" fill="white" />

                  {/* Competitors */}
                  {competitorData.slice(0, visibleCount).map((comp) => (
                    <motion.g key={comp.name}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: `${comp.x}px ${comp.y}px` }}
                    >
                      <line x1="240" y1="190" x2={comp.x} y2={comp.y}
                        stroke={typeColors[comp.type]} strokeWidth="0.5" opacity="0.15" strokeDasharray="2 2" />
                      <circle cx={comp.x} cy={comp.y} r="7" fill={typeColors[comp.type]} opacity="0.1" />
                      <circle cx={comp.x} cy={comp.y} r="4" fill={typeColors[comp.type]} opacity="0.85" />
                      <text x={comp.x} y={comp.y - 10} textAnchor="middle" fontSize="7"
                        fill="#5A5A5A" fontFamily="Inter" fontWeight="500">
                        {comp.distance}
                      </text>
                    </motion.g>
                  ))}
                </svg>
              </div>

              {/* Category legend */}
              <div className="px-5 py-4 border-t border-[#E2DDD4] flex flex-wrap gap-4">
                {categories.map((cat) => (
                  <div key={cat.type} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs text-[#5A5A5A]">{cat.type}</span>
                    <span className="text-xs font-bold" style={{ color: cat.color }}>{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-4">
              <SectionLabel>Competitor Mapping</SectionLabel>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.1]"
                style={{ color: '#1A1A1A' }}
              >
                Competition isn't<br />
                the enemy.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[20px] leading-relaxed mb-8 font-display italic"
              style={{ color: '#0B5D3B' }}
            >
              Unserved demand is the opportunity.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-[16px] leading-relaxed mb-8"
              style={{ color: '#5A5A5A' }}
            >
              We map every registered business in your radius, classify them by category, and analyze their density. What emerges isn't just a competitive landscape — it's a map of gaps. Of demand that nobody is serving.
            </motion.p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Total Competitors', value: '12', sub: 'within 5 km' },
                { label: 'Market Gaps', value: '3', sub: 'underserved categories' },
                { label: 'Avg Distance', value: '2.6 km', sub: 'competitor spread' },
                { label: 'Saturation', value: 'Low', sub: 'room to grow' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  className="p-4 rounded-sm border border-[#E2DDD4]"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <div className="text-[10px] tracking-wide text-[#6B6B6B] mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold font-display" style={{ color: '#0B5D3B' }}>{stat.value}</div>
                  <div className="text-[10px] text-[#6B6B6B] mt-0.5">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
