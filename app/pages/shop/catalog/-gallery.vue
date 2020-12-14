<template>
  <div class="a3b-Gallery" :style="{ maxHeight: value ? null : 0 }" :mobile="mobile">
    <div class="a3b-mode-gallery" v-if="mode === 'cards'">
      <div v-for="(categoryObj, categoryName, i) in groups" :key="i">
        <div class="a3b-category-name">{{ categoryName }}</div>

        <div v-for="(collectionArr, collectionName, j) in categoryObj" :key="j">
          <div class="a3b-collection-name" :first="!j">{{ collectionName }}</div>

          <div class="a3b-wrapper">
            <div class="a3b-art a3b-art-margin" v-for="prod in collectionArr" :key="prod.id"
                 @click="$emit('prod-view', prod)">
              <template v-if="prod.discount">
                <div class="a3b-price-info">
                  <div class="a3b-price-discount">
                    -{{ prod.discount }}%
                  </div>
                  <div>
                    <div class="a3b-price-current" :no-product="!prod.flagRest">
                      <span class="a3b-price-old2">{{ prod.minPrice }}</span> {{ prod.discountPrice }} ₽
                    </div>
                    <!--              <div class="a3b-price-old">-->
                    <!--                {{ prod.minPrice }} ₽-->
                    <!--              </div>-->
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="a3b-price">
                  <div class="a3b-price-current" :no-product="!prod.flagRest">
                    {{ prod.minPrice }} ₽
                  </div>
                </div>
              </template>
              <div class="a3b-art-img" :style="{ background: `url('${prod.photos.medium[0]}')` }"/>
              <div class="a3b-art-info">
                {{ prod.titleStr }} <br>
                {{ prod.art }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="a3b-mode-table" v-if="mode === 'table'">
      <div v-for="(categoryObj, categoryName, i) in groups" :key="i">
        <div class="a3b-category-name">{{ categoryName }}</div>

        <div v-for="(collectionArr, collectionName, j) in categoryObj" :key="j">
          <div class="a3b-collection-name" :first="!j">{{ collectionName }}</div>

          <div class="a3b-table-art" v-for="(prod, i) in collectionArr" :key="prod.id" :end="items.length - 1 === i">
            <div class="a3b-cat-prod" @click="$emit('prod-view', prod)">
              <div class="a3b-cat-left">
                <div class="a3b-cat-line">
                  <span class="a3b-cat-attr">Артикул:</span>
                  <span class="a3b-fw-500">{{ prod.art }}</span>
                </div>

                <div class="a3b-cat-line">
                  <span class="a3b-cat-attr">Цвет:</span>
                  <span>{{ prod.themeFk.title }}</span>
                </div>

                <div class="a3b-cat-line">
                  <span class="a3b-cat-attr">Состав:</span>
                  <span>{{ prod.fabricTypeFk.struct }}</span>
                </div>

                <div class="a3b-cat-line">
                  <span class="a3b-cat-attr">Размеры:</span>
                  <span
                    v-for="size in prod.sizes" :key="size.size">
                  {{ size.size }}&nbsp;&nbsp;
                </span>
                </div>

                <div class="a3b-cat-line">
                  <span class="a3b-cat-attr">Цена:</span>
                  <template v-if="prod.discount">
                    <span class="a3b-tbl-old-price">{{ prod.minPrice }} ₽</span>
                    <span class="a3b-tbl-discount">-{{ prod.discount }}%</span>
                    <span class="a3b-tbl-discount-price">{{ prod.discountPrice }} ₽</span>
                  </template>
                  <template v-else>
                    <span class="a3b-tbl-price">{{ prod.discountPrice }} ₽</span>
                  </template>
                  <span></span>
                  <span class="a3b-no-product" v-if="!prod.flagRest">(нет на складе)</span>
                </div>
              </div>
              <div class="a3b-cat-imgs">
                <img class="a3b-table-img" v-for="(prev, i) in prod.photos.small" v-if="i < 3" :src="prev" :key="prev">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gallery',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: () => 'table'
    },
    mobile: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      groups: [],
      items2: []
    }
  },
  watch: {
    items: {
      deep: true,
      handler () {
        this.groupItems()
      }
    }
  },
  methods: {
    groupItems () {
      let groups = {}

      let itemsHaveCollection = []
      let itemsHaveNotCollection = []

      this.items.forEach(item => {
        if (item.collectionStr) {
          itemsHaveCollection.push(item)
        } else {
          itemsHaveNotCollection.push(item)
        }
      })

      itemsHaveCollection.forEach((item) => {
        if (!groups[item.categoryStr]) {
          groups[item.categoryStr] = {}
        }

        let category = groups[item.categoryStr]

        if (!category[item.collectionStr]) {
          category[item.collectionStr] = []
        }

        let collection = category[item.collectionStr]
        collection.push(item)
      })

      itemsHaveNotCollection.forEach((item) => {
        let discountKey = 'Изделия со скидкой ' + item.discount + '%'
        if (!groups[discountKey]) {
          groups[discountKey] = {}
        }

        let discount = groups[discountKey]

        if (!discount[item.groupStr]) {
          discount[item.groupStr] = []
        }

        let group = discount[item.groupStr]
        group.push(item)
      })

      this.groups = groups
    }
  }
}
</script>

<style scoped>

</style>
