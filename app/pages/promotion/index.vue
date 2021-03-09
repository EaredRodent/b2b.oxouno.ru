<template>
  <div class="x-page">
    <div class="x-container-left">
      <div class="x-head-left">
        Коллекции
      </div>
      <vue-custom-scrollbar class="x-scroll-area">
        <v-treeview
          v-model="selectedNodes"
          :items="preparedSelectionTree"
          return-object
          selectable
          open-on-click
          on-icon="lens"
          off-icon="radio_button_unchecked"
          indeterminate-icon="remove_circle_outline"
          selected-color="#d57959"
          active-class="x-active-node"
        >
          <template #label="{ item }">
            <div v-if="item.type === 'collection'">
              <div class="x-collection-name">
                {{ item.name }}
              </div>
              <div v-if="item.comment" class="x-collection-comment">
                {{ item.comment }}
              </div>
            </div>
            <div v-else>
              {{ item.name }}
            </div>
          </template>
        </v-treeview>
      </vue-custom-scrollbar>
    </div>
    <div class="x-container-right">
      <div class="x-head-right">
        Рекламные материалы
        <v-btn outline small @click="download">
          <v-icon>mdi-download</v-icon>Скачать все
        </v-btn>
      </div>
      <vue-custom-scrollbar class="x-scroll-area">
        <div v-for="(categoryObj, categoryName, i) in galleryTree" :key="i">
          <div class="x-gallery-category-name">
            {{ categoryName }}
          </div>

          <div v-for="(promos, collectionName, j) in categoryObj" :key="j">
            <div class="x-gallery-collection-name" :first="!j">
              {{ collectionName }}
            </div>

            <div class="x-wrapper">
              <div
                v-for="(promo, i) in promos"
                :key="i"
                class="x-promo"
                :type="promo.type"
              >
                <div
                  class="x-promo-img elevation-5"
                  :style="promo.type === IMG ? { background: `url('${promo.src}')` } : {}"
                  @click="openViewer(promo)"
                >
                  <v-icon v-if="promo.type === UNKNOWN" :size="60">
                    description
                  </v-icon>
                  <v-icon v-if="promo.type === DOC" :size="60">
                    description
                  </v-icon>
                  <v-icon v-if="promo.type === VIDEO" :size="60">
                    play_circle_outline
                  </v-icon>
                </div>
                <div class="x-promo-title">
                  {{ promo.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </vue-custom-scrollbar>
    </div>

    <viewer
      v-if="viewer.state"
      :current="viewer.current"
      :items="selectedPromo"
      @close="closeViewer"
      @update-current="updateViewer"
    />
  </div>
</template>

<script>
export { default } from './index.js'
</script>

<style scoped lang="less">
  @import "index";
</style>
