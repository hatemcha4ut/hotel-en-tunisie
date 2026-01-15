import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Envelope, Phone, MapPin } from '@phosphor-icons/react'

export function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Contactez-nous</h1>
        
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Envelope size={24} className="text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href="mailto:resamericantours@gmail.com" className="text-primary hover:underline">
                resamericantours@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone size={24} className="text-primary" />
                Téléphone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href="tel:+21651613888" className="text-primary hover:underline">
                +216 51 613 888
              </a>
              <p className="text-sm text-muted-foreground mt-1">WhatsApp Business</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin size={24} className="text-primary" />
                Adresse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">American Tours HQ</p>
              <p className="text-sm">Tunisia</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>À propos d'American Tours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              American Tours est votre facilitateur de loisir en Tunisie. Nous nous spécialisons dans la réservation d'hôtels à travers toute la Tunisie, offrant à nos clients des expériences de voyage inoubliables.
            </p>
            <p>
              Notre équipe dévouée est disponible pour vous aider à planifier votre séjour idéal, que ce soit pour des vacances en famille, un voyage d'affaires ou une escapade romantique.
            </p>
            <p>
              N'hésitez pas à nous contacter pour toute question ou demande de réservation. Nous sommes là pour vous accompagner dans chaque étape de votre voyage.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
