import type { Review } from '@/types/database'

type LocalReview = Review & { directors: { name: string } | null }

// In-memory store - resets on server restart (ephemeral, for demo mode)
const store: {
  reviews: LocalReview[]
  counter: number
} = {
  reviews: [],
  counter: 0,
}

export function addLocalReview(data: {
  customer_name: string
  director_id?: string | null
  rating: number
  content: string
  image_urls?: string[]
}): string {
  store.counter += 1
  const id = `local-${Date.now()}-${store.counter}`
  const now = new Date().toISOString()
  store.reviews.push({
    id,
    customer_name: data.customer_name,
    director_id: data.director_id ?? null,
    rating: data.rating,
    content: data.content,
    image_urls: data.image_urls ?? [],
    status: 'pending',
    admin_note: null,
    created_at: now,
    updated_at: now,
    directors: null,
  })
  return id
}

export function getLocalReviews(status?: string): LocalReview[] {
  if (!status) return [...store.reviews]
  return store.reviews.filter((r) => r.status === status)
}

export function updateLocalReviewStatus(
  id: string,
  status: 'approved' | 'rejected'
): void {
  const review = store.reviews.find((r) => r.id === id)
  if (review) {
    review.status = status
    review.updated_at = new Date().toISOString()
  }
}

export function getLocalReviewCounts(): {
  pending: number
  approved: number
  rejected: number
} {
  return {
    pending: store.reviews.filter((r) => r.status === 'pending').length,
    approved: store.reviews.filter((r) => r.status === 'approved').length,
    rejected: store.reviews.filter((r) => r.status === 'rejected').length,
  }
}
