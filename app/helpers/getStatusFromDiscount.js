export default function getStatusFromDiscount (discount) {
  const normalizedDiscount = discount ?? 0

  const discountVariant = [
    {
      value: 0,
      description: 'Базовый',
      discount: 0
    },
    {
      value: 1,
      description: 'Розница ☆',
      discount: 5
    },
    {
      value: 2,
      description: 'Розница ☆ ☆',
      discount: 10
    },
    {
      value: 3,
      description: 'Розница ☆ ☆ ☆',
      discount: 15
    },
    {
      value: 4,
      description: 'Опт Silver',
      discount: 20
    },
    {
      value: 5,
      description: 'Опт Gold',
      discount: 25
    },
    {
      value: 6,
      description: 'Опт Platinum',
      discount: 29
    }
  ]

  return discountVariant.reverse()
    .find(discountInfo => discountInfo.discount <= normalizedDiscount)
    .description
}
