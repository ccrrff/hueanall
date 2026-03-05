'use server'

import { revalidatePath } from 'next/cache'
import { getAdminSession } from '@/lib/auth'
import { isSupabaseConfigured } from '@/lib/supabase/config'

async function verifyAdmin() {
  // 1. Local cookie auth
  const session = await getAdminSession()
  if (session.authenticated) return

  // 2. Supabase auth fallback
  if (isSupabaseConfigured()) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) return
  }

  throw new Error('Unauthorized')
}

export async function createDirector(data: {
  name: string; title: string; position?: string | null
  years_experience: number; introduction: string
  specialties: string[]; phone?: string | null
  photo_url?: string | null; sort_order: number; is_active: boolean
}) {
  await verifyAdmin()
  if (!isSupabaseConfigured()) throw new Error('Supabase가 설정되지 않았습니다')
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { error } = await supabase.from('directors').insert(data)
  if (error) throw new Error(`지도사 등록 실패: ${error.message}`)
  revalidatePath('/admin/directors')
  revalidatePath('/directors')
}

export async function updateDirector(id: string, data: {
  name?: string; title?: string; position?: string | null
  years_experience?: number; introduction?: string
  specialties?: string[]; phone?: string | null
  photo_url?: string | null; sort_order?: number; is_active?: boolean
}) {
  await verifyAdmin()
  if (!isSupabaseConfigured()) throw new Error('Supabase가 설정되지 않았습니다')
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { error } = await supabase.from('directors').update(data).eq('id', id)
  if (error) throw new Error(`지도사 수정 실패: ${error.message}`)
  revalidatePath('/admin/directors')
  revalidatePath('/directors')
  revalidatePath(`/directors/${id}`)
}

export async function deleteDirector(id: string) {
  await verifyAdmin()
  if (!isSupabaseConfigured()) throw new Error('Supabase가 설정되지 않았습니다')
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()

  // 삭제 전 사진 URL 조회하여 Storage에서도 정리
  const { data: director } = await supabase
    .from('directors')
    .select('photo_url')
    .eq('id', id)
    .single()

  const { error } = await supabase.from('directors').delete().eq('id', id)
  if (error) throw new Error(`지도사 삭제 실패: ${error.message}`)

  // DB 삭제 성공 후 Storage 사진 정리 (실패해도 무시)
  if (director?.photo_url) {
    const path = extractStoragePath(director.photo_url)
    if (path) {
      await supabase.storage.from('director-photos').remove([path]).catch(() => {})
    }
  }

  revalidatePath('/admin/directors')
  revalidatePath('/directors')
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

/** Storage URL에서 버킷 내 경로를 추출 */
function extractStoragePath(url: string): string | null {
  const marker = '/director-photos/'
  const idx = url.indexOf(marker)
  if (idx === -1) return null
  return url.slice(idx + marker.length)
}

export async function uploadDirectorPhoto(formData: FormData): Promise<string> {
  await verifyAdmin()
  if (!isSupabaseConfigured()) throw new Error('Supabase가 설정되지 않았습니다')
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const file = formData.get('photo') as File
  if (!file || file.size === 0) throw new Error('파일이 선택되지 않았습니다')
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('JPG, PNG, WebP 형식의 이미지만 업로드할 수 있습니다')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('파일 크기는 5MB 이하만 가능합니다')
  }
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
  const { error: uploadError } = await supabase.storage
    .from('director-photos')
    .upload(path, file, { contentType: file.type })
  if (uploadError) throw new Error(`사진 업로드 실패: ${uploadError.message}`)
  return supabase.storage.from('director-photos').getPublicUrl(path).data.publicUrl
}

export async function deleteDirectorPhoto(photoUrl: string): Promise<void> {
  await verifyAdmin()
  if (!isSupabaseConfigured()) throw new Error('Supabase가 설정되지 않았습니다')
  const path = extractStoragePath(photoUrl)
  if (!path) throw new Error('유효하지 않은 사진 URL입니다')
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { error } = await supabase.storage.from('director-photos').remove([path])
  if (error) throw new Error(`사진 삭제 실패: ${error.message}`)
}

export async function toggleDirectorActive(id: string, is_active: boolean) {
  await verifyAdmin()
  if (!isSupabaseConfigured()) throw new Error('Supabase가 설정되지 않았습니다')
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { error } = await supabase.from('directors').update({ is_active }).eq('id', id)
  if (error) throw new Error(`상태 변경 실패: ${error.message}`)
  revalidatePath('/admin/directors')
  revalidatePath('/directors')
}

export async function updateDirectorOrder(id: string, sort_order: number) {
  await verifyAdmin()
  if (!isSupabaseConfigured()) throw new Error('Supabase가 설정되지 않았습니다')
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { error } = await supabase.from('directors').update({ sort_order }).eq('id', id)
  if (error) throw new Error(`순서 변경 실패: ${error.message}`)
  revalidatePath('/admin/directors')
  revalidatePath('/directors')
}
