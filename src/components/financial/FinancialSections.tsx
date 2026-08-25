import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SectionLabel } from "@/components/shared/utils"

export function AIReasoningSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  const inputs = ['Location', 'Capital', 'Business Type']
  const outputs = ['Market', 'Competition', 'Opportunity', 'Risk', 'Finance']

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#071A14' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-4">
            <SectionLabel light>Intelligence Engine</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(32px,5vw,56px)] leading-[1.1] text-white"
          >
            Raw information becomes <span className="italic font-light" style={{ color: '#C8860A' }}>intelligence.</span>
          </motion.h2>
        </div>

        {/* Flow diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-4 items-center">

          {/* INPUT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 text-center mb-4">Input</div>
            {inputs.map((input, i) => (
              <motion.div
                key={input}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className="px-5 py-4 rounded-sm border border-white/10 text-center"
                style={{ backgroundColor: 'rgba(11, 93, 59, 0.08)' }}
              >
                <span className="text-sm text-white/80">{input}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ENGINE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative w-40 h-40 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/10"
                style={{ borderTopColor: '#C8860A' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full border border-white/10"
                style={{ borderBottomColor: '#0B5D3B' }}
              />
              <div className="absolute inset-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(11, 93, 59, 0.2)' }}>
                <div className="text-center">
                  <div className="text-[10px] font-bold tracking-wider text-white/60">AI ENGINE</div>
                  <div className="text-xs font-display text-white mt-1">GramIntel</div>
                </div>
              </div>
              {/* Data flow particles */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ backgroundColor: '#C8860A' }}
                  animate={{
                    x: [-60, 0, 60],
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mt-4">Intelligence</div>
          </motion.div>

          {/* OUTPUT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 text-center mb-4">Output</div>
            {outputs.map((output, i) => (
              <motion.div
                key={output}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                className="px-5 py-4 rounded-sm border text-center"
                style={{
                  borderColor: 'rgba(200, 134, 10, 0.3)',
                  backgroundColor: 'rgba(200, 134, 10, 0.08)',
                }}
              >
                <span className="text-sm text-white/90">{output}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center mt-16 text-[15px] leading-relaxed max-w-[520px] mx-auto text-white/50"
        >
          No chatbots. No generic AI. A structured intelligence pipeline that transforms three simple inputs into a complete business decision framework.
        </motion.p>
      </div>
    </section>
  )
}

// ---- FINANCIAL SECTION ----

export function FinancialStory() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  const steps = [
    { label: 'Your Margin', value: 100000, display: '₹1,00,000', color: '#0B5D3B', desc: 'Your own contribution' },
    { label: 'Project Cost', value: 1000000, display: '₹10,00,000', color: '#C8860A', desc: 'Total enterprise cost' },
    { label: 'Potential Loan', value: 900000, display: '₹9,00,000', color: '#0B5D3B', desc: 'Institutional financing' },
  ]

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FCFBF7' }}
      id="finance"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-4">
            <SectionLabel>Financial Intelligence</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(36px,5vw,64px)] leading-[1.1]"
            style={{ color: '#1A1A1A' }}
          >
            ₹1 lakh becomes <span className="italic" style={{ color: '#0B5D3B' }}>a business.</span>
          </motion.h2>
        </div>

        {/* Financial flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 z-10 text-2xl" style={{ color: '#0B5D3B' }}>→</div>
              )}
              <div className="rounded-lg border border-[#E2DDD4] p-8 text-center h-full"
                style={{ backgroundColor: '#FFFFFF' }}>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: step.color }}>
                  {step.label}
                </div>
                <div className="font-display text-[clamp(28px,4vw,48px)] font-bold mb-2" style={{ color: step.color }}>
                  {step.display}
                </div>
                <div className="text-sm text-[#6B6B6B]">{step.desc}</div>

                {/* Visual bar */}
                <div className="mt-6 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F0EDE4' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(step.value / 1000000) * 100}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: step.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Split visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 gap-4 max-w-[600px] mx-auto"
        >
          <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#0B5D3B', color: '#F7F5EF' }}>
            <div className="text-4xl font-bold font-display mb-1">10%</div>
            <div className="text-xs tracking-wide opacity-80">Beneficiary Contribution</div>
          </div>
          <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#C8860A', color: '#FFFFFF' }}>
            <div className="text-4xl font-bold font-display mb-1">90%</div>
            <div className="text-xs tracking-wide opacity-80">Institutional Financing</div>
          </div>
        </motion.div>

        {/* Loan terms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Loan Type', value: 'Term Loan' },
            { label: 'Interest Rate', value: '8%' },
            { label: 'Tenure', value: '7 Years' },
            { label: 'Moratorium', value: '6 Months' },
          ].map((term) => (
            <div key={term.label} className="text-center p-4 rounded-sm border border-[#E2DDD4]">
              <div className="text-[10px] tracking-wide text-[#6B6B6B] mb-1">{term.label}</div>
              <div className="text-lg font-bold font-display" style={{ color: '#0B5D3B' }}>{term.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ---- SCHEME ROUTER ----

export function SchemeRouter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#F7F5EF' }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="mb-12 text-center">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-4">
            <SectionLabel>Scheme Router</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(32px,4.5vw,52px)] leading-[1.1]"
            style={{ color: '#1A1A1A' }}
          >
            The right loan, <span className="italic" style={{ color: '#0B5D3B' }}>automatically.</span>
          </motion.h2>
        </div>

        {/* Decision tree */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Root */}
          <div className="flex flex-col items-center">
            <div className="px-6 py-4 rounded-sm border-2" style={{ borderColor: '#0B5D3B', backgroundColor: '#FFFFFF' }}>
              <div className="text-[10px] tracking-wide text-[#6B6B6B] mb-1">PROJECT COST</div>
              <div className="text-2xl font-bold font-display" style={{ color: '#0B5D3B' }}>₹10,00,000</div>
            </div>

            {/* Branching lines */}
            <svg width="100%" height="80" viewBox="0 0 600 80" className="my-2">
              <motion.path d="M 300 0 L 300 20 L 150 40 L 150 80" fill="none" stroke="#0B5D3B" strokeWidth="1.5"
                strokeDasharray="4 3"
                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }} />
              <motion.path d="M 300 0 L 300 20 L 450 40 L 450 80" fill="none" stroke="#C8860A" strokeWidth="1.5"
                strokeDasharray="4 3"
                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }} />
              <circle cx="300" cy="20" r="3" fill="#0B5D3B" />
            </svg>

            {/* Two branches */}
            <div className="grid grid-cols-2 gap-8 w-full max-w-[600px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-center"
              >
                <div className="text-[10px] tracking-wide text-[#6B6B6B] mb-2">≤ ₹1.40 LAKH</div>
                <div className="p-5 rounded-sm border" style={{ borderColor: '#0B5D3B', backgroundColor: '#FFFFFF' }}>
                  <div className="text-sm font-bold" style={{ color: '#0B5D3B' }}>Micro Finance</div>
                  <div className="text-xs text-[#6B6B6B] mt-1">Quick approval, smaller amounts</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-center"
              >
                <div className="text-[10px] tracking-wide text-[#6B6B6B] mb-2">&gt; ₹1.40 LAKH</div>
                <div className="p-5 rounded-sm border-2" style={{ borderColor: '#C8860A', backgroundColor: 'rgba(200, 134, 10, 0.05)' }}>
                  <div className="text-sm font-bold" style={{ color: '#C8860A' }}>Term Loan</div>
                  <div className="text-xs text-[#6B6B6B] mt-1">Lower interest, longer tenure</div>
                  <div className="mt-2 inline-block px-2 py-0.5 rounded-sm text-[9px] font-bold tracking-wide"
                    style={{ backgroundColor: '#C8860A', color: 'white' }}>
                    RECOMMENDED ROUTE
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---- REPAYMENT SIMULATION ----

