<template>
  <div class="a17-PhoneFilters">
    <button class="a17-action-item"
            @click="show = SHOW_MATRIX">
      Настроить матрицу
      <v-icon>
        tune
      </v-icon>
    </button>
    <button class="a17-action-item"
            @click="show = SHOW_CATEGORY">
      Выбрать по категории
      <v-icon>
        format_list_bulleted
      </v-icon>
    </button>
    <button class="a17-action-item"
            @click="show = SHOW_ACTIVE_ORDER">
      Мой заказ ({{ activeOrder.id ? `№${activeOrder.id}` : `Будет создан` }})
      <v-icon>
        shopping_cart
      </v-icon>
    </button>
    <div class="a17-action-item">
      <v-text-field color="black" label="Поиск изделий" append-icon="search"
                    :value="$store.state.filters.search"
                    @input="$store.commit('filters/setSearch', $event)"/>
    </div>

    <div class="a17-filters-area" v-show="show !== SHOW_NOTHING">
      <div class="a17-filters-actions">
        <!--        <v-btn class="a17-close-btn" outline-->
        <!--               @click="showNothing">-->
        <!--          <v-icon small>arrow_back</v-icon>&nbsp;Вернуться в каталог-->
        <!--        </v-btn>-->
        <button class="a17-action-item"
                @click="show = SHOW_NOTHING">
          Вернуться в каталог
          <v-icon>
            arrow_back
          </v-icon>
        </button>
        <button class="a17-action-item" v-if="show === SHOW_ACTIVE_ORDER"
                @click="$emit('create-order')">
          Создать новый заказ
          <v-icon>
            add
          </v-icon>
        </button>
        <button class="a17-action-item" v-if="show === SHOW_ACTIVE_ORDER"
                @click="deleteOrderByID(activeOrder.id)">
          Удалить текущий заказ
          <v-icon>
            delete
          </v-icon>
        </button>
      </div>
      <filters class="a17-filters a17-pad-left" v-show="show === SHOW_MATRIX" @ready="$emit('ready')"/>
      <div class="a17-filters-category" v-show="show === SHOW_CATEGORY">
        <div class="a17-cat-item-1lvl" v-if="catalogMode === 'assort'" v-for="(sex, _, i) in treeAssortCopy" :key="i">
          <div class="a17-cat-item-name"
               @click="openCloseAction(sex)">
            <v-icon v-if="sex[CATEGORY_NODE_IS_OPEN]">arrow_drop_down</v-icon>
            <v-icon v-else>arrow_right</v-icon>
            {{ sex.name }}
          </div>
          <template v-if="sex[CATEGORY_NODE_IS_OPEN]">
            <div class="a17-cat-item-2lvl" v-for="(category, _, j) in sex.categoryArr" :key="j">
              <div class="a17-cat-item-name"
                   @click="openCloseAction(category)">
                <v-icon v-if="category[CATEGORY_NODE_IS_OPEN]">arrow_drop_down</v-icon>
                <v-icon v-else>arrow_right</v-icon>
                {{ category.name }}
              </div>
              <template v-if="category[CATEGORY_NODE_IS_OPEN]">
                <div class="a17-cat-item-3lvl" v-for="(_class, _, k) in category.classArr" :key="k"
                     @click="setFilters(sex.name, category.name, undefined, _class)">
                  <div class="a17-cat-item-name">
                    <!--                    <v-icon class="a17-small-dot">fiber_manual_record</v-icon>-->
                    {{ _class }}
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>

        <div class="a17-cat-item-1lvl" v-if="catalogMode === 'discount'" v-for="(sex, i) in treeDiscountCopy" :key="i">
          <div class="a17-cat-item-name"
               @click="openCloseAction(sex)">
            <v-icon v-if="sex[CATEGORY_NODE_IS_OPEN]">arrow_drop_down</v-icon>
            <v-icon v-else>arrow_right</v-icon>
            {{ sex.name }}
          </div>
          <template v-if="sex[CATEGORY_NODE_IS_OPEN]">
            <div class="a17-cat-item-2lvl" v-for="(group, j) in sex.groupArr" :key="j">
              <div class="a17-cat-item-name"
                   @click="openCloseAction(group)">
                <v-icon v-if="group[CATEGORY_NODE_IS_OPEN]">arrow_drop_down</v-icon>
                <v-icon v-else>arrow_right</v-icon>
                {{ group.name }}
              </div>
              <template v-if="group[CATEGORY_NODE_IS_OPEN]">
                <div class="a17-cat-item-3lvl" v-for="(_class, k) in group.classArr" :key="k"
                     @click="setFilters(sex.name, undefined, group.name, _class)">
                  <div class="a17-cat-item-name">
                    {{ _class }}
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
      <div class="a17-filters a17-active-order" v-show="show === SHOW_ACTIVE_ORDER">
        <v-select v-model="activeOrder" :items="prepOrders"
                  color="black" item-text="id" return-object label="Текущий заказ №:"/>
        <gallery-active-order :value="activeOrder" actions @send-order="$emit('send-order')"/>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from './-filters'
