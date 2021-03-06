import config from '~/config/base-config'

export const isWarningMessage = function (response) {
  if (response && response.data && response.data.code) {
    return response && response.data && (response.data.code === 200)
  } else {
    return false
  }
}

export const isPostSuccessful = function (response) {
  return response && response.data && (response.data._result_ === 'success')
}

export default ({
  store,
  $axios,
  app
}) => {
  $axios.defaults.baseURL = config.API.baseUrl
  // if (store.state['base']['auth'].user && store.state['base']['auth'].user.hasOwnProperty('accesstoken')) {
  //   $axios.setToken(store.state['base']['auth'].user.accesstoken, 'Bearer')
  // }

  // $axios.interceptors.request.use((config) => {
  //   if (config.method === 'get') {
  //     config.cancelToken = store.state.axiosCancelTokenSource.token
  //     console.log('request! ' + store.state.axiosCancelTokenSource.token.id)
  //   }
  //   return config
  // })

  $axios.interceptors.response.use(function (response) {
    if (isWarningMessage(response)) {
      store.dispatch('snackbar/show', response.data.message)
    }
    return response
  }, function (error) {
    if (error.response && error.response.request) {
      delete error.response.request
    }

    if (config.MODE.envDev) {
      if ($axios.isCancel(error)) {
        store.dispatch('snackbar/show', error.message)
      } else {
        store.dispatch('snackbar/show', error.response)
      }
    } else {
      store.dispatch('snackbar/show',
        'Необработанное исключение. ' +
        'Пожалуйста, свяжитесь с разработчиками.')
    }

    return Promise.reject(error)
  })
}
