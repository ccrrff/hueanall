import { cookies } from 'next/headers'
import { createHmac } from 'crypto'

const ADMIN_ID = process.env.ADMIN_ID || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hueanall2024!'
const AUTH_SECRET = process.env.AUTH_SECRET || 'hueanall-default-secret-key'
const COOKIE_NAME = 'admin_session'
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

function sign(payload: string): string {
  return createHmac('sha256', AUTH_SECRET).update(payload).digest('hex')
}

export function verifyCredentials(id: string, password: string): boolean {
  return id === ADMIN_ID && password === ADMIN_PASSWORD
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString()
  const hmac = sign(timestamp)
  return `${timestamp}.${hmac}`
}

export function verifySessionToken(token: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [timestamp, hmac] = parts
  const ts = parseInt(timestamp, 10)
  if (isNaN(ts)) return false
  if (Date.now() - ts > TOKEN_TTL_MS) return false
  const expected = sign(timestamp)
  return hmac === expected
}

export async function getAdminSession(): Promise<{ authenticated: boolean; adminId: string }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (token && verifySessionToken(token)) {
      return { authenticated: true, adminId: ADMIN_ID }
    }
  } catch {
    // cookies() can throw in non-request context
  }
  return { authenticated: false, adminId: '' }
}

export async function setAdminSession(): Promise<void> {
  const token = createSessionToken()
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours in seconds
    path: '/',
  })
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
