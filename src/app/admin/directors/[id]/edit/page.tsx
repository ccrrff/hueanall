import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import DirectorForm from '@/components/admin/DirectorForm'

export default async function AdminDirectorEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: director } = await supabase.from('directors').select('*').eq('id', id).single()
  if (!director) notFound()

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">지도사 프로필 수정</h1>
      <p className="text-sm text-[#666666] mb-6">{director.name} 지도사</p>
      <DirectorForm mode="edit" director={director} />
    </div>
  )
}
