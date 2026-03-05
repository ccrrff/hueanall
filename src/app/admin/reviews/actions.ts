'use server'
import { revalidatePath } from 'next/cache'
import { getAdminSession } from '@/lib/auth'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { updateLocalReviewStatus } from '@/lib/local-store'

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

export async function approveReview(id: string) {
  await verifyAdmin()

  if (isSupabaseConfigured()) {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const supabase = createAdminClient()
    const { error } = await supabase.from('reviews').update({ status: 'approved' }).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    updateLocalReviewStatus(id, 'approved')
  }

  revalidatePath('/admin/reviews')
  revalidatePath('/reviews')
}

export async function rejectReview(id: string) {
  await verifyAdmin()

  if (isSupabaseConfigured()) {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const supabase = createAdminClient()
    const { error } = await supabase.from('reviews').update({ status: 'rejected' }).eq('id', id)
    if (error) throw new Error(error.message)
  } else {
    updateLocalReviewStatus(id, 'rejected')
  }

  revalidatePath('/admin/reviews')
  revalidatePath('/reviews')
}
