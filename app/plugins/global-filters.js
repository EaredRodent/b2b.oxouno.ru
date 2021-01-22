import Vue from 'vue'

Vue.filter('formatDateYmdHi', function (date) {
  if (!date) {
    return ''
  }
  const resDate = new Date(date.replace(' ', 'T'))
  const formatter = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
  return formatter.format(resDate).replace(',', '')
})

Vue.filter('formatDateYmd', function (date) {
  if (!date) {
    return ''
  }
  const resDate = new Date(date)
  const formatter = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  })
  return formatter.format(resDate).replace(',', '')
})

export const translateDate = function (month) {
  const arr = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]

  // yyyy-mm
  if (month.length === 7) {
    return arr[Number(month.substr(month.length - 2)) - 1]
  }
  // yyyy-mm-dd
  if (month.length === 10) {
    return arr[Number(month.substr(month.length - 5)) - 1]
  }
  return ''
}

export const translateWeekday = function (value) {
  const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'ВС']
  return days[new Date(value).getDay()]
}

Vue.filter('summStr', value => {
  return (new Intl.NumberFormat('ru', {
    currency: 'RUR'
  })).format(value)
})
