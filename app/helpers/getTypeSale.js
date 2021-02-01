export default function (type) {
  const typeSaleMap = {
    wholesale: 'Опт',
    retail: 'Розница',
    eshop: 'Интернет магазин'
  }

  return typeSaleMap[type] ?? '-'
}
