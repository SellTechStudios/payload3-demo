import crypto from 'crypto'
import { type PayloadHandler } from 'payload'
import {
  RegisterPaymentRequest,
  RegisterPaymentResponse,
  SubmitBlikTransactionRequest,
  SubmitBlikTransactionResponse,
} from './checkout.types'

// Configuration
const merchantID = Number(process.env.P24_MERCHANT_ID)
const crcKey = process.env.P24_CRC_KEY || ''
const apiKey = process.env.P24_API_KEY || ''

const paymnetMethodsHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload } = req

  try {
    const methods = await getP24PaymentMethods()

    return Response.json(methods)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}

const initTransactionHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload } = req
  const body = req.json ? ((await req.json()) as unknown as RegisterPaymentRequest) : null

  if (!body) throw new Error('Request body is null')

  const sessionId = crypto.randomBytes(20).toString('hex')
  const amount = 100
  const userEmail = 'karol.barkowski@gmail.com'

  try {
    const result = await initTransaction(body.method, amount, sessionId, userEmail)

    return Response.json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}

const submitBlikCodeHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload } = req
  const body = req.json ? ((await req.json()) as unknown as SubmitBlikTransactionRequest) : null

  try {
    if (!body) {
      throw new Error('Request body is null')
    }
    const result = await submitBlikCode(body.token, body.blikCode)

    return Response.json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}

const p24NotificationHandler: PayloadHandler = async (req): Promise<Response> => {
  const body = req.text ? await req.text() : ''

  return Response.json(body)
}

async function getP24PaymentMethods() {
  const base64AuthKey = buildApiKey()

  const response = await fetch(
    'https://sandbox.przelewy24.pl/api/v1/payment/methods/pl?amount=150&subgroup=1&currency=PLN',
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64AuthKey}`,
      },
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to fetch payment methods: ${response.status} ${errorText}`)
  }

  const json = await response.json()

  if (!json?.data || !Array.isArray(json.data)) {
    throw new Error(`Invalid response from P24: ${JSON.stringify(json)}`)
  }

  return json.data.filter((m) => m.status === true)
}
async function initTransaction(
  paymentMethod: number,
  amount: number,
  sessionId: string,
  userEmail: string,
) {
  const base64AuthKey = buildApiKey()

  const crcHashParams = {
    sessionId: sessionId,
    merchantId: merchantID,
    amount: amount,
    currency: 'PLN',
    crc: crcKey,
  }
  const crcJsonString = JSON.stringify(crcHashParams)
  const hash = crypto.createHash('sha384').update(crcJsonString).digest('hex')

  try {
    const response = await fetch('https://sandbox.przelewy24.pl/api/v1/transaction/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64AuthKey}`,
      },
      body: JSON.stringify({
        merchantId: merchantID,
        posId: merchantID,
        sessionId: sessionId,
        amount: amount,
        currency: 'PLN',
        description: 'Test order',
        email: userEmail,
        country: 'PL',
        language: 'pl',
        method: paymentMethod,
        waitForResult: true,
        sign: hash,
        encoding: 'UTF-8',
        urlReturn: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
        urlStatus: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
      }),
    })

    return (await response.json()) as unknown as RegisterPaymentResponse
  } catch (error) {
    console.error(error)
    return null
  }
}

async function submitBlikCode(token: string, blikCode: number) {
  const base64AuthKey = buildApiKey()

  const bodyJson = JSON.stringify({
    token,
    blikCode,
  })
  console.log(bodyJson)

  try {
    const response = await fetch(
      'https://sandbox.przelewy24.pl/api/v1/paymentMethod/blik/chargeByCode',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64AuthKey}`,
        },
        body: bodyJson,
      },
    )

    return (await response.json()) as unknown as SubmitBlikTransactionResponse
  } catch (error) {
    console.error(error)
    return null
  }
}

const buildApiKey = () => btoa(`${merchantID}:${apiKey}`)

export {
  initTransactionHandler,
  p24NotificationHandler,
  paymnetMethodsHandler,
  submitBlikCodeHandler,
}
