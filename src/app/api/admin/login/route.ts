import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, setAdminSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { id, password } = await request.json()
    if (!id || !password) {
      return NextResponse.json({ error: '아이디와 비밀번호를 입력해주세요' }, { status: 400 })
    }
    if (!verifyCredentials(id, password)) {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 올바르지 않습니다' }, { status: 401 })
    }
    await setAdminSession()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
  }
}
