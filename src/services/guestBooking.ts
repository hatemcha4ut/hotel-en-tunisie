import { getSupabaseClient } from '@/lib/supabase'
import type { GuestDetails, Hotel, Room, SearchParams } from '@/types'

export interface GuestBookingPayload {
  hotel: Hotel
  room: Room
  rooms: Room[]
  searchParams: SearchParams
  guestDetails: GuestDetails
  nights: number
  totalAmount: number
}

interface GuestBookingResponse {
  paymentUrl?: string
  payment_url?: string
  booking_id?: string
  reference?: string
}

const resolvePaymentUrl = (payload: GuestBookingResponse | null) =>
  payload?.paymentUrl ?? payload?.payment_url

export const createGuestBooking = async (payload: GuestBookingPayload) => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.functions.invoke<GuestBookingResponse>('create-booking', {
    body: payload,
  })

  if (error) {
    throw error
  }

  const paymentUrl = resolvePaymentUrl(data ?? null)
  if (!paymentUrl) {
    throw new Error('URL de paiement manquante.')
  }

  window.location.assign(paymentUrl)

  return data ?? null
}
