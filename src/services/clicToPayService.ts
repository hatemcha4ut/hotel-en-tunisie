export interface ClicToPayRedirectParams {
  actionUrl: string
  params: Record<string, string>
}

const CLIC_TO_PAY_URL = 'https://www.clictopay.com.tn'
const CLIC_TO_PAY_USERNAME = 'merchant_user'
const CLIC_TO_PAY_PASSWORD = 'merchant_password'

export const clicToPayService = {
  getRedirectParams(amount: number, orderId: string): ClicToPayRedirectParams {
    return {
      actionUrl: CLIC_TO_PAY_URL,
      params: {
        userName: CLIC_TO_PAY_USERNAME,
        password: CLIC_TO_PAY_PASSWORD,
        amount: amount.toFixed(3),
        orderId,
        currency: 'TND',
      },
    }
  },
}
