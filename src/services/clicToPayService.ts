export const MERCHANT_ID = process.env.REACT_APP_CTP_MERCHANT_ID ?? 'AMERICAN-TOURS'
export const ACTION_URL =
  process.env.REACT_APP_CTP_ACTION_URL ?? 'https://test.clictopay.com.tn/payment/rest/register.do'
export const RETURN_URL =
  process.env.REACT_APP_CTP_RETURN_URL ?? 'https://www.hotel.com.tn/payment/success'
export const FAIL_URL = process.env.REACT_APP_CTP_FAIL_URL ?? 'https://www.hotel.com.tn/payment/fail'

const TUNISIAN_DINAR_CODE = 788
const toMillimes = (value: number) => Math.round(value * 1000)

const assertValidAmount = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error('Invalid payment amount')
  }
}

export const generatePaymentParams = (orderId: string, amount: number) => {
  assertValidAmount(amount)
  const password = process.env.REACT_APP_CTP_PASSWORD

  if (!password) {
    throw new Error('Missing ClicToPay password')
  }

  return {
    userName: MERCHANT_ID,
    password,
    orderNumber: orderId,
    amount: toMillimes(amount),
    currency: TUNISIAN_DINAR_CODE,
    returnUrl: RETURN_URL,
    failUrl: FAIL_URL,
  }
}
