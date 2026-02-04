import type { User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  phone: string
  name: string
}

export const buildAuthUser = (user: User | null): AuthUser | null => {
  if (!user) {
    return null
  }
  const metadata = (user.user_metadata ?? {}) as {
    first_name?: string
    last_name?: string
    phone?: string
    name?: string
  }
  const fallbackName = user.email ? user.email.split('@')[0] : ''
  const firstName = metadata.first_name ?? ''
  const lastName = metadata.last_name ?? ''
  return {
    id: user.id,
    email: user.email ?? '',
    phone: user.phone ?? metadata.phone ?? '',
    name: `${firstName} ${lastName}`.trim() || metadata.name || fallbackName,
  }
}
