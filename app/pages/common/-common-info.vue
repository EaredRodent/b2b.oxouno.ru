<template>
  <div>
    <div class="shop-label">
      Кабинет клиента
    </div>
    <div class="shop-details">
      <div>
        - Ваш статус:
        <span class="shop-calc">
          {{ getStatusFromDiscount(organization.discount) }}
        </span>
      </div>
      <div>
        - Скидка:
        <span class="shop-calc">
          {{ Number(organization.discount || 0) }}%
        </span>
      </div>
      <div>
        - Всего заказов:
        <span class="shop-calc">
          {{ allOrders.length }}
        </span>
        &nbsp;на сумму
        <span class="shop-calc">
          {{ allOrders.reduce((a, ord) => a + ord.sum, 0) | summStr }}&nbsp;₽
        </span>
      </div>
      <div>
        - Заказов на подготовке
        <span class="shop-calc">
          {{ prepOrders.length }}
        </span>
        &nbsp;на сумму
        <span class="shop-calc">
          {{ prepOrders.reduce((a, ord) => a + ord.sum, 0) | summStr }}&nbsp;₽
        </span>
      </div>
    </div>
    <template v-if="!$isMobile()">
      <div class="shop-label mt-5">
        Дропшиппинг
      </div>
      <div>Сервис в разработке.</div>
      <div class="shop-label mt-5">
        Предзаказы
      </div>
      <div>Сервис в разработке.</div>
      <div class="shop-label mt-5">
        Региональные дилеры
      </div>
      <div>Сервис в разработке.</div>
    </template>
  </div>
</template>

<script>
import getStatusFromDiscount from '~/helpers/getStatusFromDiscount.js'

export default {
  name: 'CommonInfo',
  props: {
    organization: {
      type: Object,
      default: () => {
      }
    },
    allOrders: {
      type: Array,
      default: () => []
    },
    prepOrders: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getStatusFromDiscount
  }
}
</script>

<style scoped lang="less">
.shop-label {
  font-size: 30px;
  text-transform: uppercase;
}

.shop-details {

}

.shop-calc {
  background: #fff2;
  padding: 4px;
  border-radius: 5px;
  line-height: 1;
}
</style>
