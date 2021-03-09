import VueCustomScrollbar from 'vue-custom-scrollbar'
import Viewer from './-viewer.vue'

export default {
  name: 'Index',
  components: {
    Viewer,
    VueCustomScrollbar
  },
  data () {
    return {
      selectedNodes: [],
      viewer: {
        state: false,
        current: 0
      },
      selectionTree: []
      // selectionTree: [
      //   {
      //     name: 'Домашняя одежда',
      //     type: 'category',
      //     children: [
      //       {
      //         name: 'DAILY RELAX',
      //         type: 'collection',
      //         promotionMaterials: [
      //           {
      //             src: '/cat.png',
      //             title: 'Кот'
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     name: 'Повседневная одежда',
      //     type: 'category',
      //     children: [
      //       {
      //         name: 'CARBON',
      //         type: 'collection',
      //         promotionMaterials: [
      //           {
      //             src: '/documents/offer/offer_06.11.2019.pdf',
      //             title: 'PDF offer 2019'
      //           },
      //           {
      //             src: '/cat.png',
      //             title: 'Еще Кот Еще Кот Еще Кот Еще Кот'
      //           }
      //         ]
      //       },
      //       {
      //         name: 'MISS SONYA',
      //         type: 'collection',
      //         promotionMaterials: [
      //           {
      //             src: '/main-page-slider/4.min.mp4',
      //             title: 'Видео с производства'
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ]
    }
  },
  computed: {
    preparedSelectionTree () {
      let id = 0

      for (const category of this.selectionTree) {
        category.id = id++

        for (const collection of category.children) {
          collection.id = id++

          for (const pm of collection.promotionMaterials) {
            pm.id = id++
            pm.categoryName = category.name
            pm.collectionName = collection.name
          }
        }
      }

      return this.selectionTree
    },
    selectedPromo () {
      const selectedCollections = this.selectedNodes.filter(node => node.type === 'collection')
      return selectedCollections
        .map(collection => collection.promotionMaterials)
        .flat()
    },
    galleryTree () {
      const groups = {}

      const tests = [
        [/\.(png|jpg|jpeg)$/, this.IMG],
        [/\.pdf$/, this.DOC],
        [/\.mp4$/, this.VIDEO]
      ]

      for (const promo of this.selectedPromo) {
        tests.forEach(([regExp, type]) => {
          if (regExp.test(promo.src)) {
            promo.type = type
          }
        })

        if (!groups[promo.categoryName]) {
          groups[promo.categoryName] = {}
        }

        const category = groups[promo.categoryName]

        if (!category[promo.collectionName]) {
          category[promo.collectionName] = []
        }

        const collection = category[promo.collectionName]
        collection.push(promo)
      }

      return groups

      // const tests = [
      //   [/\.(png|jpg|jpeg)$/, this.IMG],
      //   [/\.pdf$/, this.DOC],
      //   [/\.mp4$/, this.VIDEO]
      // ]
      //
      // this.selectedCollections.forEach((item) => {
      //   item.type = this.UNKNOWN
      //
      //   tests.forEach(([regExp, type]) => {
      //     if (regExp.test(item.src)) {
      //       item.type = type
      //     }
      //   })
      // })
      //
      // return this.gallery
    }
  },
  beforeCreate () {
    this.UNKNOWN = 'unknown'
    this.IMG = 'img'
    this.VIDEO = 'video'
    this.DOC = 'doc'
  },
  mounted () {
    this.fetchAll()
  },
  methods: {
    async fetchAll () {
      const { data: hTree } = await this.$axios.get('/v1/oxouno-api/get-advertising')

      const tree = []

      hTree.forEach((hCategory) => {
        const category = {}
        category.name = hCategory.Folder
        category.type = 'category'
        category.children = []

        hCategory.Collection.forEach((hCollection) => {
          const collection = {}
          collection.name = hCollection.CollectionName
          collection.type = 'collection'
          collection.archive = hCollection.CollectionLink
          collection.promotionMaterials = []

          hCollection.Files.forEach((hFile) => {
            const material = {}
            material.title = hFile.FileName
            material.src = hFile.FileLink

            collection.promotionMaterials.push(material)
          })

          category.children.push(collection)
        })

        tree.push(category)
      })

      this.selectionTree = tree
    },
    getItemBackground (src) {
      if (/\.(png|jpg|jpeg)$/.test(src)) {
        return src
      } else if (/\.pdf$/.test(src)) {
        return 'https://www.seekpng.com/png/small/196-1963494_pdf-icon-img-portable-document-format.png'
      } else if (/\.mp4$/.test(src)) {
        return 'http://getdrawings.com/free-icon-bw/play-video-icon-png-4.png'
      } else {
        return ''
      }
    },
    openViewer (item) {
      if (item.type === this.UNKNOWN) { return }

      this.viewer.current = this.selectedPromo.findIndex(promo => promo === item)
      this.viewer.state = true
    },
    closeViewer () {
      this.viewer.state = false
    },
    updateViewer (current) {
      this.viewer.current = current
    },
    download () {
      const selectedCollections = this.selectedNodes.filter(node => node.type === 'collection')
      const archives = selectedCollections.map(collection => collection.archive)
      archives.forEach((archive, i) => {
        setTimeout(() => {
          window.open(archive, '_blank')
        }, i * 550)
      })
    }
  }
}
