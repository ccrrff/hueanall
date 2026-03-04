'use client'
import { useTransition } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { approveReview, rejectReview } from '@/app/admin/reviews/actions'

interface Props {
  id: string
  currentStatus: string
}

export default function ReviewActionButtons({ id, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleApprove = () => startTransition(() => approveReview(id))
  const handleReject = () => startTransition(() => rejectReview(id))

  if (currentStatus === 'approved') {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> 승인됨
        </span>
        <button onClick={handleReject} disabled={isPending}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50">
          취소
        </button>
      </div>
    )
  }

  if (currentStatus === 'rejected') {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
          <XCircle className="w-3 h-3" /> 거절됨
        </span>
        <button onClick={handleApprove} disabled={isPending}
          className="text-xs text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50">
          승인
        </button>
      </div>
    )
  }

  // pending state
  return (
    <div className="flex items-center gap-2">
      <button onClick={handleApprove} disabled={isPending}
        className="flex items-center gap-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50">
        <CheckCircle className="w-3 h-3" />
        {isPending ? '처리중...' : '승인'}
      </button>
      <button onClick={handleReject} disabled={isPending}
        className="flex items-center gap-1 text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50">
        <XCircle className="w-3 h-3" />
        거절
      </button>
    </div>
  )
}