export function RepaymentSimulation() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  const data = [
    { label: 'Revenue', value: 85000, color: '#0B5D3B', percent: 100 },
    { label: 'Operating Costs', value: 57000, color: '#C8860A', percent: 67 },
    { label: 'Surplus', value: 28000, color: '#6B8F71', percent: 33 },
    { label: 'Loan Obligation', value: 12000, color: '#8B6914', percent: 14 },
    { label: 'Remaining Surplus', value: 16000, color: '#0B5D3B', percent: 19 },
  ]

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#071A14' }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-4">
            <SectionLabel light>Repayment Simulation</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.1] text-white"
          >
            Can you repay? <span className="italic font-light" style={{ color: '#C8860A' }}>Let's simulate.</span>
          </motion.h2>
        </div>

        {/* Financial bars */}
        <div className="space-y-6 mb-12">
          {data.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">{item.label}</span>
                <span className="text-sm font-bold font-display" style={{ color: item.color }}>
                  ₹{item.value.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.percent}%` } : {}}
                  transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Repayment health */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-3">
            Repayment Health
          </div>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
              <motion.circle
                cx="64" cy="64" r="56"
                fill="none" stroke="#0B5D3B" strokeWidth="4" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 56}
                initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                animate={inView ? { strokeDashoffset: 2 * Math.PI * 56 * 0.15 } : {}}
                transition={{ duration: 1.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold font-display text-white">SAFE</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-white/50 text-center max-w-[400px]">
            With ₹16,000 monthly surplus after loan obligations, your business maintains healthy cash flow with a comfortable safety margin.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
