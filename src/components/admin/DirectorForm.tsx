'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createDirector, updateDirector, uploadDirectorPhoto } from '@/app/admin/directors/actions'
import { Button } from '@/components/ui/button'
import type { Director } from '@/types/database'

interface DirectorFormProps {
  director?: Director
  mode: 'new' | 'edit'
}

export default function DirectorForm({ director, mode }: DirectorFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(director?.photo_url ?? null)

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setPhotoFile(file)
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const form = new FormData(e.currentTarget)
      const name = (form.get('name') as string).trim()
      const title = (form.get('title') as string).trim() || '장례지도사'
      const position = (form.get('position') as string).trim() || null
      const years_experience = parseInt(form.get('years_experience') as string, 10)
      const introduction = (form.get('introduction') as string).trim()
      const specialtiesRaw = (form.get('specialties') as string).trim()
      const specialties = specialtiesRaw
        ? specialtiesRaw.split(',').map(s => s.trim()).filter(Boolean)
        : []
      const phone = (form.get('phone') as string).trim() || null
      const sort_order = parseInt(form.get('sort_order') as string, 10) || 0
      const is_active = form.get('is_active') === 'on'

      if (!name) throw new Error('이름을 입력해주세요')
      if (isNaN(years_experience) || years_experience < 0) throw new Error('경력을 올바르게 입력해주세요')
      if (!introduction) throw new Error('소개를 입력해주세요')

      let photo_url = director?.photo_url ?? null

      if (photoFile) {
        const fd = new FormData()
        fd.append('photo', photoFile)
        photo_url = await uploadDirectorPhoto(fd)
      }

      const data = {
        name,
        title,
        position,
        years_experience,
        introduction,
        specialties,
        phone,
        photo_url,
        sort_order,
        is_active,
      }

      if (mode === 'new') {
        await createDirector(data)
      } else {
        await updateDirector(director!.id, data)
      }

      router.push('/admin/directors')
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#333333] mb-1">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={director?.name ?? ''}
            required
            className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#333333] mb-1">
            직함
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={director?.title ?? '장례지도사'}
            className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-[#333333] mb-1">
            직급
          </label>
          <input
            id="position"
            name="position"
            type="text"
            defaultValue={director?.position ?? ''}
            className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="years_experience" className="block text-sm font-medium text-[#333333] mb-1">
            경력(년) <span className="text-red-500">*</span>
          </label>
          <input
            id="years_experience"
            name="years_experience"
            type="number"
            min={0}
            defaultValue={director?.years_experience ?? 0}
            required
            className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="introduction" className="block text-sm font-medium text-[#333333] mb-1">
          소개 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="introduction"
          name="introduction"
          rows={5}
          defaultValue={director?.introduction ?? ''}
          required
          className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent resize-y"
        />
      </div>

      <div>
        <label htmlFor="specialties" className="block text-sm font-medium text-[#333333] mb-1">
          전문 분야
        </label>
        <input
          id="specialties"
          name="specialties"
          type="text"
          defaultValue={director?.specialties?.join(', ') ?? ''}
          placeholder="예: 장례지도, 유족상담, 행정지원"
          className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent"
        />
        <p className="text-xs text-[#999999] mt-1">쉼표로 구분</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#333333] mb-1">
            연락처
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            defaultValue={director?.phone ?? ''}
            placeholder="010-0000-0000"
            className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="sort_order" className="block text-sm font-medium text-[#333333] mb-1">
            정렬 순서
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={director?.sort_order ?? 0}
            className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#333333] mb-1">프로필 사진</label>
        {photoPreview && (
          <div className="mb-2">
            <Image
              src={photoPreview}
              alt="프로필 미리보기"
              width={96}
              height={96}
              className="rounded-lg object-cover"
              unoptimized={photoPreview.startsWith('blob:')}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="block w-full text-sm text-[#666666] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#F0F0F0] file:text-[#333333] hover:file:bg-[#E5E5E5]"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="is_active"
          name="is_active"
          type="checkbox"
          defaultChecked={director?.is_active ?? true}
          className="rounded border-[#D1D5DB] text-[#2D7B6F] focus:ring-[#2D7B6F]"
        />
        <label htmlFor="is_active" className="text-sm text-[#333333]">활성 상태</label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#2D7B6F] hover:bg-[#1E5C52] text-white rounded-full px-6"
        >
          {loading ? '처리 중...' : mode === 'new' ? '등록하기' : '수정하기'}
        </Button>
        <Link
          href="/admin/directors"
          className="text-sm text-[#666666] hover:text-[#333333] hover:underline"
        >
          취소
        </Link>
      </div>
    </form>
  )
}
