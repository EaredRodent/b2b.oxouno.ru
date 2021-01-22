<template>
  <v-dialog v-if="$isDesktop()" v-model="value.state" width="950" persistent>
    <template v-if="value.state">
      <div class="x-Viewer">
        <v-btn class="x-btn-close" icon large @click="value.state = false">
          <v-icon color="grey">
            close
          </v-icon>
        </v-btn>

        <div class="x-left">
          <img
            v-for="(url, i) in value.prod.photos.small"
            :key="i"
            class="x-min-img"
            :class="{'x-selected-img': selectImg == i}"
            :src="url"
            @mouseenter="selectImg = i"
          >
        </div>

        <div class="x-middle">
          <zoom-on-hover :img-normal="value.prod.photos.large[selectImg]" />
          <div class="x-download-box">
            <v-btn class="x-download-btn" outline small @click="windowOpen(value.prod.photos.large[selectImg])">
              Скачать
            </v-btn>
          </div>
        </div>

        <div class="x-right">
          <div class="x-title">
            {{ value.prod.titleStr }} <span class="x-title-art">{{ value.prod.art }}</span>
          </div>
          <div class="x-model">
            {{ value.prod.modelFk.fashion }}
          </div>
          <div class="x-description">
            {{ value.prod.modelFk.descript }}
          </div>
          <div class="x-color">
            <u>Цвет</u>: {{ themeStr }}
          </div>
          <div v-if="value.prod.printFk.id !== 1" class="x-print">
            <u>Принт</u>: {{ value.prod.printFk.oxouno }}
          </div>
          <div class="x-composition">
            <u>Состав</u>: {{ value.prod.fabricTypeFk.struct }}
          </div>
          <div class="x-density">
            <u>Плотность</u>: {{ value.prod.fabricTypeFk.desity }} г/м2
          </div>
          <div class="x-pack">
            <u>Упаковка</u>: {{ value.prod.packFk ? value.prod.packFk.title : '' }}
          </div>
          <div class="x-prod">
            <table class="x-table">
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
                    <div class="x-size-chip" :style="{background: detail.restColor}">
                      {{ detail.sizeStr }}
                    </div>
                  </td>
                  <td>{{ (detail.weight) ? detail.weight : '-' }}</td>
                  <td>{{ detail.doublePrice }}</td>
                  <td>{{ detail.price }}</td>
                  <td>{{ detail.priceDiscount }}</td>
                  <td>{{ detail.restStr }}</td>
                  <td>
                    <div class="x-td-content-fix-height">
                      <v-text-field
                        v-model.number="sizesForOrder[detail.size]"
                        single-line
                        type="number"
                        min="0"
                        @input="$event < 0 && (sizesForOrder[detail.size] = Math.abs($event))"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!--            <div class="x-size-list">-->
            <!--              <div class="x-size">-->
            <!--                <div class="x-size-header" style="text-align: left">Размеры:</div>-->
            <!--                <div class="x-size-header">Вес:</div>-->
            <!--                <div class="x-size-header">Цена:</div>-->
            <!--                <div class="x-size-header">С скидкой:</div>-->
            <!--                <div class="x-size-header">Остаток:</div>-->
            <!--                <div class="x-size-header">Заказ:</div>-->
            <!--              </div>-->
            <!--              <div class="x-size" v-for="(detail, i) in details" :key="i">-->
            <!--                <div style="display: flex; justify-content: center">-->
            <!--                  <div class="x-size-chip" :style="{background: detail.restColor}">{{ detail.sizeStr }}</div>-->
            <!--                </div>-->
            <!--                <div>{{ (detail.weight) ? detail.weight : '-' }}</div>-->
            <!--                <div>{{ detail.price }}</div>-->
            <!--                <div>{{ detail.priceDiscount }}</div>-->
            <!--                <div>{{ detail.restStr }}</div>-->
            <!--                <v-text-field v-model.number="sizesForOrder[detail.size]" single-line type="number"/>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>

          <div v-if="details.discountBiggerThan29Flag" class="x-discount-bigger-than-29">
            * На данный товар вы можете согласовать дополнительную скидку с вашим менеджером.
          </div>

          <div class="x-btns">
            <v-btn
              v-if="value.slsItemId"
              class="x-order-btn"
              outline
              color="blue-grey darken-4"
              :disabled="!canCreateOrder()"
              :loading="orderEditItemProcessing"
              @click="addBtnClicked"
            >
              Редактировать заказ
            </v-btn>
            <v-btn
              v-else
              class="x-order-btn"
              outline
              color="blue-grey darken-4"
              :disabled="!canCreateOrder()"
              :loading="orderCreateProcessing"
              @click="addBtnClicked"
            >
              Добавить в заказ
            </v-btn>
            <v-btn
              v-if="value.slsItemId"
              class="x-order-btn a3d-order-btn-del"
              outline
              color="red darken-4"
              :disabled="!canCreateOrder()"
              :loading="orderDeleteItemProcessing"
              @click="$emit('delete-item', value.slsItemId)"
            >
              Удалить из заказа
            </v-btn>
          </div>
        </div>
      </div>
    </template>
  </v-dialog>
  <div v-else-if="$isMobile() && value.state" class="xm-MobileViewer">
    <button
      class="xm-button xm-sticky-btn"
      @click="value.state = false"
    >
      Вернуться в каталог
      <v-icon>
        arrow_back
      </v-icon>
    </button>

    <div class="xm-img-box">
      <img class="xm-img-main" :src="value.prod.photos.large[0]">
    </div>

    <div class="xm-content">
      <div class="x-title">
        {{ value.prod.titleStr }} <span class="x-title-art">{{ value.prod.art }}</span>
      </div>
      <div class="x-model">
        {{ value.prod.modelFk.fashion }}
      </div>
      <div class="x-description">
        {{ value.prod.modelFk.descript }}
      </div>
      <div class="x-color">
        <u>Цвет</u>: {{ themeStr }}
      </div>
      <div v-if="value.prod.printFk.id !== 1" class="x-print">
        <u>Принт</u>: {{ value.prod.printFk.oxouno }}
      </div>
      <div class="x-composition">
        <u>Состав</u>: {{ value.prod.fabricTypeFk.struct }}
      </div>
      <div class="x-density">
        <u>Плотность</u>: {{ value.prod.fabricTypeFk.desity }} г/м2
      </div>
      <div class="x-pack">
        <u>Упаковка</u>: {{ value.prod.packFk ? value.prod.packFk.title : '' }}
      </div>

      <div class="x-prod">
        <table class="xm-table">
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
                <div class="xm-size-chip" :style="{background: detail.restColor}">
                  {{ detail.sizeStr }}
                </div>
              </td>
              <td>{{ (detail.weight) ? detail.weight : '-' }}</td>
              <td>{{ detail.priceDiscount }}</td>
              <td>{{ detail.restStr }}</td>
              <td>
                <div class="xm-td-content-fix-height">
                  <v-text-field
                    v-model.number="sizesForOrder[detail.size]"
                    color="black"
                    single-line
                    type="number"
                    placeholder="0"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="details.discountBiggerThan29Flag" class="x-discount-bigger-than-29">
        * На данный товар вы можете согласовать дополнительную скидку с вашим менеджером.
      </div>

      <div class="x-btns">
        <v-btn
          v-if="value.slsItemId"
          class="x-order-btn"
          outline
          color="blue-grey darken-4"
          :disabled="!canCreateOrder()"
          :loading="orderEditItemProcessing"
          @click="addBtnClicked"
        >
          Редактировать заказ
        </v-btn>
        <v-btn
          v-else
          class="x-order-btn"
          outline
          color="blue-grey darken-4"
          :disabled="!canCreateOrder()"
          :loading="orderCreateProcessing"
          @click="addBtnClicked"
        >
          Добавить в заказ
        </v-btn>
        <v-btn
          v-if="value.slsItemId"
          class="x-order-btn a3d-order-btn-del"
          outline
          color="red darken-4"
          :disabled="!canCreateOrder()"
          :loading="orderDeleteItemProcessing"
          @click="$emit('delete-item', value.slsItemId)"
        >
          Удалить из заказа
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from './-viewer.js'
</script>

<style scoped lang="less">
@import "-viewer";
@import "-viewer-mobile";
</style>
