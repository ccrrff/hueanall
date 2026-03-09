'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { RiPhoneLine as Phone, RiUserLine as User, RiSendPlaneLine as Send, RiCheckboxCircleLine as CheckCircle2 } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const quickFormSchema = z.object({
  customer_name: z.string().min(2, '이름은 2자 이상 입력해주세요'),
  customer_phone: z
    .string()
    .regex(
      /^(010|011|016|017|018|019)\d{7,8}$|^0[2-9]\d{7,8}$|^\d{4}-\d{4}$/,
      '올바른 전화번호를 입력해주세요'
    ),
  privacy_agreed: z.boolean().refine((v) => v === true, '개인정보 수집에 동의해주세요'),
})

type QuickFormValues = z.infer<typeof quickFormSchema>

export default function QuickConsultForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<QuickFormValues>({
    resolver: zodResolver(quickFormSchema),
    defaultValues: { privacy_agreed: false },
  })

  const privacyAgreed = watch('privacy_agreed')

  const onSubmit = async (data: QuickFormValues) => {
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: data.customer_name,
          customer_phone: data.customer_phone,
          consultation_type: 'quick',
          privacy_agreed: data.privacy_agreed,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '오류가 발생했습니다')
      }

      setSubmitted(true)
      toast.success('상담 신청이 완료되었습니다', {
        description: '빠른 시간 내에 연락드리겠습니다.',
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
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">상담 신청이 완료되었습니다</h3>
          <p className="text-[#666666] leading-relaxed">
            담당 장례지도사가 빠른 시간 내에<br />연락드리겠습니다.
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* 이름 */}
      <div className="space-y-2">
        <Label htmlFor="quick-name" className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-1.5 ml-1">
          <User className="w-4 h-4 text-[#1A473F]" />
          성함 <span className="text-[#1A473F]">*</span>
        </Label>
        <Input
          id="quick-name"
          type="text"
          placeholder="홍길동"
          autoComplete="name"
          className={cn(
            'h-14 text-base bg-white/50 backdrop-blur-sm border-[#E6EFEF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus-visible:ring-[#1A473F] focus-visible:border-[#1A473F] transition-all duration-300 rounded-xl',
            errors.customer_name && 'border-red-400 focus-visible:ring-red-400'
          )}
          {...register('customer_name')}
        />
        {errors.customer_name && (
          <p className="text-xs text-red-500 ml-1">{errors.customer_name.message}</p>
        )}
      </div>

      {/* 연락처 */}
      <div className="space-y-2 mt-5">
        <Label htmlFor="quick-phone" className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-1.5 ml-1">
          <Phone className="w-4 h-4 text-[#1A473F]" />
          연락처 <span className="text-[#1A473F]">*</span>
        </Label>
        <Input
          id="quick-phone"
          type="tel"
          placeholder="010-1234-5678"
          autoComplete="tel"
          className={cn(
            'h-14 text-base bg-white/50 backdrop-blur-sm border-[#E6EFEF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus-visible:ring-[#1A473F] focus-visible:border-[#1A473F] transition-all duration-300 rounded-xl',
            errors.customer_phone && 'border-red-400 focus-visible:ring-red-400'
          )}
          {...register('customer_phone')}
        />
        {errors.customer_phone && (
          <p className="text-xs text-red-500 ml-1">{errors.customer_phone.message}</p>
        )}
      </div>

      {/* 개인정보 동의 */}
      <div className="space-y-1 mt-6 bg-[#F4F8F7]/50 rounded-xl p-4 border border-[#E6EFEF]">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded border-[#D1D5DB] text-[#1A473F] focus:ring-[#1A473F] transition-colors cursor-pointer"
            {...register('privacy_agreed')}
          />
          <span className="text-[13px] text-[#666666] leading-relaxed group-hover:text-[#444444] transition-colors">
            개인정보 수집 및 이용에 동의합니다.{' '}
            <a href="/privacy" target="_blank" onClick={(e) => e.stopPropagation()} className="text-[#1A473F] font-medium hover:underline underline-offset-4">
              내용 보기
            </a>
          </span>
        </label>
        {errors.privacy_agreed && (
          <p className="text-xs text-red-500 pl-7">{errors.privacy_agreed.message}</p>
        )}
      </div>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        disabled={isSubmitting || !privacyAgreed}
        className="w-full h-14 mt-8 bg-gradient-to-r from-[#1A473F] to-[#12322C] hover:from-[#12322C] hover:to-[#0A1A17] text-white text-base font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_16px_-6px_rgba(26,71,63,0.3)] hover:shadow-[0_12px_20px_-8px_rgba(26,71,63,0.5)] hover:-translate-y-0.5 transition-all duration-300"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            접수 중...
          </span>
        ) : (
          <span className="flex items-center gap-2 tracking-wide">
            <Send className="w-4 h-4" />
            무료 상담 신청하기
          </span>
        )}
      </Button>

      <div className="pt-4 text-center">
        <p className="inline-flex items-center justify-center space-x-2 text-[13px] text-[#666666] bg-[#F4F8F7] px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A473F] animate-pulse"></span>
          <span>평균 30분 이내 연락 · 24시간 정상 운영</span>
        </p>
      </div>
    </form>
  )
}
