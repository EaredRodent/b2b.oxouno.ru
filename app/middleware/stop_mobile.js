export default function (context) {
  if (context.app.$isMobile()
      && context.route.fullPath !== '/mobile'
      && context.route.fullPath !== '/'
      && context.route.fullPath !== '/registration'
      && context.route.fullPath !== '/services'
      && context.route.fullPath !== '/restore'
      && context.route.fullPath !== '/store'
      && context.route.fullPath !== '/store/orders') {
    context.redirect('/mobile')
  }
}
