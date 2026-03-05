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
  if (error) throw new Error(error.message)
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
  if (error) throw new Error(error.message)
  revalidatePath('/admin/directors')
  revalidatePath('/directors')
  revalidatePath(`/directors/${id}`)
}

export async function deleteDirector(id: string) {
  await verifyAdmin()
  if (!isSupabaseConfigured()) throw new Error('Supabase가 설정되지 않았습니다')
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const { error } = await supabase.from('directors').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/directors')
  revalidatePath('/directors')
}

export async function uploadDirectorPhoto(formData: FormData): Promise<string> {
  await verifyAdmin()
  if (!isSupabaseConfigured()) throw new Error('Supabase가 설정되지 않았습니다')
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const file = formData.get('photo') as File
  if (!file || file.size === 0) throw new Error('파일이 없습니다')
  const path = `${Date.now()}_${Math.random().toString(36).slice(2)}_${file.name.replace(/\s/g, '_')}`
  const { error: uploadError } = await supabase.storage
    .from('director-photos')
    .upload(path, file, { contentType: file.type })
  if (uploadError) throw new Error(`사진 업로드 실패: ${uploadError.message}`)
  return supabase.storage.from('director-photos').getPublicUrl(path).data.publicUrl
}
