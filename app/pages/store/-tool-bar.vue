<template>
  <div class="x-ToolBar" :shadow="$route.fullPath === '/'">
    <div class="x-top">
      <div
        class="x-category x-left-margin-min"
        :matrix-selected="$route.fullPath === '/store' && catalogMode === 'assort'"
        @click="toCatalog('assort')"
      >
        Ассортиментная матрица
      </div>
      <div
        class="x-category"
        :matrix-selected="$route.fullPath === '/store' && catalogMode === 'discount'"
        @click="toCatalog('discount')"
      >
        Акционный товар
      </div>
      <div
        class="x-category"
        :matrix-selected="$route.fullPath === '/store/outlook'"
        @click="$router.push('/store/outlook')"
      >
        Весна-Лето 2021
      </div>
      <!--      <div class="x-category" @click="$router.push('/store/promotion')">-->
      <!--        Рекламные материалы-->
      <!--      </div>-->
      <div class="x-category" @click="$router.push('/store/orders')">
        Журнал заказов
      </div>
    </div>

    <div class="x-bottom">
      <div
        v-for="(sex, _, i) in treeAssort"
        v-if="catalogMode === 'assort'"
        :key="i"
        class="x-category"
        :style="styleForSexBlock"
        cursor-default
        :selected="sexName === sex.name"
        @mouseenter="catOnMouseEnter(sex.name)"
        @mouseleave="catOnMouseLeave"
      >
        {{ sex.name }}
      </div>

      <div
        v-for="(sex, _, i) in treeDiscount"
        v-if="catalogMode === 'discount'"
        :key="i"
        class="x-category"
        :style="styleForSexBlock"
        cursor-default
        :selected="sexName === sex.name"
        @mouseenter="catOnMouseEnter(sex.name)"
        @mouseleave="catOnMouseLeave"
      >
        {{ sex.name }}
      </div>

      <div
        v-for="(sex, _, i) in treeAssort"
        v-if="catalogMode === 'assort'"
        v-show="sexName === sex.name"
        :key="'drpbl-a' + i"
        class="x-droppable"
        @mouseenter="catOnMouseEnter(sex.name)"
        @mouseleave="catOnMouseLeave"
      >
        <div v-for="(category, _, i) in sex.categoryArr" :key="i" class="x-group">
          <div class="x-group-name">
            {{ category.name }}
          </div>
          <div
            v-for="(_class, i) in category.classArr"
            class="x-class"
            @click="setFilters(sex.name, category.name, undefined, _class)"
          >
            {{ _class }}
          </div>
        </div>
      </div>

      <div
        v-for="(sex, _, i) in treeDiscount"
        v-if="catalogMode === 'discount'"
        v-show="sexName === sex.name"
        :key="'drpbl-d' + i"
        class="x-droppable"
        @mouseenter="catOnMouseEnter(sex.name)"
        @mouseleave="catOnMouseLeave"
      >
        <div v-for="(group, _, i) in sex.groupArr" :key="i" class="x-group">
          <div class="x-group-name">
            {{ group.name }}
          </div>
          <div
            v-for="(_class, i) in group.classArr"
            class="x-class"
            @click="setFilters(sex.name, undefined, group.name, _class)"
          >
            {{ _class }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from './-tool-bar.js'
</script>

<style scoped lang="less">
@import "-tool-bar";
</style>
