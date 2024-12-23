export const formatCurrency = (price: number, currency: string = 'PLN') => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
  }).format(price)
}
