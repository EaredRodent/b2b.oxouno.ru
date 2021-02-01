<template>
  <div v-if="$isDesktop()" class="x-galleryActiveOrder">
    <div v-if="actions" class="x-tbao-prep-list">
      <div
        v-for="prepareOrder in prepareOrders"
        :key="prepareOrder.id"
        v-ripple
        class="x-tbao-prep"
        :active="value.id === prepareOrder.id"
        @click="$emit('set-active-order', prepareOrder.id)"
      >
        №{{ prepareOrder.id }}
      </div>
    </div>

    <vue-custom-scrollbar class="x-scroll-area">
      <div v-if="mode === 'table'">
        <div class="x-fbsb">
          <div ref="table" class="x-label">
            Накладная:
          </div>
        </div>
        <table class="x-m-table">
          <tbody>
            <template v-for="slsItem in value.items">
              <tr :key="slsItem.id + '_1'">
                <td class="x-td-name" colspan="2">
                  <div class="x-td-name-box">
                    <div>
                      {{ slsItem.cardProd.titleStr }} {{ slsItem.cardProd.art }}<br>
                      <i>({{ slsItem.cardProd.modelFk.title }}, {{ slsItem.cardProd.themeFk.title }})</i><br>
                    </div>
                    <v-btn
                      class="x-td-prod-edit"
                      icon
                      small
                      @click="$emit('item-edit', slsItem.cardProd)"
                    >
                      <v-icon color="blue-grey darken-3" small>
                        edit
                      </v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
              <tr :key="slsItem.id + '_2'">
                <td class="x-td-img">
                  <img :src="slsItem.cardProd.photos.small[0]" alt="" height="100">
                </td>
                <td class="x-td-table">
                  <div class="x-td-table-layout">
                    <table class="x-table-2">
                      <tbody>
                        <tr v-for="(info, i) in slsItem.includes" :key="i">
                          <td>{{ info.sizeStr }}</td>
                          <td>{{ info.count }} шт.</td>
                          <td>{{ Number(info.price) }} ₽</td>
                        </tr>
                        <tr>
                          <td>Итого:</td>
                          <td>{{ slsItem.count }} шт.</td>
                          <td>{{ Number(slsItem.sum) }} ₽</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </vue-custom-scrollbar>

    <div v-if="actions" class="x-send">
      <div class="x-send-subbox">
        <div class="x-label2">
          Итого: {{ fullCount() }} шт., {{ fullSum() }} ₽
        </div>
        <v-btn class="x-send-btn" outline small color="blue-grey darken-3" @click="$emit('send-order')">
          Оформить
        </v-btn>
      </div>
      <div class="x-send-subbox">
        <div>Истекает: {{ value.ts_expire | formatDateYmdHi }}</div>
        <v-btn
          class="x-send-btn"
          outline
          small
          color="blue-grey darken-3"
          :loading="getMoreTimeButtonLoading"
          @click="$emit('order-get-more-time')"
        >
          Продлить
        </v-btn>
      </div>
    </div>
  </div>
  <div v-else-if="$isMobile()" class="x-m-GalleryActiveOrder">
    <div v-if="actions" class="x-m-send">
      <div class="x-m-label2">
        Изделий: {{ fullCount() }} шт., на сумму {{ fullSum() }} ₽
      </div>
      <v-btn class="x-m-send-btn" outline color="blue-grey darken-3" @click="$emit('send-order')">
        Оформить
      </v-btn>
    </div>

    <table class="x-m-table">
      <tbody>
        <template v-for="slsItem in value.items">
          <tr :key="slsItem.id + '_1'">
            <td class="x-td-name" colspan="2">
              {{ slsItem.cardProd.titleStr }} {{ slsItem.cardProd.art }}<br>
              <i>({{ slsItem.cardProd.modelFk.title }}, {{ slsItem.cardProd.themeFk.title }})</i><br>
            </td>
          </tr>
          <tr :key="slsItem.id + '_2'">
            <td class="x-td-img">
              <img :src="slsItem.cardProd.photos.small[0]" alt="" height="100">
            </td>
            <td class="x-td-table">
              <div class="x-td-table-layout">
                <table class="x-table-2">
                  <tbody>
                    <tr v-for="(info, i) in slsItem.includes" :key="i">
                      <td class="x-td-size-name">
                        {{ info.sizeStr }}
                      </td>
                      <td class="x-td-count">
                        {{ info.count }} шт.
                      </td>
                      <td class="x-td-price">
                        {{ Number(info.price) }} ₽
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="x-div-result">
                  <div class="x-div-size-name x-td-result">
                    Итого:
                  </div>
                  <div class="x-div-count">
                    {{ slsItem.count }} шт.
                  </div>
                  <div class="x-div-price">
                    {{ Number(slsItem.sum) }} ₽
                  </div>
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
export { default } from './-gallery-active-order.js'
</script>

<style scoped lang="less">
@import "-gallery-active-order";
</style>
