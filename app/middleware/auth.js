import md5 from 'md5'
import config from '~/config/base-config'

export default async function ({
  app,
  store,
  route,
  $axios,
  redirect
}) {
  // if (store.state.axiosCancelTokenSource.cancel) {
  //   store.state.axiosCancelTokenSource.cancel('Auth::middleware: cancel')
  //   console.log('CANCEL ' + store.state.axiosCancelTokenSource.token.id)
  // }
  //
  // const CancelToken = $axios.CancelToken
  // const source = CancelToken.source()
  // source.token.id = Math.trunc(Math.random() * 1000)
  // store.commit('setAxiosCancelTokenSource', source)

  store.commit('middleware/setNotFound', false)

  if (store.getters['auth/isGuest']) {
    try {
      await app.$authentication()
    } catch (e) {}
  }

  if (!store.getters['auth/isGuest'] &&
    route.fullPath === '/') {
    redirect(config.ROLES.roleB2bClient.startPage.url)
  }

  const societyAdminKey = localStorage.getItem('society/admin')
  if (societyAdminKey && md5(societyAdminKey) === '41bc3629a514ed9651332f89a4f9cdca') {
    store.commit('auth/setSocietyIsAdmin', true)
  }

  let pageConfigFound = false

  let normalizedPath = route.fullPath.split('?')[0]
  if (normalizedPath.length > 1) {
    normalizedPath = normalizedPath.replace(/\/$/, '')
  }

  for (const page in config.PAGES) {
    if (config.PAGES[page].url === normalizedPath) {
      pageConfigFound = true
      if (config.PAGES[page].permission) {
        if (app.$can(config.PAGES[page].permission)) {
          // console.log(`Middleware::auth: user has access ${page}`)
          return
        } else {
          // console.log(`Middleware::auth: user does not have access ${page}`)
        }
      } else {
        // console.log(`Middleware::auth: free access page ${page}`)
        return
      }
    }
  }
  if (!pageConfigFound) {
    store.commit('middleware/setNotFound', true)
    return
  }
  redirect('/')
}
