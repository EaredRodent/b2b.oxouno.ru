<template>
  <div class="shop-desktop" v-if="$isDesktop()">
    <div class="left-box">
      <div class="shop-label">Кабинет клиента</div>
      <div class="shop-details">
        <div>- Ваш статус: <span class="shop-calc">Опт SILVER</span></div>
        <div>- Скидка: <span class="shop-calc">20%</span></div>
        <div>- Всего заказов: <span class="shop-calc">45</span> на сумму <span class="shop-calc">750 000 р.</span></div>
        <div>- Заказов на подготовке <span class="shop-calc">2</span> на сумму <span class="shop-calc">95 000 р.</span></div>
      </div>
      <div class="shop-label mt-5">Дропшиппинг</div>
      <div class="shop-details">
        <div>- Клиентов: <span class="shop-calc">8</span></div>
        <div>- Всего заказов: <span class="shop-calc">15</span> на сумму <span class="shop-calc">175 000 р.</span></div>
        <div>- Заказов в обработке <span class="shop-calc">4</span></div>
      </div>
      <div class="shop-label mt-5">Предзаказы</div>
      <div>Сервис не подключен</div>
      <v-btn class="preorders-accept" color="white" outline>Подключить</v-btn>
      <div class="shop-label mt-5">Региональные дилеры</div>
      <div>Сервис в разработке</div>
    </div>
    <vue-custom-scrollbar class="right-box" v-html="htmlBrandAbout">
    </vue-custom-scrollbar>
<!--    <div class="a0b-container">-->
<!--      <div class="a0b-block">-->
<!--        <div class="a0b-head">OXOUNO B2B — Кабинет клиента</div>-->
<!--        <div class="a0b-body" v-if="org.status">-->
<!--          — Статус: {{ discountVariant[org.status !== undefined ? org.status : 0 ].text }}<br>-->
<!--          — Скидка: {{ Number(org.discount || 0) }}%<br>-->
<!--          — Заказов на подготовке: {{ prepOrders.length }}<br>-->
<!--          — Всего заказов: {{ allOrders.length }}<br/>-->
<!--        </div>-->
<!--        <div v-else>-->
<!--          <v-progress-circular :size="30" :width="2" color="wheat" indeterminate/>-->
<!--        </div>-->
<!--        <div class="a0b-foot">Покупайте прямо сейчас, мы онлайн!</div>-->
<!--      </div>-->

<!--      &lt;!&ndash;            <a class="a0b-offer" target="_blank" href="/docs/oferta/oferta_11.08.2020.docx">Скачать договор оферты</a>&ndash;&gt;-->
<!--    </div>-->

<!--    <img class="a0b-event-banner elevation-3" v-if="event.show" :src="event.banner.middleImage"-->
<!--         @click="bannerClick">-->
<!--    <div class="a0b-wall"-->
<!--         @mouseenter="wallEnter"-->
<!--         @mouseleave="wallLeave"-->
<!--         :on-read="wall.onRead">-->
<!--      <vue-custom-scrollbar class="a0b-wall-inner" v-html="htmlBrandAbout">-->

<!--      </vue-custom-scrollbar>-->
<!--    </div>-->
  </div>
  <div class="a0b-AuthorizedContent-Phone" v-else-if="$isMobile()">
    <div class="a0b-mobile-content">
      <div class="a0b-mobile-block">
        <div class="a0b-m-inner">
          <div class="a0b-m-head">
            <span>OXOUNO B2B — Кабинет клиента</span>
          </div>
          <div class="a0b-body" v-if="org.status">
            <span>— Статус: {{ discountVariant[org.status !== undefined ? org.status : 0 ].text }}</span><br>
            <span>— Скидка: {{ Number(org.discount || 0) }}%</span><br>
            <span>— Заказов на подготовке: {{ prepOrders.length }}</span><br>
            <span>— Всего заказов: {{ allOrders.length }}</span><br/>
          </div>
          <div v-else>
            <v-progress-circular :size="30" :width="2" color="wheat" indeterminate/>
          </div>
          <div class="a0b-m-foot">
            <span>Покупайте прямо сейчас, мы онлайн!</span>
          </div>
        </div>
      </div>
      <div class="a0b-m-wall">
        <div class="a0b-m-wall-label">
          Инфоблок
        </div>
        <div class="a0b-m-wall-title"/>
        <vue-custom-scrollbar class="a0b-m-wall-scroll" v-html="htmlBrandAbout">
        </vue-custom-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import VueCustomScrollbar from 'vue-custom-scrollbar'
