import { useScroll, motion } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #0B5D3B 0%, #C8860A 50%, #0B5D3B 100%)',
      }}
    />
  )
}
