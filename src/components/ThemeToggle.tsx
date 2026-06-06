'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(()=> setMounted(true), [])
  if (!mounted) return null
  const current = theme === 'system' ? systemTheme : theme
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Theme:</span>
      <select
        value={theme ?? 'system'}
        onChange={(e)=> setTheme(e.target.value)}
        className="rounded border px-2 py-1"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      <span className="ml-2 text-xs">({current})</span>
    </div>
  )
}
