import config from '~/config/base-config'

/**
 * Проверяет доступ к странице route.fullPath,
 * используя хранилище (права пользователя) и config (требующиеся права для этой страницы)
 * 1. Если конфиг прав PAGES[pageName] не найден, то доступ запрещен
 * 2. Если конфиг прав PAGES[pageName] найден, но permission для страницы не задан, то доступ разрешен
 * 3. Если конфиг прав PAGES[pageName] найден и permission для страницы задан,
 * то проверяется наличие этого права у пользователя
 * @param store
 * @param route
 * @param $axios
 * @param redirect
 * @returns {Promise<*>}
 */
export default async function ({app, store, route, $axios, redirect}) {
    store.commit('base/middleware/setNotFound', false)

    if (store.getters['base/auth/isGuest']) {
        await app.$authentication()
    }

    if (!store.getters['base/auth/isGuest']
        && route.fullPath === '/') {
        redirect(config.ROLES.roleB2bClient.startPage.url)
    }

    let pageConfigFound = false

    let normalizedPath = route.fullPath.split('?')[0]
    if (normalizedPath.length > 1) {
        normalizedPath = normalizedPath.replace(/\/$/, '')
    }

    for (let page in config.PAGES) {
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
        store.commit('base/middleware/setNotFound', true)
        return
        // console.log(`Middleware::auth: PAGE with url "${route.fullPath}" from config file not found`)
    }
    redirect('/')
    // console.log(`Middleware::auth: PAGE with url "${route.fullPath}" forbidden`)
}
