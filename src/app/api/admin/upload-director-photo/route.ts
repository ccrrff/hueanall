import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { isSupabaseConfigured } from '@/lib/supabase/config'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session.authenticated) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase Storage가 설정되지 않았습니다. 사진 없이 등록하세요.' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('photo') as File | null
    if (!file || file.size === 0) {
      return NextResponse.json({ error: '파일이 선택되지 않았습니다' }, { status: 400 })
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'JPG, PNG, WebP 형식만 가능합니다' }, { status: 400 })
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: '파일 크기는 5MB 이하만 가능합니다' }, { status: 400 })
    }

    const { createAdminClient } = await import('@/lib/supabase/admin')
    const supabase = createAdminClient()
    const ext = file.name.split('.').pop() || 'jpg'
    const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from('director-photos')
      .upload(path, buffer, { contentType: file.type })

    if (uploadError) {
      return NextResponse.json({ error: `업로드 실패: ${uploadError.message}` }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('director-photos')
      .getPublicUrl(path)

    return NextResponse.json({ url: publicUrl })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
  }
}

function extractStoragePath(url: string): string | null {
  const marker = '/director-photos/'
  const idx = url.indexOf(marker)
  if (idx === -1) return null
  return url.slice(idx + marker.length)
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session.authenticated) {
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase가 설정되지 않았습니다' }, { status: 400 })
    }

    const { photoUrl } = await request.json()
    if (!photoUrl || typeof photoUrl !== 'string') {
      return NextResponse.json({ error: '유효하지 않은 요청입니다' }, { status: 400 })
    }

    const path = extractStoragePath(photoUrl)
    if (!path) {
      return NextResponse.json({ error: '유효하지 않은 사진 URL입니다' }, { status: 400 })
    }

    const { createAdminClient } = await import('@/lib/supabase/admin')
    const supabase = createAdminClient()
    const { error } = await supabase.storage.from('director-photos').remove([path])
    if (error) {
      return NextResponse.json({ error: `사진 삭제 실패: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Delete photo error:', err)
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
  }
}
