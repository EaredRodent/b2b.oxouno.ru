<template>
  <div class="a3a-Filters" :key="catalogMode">
    <div class="a3a-spacer">Фильтры</div>
    <b-form-checkbox class="a3a-checkbox" color="#d57959" v-model="filterNewOnly">
      Только новинки
    </b-form-checkbox>
    <template v-if="catalogMode === 'assort'">
      <div class="a3a-spacer">Ассортиментная матрица</div>
      <v-treeview v-model="topTreeSelection" return-object selectable :items="topTree.items"
                  :open="topTreeOpen" open-on-click
                  on-icon="lens"
                  off-icon="radio_button_unchecked"
                  indeterminate-icon="remove_circle_outline"
                  selected-color="#d57959">
        <template v-slot:append="{ item }">
          <v-icon class="a3a-append-icon" v-if="item.type === 'collection'"
                  @click.stop="openCollectionDescription(item)">
            info_outline
          </v-icon>
        </template>
        <template v-slot:label="{ item }">
          <div v-if="item.type === 'collection'">
            <div class="a3a-collection-name">{{ item.name }}</div>
            <div class="a3a-collection-comment" v-if="item.comment">{{ item.comment }}</div>
          </div>
          <div v-else>
            {{ item.name }}
          </div>
        </template>
      </v-treeview>
    </template>
    <template v-if="catalogMode === 'discount'">
      <div class="a3a-spacer">Акционный товар</div>
      <v-treeview v-model="bottomTreeSelection" return-object selectable :items="bottomTree.items"
                  :open="bottomTreeOpen" open-on-click
                  on-icon="lens"
                  off-icon="radio_button_unchecked"
                  indeterminate-icon="remove_circle_outline"
                  selected-color="#d57959"/>
    </template>

    <dialog-ex v-model="dialogCollectionDescription.state"
               :title="dialogCollectionDescription.collectionNode.name"
               :cancel-button="false"
               :width="1000"
               :persistent="false"
               @ok="closeCollectionDescription">
      <p v-for="(p, i) in dialogLines" :key="i">
        {{ p }}
      </p>
    </dialog-ex>
  </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar'
import DialogEx from '../../../components/b2b/dialog-ex'

export default {
  name: 'filters',
  components: {
    DialogEx,
    VueCustomScrollbar
  },
  data () {
    return {
      topTree: {},
      bottomTree: {},
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
    }
  },
  watch: {
    topTreeSelection () {
      this.checkFilterModelChanges()
    },
    bottomTreeSelection (n, o) {
      this.checkFilterModelChanges()
    },
    search (searchStr) {
      this.checkFilterModelChanges()
    },
    filterNewOnly () {
      this.checkFilterModelChanges()
    }
  },
  async mounted () {
    await this.fetchAll()
    this.normalizeProdsForSearch()

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
    async fetchAll () {
      return new Promise(async (resolve, reject) => {
        let promiseTree = this.$axios.get('/v1/pr-stor-prod/tree-lite')
        let promiseTreeResult = await promiseTree
        this.topTree = promiseTreeResult.data ? promiseTreeResult.data.topTree : []
        this.bottomTree = promiseTreeResult.data ? promiseTreeResult.data.bottomTree : []
        resolve()
      })
    },
    normalizeProdsForSearch () {
      function tryGetProds (prods) {
        let resProds = []

        for (let prod of prods) {
          if (prod.children) {
            resProds = resProds.concat(tryGetProds(prod.children))
          } else {
            resProds = resProds.concat(prod.prodArr)
          }
        }

        return resProds
      }

      let allowProps = [
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

      let flatProdsArrayTopTree = tryGetProds(this.topTree.items)
      let flatProdsArrayBottomTree = tryGetProds(this.bottomTree.items)

      this.allProds.topTree = flatProdsArrayTopTree
      this.allProds.bottomTree = flatProdsArrayBottomTree

      flatProdsArrayTopTree = flatProdsArrayTopTree.map(mapFunc)
      flatProdsArrayBottomTree = flatProdsArrayBottomTree.map(mapFunc)

      this.normalizedProdsForSearch.topTree = flatProdsArrayTopTree
      this.normalizedProdsForSearch.bottomTree = flatProdsArrayBottomTree
    },
    checkFilterModelChanges () {
      let treeUsed = this.topTreeSelection.length || this.bottomTreeSelection.length
      let searchStr = this.search.trim().toLowerCase()
      let searchUsed = 1 < searchStr.length
      this.$store.commit('filters/setUserCatalogInteraction', treeUsed | searchUsed | this.filterNewOnly)

      let prods = this.allProds.topTree.concat(this.allProds.bottomTree)

      if (searchStr) {
        prods = this.searchProds(searchStr)
      } else if (treeUsed) {
        prods = this.extractProdsFromTree()
      }

      this.filterNewOnly && (prods = this.newOnlyFilter(prods))
      prods = this.hideProdsWithoutPhoto(prods)

      this.$store.commit('filters/setProds', prods)
      this.$store.commit('filters/setProdsCount', prods.length)
    },
    extractProdsFromTree () {
      let prods = []

      this.topTreeSelection.forEach(obj => {
        if (obj.prodArr) {
          obj.prodArr.sort((a, b) => {
            if (a.art > b.art) return 1
            if (a.art < b.art) return -1
            return 0
          })
          prods = prods.concat(obj.prodArr)
        }
      })

      this.bottomTreeSelection.forEach(obj => {
        if (obj.prodArr) {
          obj.prodArr.sort((a, b) => {
            if (a.art > b.art) return 1
            if (a.art < b.art) return -1
            return 0
          })
          prods = prods.concat(obj.prodArr)
        }
      })

      return prods
    },
    searchProds (searchStr) {
      let prods = []

      let normalizedProdsForSearch = this.normalizedProdsForSearch.topTree
        .concat(this.normalizedProdsForSearch.bottomTree)

      if (searchStr) {
        prods = normalizedProdsForSearch.filter(el => el.stringifyObject.includes(searchStr))
        prods = prods.map(el => el.object)
      }

      return prods
    },
    hideProdsWithoutPhoto (prods) {
      console.group()
      let sizeBefore = prods.length
      prods = prods.filter(prod => (prod.photos.medium.length || console.log(prod), prod.photos.medium.length))
      let sizeAfter = prods.length
      if (sizeAfter < sizeBefore) {
        console.log('Prods has not photo: ' + (sizeBefore - sizeAfter))
      }
      console.groupEnd()
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

      let open = []
      let selection = []

      for (let category of this.topTree.items) {
        let unfoldThisCategory = false

        for (let collection of category.children) {
          let unfoldThisCollection = false

          for (let sex of collection.children) {
            let unfoldThisSex = false

            for (let model of sex.children) {

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

      let open = []
      let selection = []

      for (let discount of this.bottomTree.items) {
        let unfoldThisDiscount = false

        for (let group of discount.children) {
          let unfoldThisGroup = false

          for (let sex of group.children) {
            let unfoldThisSex = false

            for (let model of sex.children) {

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
    }
  }
}
</script>

<style scoped>

</style>
