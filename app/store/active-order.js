export const state = function () {
  return {
    prods: []
  }
}

export const mutations = {
  createOrder (state, prod) {
    for (const i in state.prods) {
      if (state.prods[i].id === prod.id) {
        state.prods.splice(i, 1)
        break
      }
    }
    state.prods.push(prod)
  },
  deleteFromOrder (state, id) {
    for (const i in state.prods) {
      if (state.prods[i].id === id) {
        state.prods.splice(i, 1)
        break
      }
    }
  }
}
