import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

export function CustomCursor() {
  const isMobile = useIsMobile()
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isClickable, setIsClickable] = useState(false)

  const springConfig = { damping: 25, stiffness: 300 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  const dotX = useSpring(cursorX, { damping: 40, stiffness: 500 })
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 500 })

  useEffect(() => {
    if (isMobile) return
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const hoverable = el.closest('a, button, [data-cursor="expand"], [role="button"]')
      setIsHovering(!!hoverable)
      setIsClickable(el.tagName === 'A' || el.tagName === 'BUTTON' || !!el.closest('button, a'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [isMobile, cursorX, cursorY])

  if (isMobile) return null

  return (
    <>
      <motion.div
        style={{ x, y }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{ scale: isHovering ? 2.5 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-8 h-8 rounded-full border border-white opacity-70 -translate-x-1/2 -translate-y-1/2"
          style={{ borderColor: isClickable ? '#C8860A' : 'white' }}
        />
      </motion.div>
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
      >
        <div
          className="w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: isClickable ? '#C8860A' : '#0B5D3B' }}
        />
      </motion.div>
    </>
  )
}
