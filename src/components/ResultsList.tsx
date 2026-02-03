import { HotelCard } from '@/components/HotelCard'
import type { Hotel, MyGoHotel } from '@/types'
import { getMyGoHotelIdentifier } from '@/lib/hotel'

interface ResultsListProps {
  hotels: Array<Hotel | MyGoHotel>
  onViewHotel: (hotelId: string) => void
}

export function ResultsList({ hotels, onViewHotel }: ResultsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {hotels.map((hotel) => {
        const key = 'id' in hotel ? hotel.id : getMyGoHotelIdentifier(hotel)
        return (
          <HotelCard
            key={key}
            hotel={hotel}
            onViewDetails={onViewHotel}
          />
        )
      })}
    </div>
  )
}
