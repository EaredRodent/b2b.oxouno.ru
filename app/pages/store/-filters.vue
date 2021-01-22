<template>
  <vue-custom-scrollbar :key="catalogMode" class="x-filters" :mobile="$isMobile()">
    <div class="x-spacer">
      Фильтры
    </div>
    <v-checkbox
      v-model="filterNewOnly"
      class="x-checkbox"
      label="Только новинки"
      color="#d57959"
      :ripple="false"
    />
    <template v-if="catalogMode === 'assort'">
      <div class="x-spacer">
        Ассортиментная матрица
      </div>
      <v-treeview
        v-model="topTreeSelection"
        :selectable="!disabledFilters.tree"
        return-object
        :items="topTreeCopy.items"
        :open="topTreeOpen"
        open-on-click
        :disabled="true"
        on-icon="lens"
        off-icon="radio_button_unchecked"
        indeterminate-icon="remove_circle_outline"
        selected-color="#d57959"
      >
        <template #append="{ item }">
          <v-icon
            v-if="item.type === 'collection'"
            class="x-append-icon"
            @click.stop="openCollectionDescription(item)"
          >
            info_outline
          </v-icon>
        </template>
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
    </template>
    <template v-if="catalogMode === 'discount'">
      <div class="x-spacer">
        Акционный товар
      </div>
      <v-treeview
        v-model="bottomTreeSelection"
        :selectable="!disabledFilters.tree"
        return-object
        :items="bottomTreeCopy.items"
        :open="bottomTreeOpen"
        open-on-click
        on-icon="lens"
        off-icon="radio_button_unchecked"
        indeterminate-icon="remove_circle_outline"
        selected-color="#d57959"
      />
    </template>

    <dialog-ex
      v-model="dialogCollectionDescription.state"
      :title="dialogCollectionDescription.collectionNode.name"
      :cancel-button="false"
      :width="1000"
      :persistent="false"
      @ok="closeCollectionDescription"
    >
      <p v-for="(p, i) in dialogLines" :key="i">
        {{ p }}
      </p>
    </dialog-ex>
  </vue-custom-scrollbar>
</template>

<script>
export { default } from './-filters.js'
</script>

<style scoped lang="less">
@import "-filters";
</style>
