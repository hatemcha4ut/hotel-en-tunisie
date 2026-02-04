import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { List, User } from '@phosphor-icons/react'
import { useApp } from '@/contexts/AppContext'
import { t } from '@/lib/translations'
import { AuthDialog, type AuthUser } from '@/components/AuthDialog'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import hotelCitiesLogo from '@/assets/images/logo hotel.com.tn.svg'
import { getSupabaseClient } from '@/lib/supabase'

const buildAuthUser = (user: SupabaseUser | null): AuthUser | null => {
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

export function Navbar() {
  const { language, setLanguage } = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const handleClick = () => {
      if (mobile) {
        setIsOpen(false)
      }
    }

    return (
      <div className={mobile ? 'flex flex-col gap-4' : 'hidden md:flex items-center gap-6'}>
        <a 
          href="#hotels" 
          className="text-foreground hover:text-primary transition-colors font-medium"
          onClick={handleClick}
        >
          {t('nav.hotels', language)}
        </a>
        <a 
          href="#destinations" 
          className="text-foreground hover:text-primary transition-colors font-medium"
          onClick={handleClick}
        >
          {t('nav.destinations', language)}
        </a>
        <a 
          href="#deals" 
          className="text-foreground hover:text-primary transition-colors font-medium"
          onClick={handleClick}
        >
          {t('nav.deals', language)}
        </a>
        <a 
          href="#about" 
          className="text-foreground hover:text-primary transition-colors font-medium"
          onClick={handleClick}
        >
          {t('nav.about', language)}
        </a>
        <a 
          href="#contact" 
          className="text-foreground hover:text-primary transition-colors font-medium"
          onClick={handleClick}
        >
          {t('nav.contact', language)}
        </a>
      </div>
    )
  }

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    try {
      const supabase = getSupabaseClient()
      supabase.auth.getUser().then(({ data, error }) => {
        if (error) {
          console.error('Erreur lors du chargement de la session', error)
          return
        }
        setCurrentUser(buildAuthUser(data.user))
      })
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setCurrentUser(buildAuthUser(session?.user ?? null))
      })
      unsubscribe = () => listener.subscription.unsubscribe()
    } catch (error) {
      console.error('Erreur lors du chargement de la session', error)
    }
    return () => {
      unsubscribe?.()
    }
  }, [])

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user)
  }

  const handleSignOut = async () => {
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      setCurrentUser(null)
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3">
              <img src={hotelCitiesLogo} alt="www.hotel.com.tn" className="h-10 w-10 object-contain" />
            </a>
            <NavLinks />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg p-1">
              {(['fr', 'en', 'ar'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    language === lang
                      ? 'bg-card text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2" onClick={() => currentUser ? handleSignOut() : setAuthDialogOpen(true)}>
              <User size={18} />
              {currentUser ? currentUser.name : t('nav.signIn', language)}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <List size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <NavLinks mobile />
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium">Langue:</span>
                      <div className="flex gap-2">
                        {(['fr', 'en', 'ar'] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              language === lang
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {lang.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={() => {
                      setIsOpen(false)
                      if (!currentUser) setAuthDialogOpen(true)
                      else handleSignOut()
                    }}>
                      <User size={18} className="mr-2" />
                      {currentUser ? currentUser.name : t('nav.signIn', language)}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        onAuthSuccess={handleAuthSuccess}
      />
    </nav>
  )
}
