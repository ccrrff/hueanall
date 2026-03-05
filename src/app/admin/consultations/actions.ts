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

export async function updateConsultationStatus(
  id: string,
  status: 'pending' | 'contacted' | 'completed' | 'cancelled',
  adminNote?: string
) {
  await verifyAdmin()
  if (!isSupabaseConfigured()) return // No-op when Supabase not configured
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const supabase = createAdminClient()
  const updateData: { status: typeof status; admin_note?: string } = { status }
  if (adminNote !== undefined) updateData.admin_note = adminNote
  const { error } = await supabase.from('consultations').update(updateData).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/consultations')
  revalidatePath('/admin')
}
