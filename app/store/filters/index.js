export const state = function () {
  return {
    model: {
      groupName: '',    // Группа
      categoryName: '',    // Категория
      sexName: '',        // Пол
      className: ''      // Наименование
    },
    fetching: false,    // Выполняется ли загрузка изделий
    userCatalogInteraction: false,
    prodsCount: 0,
    prods: [],          // Результат выделения узлов в дереве
    collection: '',   // Коллекция,
    catalogMode: ['assort', 'discount'][0], // Режим каталога, по ум. 'assort'
    search: '',
    treeAssort: {},
    treeDiscount: {},
  }
}

export const mutations = {
  setCategoryName (state, category) {
    state.model.categoryName = category
  },
  setGroupName (state, group) {
    state.model.groupName = group
  },
  setSexName (state, sex) {
    state.model.sexName = sex
  },
  setClassName (state, tag) {
    state.model.className = tag
  },
  clearAll (state) {
    state.model.categoryName = ''
    state.model.groupName = ''
    state.model.sexName = ''
    state.model.className = ''
  },
  setFetching (state, flag) {
    state.fetching = flag
  },
  setProds (state, prods) {
    state.prods = prods
  },
  setProdsCount (state, number) {
    state.prodsCount = number
  },
  setCollection (state, collection) {
    state.collection = collection
  },
  setUserCatalogInteraction (state, flag) {
    state.userCatalogInteraction = flag
  },
  setCatalogMode (state, mode) {
    state.catalogMode = mode
  },
  setSearch (state, string) {
    state.search = string
  },
  setTreeAssort(state, objPtr) {
    state.treeAssort = objPtr
  },
  setTreeDiscount(state, objPtr) {
    state.treeDiscount = objPtr
  }
}