import { mapState } from 'vuex'
import Gallery from './-gallery'
import GalleryActiveOrder from './-gallery-active-order'
import { deleteOrderByID } from '~/pages/store/orders/index.vue'

const SHOW_NOTHING = 0
const SHOW_MATRIX = 1
const SHOW_CATEGORY = 2
const SHOW_ACTIVE_ORDER = 3
const CATEGORY_NODE_IS_OPEN = Symbol('CATEGORY_NODE_IS_OPEN')

export default {
  name: 'phone-filters',
  components: { GalleryActiveOrder, Gallery, Filters },
  props: {
    activeOrder: {
      type: Object,
      default: () => ({})
    },
    prepOrders: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      show: SHOW_NOTHING,
      activeOrder: this.activeOrder,
      treeAssortCopy: {},
      treeDiscountCopy: {},
    }
  },
  computed: {
    ...mapState('filters', [
      'catalogMode',
      'treeAssort',
      'treeDiscount'
    ]),
    prods () {
      return this.$store.state.filters.prods
    },
    userCatalogInteraction () {
      return this.$store.state.filters.userCatalogInteraction
    },
    prodsCount () {
      return this.$store.state.filters.prodsCount
    },
    fetching () {
      return this.$store.state.filters.fetching
    }
  },
  created () {
    this.SHOW_NOTHING = SHOW_NOTHING
    this.SHOW_MATRIX = SHOW_MATRIX
    this.SHOW_CATEGORY = SHOW_CATEGORY
    this.SHOW_ACTIVE_ORDER = SHOW_ACTIVE_ORDER
    this.CATEGORY_NODE_IS_OPEN = CATEGORY_NODE_IS_OPEN

  },
  watch: {
    activeOrder () {
    },
    treeAssort (n) {
      this.treeAssortCopy = JSON.parse(JSON.stringify(n))
    },
    treeDiscount (n) {
      this.treeDiscountCopy = JSON.parse(JSON.stringify(n))
    },
    show (n) {
      this.$emit('show-change', n)
    }
  },
  mounted () {
    this.treeAssortCopy = JSON.parse(JSON.stringify(this.$store.state.filters.treeAssort))
    this.treeDiscountCopy = JSON.parse(JSON.stringify(this.$store.state.filters.treeDiscount))
  },
  methods: {
    setFilters (sex, category, group, _class) {
      this.show = SHOW_NOTHING
      this.$store.commit('filters/clearAll')
      this.$store.commit('filters/setSexName', sex)
      this.$store.commit('filters/setCategoryName', category)
      this.$store.commit('filters/setGroupName', group)
      this.$store.commit('filters/setClassName', _class)
      this.$router.push('/store')
      this.sexName = ''
    },
    openCloseAction (node) {
      this.$set(node, CATEGORY_NODE_IS_OPEN, !node[CATEGORY_NODE_IS_OPEN])
    },
    deleteOrderByID
  }
}
</script>

<style scoped>

</style>
