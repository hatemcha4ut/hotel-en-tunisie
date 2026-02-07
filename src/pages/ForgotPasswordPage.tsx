import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Veuillez entrer votre email')
      return
    }

    if (countdown > 0) {
      toast.error(`Veuillez attendre ${countdown} secondes avant de réessayer`)
      return
    }

    setIsLoading(true)
    try {
      const { error } = await resetPassword(email)
      
      // Always show the same message regardless of success or error
      // This prevents email enumeration attacks
      toast.success('Si le compte existe, un email a été envoyé.')
      
      // Start 60 second countdown
      setCountdown(60)
      
      // Clear the email field
      setEmail('')
    } catch (error) {
      // Still show the same message even on error
      toast.success('Si le compte existe, un email a été envoyé.')
      setCountdown(60)
      console.error('Password reset error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
          <CardDescription>
            Entrez votre email pour recevoir un lien de réinitialisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || countdown > 0}
              />
            </div>

            {countdown > 0 && (
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                Vous pourrez demander un nouveau lien dans {countdown} secondes
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || countdown > 0}
            >
              {countdown > 0 
                ? `Attendre (${countdown}s)` 
                : isLoading 
                  ? 'Envoi...' 
                  : 'Envoyer le lien'}
            </Button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-primary hover:underline font-medium"
              >
                Retour à la connexion
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
