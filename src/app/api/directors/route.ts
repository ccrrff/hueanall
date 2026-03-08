import { NextResponse } from 'next/server'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const { createAdminClient } = await import('@/lib/supabase/admin')
      const supabase = createAdminClient()
      const { data } = await supabase
        .from('directors')
        .select('id, name')
        .eq('is_active', true)
        .order('sort_order')
      return NextResponse.json(data ?? [])
    } catch {
      // Fall through
    }
  }
  return NextResponse.json([])
}
