'use client'
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''

export const useInitPayment = () => {
  const initPayment = async (methodId: number) => {
    const res = await fetch(`${baseUrl}/api/orders/init-payment`, {
      method: 'POST',
      body: JSON.stringify({ method: methodId }),
    })
    const result = await res.json()
    const token = result.data.token

    if (methodId === 150) {
      const blikRes = await fetch(`${baseUrl}/api/orders/submit-blik`, {
        method: 'POST',
        body: JSON.stringify({ token, blikCode: '777123' }),
      })
      const blikResult = await blikRes.json()
      console.log(blikResult)
    } else {
      window.location.href = `https://sandbox.przelewy24.pl/trnRequest/${token}`
    }
  }

  return { initPayment }
}
