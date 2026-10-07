'use client'

import { useEffect, useState } from 'react'

export function useCountdown(target: string) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const d = new Date(target).getTime() - Date.now()
      const abs = Math.max(0, d)
      setT({
        days: Math.floor(abs / 86400000),
        hours: Math.floor((abs % 86400000) / 3600000),
        minutes: Math.floor((abs % 3600000) / 60000),
        seconds: Math.floor((abs % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}
