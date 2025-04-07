export const formatCurrency = (price: number | null | undefined, currency: string = 'PLN') => {
  if (!price) return ''

  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
  }).format(price)
}
