import VueCustomScrollbar from 'vue-custom-scrollbar'
import ContactDialog from './contact-dialog.vue'
import LegalEntityDialog from './legal-entity-dialog.vue'
import { isPostSuccessful } from '~/plugins/axios-prepare'
import getTypeSale from '~/helpers/getTypeSale'
import getStatusFromDiscount from '~/helpers/getStatusFromDiscount'
import ChangePasswordDialog from '~/pages/common/client-card/change-password-dialog'

export default {
  name: 'Index',
  components: { ChangePasswordDialog, VueCustomScrollbar, ContactDialog, LegalEntityDialog },
  data () {
    return {
      client: {},
      contacts: [],
      legalEntities: [],
      contactDialog: {
        state: false,
        form: {},
        loading: false
      },
      legalEntityDialog: {
        state: false,
        form: {},
        loading: false
      },
      changePasswordDialog: {
        state: false,
        form: {},
        loading: false
      }
    }
  },
  mounted () {
    this.updateAll()
  },
  methods: {
    getTypeSale,
    getStatusFromDiscount,
    async updateAll () {
      this.updateContacts()
      this.updateLE()
      const client = this.$axios.get('/v1/sls-org/get-for-contact')

      this.client = (await client).data
    },
    async updateContacts () {
      const contacts = this.$axios.get('/v1/anx-user/get-contacts')
      this.contacts = (await contacts).data
    },
    async updateLE () {
      const legalEntities = this.$axios.get('/v1/sls-client/get-legal-entities')
      this.legalEntities = (await legalEntities).data
    },
    async addContact () {
      this.contactDialog.loading = true
      const resp = await this.$axios.post(
        '/v1/anx-user/add-new-contact',
        { contact: this.contactDialog.form }
      )
      if (isPostSuccessful(resp)) {
        this.contactDialog.state = false
        this.updateContacts()
      }
      this.contactDialog.loading = false
    },
    async addLE () {
      this.legalEntityDialog.loading = true
      const resp = await this.$axios.post(
        '/v1/sls-client/add-new-entities',
        { legalEntities: [this.legalEntityDialog.form] }
      )
      if (isPostSuccessful(resp)) {
        this.legalEntityDialog.state = false
        this.updateLE()
      }
      this.legalEntityDialog.loading = false
    },
    beginChangePassword () {
      this.changePasswordDialog.state = true
    }
  }
}
