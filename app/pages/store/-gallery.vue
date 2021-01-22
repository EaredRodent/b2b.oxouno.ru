<template>
  <div class="x-gallery" :style="{ maxHeight: value ? null : 0 }" :mobile="mobile">
    <div v-if="mode === 'cards'" class="x-mode-gallery">
      <div v-for="(categoryObj, categoryName, i) in groups" :key="i">
        <div class="x-category-name">
          {{ categoryName }}
        </div>

        <div v-for="(collectionArr, collectionName, j) in categoryObj" :key="j">
          <div class="x-collection-name" :first="!j">
            {{ collectionName }}
          </div>

          <div class="x-wrapper">
            <div
              v-for="prod in collectionArr"
              :key="prod.art"
              class="x-art x-art-margin"
              @click="$emit('prod-view', prod)"
            >
              <template v-if="prod.discount">
                <div class="x-price-info">
                  <div class="x-price-discount">
                    -{{ prod.discount }}%
                  </div>
                  <div>
                    <div class="x-price-current" :no-product="!prod.flagRest">
                      <span class="x-price-old2">{{ prod.minPrice }}</span> {{ prod.discountPrice }} ₽
                    </div>
                    <!--              <div class="x-price-old">-->
                    <!--                {{ prod.minPrice }} ₽-->
                    <!--              </div>-->
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="x-price">
                  <div class="x-price-current" :no-product="!prod.flagRest">
                    {{ prod.minPrice }} ₽
                  </div>
                </div>
              </template>
              <div class="x-art-img" :style="{ background: `url('${prod.photos.medium[0]}')` }" />
              <div class="x-art-info">
                {{ prod.titleStr }} <br>
                {{ prod.art }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mode === 'table'" class="x-mode-table">
      <div v-for="(categoryObj, categoryName, i) in groups" :key="i">
        <div class="x-category-name">
          {{ categoryName }}
        </div>

        <div v-for="(collectionArr, collectionName, j) in categoryObj" :key="j">
          <div class="x-collection-name" :first="!j">
            {{ collectionName }}
          </div>

          <div v-for="(prod, i) in collectionArr" :key="prod.id" class="x-table-art" :end="items.length - 1 === i">
            <div class="x-cat-prod" @click="$emit('prod-view', prod)">
              <div class="x-cat-left">
                <div class="x-cat-line">
                  <span class="x-cat-attr">Артикул:</span>
                  <span class="x-fw-500">{{ prod.art }}</span>
                </div>

                <div class="x-cat-line">
                  <span class="x-cat-attr">Цвет:</span>
                  <span>{{ prod.themeFk.title }}</span>
                </div>

                <div class="x-cat-line">
                  <span class="x-cat-attr">Состав:</span>
                  <span>{{ prod.fabricTypeFk.struct }}</span>
                </div>

                <div class="x-cat-line">
                  <span class="x-cat-attr">Размеры:</span>
                  <span
                    v-for="size in prod.sizes"
                    :key="size.size"
                  >
                    {{ size.size }}&nbsp;&nbsp;
                  </span>
                </div>

                <div class="x-cat-line">
                  <span class="x-cat-attr">Цена:</span>
                  <template v-if="prod.discount">
                    <span class="x-tbl-old-price">{{ prod.minPrice }} ₽</span>
                    <span class="x-tbl-discount">-{{ prod.discount }}%</span>
                    <span class="x-tbl-discount-price">{{ prod.discountPrice }} ₽</span>
                  </template>
                  <template v-else>
                    <span class="x-tbl-price">{{ prod.discountPrice }} ₽</span>
                  </template>
                  <span />
                  <span v-if="!prod.flagRest" class="x-no-product">(нет на складе)</span>
                </div>
              </div>
              <div class="x-cat-imgs">
                <img
                  v-for="(prev) in prod.photos.small.filter(_, i => i < 3)"
                  :key="prev"
                  class="x-table-img"
                  :src="prev"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from './-gallery.js'
</script>

<style scoped lang="less">
@import "-gallery";
</style>
