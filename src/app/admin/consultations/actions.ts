'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

async function verifyAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
}

export async function updateConsultationStatus(
  id: string,
  status: 'pending' | 'contacted' | 'completed' | 'cancelled',
  adminNote?: string
) {
  await verifyAdmin()
  const supabase = createAdminClient()
  const updateData: { status: typeof status; admin_note?: string } = { status }
  if (adminNote !== undefined) updateData.admin_note = adminNote
  const { error } = await supabase.from('consultations').update(updateData).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/consultations')
  revalidatePath('/admin')
}
