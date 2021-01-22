export default {
  name: 'Index',
  data () {
    return {
      divs: [
        'Договор оферты',
        'Сертификаты соотвествия',
        'Награды'
      ],
      selectItem: 0
    }
  },
  mounted () {

  },
  methods: {
    selectDiv (i) {
      this.selectItem = i
    }
  }
}
