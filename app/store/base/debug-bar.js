export const state = function () {
  return {
    data: {
      xdebug: false
    }
  }
}

export const mutations = {
  setData (state, v) {
    state.data = v
  }
}
