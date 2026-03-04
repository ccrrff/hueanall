'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface NavSection {
  id: string
  label: string
}

interface SectionNavProps {
  sections: NavSection[]
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    if (sections.length === 0) return

    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        {
          threshold: 0.4,
          rootMargin: '-15% 0px -15% 0px',
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80 // header height
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (sections.length === 0) return null

  return (
    <nav
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-0"
      aria-label="섹션 네비게이션"
    >
      {sections.map((section, index) => {
        const isActive = activeSection === section.id
        const isFirst = index === 0
        const isLast = index === sections.length - 1

        return (
          <div key={section.id} className="flex flex-col items-center">
            {/* 상단 선 */}
            {!isFirst && (
              <div
                className={cn(
                  'w-px h-6 transition-colors duration-300',
                  isActive ? 'bg-[#2D7B6F]' : 'bg-[#D1D5DB]'
                )}
              />
            )}

            {/* 도트 + 툴팁 */}
            <div className="group relative flex items-center">
              {/* 툴팁 (오른쪽) */}
              <div className="absolute left-6 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none -translate-x-1 group-hover:translate-x-0 z-10">
                <div className="bg-[#1A1A1A] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                  {section.label}
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 left-[-5px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-[#1A1A1A]" />
              </div>

              {/* 도트 버튼 */}
              <button
                onClick={() => scrollTo(section.id)}
                className={cn(
                  'relative z-10 rounded-full transition-all duration-300 flex-shrink-0',
                  isActive
                    ? 'w-4 h-4 bg-[#2D7B6F] ring-2 ring-[#2D7B6F]/30 ring-offset-2'
                    : 'w-2.5 h-2.5 bg-[#D1D5DB] hover:bg-[#3A9B8C] hover:scale-125'
                )}
                aria-label={`${section.label} 섹션으로 이동`}
                aria-current={isActive ? 'true' : undefined}
              />
            </div>

            {/* 하단 선 */}
            {!isLast && (
              <div
                className={cn(
                  'w-px h-6 transition-colors duration-300',
                  isActive ? 'bg-[#2D7B6F]' : 'bg-[#D1D5DB]'
                )}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
