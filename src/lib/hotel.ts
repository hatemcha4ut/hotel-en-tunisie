import type { MyGoHotel } from '@/types'

export const getMyGoHotelIdentifier = (hotel: MyGoHotel): string => {
  return String(hotel.Id ?? `${hotel.Name}-${hotel.Address}`)
}
