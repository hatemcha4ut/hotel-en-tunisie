import { createContext, useContext, useState, ReactNode } from 'react'
import { SearchParams, Language } from '@/types'

interface AppContextType {
  language: Language
  setLanguage: (lang: Language) => void
  searchParams: SearchParams
  setSearchParams: (params: SearchParams) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const getDefaultDates = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  return { checkIn: today, checkOut: tomorrow }
}

const defaultSearchParams: SearchParams = {
  searchMode: 'city',
  cityId: undefined,
  hotelName: undefined,
  ...getDefaultDates(),
  rooms: [
    {
      adults: 2,
      children: []
    }
  ],
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams)

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
