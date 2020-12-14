import MobileDetect from 'mobile-detect'

export default function (inject) {
  let userAgent = window.navigator.userAgent
  let mobileDetect = new MobileDetect(userAgent)

  inject('isMobile', () => mobileDetect.mobile())
  inject('isPhone', () => mobileDetect.phone())
  inject('isTablet', () => mobileDetect.tablet())
  inject('isDesktop', () => !mobileDetect.mobile())
  inject('isRaspberry', () => userAgent.indexOf('Raspbian Chromium') !== -1)
}
