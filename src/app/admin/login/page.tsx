'use client'
import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RiEyeLine as Eye, RiEyeOffLine as EyeOff, RiLockPasswordLine as Lock } from '@remixicon/react'

function LoginForm() {
  const [adminId, setAdminId] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirected = searchParams.get('redirected')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: adminId, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error || '아이디 또는 비밀번호가 올바르지 않습니다')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-[#1A473F] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-black text-[#1A1A1A]">관리자 로그인</h1>
        <p className="text-sm text-[#666666] mt-1">휴앤올 관리자 전용 페이지</p>
        {redirected && <p className="text-xs text-orange-500 mt-2">로그인이 필요합니다</p>}
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-4">
        {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        <div className="space-y-1.5">
          <Label htmlFor="adminId">아이디</Label>
          <Input
            id="adminId"
            type="text"
            value={adminId}
            onChange={e => setAdminId(e.target.value)}
            required
            autoComplete="username"
            placeholder="admin"
            className="h-11"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">비밀번호</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="h-11 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPw(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999]"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#1A473F] hover:bg-[#12322C] text-white font-bold"
        >
          {loading ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div className="h-80 flex items-center justify-center text-[#999]">로딩중...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
