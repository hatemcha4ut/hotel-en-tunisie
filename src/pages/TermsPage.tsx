import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Conditions Générales</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Acceptation des Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              En utilisant les services d'American Tours, vous acceptez d'être lié par les présentes conditions générales. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Réservations d'Hôtel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <strong>2.1 Confirmation:</strong> Toutes les réservations sont sujettes à confirmation. Vous recevrez une confirmation par email une fois votre réservation validée.
            </p>
            <p>
              <strong>2.2 Paiement:</strong> Le paiement intégral est requis au moment de la réservation. Les prix sont indiqués en dinars tunisiens (TND) et incluent toutes les taxes applicables.
            </p>
            <p>
              <strong>2.3 Disponibilité:</strong> Les prix et la disponibilité sont susceptibles de changer sans préavis jusqu'à ce que la réservation soit confirmée.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Annulation et Modification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <strong>3.1 Politique d'annulation:</strong> Les politiques d'annulation varient selon l'hôtel réservé. Les détails spécifiques sont communiqués lors de la réservation.
            </p>
            <p>
              <strong>3.2 Modifications:</strong> Les demandes de modification sont soumises à disponibilité et peuvent entraîner des frais supplémentaires.
            </p>
            <p>
              <strong>3.3 Remboursements:</strong> Les remboursements, le cas échéant, seront effectués selon la politique d'annulation applicable et peuvent prendre 10-15 jours ouvrables.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Responsabilités du Client</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <strong>4.1 Informations exactes:</strong> Vous vous engagez à fournir des informations exactes et complètes lors de la réservation.
            </p>
            <p>
              <strong>4.2 Documents de voyage:</strong> Il est de votre responsabilité de vous assurer que vous disposez de tous les documents nécessaires (passeport, visa, etc.).
            </p>
            <p>
              <strong>4.3 Comportement:</strong> Vous vous engagez à respecter les règles et règlements de l'hôtel réservé.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Limitation de Responsabilité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              American Tours agit en tant qu'intermédiaire entre vous et les prestataires de services hôteliers. Nous ne sommes pas responsables des actes, erreurs, omissions ou défaillances des hôtels ou autres fournisseurs de services.
            </p>
            <p>
              Notre responsabilité est limitée au montant payé pour la réservation concernée.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Prix et Paiement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Tous les prix affichés sont en dinars tunisiens (TND) et incluent les taxes applicables. Les prix peuvent changer sans préavis jusqu'à la confirmation de la réservation.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Protection des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Vos données personnelles sont traitées conformément à notre Politique de Confidentialité. Nous utilisons vos informations uniquement pour traiter vos réservations et vous fournir nos services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Pour toute question concernant ces conditions générales, veuillez nous contacter:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email: resamericantours@gmail.com</li>
              <li>Téléphone / WhatsApp: +216 51 613 888</li>
              <li>Adresse: American Tours HQ, Tunisia</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
