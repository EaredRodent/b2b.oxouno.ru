export default function (context) {
  const realisedMobileRoutes = [
    '/',
    '/mobile',
    '/registration',
    '/restore',
    '/common',
    '/common/client-card',
    '/store',
    '/store/orders'
  ]

  if (context.app.$isMobile() && !realisedMobileRoutes.includes(context.route.fullPath)) {
    context.redirect('/mobile')
  }
}
