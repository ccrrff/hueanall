'use client'

import { useTransition } from 'react'
import { toggleDirectorActive } from '@/app/admin/directors/actions'

export default function ToggleActiveButton({ id, isActive }: { id: string; isActive: boolean }) {
  const [pending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(async () => {
      await toggleDirectorActive(id, !isActive)
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={pending}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:ring-offset-2 disabled:opacity-50 ${
        isActive ? 'bg-[#2D7B6F]' : 'bg-[#D1D5DB]'
      }`}
      role="switch"
      aria-checked={isActive}
      aria-label={isActive ? '비활성화' : '활성화'}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
          isActive ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
