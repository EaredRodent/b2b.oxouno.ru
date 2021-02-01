import VueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  name: 'Index',
  components: { VueCustomScrollbar },
  data () {
    return {
      documentTree: [
        {
          name: 'Договор оферты',
          items: [
            {
              title: 'Редакция от 11.08.2020',
              preview: '/documents/offer/offer_11.08.2020.jpg',
              url: '/documents/offer/offer_11.08.2020.docx'
            },
            {
              title: 'Редакция от 06.11.2019',
              preview: '/documents/offer/offer_06.11.2019.jpg',
              url: '/documents/offer/offer_06.11.2019.pdf'
            }
          ]
        },
        {
          name: 'Сертификаты соотвествия',
          items: [
            {
              preview: '/documents/certificate/1.jpg',
              url: '/documents/certificate/1.pdf'
            },
            {
              preview: '/documents/certificate/2.jpg',
              url: '/documents/certificate/2.pdf'
            },
            {
              preview: '/documents/certificate/3.jpg',
              url: '/documents/certificate/3.pdf'
            },
            {
              preview: '/documents/certificate/4.jpg',
              url: '/documents/certificate/4.pdf'
            },
            {
              preview: '/documents/certificate/5.jpg',
              url: '/documents/certificate/5.jpg'
            },
            {
              preview: '/documents/certificate/6.jpg',
              url: '/documents/certificate/6.jpg'
            }
          ]
        },
        {
          name: 'Награды',
          items: [
            {
              preview: '/documents/achievements/1.jpg',
              url: '/documents/achievements/1.jpg'
            },
            {
              preview: '/documents/achievements/2.jpg',
              url: '/documents/achievements/2.jpg'
            },
            {
              preview: '/documents/achievements/3.jpg',
              url: '/documents/achievements/3.jpg'
            },
            {
              preview: '/documents/achievements/4.jpg',
              url: '/documents/achievements/4.jpg'
            }
          ]
        }
      ],
      selectedNode: {}
    }
  },
  created () {
    this.selectNode(this.documentTree[0] ?? {})
  },
  methods: {
    selectNode (obj) {
      this.selectedNode = obj
    }
  }
}
