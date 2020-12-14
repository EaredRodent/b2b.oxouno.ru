export default function (context) {
  if (location.hostname === 'b2b.oxouno.ru' && context.app.$isMobile() && context.route.fullPath !== '/empty') {
    context.redirect('/empty')
  }
}
