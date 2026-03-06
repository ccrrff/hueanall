'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import SideActions from './SideActions'
import FloatingCta from './FloatingCta'

export default function PublicLayoutParts() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return null
  return (
    <>
      <Header />
      <Footer />
      <SideActions />
      <FloatingCta />
    </>
  )
}
