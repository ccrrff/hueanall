'use client'
import { useTransition } from 'react'
import { updateConsultationStatus } from '@/app/admin/consultations/actions'

const STATUS_OPTIONS = [
  { value: 'pending', label: '대기중', className: 'bg-yellow-100 text-yellow-700' },
  { value: 'contacted', label: '연락완료', className: 'bg-blue-100 text-blue-700' },
  { value: 'completed', label: '상담완료', className: 'bg-green-100 text-green-700' },
  { value: 'cancelled', label: '취소', className: 'bg-gray-100 text-gray-500' },
] as const

interface Props {
  id: string
  currentStatus: string
}

export default function ConsultationStatusButton({ id, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as 'pending' | 'contacted' | 'completed' | 'cancelled'
    if (newStatus === currentStatus) return
    startTransition(() => {
      updateConsultationStatus(id, newStatus)
    })
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className="text-xs border border-[#E5E7EB] rounded-lg px-2 py-1.5 bg-white disabled:opacity-50 cursor-pointer"
    >
      {STATUS_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}
