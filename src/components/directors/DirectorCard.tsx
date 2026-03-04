import Link from 'next/link'
import Image from 'next/image'
import { Award, ArrowRight } from 'lucide-react'
import type { Director } from '@/types/database'

interface DirectorCardProps {
  director: Director
}

export default function DirectorCard({ director }: DirectorCardProps) {
  const displaySpecialties = director.specialties?.slice(0, 3) ?? []
  const extraCount = (director.specialties?.length ?? 0) - 3

  return (
    <Link
      href={`/directors/${director.id}`}
      className="group block rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#2D7B6F] hover:shadow-lg"
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
          {director.photo_url ? (
            <Image
              src={director.photo_url}
              alt={`${director.name} 장례지도사`}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#2D7B6F] text-3xl font-black text-white">
              {director.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Name & Title */}
        <h3 className="text-lg font-bold text-gray-900">{director.name}</h3>
        <p className="mt-0.5 text-sm text-gray-500">
          {director.title}
          {director.position && ` · ${director.position}`}
        </p>

        {/* Years experience */}
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#2D7B6F]">
          <Award className="h-4 w-4" />
          <span>경력 {director.years_experience}년</span>
        </div>

        {/* Specialties */}
        {displaySpecialties.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {displaySpecialties.map((s) => (
              <span
                key={s}
                className="rounded-full bg-[#F0F9F7] px-2.5 py-1 text-xs text-[#2D7B6F]"
              >
                {s}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                +{extraCount}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-5 flex items-center gap-1 text-sm font-medium text-[#2D7B6F] opacity-0 transition-opacity group-hover:opacity-100">
          프로필 보기
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}
