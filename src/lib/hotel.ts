import type { MyGoHotel } from '@/types'

export const MYGO_BASE_URL = 'https://admin.mygo.co'

export const getMyGoHotelIdentifier = (hotel: MyGoHotel): string => {
  const fallback = [hotel.Name, hotel.Address, hotel.MinPrice]
    .filter((value) => value !== undefined && value !== null && value !== '')
    .join('-')
  return String(hotel.Id ?? fallback)
}
