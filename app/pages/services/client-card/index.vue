<template>
  <div class="a9-ClientCard">
    <div class="a9-grid-top">
      <div class="a9-grid-left">
        <table class="a9-table" v-if="client.id">
          <tr>
            <td class="a9-td-minw"></td>
            <td class="a9-table-title">Карточка клиента</td>
          </tr>
          <tr>
            <td class="a9-td-minw x-tar">Наименование:</td>
            <td>{{ client.name }}</td>
          </tr>
          <tr>
            <td class="a9-td-minw x-tar">Локация:</td>
            <td>{{ client.location }}</td>
          </tr>
          <tr>
            <td class="a9-td-minw x-tar">Статус:</td>
            <td>{{ client.statusStr }}</td>
          </tr>
          <tr>
            <td class="a9-td-minw x-tar">Скидка:</td>
            <td>{{ Number(client.discount) }}</td>
          </tr>
          <tr>
            <td class="a9-td-minw x-tar">Комментарий:</td>
            <td>{{ client.comment }}</td>
          </tr>
          <tr>
            <td class="a9-td-minw x-tar">Ваш менеджер:</td>
            <td>{{ client.managerFk.name }}</td>
          </tr>
          <tr>
            <td class="a9-td-minw x-tar x-wsnv">Дата регистрации:</td>
            <td>{{ client.ts_create | formatDateYmdHi }}</td>
          </tr>
        </table>

        <table class="a9-table a9-table-margin-top" v-if="client.id">
          <tr>
            <td class="a9-td-minw"></td>
            <td class="a9-table-title">Контактные лица</td>
          </tr>
          <template v-for="(contact, i) in contacts">
            <tr class="a9-tr-delimiter" v-if="i"></tr>
            <tr>
              <td class="a9-td-minw x-tar"></td>
              <td><u>{{ contact.name }}</u></td>
            </tr>
            <tr>
              <td class="a9-td-minw x-tar">E-Mail:</td>
              <td>{{ contact.login }}</td>
            </tr>
            <tr>
              <td class="a9-td-minw x-tar">Телефон:</td>
              <td>{{ contact.phone }}</td>
            </tr>
          </template>
        </table>
      </div>
      <div class="a9-grid-right">

        <table class="a9-table" v-if="client.id">
          <tr>
            <td></td>
            <td class="a9-table-title">Юридические лица</td>
          </tr>
          <template v-for="(legalEntity, i) in legalEntities">
            <tr class="a9-tr-delimiter" v-if="i"></tr>
            <tr>
              <td class="x-tar"></td>
              <td><u>{{ legalEntity.short_name }}</u></td>
            </tr>
            <tr>
              <td class="x-tar">ИНН:</td>
              <td>{{ legalEntity.inn }}</td>
            </tr>
            <tr>
              <td class="x-tar">КПП:</td>
              <td>{{ legalEntity.kpp }}</td>
            </tr>
            <tr>
              <td class="x-tar">Почтовый индекс:</td>
              <td>{{ legalEntity.post_index }}</td>
            </tr>
            <tr>
              <td class="x-tar">Адрес:</td>
              <td>{{ legalEntity.post_address }}</td>
            </tr>
            <tr>
              <td class="x-tar">Тип продаж:</td>
              <td>{{ typeSaleVariant[legalEntity.type_sale] }}</td>
            </tr>
            <!--            <tr v-for="(docType, i) in docsForLegalEntities[legalEntity.id]">-->
            <!--              <td class="x-tar">{{ docType.name }}</td>-->
            <!--              <td class="a9-docs-td">-->
            <!--                <div class="a9-docs-box">-->
            <!--                  <div class="a9-docs-list">-->
            <!--                    <v-icon class="a9-doc-icon blue-grey&#45;&#45;text text-d" v-for="(file, j) in docType.files" :key="j" small-->
            <!--                            @click="openFile(file.url)">-->
            <!--                      insert_drive_file-->
            <!--                    </v-icon>-->
            <!--                  </div>-->
            <!--                  <input class="a9-input-upload" :ref="'inputUpload_' + legalEntity.id + '_' + docType.dir"-->
            <!--                         type="file" name="files[]"-->
            <!--                         @change="uploadDocs(legalEntity.id, docType.dir, $event.target.files)" multiple/>-->
            <!--                  <v-btn class="a9-doc-upload-btn" outline small-->
            <!--                         :loading="loadState === legalEntity.id + '_' + docType.dir"-->
            <!--                         @click="clickUploadInput(legalEntity.id, docType.dir)">-->
            <!--                    Загрузить-->
            <!--                  </v-btn>-->
            <!--                </div>-->
            <!--              </td>-->
            <!--            </tr>-->
          </template>
        </table>
      </div>
    </div>
    <div>
      <p class="a9-info">
        По вопросам добаления новых контактных и юридических лиц - обращайтесь к вашему менеджеру
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      client: {},
      contacts: [],
      legalEntities: [],
      docsForLegalEntities: [],
      loadState: '',
      typeSaleVariant: {
        wholesale: 'Опт',
        retail: 'Розница',
        eshop: 'Интернет магазин'
      }
    }
  },
  mounted () {
    this.updateAll()
  },
  methods: {
    async updateAll () {

      let client = this.$axios.get('/v1/sls-org/get-for-contact')
      let contacts = this.$axios.get('/v1/anx-user/get-contacts')
      let legalEntities = this.$axios.get('/v1/sls-client/get-legal-entities')
      let docsForLegalEntities = this.$axios.get('/v1/sls-client/get-docs-for-contact')

      this.client = (await client).data
      this.contacts = (await contacts).data
      this.legalEntities = (await legalEntities).data
      // this.docsForLegalEntities = (await docsForLegalEntities).data
    },

    clickUploadInput (legalEntityID, docTypeDir) {
      this.$refs['inputUpload_' + legalEntityID + '_' + docTypeDir][0].click()
    },

    async uploadDocs (legalEntityID, docType, files) {
      let fd = new FormData()
      Array.prototype.forEach.call(files, file => {
        fd.append('files[]', file)
      })
      fd.append('legalEntityID', legalEntityID)
      fd.append('docType', docType)

      this.loadState = legalEntityID + '_' + docType
      await this.$axios.post('/v1/sls-client/upload-docs-from-contact', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.loadState = ''
    },

    openFile (url) {
      window.open(url)
    }
  }
}
</script>
