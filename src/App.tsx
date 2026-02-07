import { useState, useEffect, useCallback } from 'react'
import { Toaster } from 'sonner'
import { AppProvider } from '@/contexts/AppContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { SearchResultsPage } from '@/pages/SearchResultsPage'
import { HotelDetailsPage } from '@/pages/HotelDetailsPage'
import { BookingPage } from '@/pages/BookingPage'
import { ConfirmationPage } from '@/pages/ConfirmationPage'
import { ContactPage } from '@/pages/ContactPage'
import { TermsPage } from '@/pages/TermsPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { AdminDashboard } from '@/pages/AdminDashboard'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { UpdatePasswordPage } from '@/pages/UpdatePasswordPage'
import { Hotel, Room } from '@/types'
import type { SearchHotelsResult } from '@/services/searchHotels'

type Page = 'home' | 'search' | 'hotel' | 'booking' | 'confirmation' | 'contact' | 'terms' | 'privacy' | 'admin' | 'login' | 'register' | 'forgot-password' | 'update-password'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [selectedHotelId, setSelectedHotelId] = useState<string>('')
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [searchResults, setSearchResults] = useState<SearchHotelsResult | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([])
  const [bookingReference, setBookingReference] = useState<string>('')

  // Helper function to check if hash is for admin page
  const isAdminHash = useCallback((hash: string) => {
    const lowerHash = hash.toLowerCase()
    return lowerHash === '#/admin' || lowerHash === '#/admin/' || lowerHash === '#admin'
  }, [])

  // Helper function to get page from hash
  const getPageFromHash = useCallback((hash: string): Page | null => {
    const lowerHash = hash.toLowerCase()
    if (isAdminHash(lowerHash)) return 'admin'
    if (lowerHash === '#/login' || lowerHash === '#login') return 'login'
    if (lowerHash === '#/register' || lowerHash === '#register') return 'register'
    if (lowerHash === '#/forgot-password' || lowerHash === '#forgot-password') return 'forgot-password'
    if (lowerHash === '#/update-password' || lowerHash === '#update-password') return 'update-password'
    return null
  }, [isAdminHash])

  // Helper function to sync page state with URL hash
  const syncPageWithHash = useCallback(() => {
    const hash = window.location.hash
    const pageFromHash = getPageFromHash(hash)
    if (pageFromHash) {
      setCurrentPage(pageFromHash)
    } else {
      // If hash is cleared/changed to non-special page, update accordingly
      setCurrentPage((prevPage) => {
        const prevPageHash = getPageFromHash('#/' + prevPage)
        if (prevPageHash && !getPageFromHash(hash)) {
          return 'home'
        }
        return prevPage
      })
    }
  }, [getPageFromHash])

  // Set up hash-based navigation on mount and listen for hash changes
  useEffect(() => {
    // Sync on initial load
    syncPageWithHash()

    // Listen for hash changes
    const handleHashChange = () => {
      syncPageWithHash()
    }
    window.addEventListener('hashchange', handleHashChange)

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [syncPageWithHash])

  const handleSearch = () => {
    setCurrentPage('search')
  }

  const handleViewHotel = (hotelId: string) => {
    setSelectedHotelId(hotelId)
    setCurrentPage('hotel')
  }

  const handleBookRoom = (hotel: Hotel, room: Room) => {
    setSelectedHotel(hotel)
    setSelectedRoom(room)
    setSelectedRooms([room])
    setCurrentPage('booking')
  }
  
  const handleBookRooms = (hotel: Hotel, rooms: Room[]) => {
    setSelectedHotel(hotel)
    setSelectedRooms(rooms)
    setSelectedRoom(rooms[0])
    setCurrentPage('booking')
  }

  const handleBookingComplete = (reference: string) => {
    setBookingReference(reference)
    setCurrentPage('confirmation')
  }

  const resetSearchState = () => {
    setCurrentPage('home')
    setSelectedHotelId('')
    setSelectedHotel(null)
    setSelectedRoom(null)
    setSelectedRooms([])
    setBookingReference('')
    setSearchResults(null)
  }

  const handleBackToHome = () => {
    resetSearchState()
  }
  
  const handleNewSearch = () => {
    resetSearchState()
  }

  const handleNavigateToPage = (page: string) => {
    const specialPages: Page[] = ['admin', 'login', 'register', 'forgot-password', 'update-password']
    
    if (specialPages.includes(page as Page)) {
      // For special pages, set the hash (hashchange event will update state)
      window.location.hash = '/' + page
    } else {
      // When navigating away from special pages, clear the hash and set state directly
      const currentHash = window.location.hash
      if (getPageFromHash(currentHash)) {
        // Clear the hash first
        window.location.hash = ''
      }
      // Always set the page state for non-special pages
      setCurrentPage(page as Page)
    }
  }

  return (
    <AppProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          {currentPage !== 'confirmation' && <Navbar />}
          
          <main className="flex-1">
            {currentPage === 'home' && (
              <HomePage onSearch={handleSearch} onViewHotel={handleViewHotel} onResultsFound={setSearchResults} />
            )}
            
            {currentPage === 'search' && (
              <SearchResultsPage
                onViewHotel={handleViewHotel}
                onBack={handleBackToHome}
                onNewSearch={handleNewSearch}
                initialResults={searchResults ?? undefined}
              />
            )}
            
            {currentPage === 'hotel' && selectedHotelId && (
              <HotelDetailsPage
                hotelId={selectedHotelId}
                onBack={() => setCurrentPage('search')}
                onNewSearch={handleNewSearch}
                onBookRoom={(room) => {
                  const hotel = selectedHotel
                  if (!hotel) {
                    import('@/lib/api').then(({ api }) => {
                      api.getHotelDetails(selectedHotelId).then((h) => {
                        if (h) handleBookRoom(h, room)
                      })
                    })
                  } else {
                    handleBookRoom(hotel, room)
                  }
                }}
                onBookRooms={(rooms) => {
                  const hotel = selectedHotel
                  if (!hotel) {
                    import('@/lib/api').then(({ api }) => {
                      api.getHotelDetails(selectedHotelId).then((h) => {
                        if (h) handleBookRooms(h, rooms)
                      })
                    })
                  } else {
                    handleBookRooms(hotel, rooms)
                  }
                }}
              />
            )}
            
            {currentPage === 'booking' && selectedHotel && selectedRooms.length > 0 && (
              <BookingPage
                hotel={selectedHotel}
                room={selectedRoom!}
                rooms={selectedRooms}
                onBack={() => setCurrentPage('hotel')}
                onComplete={handleBookingComplete}
                onNewSearch={handleNewSearch}
              />
            )}
            
            {currentPage === 'confirmation' && (
              <ConfirmationPage
                reference={bookingReference}
                onHome={handleBackToHome}
                onNewSearch={handleNewSearch}
              />
            )}
            
            {currentPage === 'contact' && <ContactPage />}
            
            {currentPage === 'terms' && <TermsPage />}
            
            {currentPage === 'privacy' && <PrivacyPage />}

            {currentPage === 'login' && <LoginPage onNavigate={handleNavigateToPage} />}

            {currentPage === 'register' && <RegisterPage onNavigate={handleNavigateToPage} />}

            {currentPage === 'forgot-password' && <ForgotPasswordPage onNavigate={handleNavigateToPage} />}

            {currentPage === 'update-password' && <UpdatePasswordPage onNavigate={handleNavigateToPage} />}

            {currentPage === 'admin' && (
              <ProtectedRoute onNavigate={handleNavigateToPage}>
                <AdminDashboard />
              </ProtectedRoute>
            )}
          </main>
          
          {currentPage !== 'confirmation' && <Footer onNavigate={handleNavigateToPage} />}
        </div>
        
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </AppProvider>
  )
}

export default App
