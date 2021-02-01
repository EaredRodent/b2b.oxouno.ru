export const state = function () {
  return {
    indexMode: 'login',
    messaging: false,
    showLoginDialog: false,
    currentSlide: 0,
    axiosCancelTokenSource: {}
  }
}

export const mutations = {
  setLoginMode (state, tag) {
    state.indexMode = 'login'
  },
  setRegistrationMode (state, tag) {
    state.indexMode = 'reg'
  },
  setRestoreMode (state, tag) {
    state.indexMode = 'restore'
  },
  setMessaging (state, flag) {
    state.messaging = flag
  },
  setShowLoginDialog (state, flag) {
    state.showLoginDialog = flag
  },
  setCurrentSlide (state, number) {
    state.currentSlide = number
  },
  setAxiosCancelTokenSource (state, source) {
    state.axiosCancelTokenSource = source
  }
}
