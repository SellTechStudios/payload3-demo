export type P24PaymentMethodsResponse = {
  data: P24PaymentMethod[]
}

export type P24PaymentMethod = {
  id: number
  imgUrl: string
  mobileImgUrl?: string
  name: string
  status: boolean
}

export type RegisterPaymentRequest = {
  method: number
}

export type RegisterPaymentResponse = {
  data: {
    token: string
  }
  responseCode: number
  error?: string
  code?: number
}

export type SubmitBlikTransactionRequest = {
  token: string
  blikCode: number
}

export type SubmitBlikTransactionResponse = {
  data: {
    orderId: number
    message: string
  }
  responseCode: number
  error?: string
  code?: number
}
