// Module-level cache for cities to handle 304 Not Modified responses and errors
// When server returns HTTP 304 Not Modified, we reuse this cached data
// Also handles cases where fetch/parsing fails but we have previously cached data
let cachedCitiesData: City[] | null = null

export const fetchCities = async (): Promise<City[]> => {
  const PUBLIC_API_ENDPOINT = 'https://api.hotel.com.tn/static/cities'
  
  try {
    // Force a fresh response (avoid 304 with empty body)
    const response = await fetch(PUBLIC_API_ENDPOINT, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    })

    // Handle 304 Not Modified: reuse cached cities if available
    if (response.status === 304) {
      if (cachedCitiesData) {
        if (import.meta.env.DEV) {
          console.log('[Inventory] HTTP 304 Not Modified - using cached cities', {
            cachedCount: cachedCitiesData.length,
            reason: 'Server returned 304, data unchanged',
          })
        }
        return cachedCitiesData
      }

      // If 304 and no cache, force a reload once
      const reloadResponse = await fetch(PUBLIC_API_ENDPOINT, {
        method: 'GET',
        cache: 'reload',
        headers: {
          'Accept': 'application/json',
        },
      })
      if (!reloadResponse.ok) {
        throw new Error(`HTTP reload error! status: ${reloadResponse.status}`)
      }
      const reloadData: unknown = await reloadResponse.json()
      const reloadItems = (reloadData as Record<string, unknown>).items
      if (!Array.isArray(reloadItems)) {
        throw new Error('Invalid cities payload after reload: "items" is not an array')
      }
      const reloadCities = reloadItems as City[]
      cachedCitiesData = reloadCities
      return reloadCities
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const rawData: unknown = await response.json()

    if (!rawData || typeof rawData !== 'object') {
      throw new Error('Invalid cities payload: response is not an object')
    }

    const data = rawData as Partial<PublicCitiesApiResponse> & Record<string, unknown>
    const items = (data as Record<string, unknown>).items

    if (!Array.isArray(items)) {
      throw new Error('Invalid cities payload: "items" is not an array')
    }

    if (!items.every((item) => item && typeof item === 'object')) {
      throw new Error('Invalid cities payload: "items" must contain objects')
    }

    const cities = items as City[]
    cachedCitiesData = cities

    if (import.meta.env.DEV) {
      console.log(`[Inventory] cities loaded: ${cities.length}`, {
        source: data.source,
        cached: data.cached,
        fetchedAt: data.fetchedAt,
        etag: response.headers.get('ETag'),
        cacheControl: response.headers.get('Cache-Control'),
      })
    }
    
    return cities
  } catch (error) {
    if (cachedCitiesData) {
      if (import.meta.env.DEV) {
        console.log('[Inventory] Fetch/parse failed, using cached cities from module cache', {
          error: error instanceof Error ? error.message : error,
          cachedCount: cachedCitiesData.length,
          reason: 'Using cached cities due to fetch/parse error',
        })
      }
      return cachedCitiesData
    }
    
    if (import.meta.env.DEV) {
      console.error('[Inventory] Failed to fetch cities from public API:', {
        error: error instanceof Error ? error.message : error,
        endpoint: PUBLIC_API_ENDPOINT,
        timestamp: new Date().toISOString(),
        hasCachedData: cachedCitiesData !== null,
      })
    }
    
    // Re-throw to trigger fallback logic in useCities hook
    throw error
  }
}
