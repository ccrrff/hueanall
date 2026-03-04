'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

async function verifyAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
}

export async function approveReview(id: string) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('reviews').update({ status: 'approved' }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/reviews')
  revalidatePath('/reviews')
}

export async function rejectReview(id: string) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('reviews').update({ status: 'rejected' }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/reviews')
  revalidatePath('/reviews')
}
