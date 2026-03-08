import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/supabase/config'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase Storage가 설정되지 않았습니다' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file || file.size === 0) {
      return NextResponse.json({ error: '파일이 선택되지 않았습니다' }, { status: 400 })
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'JPG, PNG, WebP, GIF 형식만 가능합니다' }, { status: 400 })
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
      .from('review-images')
      .upload(path, buffer, { contentType: file.type })

    if (uploadError) {
      return NextResponse.json({ error: `업로드 실패: ${uploadError.message}` }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('review-images')
      .getPublicUrl(path)

    return NextResponse.json({ url: publicUrl })
  } catch (err) {
    console.error('Review image upload error:', err)
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
  }
}
