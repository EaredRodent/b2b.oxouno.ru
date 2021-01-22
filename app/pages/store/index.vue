<template>
  <div v-if="$isDesktop()" class="x-page x-catalog-padding">
    <div class="x-toolbar x-toolbar-left-right">
      <div class="x-tb-filters x-tb-filters-flex">
        <!--        <div class="x-tb-title">Фильтры:</div>-->
      </div>

      <div class="x-tb-content">
        <div>
          <div v-if="userCatalogInteraction && prodsCount" class="x-tb-search-result">
            Найдено: {{ prodsCount }}
          </div>
        </div>

        <div class="x-td-right-box">
          <v-text-field
            class="x-tb-search"
            :value="search"
            label="Поиск"
            color="black"
            small
            :append-icon="search ? 'close' : 'search'"
            @input="$store.commit('filters/setSearch', $event)"
            @click:append="$store.commit('filters/setSearch', '')"
          />
          <v-btn class="x-tb-btn" icon title="Отображать плиткой" @click="mode = 'cards'">
            <v-icon color="blue-grey darken-2">
              view_module
            </v-icon>
          </v-btn>
          <v-btn class="x-tb-btn" icon title="Отображать таблицей" @click="mode = 'table'">
            <v-icon color="blue-grey darken-2">
              view_headline
            </v-icon>
          </v-btn>
          <v-btn
            class="x-tb-btn"
            icon
            :loading="price.loading"
            :title="price.loading ? 'Подождите, прайс-лист создается...' : 'Создать прайс-лист'"
            @click="downloadPrice"
          >
            <v-icon color="blue-grey darken-2">
              mdi-download
            </v-icon>
          </v-btn>
        </div>
      </div>

      <div class="x-tb-active-orders x-tb-active-orders-flex">
        <div class="x-tb-active-orders-inner">
          <div class="x-tbao-left-side">
            <div class="x-tb-title">
              Подготовка заказов
            </div>
          </div>

          <v-btn
            class="x-btn-create-order"
            outline
            small
            color="blue-grey darken-3"
            :loading="createOrderProcessing"
            @click="openInfoOrderDialog"
          >
            Создать заказ
          </v-btn>
        </div>
      </div>
    </div>
    <div class="x-cat-box">
      <loading v-if="filtersLoading" />

      <filters
        class="x-filters-flex"
        :class="!demoCompleted && 'x-filters-demo'"
        @ready="filtersLoading = false"
      />

      <vue-custom-scrollbar class="x-content">
        <template v-if="fetching">
          <div class="x-no-content">
            <v-progress-circular indeterminate :size="50" :width="1" color="blue-grey darken-4" />
          </div>
        </template>
        <template v-else>
          <collection-descript v-if="collection && collection.epithets" :value="collection" />
          <gallery
            :value="!!(userCatalogInteraction && prodsCount)"
            :mode="mode"
            :items="prods"
            @prod-view="prodView"
          />
          <div v-if="!userCatalogInteraction" class="x-catalog-bg" />
          <div v-else-if="userCatalogInteraction && !prodsCount" class="x-no-content x-no-content-padding">
            Нет изделий
          </div>
          <template v-if="false">
            <div v-if="!userCatalogInteraction" class="x-no-content x-no-content-padding">
              Используйте дерево, навигацию или поиск
            </div>
          </template>
        </template>
      </vue-custom-scrollbar>

      <gallery-active-order
        v-if="prepOrders.length"
        ref="activeOrder"
        class="x-active-orders x-active-orders-flex"
        :value="activeOrder"
        :prepare-orders="prepOrders"
        actions
        :mode="activeOrderMode"
        :get-more-time-button-loading="getMoreTimeButtonLoading"
        @send-order="beginOrderSending"
        @item-edit="prodView"
        @order-get-more-time="orderGetMoreTime"
        @set-active-order="setActiveOrder"
      />
      <div v-else class="x-active-orders x-active-orders-flex x-no-content x-no-content-padding">
        Нет заказов
      </div>

      <div v-if="!demoCompleted" class="x-demo">
        <div class="x-demo-right-block">
          Используйте фильтры для обзора изделий. Кликните по интересующему товару
        </div>
      </div>

      <viewer
        v-model="viewer"
        :order-create-processing="viewer.createOrderProcessing"
        :order-edit-item-processing="viewer.editOrderItemProcessing"
        :order-delete-item-processing="viewer.deleteOrderItemProcessing"
        @add-item-to-order="addItemToOrder"
        @edit-item-from-order="editItemFromOrder"
        @delete-item="itemDelete"
      />

      <dialogs
        :send-order-dialog="sendOrderDialog"
        :info-order-dialog="infoOrderDialog"
        :create-legal-entity-dialog="createLegalEntityDialog"
        @send-order="sendOrder"
        @add-legal-entity="addLegalEntity"
        @remove-legal-entity="removelegalEntity"
        @create-legal-enities="createlegalEntities"
      />
    </div>
  </div>
  <div v-else-if="$isMobile()" class="xm-page">
    <loading v-if="filtersLoading" />
    <phone-filters
      class="xm-filters"
      :class="{'xm-hide-filters': hidePhoneFilterItems}"
      :active-order="activeOrder"
      :prep-orders="prepOrders"
      @ready="filtersLoading = false"
      @send-order="beginOrderSending"
      @show-change="phoneFiltersIsFullScreen = $event"
      @create-order="openInfoOrderDialog"
      @set-active-order="setActiveOrder"
      @delete-order-by-id="deleteOrderByID"
    />
    <div v-show="hidePhoneFilterItems" class="xm-expand-down-box">
      <v-btn class="xm-expand-down" fab @click="hidePhoneFilterItems = false">
        <v-icon>
          mdi-arrow-expand-down
        </v-icon>
      </v-btn>
    </div>
    <div
      class="xm-wrapper"
      :with-padding="hidePhoneFilterItems"
      v-on="getTouchBehavior()"
    >
      <div v-if="!userCatalogInteraction" class="x-mb-catalog-bg" />
      <div v-else-if="userCatalogInteraction && !prodsCount" class="x-no-content x-no-content-padding">
        Нет изделий
      </div>
      <gallery
        class="xm-mb-gallery"
        :mobile="true"
        :value="!!(userCatalogInteraction && prodsCount)"
        :items="prods"
        mode="cards"
        @prod-view="prodView"
      />
    </div>

    <viewer
      v-model="viewer"
      :order-create-processing="viewer.createOrderProcessing"
      :order-edit-item-processing="viewer.editOrderItemProcessing"
      :order-delete-item-processing="viewer.deleteOrderItemProcessing"
      @add-item-to-order="addItemToOrder"
      @edit-item-from-order="editItemFromOrder"
      @delete-item="itemDelete"
    />

    <dialogs
      :send-order-dialog="sendOrderDialog"
      :info-order-dialog="infoOrderDialog"
      :create-legal-entity-dialog="createLegalEntityDialog"
      @send-order="sendOrder"
      @add-legal-entity="addLegalEntity"
      @remove-legal-entity="removelegalEntity"
    />
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
@import "index";
@import "index-mobile";
</style>
