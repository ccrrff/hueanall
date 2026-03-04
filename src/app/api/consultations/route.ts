import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { consultationSchema } from '@/lib/validations'
import { notifyDirectorConsultation } from '@/lib/notifications'
import type { Database } from '@/types/database'

type ConsultationInsert = Database['public']['Tables']['consultations']['Insert']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = consultationSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다', details: validated.error.flatten() },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? null

    const insertData: ConsultationInsert = {
      customer_name: validated.data.customer_name,
      customer_phone: validated.data.customer_phone,
      consultation_type: validated.data.consultation_type,
      director_id: validated.data.director_id ?? null,
      message: validated.data.message ?? null,
      privacy_agreed: Boolean(validated.data.privacy_agreed),
      ip_address: ip,
    }

    const { data, error } = await supabase
      .from('consultations')
      .insert(insertData)
      .select('id')
      .single()

    if (error) {
      console.error('Consultation insert error:', error)
      return NextResponse.json(
        { error: '상담 신청 중 오류가 발생했습니다' },
        { status: 500 }
      )
    }

    // 지정 상담인 경우 해당 지도사에게 알림 발송 (fire-and-forget)
    if (validated.data.consultation_type === 'director_specific' && insertData.director_id) {
      const { data: director } = await supabase
        .from('directors')
        .select('name, phone')
        .eq('id', insertData.director_id)
        .single()

      notifyDirectorConsultation({
        consultationId: data.id,
        directorId: insertData.director_id,
        directorName: director?.name ?? null,
        directorPhone: director?.phone ?? null,
        customerName: insertData.customer_name,
        customerPhone: insertData.customer_phone,
        consultationType: insertData.consultation_type,
        message: insertData.message ?? null,
        receivedAt: new Date().toISOString(),
      }).catch(console.error)
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 })
  } catch (err) {
    console.error('Consultation route error:', err)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
