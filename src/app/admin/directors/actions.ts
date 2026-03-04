'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

async function verifyAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
}

export async function createDirector(data: {
  name: string; title: string; position?: string | null
  years_experience: number; introduction: string
  specialties: string[]; phone?: string | null
  photo_url?: string | null; sort_order: number; is_active: boolean
}) {
  await verifyAdmin()
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
  const supabase = createAdminClient()
  const { error } = await supabase.from('directors').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/directors')
  revalidatePath('/directors')
  revalidatePath(`/directors/${id}`)
}

export async function deleteDirector(id: string) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('directors').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/directors')
  revalidatePath('/directors')
}
