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
        timeouts: [],
        collection: '',   // Коллекция,
        catalogMode: ['assort', 'discount'][0], // Режим каталога, по ум. 'assort'
        search: '',
        treeAssort: {},
        treeDiscount: {},
        disabledFilters: {
            tree: false,
            search: false,
            new: false
        }
    }
}

export const mutations = {
    setCategoryName(state, category) {
        state.model.categoryName = category
    },
    setGroupName(state, group) {
        state.model.groupName = group
    },
    setSexName(state, sex) {
        state.model.sexName = sex
    },
    setClassName(state, tag) {
        state.model.className = tag
    },
    clearAll(state) {
        state.model.categoryName = ''
        state.model.groupName = ''
        state.model.sexName = ''
        state.model.className = ''
    },
    setFetching(state, flag) {
        state.fetching = flag
    },
    setProds(state, prods) {
        state.prods = prods
    },
    addProds(state, prods) {
        state.prods.push(...prods)
    },
    registerTimeout(state, timeout) {
        state.timeouts.push(timeout)
    },
    clearTimeouts(state) {
        state.timeouts.forEach(timeout => {
            clearTimeout(timeout)
        })
        state.timeouts = []
    },
    setProdsCount(state, number) {
        state.prodsCount = number
    },
    setCollection(state, collection) {
        state.collection = collection
    },
    setUserCatalogInteraction(state, flag) {
        state.userCatalogInteraction = flag
    },
    setCatalogMode(state, mode) {
        state.catalogMode = mode
    },
    setSearch(state, string) {
        state.search = string
    },
    setTreeAssort(state, objPtr) {
        state.treeAssort = objPtr
    },
    setTreeDiscount(state, objPtr) {
        state.treeDiscount = objPtr
    },
    setDisabledFilters(state, obj) {
        state.disabledFilters = obj
    }
}

export const actions = {
    setProds(store, prods) {
        store.commit('clearTimeouts')
        store.commit('setProds', [])
        store.commit('setProdsCount', 0)

        const groups = []

        prods.forEach((prod, i) => {
            const groupIdx = Math.trunc(i / 5)

            if (!groups[groupIdx]) {
                groups[groupIdx] = []
            }

            groups[groupIdx].push(prod)
        })

        groups.forEach((group, i) => {
            store.commit('registerTimeout',
                setTimeout(() => {
                    store.commit('addProds', group)
                    store.commit('setProdsCount', store.state.prodsCount + group.length)
                }, i * 100)
            )
        })
    }
}