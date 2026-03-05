'use client'

import { Trash2 } from 'lucide-react'
import { deleteDirector } from '@/app/admin/directors/actions'

export default function DeleteDirectorButton({ id }: { id: string }) {
  return (
    <form action={async () => {
      if (!confirm('삭제하시겠습니까?')) return
      await deleteDirector(id)
    }}>
      <button type="submit" className="flex items-center gap-1 text-xs text-red-500 hover:underline">
        <Trash2 className="w-3 h-3" /> 삭제
      </button>
    </form>
  )
}
