import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { reviewSchema } from '@/lib/validations'
import type { Database } from '@/types/database'

type ReviewInsert = Database['public']['Tables']['reviews']['Insert']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = reviewSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다', details: validated.error.flatten() },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    const insertData: ReviewInsert = {
      customer_name: validated.data.customer_name,
      director_id: validated.data.director_id ?? null,
      rating: validated.data.rating,
      content: validated.data.content,
      image_urls: validated.data.image_urls ?? [],
      status: 'pending',
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert(insertData)
      .select('id')
      .single()

    if (error) {
      console.error('Review insert error:', error)
      return NextResponse.json(
        { error: '후기 제출 중 오류가 발생했습니다' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 })
  } catch (err) {
    console.error('Review route error:', err)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
