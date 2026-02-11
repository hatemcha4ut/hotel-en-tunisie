/**
 * Get the API base URL from environment or use default
 */
export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL || 'https://api.hotel.com.tn'
}

/**
 * Detects if an error originates from a Supabase Edge Function failure
 * and returns a user-friendly message.
 */
export function getEdgeFunctionErrorMessage(err: unknown): string | null {
  const message = err instanceof Error ? err.message : String(err)
  const name = err instanceof Error ? err.name : ''
  
  const isEdgeFunctionError =
    message.includes('non-2xx status code') ||
    message.includes('FunctionsFetchError') ||
    message.includes('FunctionsHttpError') || 
    message.includes('FunctionsRelayError') ||
    name === 'FunctionsFetchError' ||
    name === 'FunctionsHttpError' ||
    name === 'FunctionsRelayError'
  
  if (!isEdgeFunctionError) return null
  
  return 'Le service est temporairement indisponible. Veuillez réessayer dans quelques instants.'
}

export function isNetworkError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err)
  return (
    message.includes('NetworkError') ||
    message.includes('Failed to fetch') ||
    message.includes('Network request failed') ||
    message.includes('net::ERR_')
  )
}

/**
 * Parse HTTP error response to extract user-friendly message
 */
export async function parseHttpError(response: Response): Promise<string> {
  try {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      // Check for various error message fields
      if (data.error) return typeof data.error === 'string' ? data.error : 'Une erreur est survenue'
      if (data.message) return data.message
      if (data.details) return data.details
    }
  } catch {
    // Failed to parse JSON, fall through to status-based messages
  }
  
  // Return status-based error messages
  switch (response.status) {
    case 400:
      return 'Paramètres de recherche invalides. Veuillez vérifier vos critères.'
    case 404:
      return 'Ressource non trouvée.'
    case 500:
    case 502:
    case 503:
    case 504:
      return 'Service temporairement indisponible. Veuillez réessayer dans quelques instants.'
    default:
      return `Erreur ${response.status}: ${response.statusText || 'Une erreur est survenue'}`
  }
}

export function getUserFriendlyErrorMessage(err: unknown, context: 'search' | 'cities' | 'booking' | 'hotel-details'): string {
  const edgeMsg = getEdgeFunctionErrorMessage(err)
  if (edgeMsg) {
    switch (context) {
      case 'search':
        return 'Le service de recherche est temporairement indisponible. Veuillez réessayer dans quelques instants.'
      case 'cities':
        return 'Impossible de charger les villes depuis le serveur. Les villes par défaut sont affichées.'
      case 'booking':
        return 'Le service de réservation est temporairement indisponible. Veuillez réessayer dans quelques instants.'
      case 'hotel-details':
        return 'Impossible de charger les détails de l\'hôtel. Veuillez réessayer.'
    }
  }
  
  if (isNetworkError(err)) {
    return 'Erreur de connexion. Vérifiez votre connexion internet et réessayez.'
  }
  
  // Return original message as fallback
  return err instanceof Error && err.message ? err.message : 'Une erreur inattendue est survenue.'
}
