<template>
  <div class="x-PhoneFilters">
    <button
      class="x-action-item"
      @click="show = SHOW_MATRIX"
    >
      Настроить матрицу
      <v-icon>
        tune
      </v-icon>
    </button>
    <button
      class="x-action-item"
      @click="show = SHOW_CATEGORY"
    >
      Выбрать по категории
      <v-icon>
        format_list_bulleted
      </v-icon>
    </button>
    <button
      class="x-action-item"
      @click="show = SHOW_ACTIVE_ORDER"
    >
      Мой заказ ({{ activeOrder.id ? `№${activeOrder.id}` : `Будет создан` }})
      <v-icon>
        shopping_cart
      </v-icon>
    </button>
    <div class="x-action-item">
      <v-text-field
        color="black"
        label="Поиск изделий"
        append-icon="search"
        :value="$store.state.filters.search"
        @input="$store.commit('filters/setSearch', $event)"
      />
    </div>

    <div v-show="show !== SHOW_NOTHING" class="x-filters-area">
      <div class="x-filters-actions">
        <!--        <v-btn class="x-close-btn" outline-->
        <!--               @click="showNothing">-->
        <!--          <v-icon small>arrow_back</v-icon>&nbsp;Вернуться в каталог-->
        <!--        </v-btn>-->
        <button
          class="x-action-item"
          @click="show = SHOW_NOTHING"
        >
          Вернуться в каталог
          <v-icon>
            arrow_back
          </v-icon>
        </button>
        <button
          v-if="show === SHOW_ACTIVE_ORDER"
          class="x-action-item"
          @click="$emit('create-order')"
        >
          Создать новый заказ
          <v-icon>
            add
          </v-icon>
        </button>
        <button
          v-if="show === SHOW_ACTIVE_ORDER"
          class="x-action-item"
          @click="$emit('delete-order-by-id', activeOrder.id)"
        >
          Удалить текущий заказ
          <v-icon>
            delete
          </v-icon>
        </button>
      </div>
      <filters v-show="show === SHOW_MATRIX" class="x-filters-flex" @ready="$emit('ready')" />
      <div v-show="show === SHOW_CATEGORY" class="x-filters-category">
        <div v-for="(sex, _, i) in treeAssortCopy" v-if="catalogMode === 'assort'" :key="i" class="x-cat-item-1lvl">
          <div
            class="x-cat-item-name"
            @click="openCloseAction(sex)"
          >
            <v-icon v-if="sex[CATEGORY_NODE_IS_OPEN]">
              arrow_drop_down
            </v-icon>
            <v-icon v-else>
              arrow_right
            </v-icon>
            {{ sex.name }}
          </div>
          <template v-if="sex[CATEGORY_NODE_IS_OPEN]">
            <div v-for="(category, _, j) in sex.categoryArr" :key="j" class="x-cat-item-2lvl">
              <div
                class="x-cat-item-name"
                @click="openCloseAction(category)"
              >
                <v-icon v-if="category[CATEGORY_NODE_IS_OPEN]">
                  arrow_drop_down
                </v-icon>
                <v-icon v-else>
                  arrow_right
                </v-icon>
                {{ category.name }}
              </div>
              <template v-if="category[CATEGORY_NODE_IS_OPEN]">
                <div
                  v-for="(_class, _, k) in category.classArr"
                  :key="k"
                  class="x-cat-item-3lvl"
                  @click="setFilters(sex.name, category.name, undefined, _class)"
                >
                  <div class="x-cat-item-name">
                    <!--                    <v-icon class="x-small-dot">fiber_manual_record</v-icon>-->
                    {{ _class }}
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>

        <div v-for="(sex, i) in treeDiscountCopy" v-if="catalogMode === 'discount'" :key="i" class="x-cat-item-1lvl">
          <div
            class="x-cat-item-name"
            @click="openCloseAction(sex)"
          >
            <v-icon v-if="sex[CATEGORY_NODE_IS_OPEN]">
              arrow_drop_down
            </v-icon>
            <v-icon v-else>
              arrow_right
            </v-icon>
            {{ sex.name }}
          </div>
          <template v-if="sex[CATEGORY_NODE_IS_OPEN]">
            <div v-for="(group, j) in sex.groupArr" :key="j" class="x-cat-item-2lvl">
              <div
                class="x-cat-item-name"
                @click="openCloseAction(group)"
              >
                <v-icon v-if="group[CATEGORY_NODE_IS_OPEN]">
                  arrow_drop_down
                </v-icon>
                <v-icon v-else>
                  arrow_right
                </v-icon>
                {{ group.name }}
              </div>
              <template v-if="group[CATEGORY_NODE_IS_OPEN]">
                <div
                  v-for="(_class, k) in group.classArr"
                  :key="k"
                  class="x-cat-item-3lvl"
                  @click="setFilters(sex.name, undefined, group.name, _class)"
                >
                  <div class="x-cat-item-name">
                    {{ _class }}
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
      <div v-show="show === SHOW_ACTIVE_ORDER" class="x-filters x-active-order">
        <v-select
          v-if="activeOrder.id"
          :value="activeOrder"
          :disabled="!activeOrder.id"
          :items="prepOrders"
          color="black"
          item-text="id"
          return-object
          label="Текущий заказ №:"
          @input="$emit('set-active-order', $event.id)"
        />
        <gallery-active-order :value="activeOrder" actions @send-order="$emit('send-order')" />
      </div>
    </div>
  </div>
</template>

<script>
export { default } from './-phone-filters.js'
</script>

<style scoped lang="less">
@import "-phone-filters";
</style>
