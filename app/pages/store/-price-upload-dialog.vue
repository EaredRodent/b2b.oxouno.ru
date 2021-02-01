<template>
  <dialog-ex
    :value="true"
    :width="400"
    title="Создать заказ из прайс листа"
    :ok-button="success"
    :cancel-button="!success"
    ok-label="Ок"
    @cancel="priceUploadDialog.state = false"
    @ok="priceUploadDialog.state = false"
  >
    <vue-custom-scrollbar v-if="success">
      <div class="x-rest-errors">
        <div v-for="(restError, i) in restErrors" :key="i" class="x-rest-error">
          {{ restError }}
        </div>
      </div>
    </vue-custom-scrollbar>
    <div v-else class="x-upload" @click="chooseFile" @dragover.prevent @drop.prevent="uploadFile($event.dataTransfer.files)">
      <v-progress-circular v-if="loading" color="#89b" indeterminate :width="2" :value="true" />
      <div v-else class="x-upload-content">
        Ператищите файл сюда или нажмите для выбора...
      </div>
    </div>

    <input ref="input" class="x-input" type="file" @change="uploadFile($event.target.files)">
  </dialog-ex>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar'
import DialogEx from '~/components/dialog-ex/index.vue'
import { isPostSuccessful } from '~/plugins/axios-prepare.js'

export default {
  name: 'PriceUploadDialog',
  components: { DialogEx, VueCustomScrollbar },
  props: {
    priceUploadDialog: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      success: false,
      restErrors: []
    }
  },
  methods: {
    chooseFile () {
      this.$refs.input.value = ''
      this.$refs.input.click()
    },
    async uploadFile (files) {
      this.loading = true
      const fd = new FormData()
      fd.append('file', files[0])
      try {
        const resp = await this.$axios.post('/v1/sls-order/price-to-order', fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (isPostSuccessful(resp)) {
          this.success = true
          this.$emit('update-orders')
          const { data: { restsError: restErrors } } = resp

          if (restErrors) {
            this.restErrors = restErrors
          } else {
            this.priceUploadDialog.state = false
          }
        }
      } catch (e) {}
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
  .x-upload {
    height: 380px;
    background: #e8f8ff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dotted #bcf;
    cursor: pointer;
  }

  .x-upload:hover {
    background: #e0f0ff;
  }

  .x-upload-content {
    flex: 0 0 250px;
    text-align: center;
    color: #89b;
    font-weight: 500;
  }

  .x-input {
    display: none;
  }

  .x-rest-errors {
    height: 380px;
  }

  .x-rest-error {
    margin-bottom: 10px;
  }
</style>
