import VueCustomScrollbar from 'vue-custom-scrollbar'
import DialogEx from '~/components/dialog-ex/index.vue'

export default {
  name: 'Filters',
  components: {
    DialogEx,
    VueCustomScrollbar
  },
  data () {
    return {
      topTreeSelection: [],
      bottomTreeSelection: [],
      topTreeOpen: [],
      bottomTreeOpen: [],
      dialogCollectionDescription: {
        state: false,
        collectionNode: {}
      },
      allProds: {
        topTree: [],
        bottomTree: []
      },
      normalizedProdsForSearch: { // Массивы изделий оптимизированный для поиска
        topTree: [],
        bottomTree: []
      },
      filterNewOnly: false,
      filtersLoading: false
    }
  },
  computed: {
    model () {
      return this.$store.state.filters.model
    },
    dialogLines () {
      return this.dialogCollectionDescription.collectionNode.collectionDescription?.split('\n') || []
    },
    catalogMode () {
      return this.$store.state.filters.catalogMode
    },
    search () {
      return this.$store.state.filters.search
    },
    topTree () {
      return this.$store.state.filters.topTree
    },
    bottomTree () {
      return this.$store.state.filters.bottomTree
    },
    topTreeCopy () {
      return JSON.parse(JSON.stringify(this.topTree))
    },
    bottomTreeCopy () {
      return JSON.parse(JSON.stringify(this.bottomTree))
    }
  },
  watch: {
    topTreeSelection (arr) {
      if (arr.length) {
        this.lockFilters('tree')
      }
      this.checkFilterModelChanges()
    },
    bottomTreeSelection (arr) {
      if (arr.length) {
        this.lockFilters('tree')
      }
      this.checkFilterModelChanges()
    },
    search (searchStr) {
      if (searchStr) {
        this.lockFilters('search')
      }
      this.checkFilterModelChanges()
    },
    filterNewOnly (isNewOnly) {
      if (isNewOnly) {
        this.lockFilters('new')
      }
      this.checkFilterModelChanges()
    },
    topTreeCopy () {
      this.normalizeProdsForSearch()
    },
    bottomTreeCopy () {
      this.normalizeProdsForSearch()
    }
  },
  async mounted () {
    await this.fetchAll()

    this.$watch('model', () => {
      if (this.catalogMode === 'assort') {
        this.unfoldModelsByClassNameAssort()
      }

      if (this.catalogMode === 'discount') {
        this.unfoldModelsByClassNameDiscount()
      }
    }, { deep: true })

    // this.unfoldModelsByClassName()
    this.$root.$on('filters/clearAll', this.foldAll)
    this.$emit('ready')
  },
  beforeDestroy () {
    this.$root.$off('filters/clearAll', this.foldAll)
  },
  methods: {
    fetchAll () {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const promiseTree = this.$axios.get('/v1/pr-stor-prod/tree-lite')
        const promiseTreeResult = await promiseTree
        this.$store.commit('filters/setTopTree', promiseTreeResult.data.topTree)
        this.$store.commit('filters/setBottomTree', promiseTreeResult.data.bottomTree)
        resolve()
      })
    },
    normalizeProdsForSearch () {
      function tryGetProds (prods) {
        let resProds = []

        for (const prod of prods) {
          if (prod.children) {
            resProds = resProds.concat(tryGetProds(prod.children))
          } else {
            resProds = resProds.concat(prod.prodArr)
          }
        }

        return resProds
      }

      const allowProps = [
        'titleStr',
        'art',
        'modelFk', 'fashion', 'descript',
        'themeFk', 'title_price', 'title',
        'printFk', 'oxouno',
        'fabricTypeFk', 'struct', 'desity',
        'packFk'
      ]

      function mapFunc (el) {
        return {
          stringifyObject: JSON.stringify(el, allowProps).toLowerCase(),
          object: el
        }
      }

      let flatProdsArrayTopTree = tryGetProds(this.topTreeCopy.items)
      let flatProdsArrayBottomTree = tryGetProds(this.bottomTreeCopy.items)

      this.allProds.topTree = flatProdsArrayTopTree
      this.allProds.bottomTree = flatProdsArrayBottomTree

      flatProdsArrayTopTree = flatProdsArrayTopTree.map(mapFunc)
      flatProdsArrayBottomTree = flatProdsArrayBottomTree.map(mapFunc)

      this.normalizedProdsForSearch.topTree = flatProdsArrayTopTree
      this.normalizedProdsForSearch.bottomTree = flatProdsArrayBottomTree
    },
    checkFilterModelChanges () {
      const treeUsed = this.topTreeSelection.length || this.bottomTreeSelection.length
      const searchStr = this.search.trim().toLowerCase()
      const searchUsed = searchStr.length > 1
      const userCatalogInteraction = treeUsed | searchUsed | this.filterNewOnly
      this.$store.commit('filters/setUserCatalogInteraction', userCatalogInteraction)

      let prods = []

      if (userCatalogInteraction) {
        prods = this.allProds.topTree.concat(this.allProds.bottomTree)

        if (searchStr) {
          prods = this.searchProds(searchStr)
        } else if (treeUsed) {
          prods = this.extractProdsFromTree()
        }

        this.filterNewOnly && (prods = this.newOnlyFilter(prods))
        prods = this.hideProdsWithoutPhoto(prods)
      }

      // this.$store.commit('filters/setProds', prods)
      this.$store.dispatch('filters/setProds', prods)
      // this.$store.commit('filters/setProdsCount', prods.length)
    },
    extractProdsFromTree () {
      let prods = []

      this.topTreeSelection.forEach((obj) => {
        if (obj.prodArr) {
          obj.prodArr.sort((a, b) => {
            if (a.art > b.art) { return 1 }
            if (a.art < b.art) { return -1 }
            return 0
          })
          prods = prods.concat(obj.prodArr)
        }
      })

      this.bottomTreeSelection.forEach((obj) => {
        if (obj.prodArr) {
          obj.prodArr.sort((a, b) => {
            if (a.art > b.art) { return 1 }
            if (a.art < b.art) { return -1 }
            return 0
          })
          prods = prods.concat(obj.prodArr)
        }
      })

      return prods
    },
    searchProds (searchStr) {
      let prods = []

      const normalizedProdsForSearch = this.normalizedProdsForSearch.topTree
        .concat(this.normalizedProdsForSearch.bottomTree)

      if (searchStr) {
        prods = normalizedProdsForSearch.filter(el => el.stringifyObject.includes(searchStr))
        prods = prods.map(el => el.object)
      }

      return prods
    },
    hideProdsWithoutPhoto (prods) {
      const sizeBefore = prods.length

      const prodsWithoutPhoto = []

      prods = prods.filter((prod) => {
        if (!prod.photos.medium.length) {
          prodsWithoutPhoto.push(prod)
        }
        return prod.photos.medium.length
      })

      const sizeAfter = prods.length

      if (sizeAfter < sizeBefore) {
        console.log(
          '%c%s',
          'color: orange;',
          (sizeBefore - sizeAfter) + ' prods has not photo: ' +
          prodsWithoutPhoto.map(prod => prod.art)
            .join(', '))
      }
      return prods
    },
    newOnlyFilter (prods) {
      prods = prods.filter(prod => prod.age <= 30)
      return prods
    },
    unfoldModelsByClassNameAssort () {
      if (!this.model.className) {
        return
      }
      this.foldAll()

      const open = []
      const selection = []

      for (const category of this.topTreeCopy.items) {
        let unfoldThisCategory = false

        for (const collection of category.children) {
          let unfoldThisCollection = false

          for (const sex of collection.children) {
            let unfoldThisSex = false

            for (const model of sex.children) {
              if (sex.name === this.model.sexName &&
                category.name === this.model.categoryName &&
                model.className === this.model.className) {
                unfoldThisSex = true
                unfoldThisCollection = true
                unfoldThisCategory = true

                selection.push(model)
              }
            }

            if (unfoldThisSex && !open.includes(sex)) {
              open.push(sex)
            }
          }

          if (unfoldThisCollection && !open.includes(collection)) {
            open.push(collection)
          }
        }

        if (unfoldThisCategory && !open.includes(category)) {
          open.push(category)
        }
      }

      this.topTreeSelection = selection
      this.topTreeOpen = open
    },
    unfoldModelsByClassNameDiscount () {
      if (!this.model.className) {
        return
      }
      this.foldAll()

      const open = []
      const selection = []

      for (const discount of this.bottomTree.items) {
        let unfoldThisDiscount = false

        for (const group of discount.children) {
          let unfoldThisGroup = false

          for (const sex of group.children) {
            let unfoldThisSex = false

            for (const model of sex.children) {
              if (sex.name === this.model.sexName &&
                group.name === this.model.groupName &&
                model.className === this.model.className) {
                unfoldThisSex = true
                unfoldThisGroup = true
                unfoldThisDiscount = true

                selection.push(model)
              }
            }

            if (unfoldThisSex && !open.includes(sex)) {
              open.push(sex)
            }
          }

          if (unfoldThisGroup && !open.includes(group)) {
            open.push(group)
          }
        }

        if (unfoldThisDiscount && !open.includes(discount)) {
          open.push(discount)
        }
      }

      this.bottomTreeSelection = selection
      this.bottomTreeOpen = open
    },
    foldAll () {
      this.topTreeSelection = []
      this.bottomTreeSelection = []
      this.topTreeOpen = []
      this.bottomTreeOpen = []
    },
    openCollectionDescription (collectionNode) {
      this.dialogCollectionDescription.state = true
      this.dialogCollectionDescription.collectionNode = collectionNode
    },
    closeCollectionDescription () {
      this.dialogCollectionDescription.state = false
    },
    lockFilters (saveFor) {
      if (saveFor !== 'tree') {
        if (this.topTreeSelection.length) {
          this.topTreeSelection = []
        }
        if (this.bottomTreeSelection.length) {
          this.bottomTreeSelection = []
        }
      }

      if (saveFor !== 'search') {
        this.$store.commit('filters/setSearch', '')
      }

      if (saveFor !== 'new') {
        this.filterNewOnly = false
      }
    }
  }
}
