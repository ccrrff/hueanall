'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Star, Upload, X, CheckCircle2, Send, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_FILES = 5
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

const formSchema = z.object({
  customer_name: z.string().min(2, '이름은 2자 이상 입력해주세요'),
  director_id: z.string().uuid().optional().nullable(),
  rating: z.number().int().min(1, '별점을 선택해주세요').max(5),
  content: z
    .string()
    .min(10, '후기는 10자 이상 입력해주세요')
    .max(1000, '1000자 이내로 입력해주세요'),
})

type FormValues = z.infer<typeof formSchema>

interface DirectorOption {
  id: string
  name: string
}

interface PreviewFile {
  file: File
  previewUrl: string
}

export default function ReviewForm() {
  const [directors, setDirectors] = useState<DirectorOption[]>([])
  const [hoveredStar, setHoveredStar] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const ratingRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: '',
      director_id: null,
      rating: 0,
      content: '',
    },
    shouldFocusError: true,
  })

  useEffect(() => {
    fetch('/api/directors')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setDirectors(data) })
      .catch(() => {})
  }, [])

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      previewFiles.forEach((pf) => URL.revokeObjectURL(pf.previewUrl))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleStarClick(star: number) {
    setSelectedRating(star)
    setValue('rating', star, { shouldValidate: true })
  }

  function validateFiles(files: FileList | File[]): File[] {
    const remaining = MAX_FILES - previewFiles.length
    if (remaining <= 0) {
      toast.error(`최대 ${MAX_FILES}장까지 업로드할 수 있습니다`)
      return []
    }

    const valid: File[] = []
    const fileArr = Array.from(files)

    for (const file of fileArr.slice(0, remaining)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error(`${file.name}: 지원하지 않는 파일 형식입니다`)
        continue
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: 파일 크기가 5MB를 초과합니다`)
        continue
      }
      valid.push(file)
    }

    if (fileArr.length > remaining) {
      toast.error(`최대 ${MAX_FILES}장까지 업로드할 수 있습니다`)
    }

    return valid
  }

  function addFiles(files: FileList | File[]) {
    const valid = validateFiles(files)
    if (valid.length === 0) return

    const newPreviews = valid.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }))
    setPreviewFiles((prev) => [...prev, ...newPreviews])
  }

  function removeFile(index: number) {
    setPreviewFiles((prev) => {
      const removed = prev[index]
      URL.revokeObjectURL(removed.previewUrl)
      return prev.filter((_, i) => i !== index)
    })
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files)
    }
    // Reset input so same file can be re-selected
    e.target.value = ''
  }

  async function onSubmit(data: FormValues) {
    const imageUrls: string[] = []

    // Upload images to Supabase Storage
    if (previewFiles.length > 0) {
      setIsUploading(true)
      try {
        for (const pf of previewFiles) {
          const formData = new FormData()
          formData.append('file', pf.file)
          const res = await fetch('/api/reviews/upload', { method: 'POST', body: formData })
          if (!res.ok) {
            const body = await res.json().catch(() => null)
            throw new Error(body?.error || '이미지 업로드에 실패했습니다')
          }
          const { url } = await res.json()
          imageUrls.push(url)
        }
      } catch (err) {
        console.error('Image upload error:', err)
        toast.error(err instanceof Error ? err.message : '이미지 업로드 중 오류가 발생했습니다')
        setIsUploading(false)
        return
      } finally {
        setIsUploading(false)
      }
    }

    // Submit review
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: data.customer_name,
          director_id: data.director_id || null,
          rating: data.rating,
          content: data.content,
          image_urls: imageUrls,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        if (body?.details) {
          console.error('Review submission validation details:', body.details)
        }
        throw new Error(body?.error || '후기 제출에 실패했습니다')
      }

      toast.success('후기가 성공적으로 접수되었습니다')
      setSubmitted(true)
    } catch (err) {
      console.error('Review submission error:', err)
      toast.error(
        err instanceof Error ? err.message : '후기 제출 중 오류가 발생했습니다'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleReset() {
    reset()
    setSelectedRating(0)
    setHoveredStar(0)
    previewFiles.forEach((pf) => URL.revokeObjectURL(pf.previewUrl))
    setPreviewFiles([])
    setSubmitted(false)
  }

  const isLoading = isUploading || isSubmitting

  // Success state
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-4">
        <CheckCircle2 className="w-16 h-16 text-[#2D7B6F] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          후기가 접수되었습니다
        </h3>
        <p className="text-gray-500 mb-8">검토 후 게시됩니다</p>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-[#2D7B6F] text-[#2D7B6F] hover:bg-[#2D7B6F]/5"
        >
          다른 후기 작성하기
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (fieldErrors) => {
        // Scroll to first error field — rating uses a custom UI so we handle it specially
        if (fieldErrors.rating && ratingRef.current) {
          ratingRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
          return
        }
        // For other fields, the browser's default focus behavior handles scrolling
        const firstErrorKey = Object.keys(fieldErrors)[0]
        if (firstErrorKey) {
          const el = document.getElementById(firstErrorKey)
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el?.focus()
        }
      })}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Customer name */}
      <div className="space-y-2">
        <Label htmlFor="customer_name">이름 *</Label>
        <Input
          id="customer_name"
          placeholder="이름을 입력해주세요"
          {...register('customer_name')}
        />
        {errors.customer_name && (
          <p className="text-sm text-red-500">{errors.customer_name.message}</p>
        )}
      </div>

      {/* Director select */}
      <div className="space-y-2">
        <Label htmlFor="director_id">담당 지도사 (선택)</Label>
        <select
          id="director_id"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          defaultValue=""
          onChange={(e) =>
            setValue('director_id', e.target.value || null)
          }
        >
          <option value="">담당 지도사 없음</option>
          {directors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Star rating */}
      <div ref={ratingRef} className="space-y-2">
        <Label>별점 *</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= (hoveredStar || selectedRating)
            return (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-0.5 transition-transform hover:scale-110"
                aria-label={`${star}점`}
              >
                <Star
                  className={cn(
                    'w-8 h-8 transition-colors',
                    filled
                      ? 'fill-[#FEE500] text-[#FEE500]'
                      : 'fill-none text-gray-300'
                  )}
                />
              </button>
            )
          })}
        </div>
        {errors.rating && (
          <p className="text-sm text-red-500">{errors.rating.message}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">후기 내용 *</Label>
        <Textarea
          id="content"
          placeholder="서비스를 이용하신 후기를 10자 이상 작성해주세요"
          rows={5}
          {...register('content')}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* File upload */}
      <div className="space-y-2">
        <Label>사진 첨부 (최대 {MAX_FILES}장, 각 5MB 이하)</Label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              fileInputRef.current?.click()
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
            isDragOver
              ? 'border-[#2D7B6F] bg-[#2D7B6F]/5'
              : 'border-[#E5E7EB] hover:border-[#2D7B6F]'
          )}
        >
          <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">
            클릭하거나 이미지를 드래그하여 업로드
          </p>
          <p className="text-xs text-gray-400 mt-1">
            JPG, PNG, WebP, GIF (최대 5MB)
          </p>
        </div>

        {/* Previews */}
        {previewFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {previewFiles.map((pf, index) => (
              <div
                key={pf.previewUrl}
                className="w-20 h-20 relative rounded-lg overflow-hidden border border-gray-200"
              >
                <Image
                  src={pf.previewUrl}
                  alt={`첨부 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label={`이미지 ${index + 1} 삭제`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-[#2D7B6F] hover:bg-[#1E5C52] text-white disabled:opacity-50"
      >
        {isUploading ? (
          <>
            <Upload className="w-4 h-4 mr-2 animate-spin" />
            이미지 업로드 중...
          </>
        ) : isSubmitting ? (
          <>
            <Send className="w-4 h-4 mr-2 animate-pulse" />
            후기 제출 중...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            후기 제출하기
          </>
        )}
      </Button>
    </form>
  )
}
