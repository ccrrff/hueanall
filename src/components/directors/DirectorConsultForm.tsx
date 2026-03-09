'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { RiCheckboxCircleLine as CheckCircle2, RiSendPlaneLine as Send, RiPhoneLine as Phone, RiUserLine as User, RiMessage2Line as MessageSquare } from '@remixicon/react'

const schema = z.object({
  customer_name: z.string().min(2, '이름은 2자 이상 입력해주세요'),
  customer_phone: z
    .string()
    .regex(
      /^(010|011|016|017|018|019)\d{7,8}$|^0[2-9]\d{7,8}$|^\d{4}-\d{4}$/,
      '올바른 전화번호를 입력해주세요'
    ),
  message: z.string().max(500, '500자 이내로 입력해주세요').optional(),
  privacy_agreed: z.boolean().refine((v) => v === true, '개인정보 수집에 동의해주세요'),
})

type FormValues = z.infer<typeof schema>

interface DirectorConsultFormProps {
  directorId: string
  directorName: string
}

export default function DirectorConsultForm({ directorId, directorName }: DirectorConsultFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { privacy_agreed: false },
  })

  const privacyAgreed = watch('privacy_agreed')

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: data.customer_name,
          customer_phone: data.customer_phone,
          consultation_type: 'director_specific',
          director_id: directorId,
          message: data.message || undefined,
          privacy_agreed: data.privacy_agreed,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '오류가 발생했습니다')
      }

      setSubmitted(true)
      toast.success('지정 상담 신청이 완료되었습니다', {
        description: `${directorName} 지도사가 빠른 시간 내에 연락드리겠습니다.`,
      })
    } catch (err) {
      toast.error('상담 신청에 실패했습니다', {
        description: err instanceof Error ? err.message : '잠시 후 다시 시도해주세요.',
      })
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="w-16 h-16 bg-[#1A473F] rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">지정 상담 신청이 완료되었습니다</h3>
          <p className="text-[#666666] leading-relaxed">
            <span className="font-semibold text-[#1A473F]">{directorName}</span> 지도사가
            <br />
            빠른 시간 내에 연락드리겠습니다.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false)
            reset()
          }}
          className="text-sm text-[#1A473F] underline underline-offset-2"
        >
          다시 신청하기
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm">
      <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">
        <span className="text-[#1A473F] font-black">{directorName}</span> 지도사 지정 상담 신청
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* 성함 */}
        <div className="space-y-1.5">
          <Label htmlFor="director-consult-name" className="text-sm font-medium text-[#1A1A1A] flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#1A473F]" />
            성함 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="director-consult-name"
            type="text"
            placeholder="홍길동"
            autoComplete="name"
            className={cn(
              'h-12 text-base border-[#E5E7EB] focus-visible:ring-[#1A473F]',
              errors.customer_name && 'border-red-400'
            )}
            {...register('customer_name')}
          />
          {errors.customer_name && (
            <p className="text-xs text-red-500">{errors.customer_name.message}</p>
          )}
        </div>

        {/* 연락처 */}
        <div className="space-y-1.5">
          <Label htmlFor="director-consult-phone" className="text-sm font-medium text-[#1A1A1A] flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-[#1A473F]" />
            연락처 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="director-consult-phone"
            type="tel"
            placeholder="010-1234-5678"
            autoComplete="tel"
            className={cn(
              'h-12 text-base border-[#E5E7EB] focus-visible:ring-[#1A473F]',
              errors.customer_phone && 'border-red-400'
            )}
            {...register('customer_phone')}
          />
          {errors.customer_phone && (
            <p className="text-xs text-red-500">{errors.customer_phone.message}</p>
          )}
        </div>

        {/* 메시지 */}
        <div className="space-y-1.5">
          <Label htmlFor="director-consult-message" className="text-sm font-medium text-[#1A1A1A] flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#1A473F]" />
            메시지 <span className="text-xs text-[#999999] font-normal">(선택)</span>
          </Label>
          <Textarea
            id="director-consult-message"
            placeholder="상담 내용이나 요청사항을 입력해주세요"
            rows={3}
            className={cn(
              'text-base border-[#E5E7EB] focus-visible:ring-[#1A473F] resize-none',
              errors.message && 'border-red-400'
            )}
            {...register('message')}
          />
          {errors.message && (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          )}
        </div>

        {/* 개인정보 동의 */}
        <div className="space-y-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-[#D1D5DB] accent-[#1A473F]"
              {...register('privacy_agreed')}
            />
            <span className="text-sm text-[#666666] leading-relaxed">
              개인정보 수집 및 이용에 동의합니다.{' '}
              <a href="/privacy" target="_blank" className="text-[#1A473F] underline underline-offset-2">
                내용 보기
              </a>
            </span>
          </label>
          {errors.privacy_agreed && (
            <p className="text-xs text-red-500 pl-6">{errors.privacy_agreed.message}</p>
          )}
        </div>

        {/* 제출 */}
        <Button
          type="submit"
          disabled={isSubmitting || !privacyAgreed}
          className="w-full h-12 bg-[#1A473F] hover:bg-[#12322C] text-white text-base font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              신청 중...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              지정 상담 신청
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}
