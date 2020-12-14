<template>
  <div class="testapi-page">

    <div class="left-panel elevation-3">

      <div style="display: flex; justify-content: space-between; align-items: center">
        <h1>Test Api</h1>
        <v-btn flat icon color="green" @click="update">
          <v-icon>cached</v-icon>
        </v-btn>
      </div>

      <br>

      <v-treeview :items="listControllers" open-on-click item-key="key">
        <template v-slot:label="{ item }">
          <div class="_item" @click="selectAction(item)"
               :class="selectedAction.key === item.key ? 'select-item' : ''">{{ item.name }}
          </div>
        </template>
      </v-treeview>

    </div>

    <div class="right-panel">

      <div>
        <div style="display: flex; justify-content: space-between;">
          <h1>{{ selectedAction.url }}</h1>
          <v-btn small @click="exec">exec</v-btn>
        </div>
        <pre style="min-width: 50px; background-color: #ffffdd">{{ selectedAction.comment }}</pre>
        <v-text-field v-for="(param, key) in curParams" :key="key" :label="key" v-model="curParams[key]"/>
        <pre style="background-color: #dcfff5"
        >[{{ respItems }}] | DB queryes: <b>{{ logDbCount }}</b> | DB time: <b>{{ logDbTime }}</b> | App time: <b>{{ logAppTime }}</b> | App memory: <b>{{ logAppMemory }}</b></pre>
      </div>

      <div>
        <pre>{{ data }}</pre>
        <div v-if="exceptionInfo.exceptionObjectIsInvalid" class="exception-info">
          Объект исключения невалиден.
        </div>
        <div v-if="exceptionInfo.responseBlockedByBrowser" class="exception-info">
          К ответу нет доступа.
        </div>
        <div v-if="exceptionInfo.status" class="exception-info">
          <div class="exception-info-header">{{ exceptionInfo.status }}&nbsp;{{ exceptionInfo.statusText }}</div>
          <pre>{{ exceptionInfo.data }}</pre>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import js from './test-api'

export default js
</script>

<style scoped lang="less">
  @import "./test-api";
</style>
