import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabase'
import { buildAuthUser, type AuthUser } from '@/lib/auth'
import * as authService from '@/lib/auth'

interface AuthContextType {
  session: Session | null
  user: AuthUser | null
  loading: boolean
  isPasswordRecovery: boolean
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false)

  useEffect(() => {
    let supabase
    try {
      supabase = getSupabaseClient()
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error)
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(buildAuthUser(session?.user ?? null))
      setLoading(false)
    }).catch((error) => {
      console.error('Failed to get session:', error)
      setLoading(false)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(buildAuthUser(session?.user ?? null))
      
      // Set password recovery flag when PASSWORD_RECOVERY event fires
      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true)
      } else if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setIsPasswordRecovery(false)
      }
      
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await authService.signUp(email, password)
      return { error }
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Sign up failed') }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await authService.signIn(email, password)
      return { error }
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Sign in failed') }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await authService.signOut()
      return { error }
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Sign out failed') }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await authService.resetPassword(email)
      return { error }
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Password reset failed') }
    }
  }

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await authService.updatePassword(newPassword)
      if (!error) {
        setIsPasswordRecovery(false)
      }
      return { error }
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Password update failed') }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        isPasswordRecovery,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
