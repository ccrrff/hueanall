'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RiErrorWarningLine as AlertCircle } from '@remixicon/react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Global Error]', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-7 h-7 text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">페이지를 불러오지 못했습니다</h2>
      <p className="text-sm text-[#666666] mb-6 max-w-md">
        잠시 후 다시 시도해 주세요.
        {error.digest && (
          <span className="block text-xs text-[#999999] mt-1">오류 코드: {error.digest}</span>
        )}
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline" className="border-[#1A473F] text-[#1A473F]">
          다시 시도
        </Button>
        <Button asChild className="bg-[#1A473F] hover:bg-[#12322C] text-white">
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  )
}
