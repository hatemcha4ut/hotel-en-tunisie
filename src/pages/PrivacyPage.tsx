import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Politique de Confidentialité</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              American Tours s'engage à protéger la confidentialité de vos informations personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos données personnelles.
            </p>
            <p>
              En utilisant nos services, vous consentez aux pratiques décrites dans cette politique.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Informations Collectées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <strong>2.1 Informations que vous nous fournissez:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Nationalité</li>
              <li>Préférences de voyage et demandes spéciales</li>
              <li>Informations de paiement (traitées de manière sécurisée)</li>
            </ul>
            <p className="mt-3">
              <strong>2.2 Informations collectées automatiquement:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Adresse IP</li>
              <li>Type de navigateur</li>
              <li>Pages visitées sur notre site</li>
              <li>Durée de la visite</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Utilisation des Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Nous utilisons vos informations personnelles pour:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Traiter et confirmer vos réservations d'hôtel</li>
              <li>Communiquer avec vous concernant vos réservations</li>
              <li>Répondre à vos questions et demandes</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
              <li>Vous envoyer des informations promotionnelles (avec votre consentement)</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Partage des Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <strong>4.1 Avec les hôtels:</strong> Nous partageons les informations nécessaires avec les hôtels pour confirmer et gérer vos réservations.
            </p>
            <p>
              <strong>4.2 Prestataires de services:</strong> Nous pouvons partager vos informations avec des prestataires de services tiers qui nous aident à exploiter notre entreprise (processeurs de paiement, services d'hébergement, etc.).
            </p>
            <p>
              <strong>4.3 Obligations légales:</strong> Nous pouvons divulguer vos informations si la loi l'exige ou pour protéger nos droits.
            </p>
            <p>
              <strong>Nous ne vendons jamais vos informations personnelles à des tiers.</strong>
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Sécurité des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>
            <p>
              Les informations de paiement sont traitées via des passerelles de paiement sécurisées conformes aux normes de l'industrie.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Conservation des Données</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Nous conservons vos informations personnelles aussi longtemps que nécessaire pour:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fournir nos services</li>
              <li>Respecter nos obligations légales</li>
              <li>Résoudre les litiges</li>
              <li>Faire appliquer nos accords</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Vos Droits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Vous avez le droit de:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Accéder à vos informations personnelles</li>
              <li>Corriger des informations inexactes</li>
              <li>Demander la suppression de vos données</li>
              <li>Vous opposer au traitement de vos données</li>
              <li>Retirer votre consentement à tout moment</li>
              <li>Demander la portabilité de vos données</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à: resamericantours@gmail.com
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Mémoriser vos préférences</li>
              <li>Analyser l'utilisation du site</li>
              <li>Personnaliser votre expérience</li>
            </ul>
            <p className="mt-3">
              Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Modifications de la Politique</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur cette page. Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>10. Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, contactez-nous:
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
