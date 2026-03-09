import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#1A473F] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">페이지를 찾을 수 없습니다</h2>
      <p className="text-[#666666] mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Button asChild className="bg-[#1A473F] hover:bg-[#12322C] text-white">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}
