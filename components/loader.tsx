'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LOAD_DURATION = 2000
const EXIT_DELAY = 150
const TIPS = ['Compiling components...', 'Loading player data...', 'Booting HUD...', 'Warming up engine...', 'Polishing pixels...']

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [tip, setTip] = useState(TIPS[0])
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    let raf = 0
    let exitTimer = 0

    function frame(now: number) {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const ratio = Math.min(elapsed / LOAD_DURATION, 1)
      setProgress(Math.round(ratio * 100))
      if (ratio < 1) {
        raf = requestAnimationFrame(frame)
      } else {
        exitTimer = window.setTimeout(() => setDone(true), EXIT_DELAY)
      }
    }

    raf = requestAnimationFrame(frame)
    document.body.style.overflow = 'hidden'

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(exitTimer)
      document.body.style.overflow = ''
      startRef.current = null
    }
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTip(TIPS[Math.floor(Math.random() * TIPS.length)])
    }, 500)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = '' }}>
      {!done && (
        <motion.div
          className="loader-screen"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-frame">
            <div className="loader-title">LOADING<span className="loader-dots">...</span><span className="loader-cursor" /></div>
            <div className="loader-bar-track">
              <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="loader-percent">{String(progress).padStart(3, '0')}%</div>
            <div className="loader-tip">{tip}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
