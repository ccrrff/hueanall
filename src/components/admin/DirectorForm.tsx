'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Camera, X, Loader2 } from 'lucide-react'
import { createDirector, updateDirector } from '@/app/admin/directors/actions'
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
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(director?.photo_url ?? null)
  const [photoRemoved, setPhotoRemoved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const CLIENT_MAX_FILE_SIZE = 4 * 1024 * 1024 // 4MB (Vercel 413 방지)

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (file && file.size > CLIENT_MAX_FILE_SIZE) {
      setPhotoError('파일 크기는 4MB 이하만 가능합니다 (서버 제한)')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    setPhotoFile(file)
    setPhotoRemoved(false)
    setPhotoError(null)
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  function handlePhotoRemove() {
    setPhotoFile(null)
    setPhotoPreview(null)
    setPhotoRemoved(true)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPhotoError(null)

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
        try {
          const fd = new FormData()
          fd.append('photo', photoFile)
          const res = await fetch('/api/admin/upload-director-photo', {
            method: 'POST',
            body: fd,
          })
          let json: { url?: string; error?: string } = {}
          try {
            json = await res.json()
          } catch {
            throw new Error(
              res.status === 413
                ? '파일이 너무 큽니다. 4MB 이하의 이미지를 사용해주세요.'
                : `서버 오류가 발생했습니다 (${res.status})`
            )
          }
          if (!res.ok || json.error) {
            throw new Error(json.error || '사진 업로드에 실패했습니다')
          }
          photo_url = json.url!
        } catch (uploadErr) {
          photo_url = null
          setPhotoError(
            uploadErr instanceof Error
              ? `사진 업로드 실패: ${uploadErr.message}`
              : '사진 업로드에 실패했습니다. 지도사 정보는 사진 없이 저장됩니다.'
          )
        }
      } else if (photoRemoved) {
        if (mode === 'edit' && director?.photo_url) {
          await fetch('/api/admin/upload-director-photo', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ photoUrl: director.photo_url }),
          }).catch(() => {})
        }
        photo_url = null
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

  const inputClass = 'w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D7B6F] focus:border-transparent'

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 flex items-start gap-2">
            <span className="shrink-0 mt-0.5">⚠</span>
            <span>{error}</span>
          </div>
        )}
        {photoError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-4 py-3 flex items-start gap-2">
            <span className="shrink-0 mt-0.5">⚠</span>
            <span>{photoError}</span>
          </div>
        )}

        {/* 프로필 사진 */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-3">프로필 사진</label>
          <div className="flex items-center gap-4">
            <div className="relative">
              {photoPreview ? (
                <div className="relative w-24 h-24">
                  <Image
                    src={photoPreview}
                    alt="프로필 미리보기"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#E5E7EB]"
                    unoptimized={photoPreview.startsWith('blob:')}
                  />
                  <button
                    type="button"
                    onClick={handlePhotoRemove}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label="사진 삭제"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#F3F4F6] border-2 border-dashed border-[#D1D5DB] flex items-center justify-center">
                  <Camera className="w-8 h-8 text-[#9CA3AF]" />
                </div>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-[#2D7B6F] hover:text-[#1E5C52] hover:underline"
              >
                {photoPreview ? '사진 변경' : '사진 선택'}
              </button>
              <p className="text-xs text-[#9CA3AF] mt-1">JPG, PNG, WebP (최대 4MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* 이름 / 직함 */}
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
              className={inputClass}
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
              className={inputClass}
            />
          </div>
        </div>

        {/* 직급 / 경력 */}
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
              className={inputClass}
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
              className={inputClass}
            />
          </div>
        </div>

        {/* 소개 */}
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
            className={`${inputClass} resize-y`}
          />
        </div>

        {/* 전문 분야 */}
        <div>
          <label htmlFor="specialties" className="block text-sm font-medium text-[#333333] mb-1">
            전문 분야
          </label>
          <input
            id="specialties"
            name="specialties"
            type="text"
            defaultValue={director?.specialties?.join(', ') ?? ''}
            placeholder="장례지도, 유족상담, 행정지원 (쉼표로 구분)"
            className={inputClass}
          />
          <p className="text-xs text-[#9CA3AF] mt-1">여러 항목을 쉼표(,)로 구분해 입력하세요</p>
        </div>

        {/* 연락처 / 정렬 순서 */}
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
              className={inputClass}
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
              className={inputClass}
            />
          </div>
        </div>

        {/* 활성 상태 */}
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

        {/* 버튼 */}
        <div className="flex items-center gap-3 pt-2 border-t border-[#F0F0F0]">
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#2D7B6F] hover:bg-[#1E5C52] text-white rounded-full px-6 min-w-[120px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                저장 중...
              </span>
            ) : mode === 'new' ? '등록하기' : '수정하기'}
          </Button>
          <Link
            href="/admin/directors"
            className="text-sm text-[#666666] hover:text-[#333333] hover:underline"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  )
}
