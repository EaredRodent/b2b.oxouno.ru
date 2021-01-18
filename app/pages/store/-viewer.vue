<template>
  <v-dialog v-if="$isDesktop()" v-model="value.state" width="950" persistent>
    <template v-if="value.state">
      <div class="a3c-Viewer">

        <v-btn class="a3c-btn-close" icon large @click="value.state = false">
          <v-icon color="grey">close</v-icon>
        </v-btn>

        <div class="a3c-left">
          <img class="a3c-min-img" :class="(selectImg == i) ? 'a3c-selected-img' : ''"
               v-for="(url, i) in value.prod.photos.small" :src="url" :key="i"
               @mouseenter="selectImg = i">
        </div>

        <div class="a3c-middle">
          <zoom-on-hover :img-normal="value.prod.photos.large[selectImg]"/>
          <div class="a3c-download-box">
            <v-btn class="a3c-download-btn" outline small @click="windowOpen(value.prod.photos.large[selectImg])">
              Скачать
            </v-btn>
          </div>
        </div>

        <div class="a3c-right">
          <div class="a3c-title">{{ value.prod.titleStr }} <span class="a3c-title-art">{{ value.prod.art }}</span></div>
          <div class="a3c-model">{{ value.prod.modelFk.fashion }}</div>
          <div class="a3c-description">{{ value.prod.modelFk.descript }}</div>
          <div class="a3c-color"><u>Цвет</u>: {{ themeStr }}</div>
          <div class="a3c-print" v-if="value.prod.printFk.id !== 1"><u>Принт</u>: {{ value.prod.printFk.oxouno }}</div>
          <div class="a3c-composition"><u>Состав</u>: {{ value.prod.fabricTypeFk.struct }}</div>
          <div class="a3c-density"><u>Плотность</u>: {{ value.prod.fabricTypeFk.desity }} г/м2</div>
          <div class="a3c-pack"><u>Упаковка</u>: {{ value.prod.packFk ? value.prod.packFk.title : '' }}</div>
          <div class="a3c-prod">
            <table class="a3c-table">
              <thead>
                <tr>
                  <th>Размеры</th>
                  <th>Вес</th>
                  <th>Рекоменд.<br>розничная<br>цена</th>
                  <th>Оптовая<br>цена</th>
                  <th>Ваша<br>цена со<br>скидкой</th>
                  <th>Остаток</th>
                  <th>Заказ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(detail, i) in details.infoArr" :key="i">
                  <td>
                    <div class="a3c-size-chip" :style="{background: detail.restColor}">{{ detail.sizeStr }}</div>
                  </td>
                  <td>{{ (detail.weight) ? detail.weight : '-' }}</td>
                  <td>{{ detail.doublePrice }}</td>
                  <td>{{ detail.price }}</td>
                  <td>{{ detail.priceDiscount }}</td>
                  <td>{{ detail.restStr }}</td>
                  <td>
                    <div class="a3c-td-content-fix-height">
                      <v-text-field v-model.number="sizesForOrder[detail.size]" single-line type="number" min="0"
                      @input="$event < 0 && (sizesForOrder[detail.size] = Math.abs($event))"/>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>


            <!--            <div class="a3c-size-list">-->
            <!--              <div class="a3c-size">-->
            <!--                <div class="a3c-size-header" style="text-align: left">Размеры:</div>-->
            <!--                <div class="a3c-size-header">Вес:</div>-->
            <!--                <div class="a3c-size-header">Цена:</div>-->
            <!--                <div class="a3c-size-header">С скидкой:</div>-->
            <!--                <div class="a3c-size-header">Остаток:</div>-->
            <!--                <div class="a3c-size-header">Заказ:</div>-->
            <!--              </div>-->
            <!--              <div class="a3c-size" v-for="(detail, i) in details" :key="i">-->
            <!--                <div style="display: flex; justify-content: center">-->
            <!--                  <div class="a3c-size-chip" :style="{background: detail.restColor}">{{ detail.sizeStr }}</div>-->
            <!--                </div>-->
            <!--                <div>{{ (detail.weight) ? detail.weight : '-' }}</div>-->
            <!--                <div>{{ detail.price }}</div>-->
            <!--                <div>{{ detail.priceDiscount }}</div>-->
            <!--                <div>{{ detail.restStr }}</div>-->
            <!--                <v-text-field v-model.number="sizesForOrder[detail.size]" single-line type="number"/>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>

          <div class="a3c-discount-bigger-than-29" v-if="details.discountBiggerThan29Flag">
            * На данный товар вы можете согласовать дополнительную скидку с вашим менеджером.
          </div>

          <div class="a3c-btns">
            <v-btn class="a3c-order-btn" v-if="value.slsItemId" outline color="blue-grey darken-4"
                   :disabled="!canCreateOrder()"
                   :loading="orderEditItemProcessing" @click="addBtnClicked">
              Редактировать заказ
            </v-btn>
            <v-btn class="a3c-order-btn" v-else outline color="blue-grey darken-4" :disabled="!canCreateOrder()"
                   :loading="orderCreateProcessing" @click="addBtnClicked">
              Добавить в заказ
            </v-btn>
            <v-btn class="a3c-order-btn a3d-order-btn-del" v-if="value.slsItemId" outline color="red darken-4"
                   :disabled="!canCreateOrder()"
                   :loading="orderDeleteItemProcessing"
                   @click="$emit('delete-item', value.slsItemId)">
              Удалить из заказа
            </v-btn>
          </div>
        </div>

      </div>
    </template>
  </v-dialog>
  <div v-else-if="$isMobile() && value.state" class="a18-MobileViewer">
    <button class="a18-button a18-sticky-btn"
            @click="value.state = false">
      Вернуться в каталог
      <v-icon>
        arrow_back
      </v-icon>
    </button>

    <div class="a18-img-box">
      <img class="a18-img-main" :src="value.prod.photos.large[0]"/>
    </div>

    <div class="a18-content">
      <div class="a3c-title">{{ value.prod.titleStr }} <span class="a3c-title-art">{{ value.prod.art }}</span></div>
      <div class="a3c-model">{{ value.prod.modelFk.fashion }}</div>
      <div class="a3c-description">{{ value.prod.modelFk.descript }}</div>
      <div class="a3c-color"><u>Цвет</u>: {{ themeStr }}</div>
      <div class="a3c-print" v-if="value.prod.printFk.id !== 1"><u>Принт</u>: {{ value.prod.printFk.oxouno }}</div>
      <div class="a3c-composition"><u>Состав</u>: {{ value.prod.fabricTypeFk.struct }}</div>
      <div class="a3c-density"><u>Плотность</u>: {{ value.prod.fabricTypeFk.desity }} г/м2</div>
      <div class="a3c-pack"><u>Упаковка</u>: {{ value.prod.packFk ? value.prod.packFk.title : '' }}</div>

      <div class="a3c-prod">
        <table class="a18-table">
          <thead>
            <tr>
              <th>Размеры</th>
              <th>Вес</th>
              <th>Ваша<br>цена со<br>скидкой</th>
              <th>Остаток</th>
              <th>Заказ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, i) in details.infoArr" :key="i">
              <td>
                <div class="a18-size-chip" :style="{background: detail.restColor}">{{ detail.sizeStr }}</div>
              </td>
              <td>{{ (detail.weight) ? detail.weight : '-' }}</td>
              <td>{{ detail.priceDiscount }}</td>
              <td>{{ detail.restStr }}</td>
              <td>
                <div class="a18-td-content-fix-height">
                  <v-text-field v-model.number="sizesForOrder[detail.size]" color="black" single-line type="number"
                                placeholder="0"/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="a3c-discount-bigger-than-29" v-if="details.discountBiggerThan29Flag">
        * На данный товар вы можете согласовать дополнительную скидку с вашим менеджером.
      </div>

      <div class="a3c-btns">
        <v-btn class="a3c-order-btn" v-if="value.slsItemId" outline color="blue-grey darken-4"
               :disabled="!canCreateOrder()"
               :loading="orderEditItemProcessing" @click="addBtnClicked">
          Редактировать заказ
        </v-btn>
        <v-btn class="a3c-order-btn" v-else outline color="blue-grey darken-4" :disabled="!canCreateOrder()"
               :loading="orderCreateProcessing" @click="addBtnClicked">
          Добавить в заказ
        </v-btn>
        <v-btn class="a3c-order-btn a3d-order-btn-del" v-if="value.slsItemId" outline color="red darken-4"
               :disabled="!canCreateOrder()"
               :loading="orderDeleteItemProcessing"
               @click="$emit('delete-item', value.slsItemId)">
          Удалить из заказа
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ZoomOnHover from 'vue-zoom-on-hover'
//
Vue.use(ZoomOnHover)

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    legalEntityId: {
      type: Number,
      default: () => 0
    },
    orderCreateProcessing: {
      type: Boolean,
      default: () => false
    },
    orderEditItemProcessing: {
      type: Boolean,
      default: () => false
    },
    orderDeleteItemProcessing: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      selectImg: 0,
      sizesForOrder: {},
      details: {
        infoArr: [],
        discountBiggerThan29Flag: false
      }
    }
  },
  computed: {
    themeStr () {
      if (this.value.prod.themeFk.title_price === this.value.prod.themeFk.title) {
        return this.value.prod.themeFk.title_price
      } else {
        return this.value.prod.themeFk.title_price + ' / ' + this.value.prod.themeFk.title
      }
    }
  },
  watch: {
    async 'value.state' (n) {
      if (n) {
        this.selectImg = 0
        this.details = {}
        let { data } = await this.$axios.get('/v1/card-prod/get-details', {
          params: {
            prodId: this.value.prod.prodId,
            printId: this.value.prod.printFk ? this.value.prod.printFk.id : 1,
            legalEntityID: this.legalEntityId
          }
        })
        this.sizesForOrder = this.value.sizesForOrder
        this.details = data
      }
    }
  },
  async mounted () {
  },
  methods: {
    canCreateOrder () {
      return Object.entries(this.sizesForOrder).some(value => value[1])
    },
    addBtnClicked () {
      if (this.value.slsItemId) {
        this.editItemFromOrder()
      } else {
        this.addItemToOrder()
      }
    },
    addItemToOrder () {
      let form = {
        blank_fk: this.value.prod.prodId,
        print_fk: this.value.prod.printFk ? this.value.prod.printFk.id : 1,
        ...this.sizesForOrder
      }
      this.$emit('add-item-to-order', form)
    },
    editItemFromOrder () {
      let form = {
        sls_item_id: this.value.slsItemId,
        ...this.sizesForOrder
      }
      this.$emit('edit-item-from-order', form)
    },
    clone (object) {
      return JSON.parse(JSON.stringify(object))
    },
    windowOpen (link) {
      window.open(link)
    }
  }
}
</script>

<style scoped>

</style>
