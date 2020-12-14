<template>
  <div class="a3d-GalleryActiveOrder" v-if="$isDesktop()">
    <vue-custom-scrollbar class="a3d-scroll-area">
      <div v-if="mode === 'table'">

        <div class="x-fbsb">
          <div class="a3d-label" ref="table">Накладная:</div>
        </div>

        <table class="a3d-table">
          <tbody>
            <tr v-for="slsItem in value.items" :key="slsItem.id">
              <td class="a3d-td-name">
                {{ slsItem.cardProd.titleStr }} {{ slsItem.cardProd.art }}<br>
                <i>({{ slsItem.cardProd.modelFk.title }}, {{ slsItem.cardProd.themeFk.title }})</i><br>
              </td>
              <td class="a3d-td-table">
                <div class="a3d-td-table-layout">
                  <table class="a3d-table-2">
                    <tbody>
                      <tr v-for="info in slsItem.includes">
                        <td class="a3d-td-size-name">{{ info.sizeStr }}</td>
                        <td class="a3d-td-count">{{ info.count }} шт.</td>
                        <td class="a3d-td-price">{{ Number(info.price) }} ₽</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="a3d-div-result">
                    <div class="a3d-div-size-name a3d-td-result">Итого:</div>
                    <div class="a3d-div-count">{{ slsItem.count }} шт.</div>
                    <div class="a3d-div-price">{{ Number(slsItem.sum) }} ₽</div>
                  </div>
                </div>
              </td>
              <td class="a3d-td-img">
                <img :src="slsItem.cardProd.photos.small[0]" height="100"/>
              </td>
              <td class="a3d-td-actions" v-if="actions">
                <div class="a3d-actions">
                  <v-btn class="a3d-td-prod-edit" icon small
                         @click="$emit('item-edit', slsItem.cardProd)">
                    <v-icon color="blue-grey darken-3" small>edit</v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="a3d-td-table">
                <table class="a3d-table-2">
                  <tbody>
                    <tr class="a3d-tr-result-result">
                      <td class="a3d-td-size-name a3d-td-result">Итого:</td>
                      <td class="a3d-td-count">{{ fullCount() }} шт.</td>
                      <td class="a3d-td-price">{{ fullSum() }} ₽</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td></td>
              <td v-if="actions"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </vue-custom-scrollbar>

    <div class="a3d-send" v-if="actions">
      <div class="a3d-label2">
        Изделий: {{ fullCount() }} шт., на сумму {{ fullSum() }} ₽
      </div>
      <v-btn class="a3d-send-btn" outline small @click="$emit('send-order')" color="blue-grey darken-3">
        Оформить
      </v-btn>
    </div>
  </div>
  <div class="a21-GalleryActiveOrder" v-else-if="$isMobile()">
    <div class="a21-send" v-if="actions">
      <div class="a21-label2">
        Изделий: {{ fullCount() }} шт., на сумму {{ fullSum() }} ₽
      </div>
      <v-btn class="a21-send-btn" outline @click="$emit('send-order')" color="blue-grey darken-3">
        Оформить
      </v-btn>
    </div>

    <table class="a21-table">
      <tbody>
        <template v-for="slsItem in value.items">
          <tr :key="slsItem.id + '_1'">
            <td class="a3d-td-name" colspan="2">
              {{ slsItem.cardProd.titleStr }} {{ slsItem.cardProd.art }}<br>
              <i>({{ slsItem.cardProd.modelFk.title }}, {{ slsItem.cardProd.themeFk.title }})</i><br>
            </td>
<!--            <td class="a3d-td-actions" v-if="actions">-->
<!--              <div class="a3d-actions">-->
<!--                <v-btn class="a3d-td-prod-edit" icon small-->
<!--                       @click="$emit('item-edit', slsItem.cardProd)">-->
<!--                  <v-icon color="blue-grey darken-3" small>edit</v-icon>-->
<!--                </v-btn>-->
<!--              </div>-->
<!--            </td>-->
          </tr>
          <tr :key="slsItem.id + '_2'">
            <td class="a3d-td-img">
              <img :src="slsItem.cardProd.photos.small[0]" height="100"/>
            </td>
            <td class="a3d-td-table">
              <div class="a3d-td-table-layout">
                <table class="a3d-table-2">
                  <tbody>
                    <tr v-for="info in slsItem.includes">
                      <td class="a3d-td-size-name">{{ info.sizeStr }}</td>
                      <td class="a3d-td-count">{{ info.count }} шт.</td>
                      <td class="a3d-td-price">{{ Number(info.price) }} ₽</td>
                    </tr>
                  </tbody>
                </table>
                <div class="a3d-div-result">
                  <div class="a3d-div-size-name a3d-td-result">Итого:</div>
                  <div class="a3d-div-count">{{ slsItem.count }} шт.</div>
                  <div class="a3d-div-price">{{ Number(slsItem.sum) }} ₽</div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar'

let p3aCurrentModel

export default {
  name: 'gallery-active-order',
  components: { VueCustomScrollbar },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    mode: {
      type: String,
      default: () => 'table'
    },
    actions: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      // currentModel: 'empty'
    }
  },
  watch: {
    'value.items' () {
      p3aCurrentModel = ''
    }
  },
  mounted () {
  },
  methods: {
    renderTitle (title) {
      if (p3aCurrentModel !== title) {
        p3aCurrentModel = title
        return true
      } else {
        return false
      }
    },
    fullCount () {
      return (this.value.items && this.value.items.reduce((acc, e) => acc + e.count, 0)) || 0
    },
    fullSum () {
      return (this.value.items && this.value.items.reduce((acc, e) => acc + e.sum, 0)) || 0
    }
  }
}
</script>

<style scoped>

</style>
