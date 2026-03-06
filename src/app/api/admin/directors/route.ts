import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminSession } from '@/lib/auth'
import { isSupabaseConfigured } from '@/lib/supabase/config'

async function verifyAdmin() {
  const session = await getAdminSession()
  if (session.authenticated) return null

  if (isSupabaseConfigured()) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) return null
  }

  return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
}

// POST: 새 지도사 등록
export async function POST(request: NextRequest) {
  try {
    const authError = await verifyAdmin()
    if (authError) return authError

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase가 설정되지 않았습니다' }, { status: 503 })
    }

    const data = await request.json()
    if (!data.name?.trim()) {
      return NextResponse.json({ error: '이름을 입력해주세요' }, { status: 400 })
    }

    const { createAdminClient } = await import('@/lib/supabase/admin')
    const supabase = createAdminClient()
    const { data: inserted, error } = await supabase
      .from('directors')
      .insert({
        name: data.name,
        title: data.title || '장례지도사',
        position: data.position ?? null,
        years_experience: data.years_experience,
        introduction: data.introduction,
        specialties: data.specialties ?? [],
        phone: data.phone ?? null,
        photo_url: data.photo_url ?? null,
        sort_order: data.sort_order ?? 0,
        is_active: data.is_active ?? true,
      })
      .select('id')
      .single()

    if (error) {
      return NextResponse.json({ error: `등록 실패: ${error.message}` }, { status: 500 })
    }

    revalidatePath('/admin/directors')
    revalidatePath('/directors')
    return NextResponse.json({ success: true, id: inserted.id }, { status: 201 })
  } catch (err) {
    console.error('createDirector error:', err)
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
  }
}

// PUT: 지도사 수정
export async function PUT(request: NextRequest) {
  try {
    const authError = await verifyAdmin()
    if (authError) return authError

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase가 설정되지 않았습니다' }, { status: 503 })
    }

    const { id, ...data } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'id가 필요합니다' }, { status: 400 })
    }

    const { createAdminClient } = await import('@/lib/supabase/admin')
    const supabase = createAdminClient()
    const { error } = await supabase.from('directors').update(data).eq('id', id)

    if (error) {
      return NextResponse.json({ error: `수정 실패: ${error.message}` }, { status: 500 })
    }

    revalidatePath('/admin/directors')
    revalidatePath('/directors')
    revalidatePath(`/directors/${id}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('updateDirector error:', err)
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
  }
}
