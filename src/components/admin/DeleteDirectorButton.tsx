'use client'

import { useTransition } from 'react'
import { RiDeleteBin6Line as Trash2 } from '@remixicon/react'
import { toast } from 'sonner'
import { deleteDirector } from '@/app/admin/directors/actions'

export default function DeleteDirectorButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm('삭제하시겠습니까?')) return
    startTransition(async () => {
      try {
        await deleteDirector(id)
        toast.success('지도사가 삭제되었습니다')
      } catch (err) {
        toast.error(err instanceof Error ? err.message : '삭제에 실패했습니다')
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="flex items-center gap-1 text-xs text-red-500 hover:underline disabled:opacity-50"
    >
      <Trash2 className="w-3 h-3" /> {pending ? '삭제중...' : '삭제'}
    </button>
  )
}
