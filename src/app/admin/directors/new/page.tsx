import DirectorForm from '@/components/admin/DirectorForm'

export default function AdminDirectorNewPage() {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">새 지도사 등록</h1>
      <p className="text-sm text-[#666666] mb-6">새로운 장례지도사 프로필을 등록합니다</p>
      <DirectorForm mode="new" />
    </div>
  )
}