import { MixinClientOrdersMethods } from './orders/index'
import { MixinEvent } from './-guest-content'

export const discountVariant = [
  { value: 0, text: 'Базовый', discount: '0' },
  { value: 1, text: 'Розница ☆', discount: '5' },
  { value: 2, text: 'Розница ☆ ☆', discount: '10' },
  { value: 3, text: 'Розница ☆ ☆ ☆', discount: '15' },
  { value: 4, text: 'Опт Silver', discount: '20' },
  { value: 5, text: 'Опт Gold', discount: '25' },
  { value: 6, text: 'Опт Platinum', discount: '29' }
]

export default {
  name: 'authorized-content',
  mixins: [MixinClientOrdersMethods, MixinEvent],
  components: { VueCustomScrollbar },
  data () {
    return {
      sexTags: [],
      org: {},
      discountVariant,
      wall: {
        timer: 0, // setTimeout
        onRead: false
      },
      htmlBrandAbout: `<p class="a0b-wall-title">Уважаемые партнеры!</p>
        <p>
          Ли Эделькорт — одна из самых влиятельных тренд-хантеров планеты, регулярно консультирует известные бренды и
          большие производственные компании, а в 2003 году Time включил ее в топ-25  самых влиятельных людей мира моды.
          Пять лет назад она предрекла конец мира моды в том виде, в котором мы его знаем, заявив, что Fashion-индустрия
          стала нелепой и жалкой пародией на саму себя.
        </p>
        <p>
          Мир меняется. Меняется и подход к выбору одежды.
        </p>
        <p>
          Мы все чаще склоняемся к выбору простой удобной и качественной одежды. Принципы разумной достаточности и
          минимализма завоевывают умы.
        </p>
        <p>
          В 2017 году мы вышли на российский рынок с брендом OXOUNO. Премиальное качество, минимализм, разумная
          достаточность и при этом доступная цена — наша философия.
        </p>
        <p>
          Изготовление одежды это не изобретение велосипеда. Технологии давно разработаны, как в производстве ткани так и
          пошиве. Всех производителей отличает лишь подход к этому процессу.
        </p>
        <p>
          Мы выбрали для себя нишу трикотажной одежды для ежедневной носки (базовый ассортимент) в нашей ассортиментной
          матрице:
        </p>
        <ul>
          <li>
            Бельевая группа для мужчин
            <ul>
              <li>трусы</li>
              <li>майки</li>
              <li>футболки</li>
            </ul>
          </li>

          <li>
            Бельевая группа для женщин
            <ul>
              <li>трусы</li>
              <li>топы</li>
            </ul>
          </li>
          <li>Термобелье для мужчин, женщин и детей</li>
          <li>Домашняя одежда для мужчин и женщин</li>
          <li>
            Повседневная одежда для мужчин
            <ul>
              <li>футболки</li>
              <li>шорты</li>
              <li>лонгсливы</li>
              <li>худи</li>
              <li>толстовки</li>
              <li>брюки</li>
              <li>костюмы</li>
            </ul>
          </li>
          <li>
            Повседневная одежда для женщин
            <ul>
              <li>футболки</li>
              <li>толстовки</li>
              <li>худи</li>
              <li>шорты</li>
              <li>юбки</li>
              <li>брюки</li>
              <li>костюмы</li>
            </ul>
          </li>
        </ul>
        <p>
          Наше предприятие укомплектовано топовым швейным оборудованием лучших мировых производителей швейные машины и
          полуавтоматы цепного стежка YAMATO, челночного стежка JUKI, раскройное оборудование КМ, вышивальные станки ZSK,
          печать на футболках ROQ YOU, печать на синтетических тканях MONTI ANTONIO и EPSON.
        </p>
        <p>
          Такое оборудование позволяет нам работать с тонкими и деликатными тканями.
        </p>
        <p>
          Большое внимание мы уделяем выбору тканей, подбору фурнитуры и ниток.
        </p>
        <p>
          Мы сотрудничаем с европейскими производителями премиальных полотен использующих в производстве американский
          тонковолокнистый хлопок. Все ткани проходят специальные обработки делающие полотна мягкими и шелковистыми.
        </p>
        <p>
          Наши дизайнеры отслеживают актуальные тренды в крое и колористике регулярно посещают мировые выставки.
        </p>
        <p>
          Опытные конструкторы разрабатывают новые модели и адаптируют их под особенности русских фигур.
        </p>
        <p>
          Мы реализуем свою продукцию через разветвленную дилерскую сеть по всей России.
          Ценовая политика которую мы применяем защищает наших контрагентов от недобросовестной конкуренции и позволяет
          зарабатывать вместе с нами.
        </p>
        <p>
          Для большего удобства работы с нашей компанией мы запустили В2В кабинет.
        </p>
        <p><u>
          Это дает вам возможность в любое удобное для вас время работать с нашим складом готовой продукции и формировать
          заказы.
        </u>
        </p>
        <p>
          Продуманная система фильтров дает возможность быстро найти нужный товар.
        </p>
        <p>
          Ко всему ассортименту прикреплены фотографии и описания, которые упростят выбор.
        </p>
        <p>
          Вы имеете возможность скачивать фотографии и описания, для использования их в своих ON LINE магазинах и
          рекламных материалах.
        </p>
        <p>
          Вы можете выбирать интересующие вас товары, самостоятельно формировать заказ и корректировать его.
        </p>
        <p>
          Вам достаточно выбрать товар и нажать на клавишу ОФОРМИТЬ. Счет будет оформлен и отправлен вам на почту
          автоматически. При поступлении денег ваш заказ будет отправлен в транспортную компанию.
        </p>
        <p>
          Все выпускаемые нами товары сертифицированы. Здесь вы можете скачать сертификаты качества.
        </p>
        <p>
          Базовый ассортимент можете подсортировывать  в любом количестве изделий на размер. Это позволит держать вашу
          ассортиментную матрицу наполненной и торговать базовым ассортиментом без остатков. Вы сможете не отвлекать свои
          оборотные средства на большие складские остатки, имея возможность оперативной подсортировка с нашего склада.
        </p>
        <p>
          Вы увидите наши новинки первыми. На почту и в телеграмм вам прийдет уведомления если вы зарегистрированы.
        </p>
        <p>
          Если вам необходима консультация ваш персональный менеджер ответит ON LINE.
        </p>
        <p>
          Наряду с высоким качеством продукции и приемлемыми ценами, возможность гибкой работы с нашим складом в В2В
          кабинете, является нашим конкурентным преимуществом.
        </p>
        <p>
          С уважением, команда OXOUNO
        </p>`
    }
  },
  async mounted () {
    let promiseOrg = this.$axios.get('/v1/sls-org/get-for-contact')
    let promiseClient = this.apiGetForClient()
    promiseOrg = await promiseOrg
    await promiseClient
    this.org = promiseOrg.data
  },
  methods: {
    wallEnter () {
      clearTimeout(this.wall.timer)
      this.wall.timer = setTimeout(() => {
        this.wall.onRead = true
      }, 400)
    },
    wallLeave () {
      clearTimeout(this.wall.timer)
      this.wall.timer = setTimeout(() => {
        this.wall.onRead = false
      }, 500)
    }
  }
}

</script>

<style scoped lang="less">
  .shop-desktop {
    color: white;
    padding: 100px 60px 40px 60px;
    height: 100%;
    background: url("/shop/bg.jpg");
    background-size: cover;
    display: flex;
    justify-content: space-between;
  }

  .left-box {

  }

  .right-box {
    overflow: auto;
    width: 36%;
    padding: 10px;
    background: #0002;
  }

  .shop-label {
    font-size: 30px;
    text-transform: uppercase;
  }

  .shop-details {

  }

  .shop-calc {
    background: #fff2;
    padding: 4px;
    border-radius: 5px;
    line-height: 1;
  }

  .preorders-accept {
    margin: 5px 0 0;
  }
</style>