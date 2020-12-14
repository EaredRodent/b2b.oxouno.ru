export default {

  data () {
    return {
      listControllers: [],
      selectedAction: {},
      curParams: [],
      data: {},
      respItems: 0,
      logDbCount: '',
      logDbTime: '',
      logAppTime: '',
      logAppMemory: '',
      exceptionInfo: {
        exceptionObjectIsInvalid: false,
        responseBlockedByBrowser: false,
        status: 0,
        statusText: '',
        data: {}
      }
    }
  },

  mounted () {
    this.getListControllers()
  },

  methods: {
    getListControllers () {
      return new Promise(async (resolve, reject) => {
        let { data } = await this.$axios.get('/v1/base/get-controllers')
        this.listControllers = data
        resolve()
      })
    },

    clear () {
      this.data = null
      this.exceptionInfo.exceptionObjectIsInvalid = false
      this.exceptionInfo.responseBlockedByBrowser = false
      this.exceptionInfo.status = 0
      this.exceptionInfo.statusText = ''
      this.exceptionInfo.data = {}
    },

    async selectAction (item) {
      this.logDbCount = ''
      this.logDbTime = ''
      this.logAppTime = ''
      this.logAppMemory = ''

      this.selectedAction = Object.assign({}, item)
      let urlStr = item.url
      this.clear()

      if (item.comment) {
        let comPrms = new RegExp('(\\$\\S+)', 'ig')
        let match
        let params = []

        while ((match = comPrms.exec(item.comment)) !== null) {
          params.push(match[1])
        }

        params = params.map((value) => {
          return value.replace('$', '')
        })

        let curParams = {}

        for (let param of params) {
          curParams[param] = ''
        }

        this.curParams = curParams
      }
    },

    async exec () {
      let urlStr = this.selectedAction.url
      this.clear()

      if (urlStr !== undefined) {
        let method = urlStr.split(' ')[0]
        let url = urlStr.split(' ')[1]
        let data = {}

        try {
          let response = {}

          if (method === 'GET') {
            response = await this.$axios.get(url, { params: this.curParams })
          }

          if (method === 'POST') {
            let response = await this.$axios.post(url, this.curParams)
          }

          this.respItems = response.data.length
          this.logDbCount = response.headers['log-dbcount']
          this.logDbTime = response.headers['log-dbtime']
          this.logAppTime = response.headers['log-apptime']
          this.logAppMemory = response.headers['log-appmemory']
          this.data = response.data
        } catch (e) {
          let eObj = JSON.parse(JSON.stringify(e))

          // Объект исключения валиден?
          if (eObj) {
            // Есть доступ к ответу?
            if ('response' in eObj) {
              this.exceptionInfo.status = eObj.response.status
              this.exceptionInfo.statusText = eObj.response.statusText

              // Сервер вернул подробные данные об ошибке?
              if ('data' in eObj.response) {
                this.exceptionInfo.data = eObj.response.data
              }
            } else {
              this.exceptionInfo.responseBlockedByBrowser = true
            }
          } else {
            this.exceptionInfo.exceptionObjectIsInvalid = true
          }
        }
      }
    },

    async update () {
      await this.getListControllers()
      let key = this.selectedAction.key
      for (let item1nd of this.listControllers) {
        for (let item2nd of item1nd.children) {
          if (item2nd.key === key) {
            this.selectAction(item2nd)
          }
        }
      }
    }
  }
}
