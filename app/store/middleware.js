export const state = function () {
  return {
    notFound: false,
    forbidden: false
  }
}

export const mutations = {
  setNotFound (state, v) {
    state.notFound = v
  },
  setForbidden (state, v) {
    state.forbidden = v
  }
}
