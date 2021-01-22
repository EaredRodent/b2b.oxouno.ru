export default function (context) {
  const realisedMobileRoutes = [
    '/',
    '/mobile',
    '/registration',
    '/services',
    '/restore',
    '/store',
    '/store/orders'
  ]

  if (context.app.$isMobile() && !realisedMobileRoutes.includes(context.route.fullPath)) {
    context.redirect('/mobile')
  }
}
