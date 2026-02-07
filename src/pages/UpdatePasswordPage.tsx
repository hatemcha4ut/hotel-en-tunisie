import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

interface UpdatePasswordPageProps {
  onNavigate: (page: string) => void
}

export function UpdatePasswordPage({ onNavigate }: UpdatePasswordPageProps) {
  const { isPasswordRecovery, updatePassword } = useAuth()
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to login if not in password recovery mode
  useEffect(() => {
    if (!isPasswordRecovery) {
      // If we're not in recovery mode, show a message and redirect
      const timer = setTimeout(() => {
        onNavigate('login')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isPasswordRecovery, onNavigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    if (formData.newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    setIsLoading(true)
    try {
      const { error } = await updatePassword(formData.newPassword)
      
      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Mot de passe mis à jour avec succès!')
      
      // Navigate to login page
      setTimeout(() => {
        onNavigate('login')
      }, 1000)
    } catch (error) {
      toast.error('Une erreur est survenue lors de la mise à jour du mot de passe')
      console.error('Password update error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Show message if not in recovery mode
  if (!isPasswordRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground">
                Vous n'êtes pas autorisé à accéder à cette page.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Redirection vers la page de connexion...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Nouveau mot de passe</CardTitle>
          <CardDescription>
            Choisissez un nouveau mot de passe sécurisé
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Au moins 6 caractères"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Répétez le mot de passe"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
