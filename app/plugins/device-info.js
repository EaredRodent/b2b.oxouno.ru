import MobileDetect from 'mobile-detect'

export default function (inject) {
  const userAgent = window.navigator.userAgent
  const mobileDetect = new MobileDetect(userAgent)

  inject('isMobile', () => !!mobileDetect.mobile())
  inject('isPhone', () => !!mobileDetect.phone())
  inject('isTablet', () => !!mobileDetect.tablet())
  inject('isDesktop', () => !mobileDetect.mobile())
  inject('isRaspberry', () => userAgent.includes('Raspbian Chromium'))
}
