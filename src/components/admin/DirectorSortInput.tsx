'use client'

import { useState, useRef } from 'react'
import { updateDirectorOrder } from '@/app/admin/directors/actions'

export default function DirectorSortInput({ id, defaultOrder }: { id: string; defaultOrder: number }) {
  const [order, setOrder] = useState(defaultOrder)
  const [saving, setSaving] = useState(false)
  const prevRef = useRef(defaultOrder)

  async function handleBlur() {
    if (order === prevRef.current) return
    setSaving(true)
    try {
      await updateDirectorOrder(id, order)
      prevRef.current = order
    } catch {
      setOrder(prevRef.current)
    } finally {
      setSaving(false)
    }
  }

  return (
    <input
      type="number"
      value={order}
      onChange={e => setOrder(parseInt(e.target.value, 10) || 0)}
      onBlur={handleBlur}
      onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur() }}
      disabled={saving}
      className="w-14 rounded border border-[#E5E7EB] px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent disabled:opacity-50"
    />
  )
}
