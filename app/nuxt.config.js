import fs from 'fs'
import './env.init'

export default async function () {
  const { default: env } = await import('./env.js')

  const config = {
    ssr: false,
    /*
    ** Headers of the page
    */
    head: {
      // title: process.env.npm_package_name || '',
      title: 'OXOUNO - брендовая одежда из хлопка',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, user-scalable=no'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'OXOUNO / B2B-кабинет оптового покупателя'
        }
      ],
      script: [
        // if('production') push({ src: '/browser-update.js' })
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap&subset=cyrillic,cyrillic-ext,latin-ext'
        }
      ]
    },
    env: {
      // User defined
      ...env

      // Static defined
    },
    hooks: {
      webpack: {
        config (config) {
          const replacer = (key, value) => {
            if (value instanceof RegExp) {
              return value.toString()
            } else if (
              value instanceof Object && // Is Object instance
              !Array.isArray(value) && // Is Not Array instance
              Object.getPrototypeOf(value) !== Object.prototype // Is Not simple Object instance, only named Class/Function instance
            ) {
              value._className = Object.getPrototypeOf(value).constructor.name
              return value
            } else {
              return value
            }
          }

          const configJSON = JSON.stringify(config, replacer)

          // IDE support

          fs.writeFile(
            'webpack.config.js',
            'module.exports = ' + configJSON,
            () => {
            })

          // Developers support

          fs.writeFile(
            'webpack.config.json',
            configJSON,
            () => {
            })
        }
      }
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
      {
        src: '~/plugins/index.js',
        ssr: false
      },
      {
        src: '~/plugins/vee-validate.js',
        ssr: false
      },
      {
        src: '~/plugins/global-filters.js',
        ssr: false
      },
      {
        src: '~/plugins/normalize-height.js',
        ssr: false
      }
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
      '@nuxtjs/axios'
    ],
    /*
    ** Build configuration
    */
    build: {
      /*
      ** You can extend webpack config here
      */
      extend (config, ctx) {
        // const less = config.module.rules.find(rule => rule.test.toString() === '/\\.less$/i')
        // less.oneOf.forEach((oneOfElem) => {
        //   const cssLoader = oneOfElem.use.find(loader => loader.loader === 'css-loader')
        //   cssLoader.options.modules = {
        //     localIdentName: '[hash:base64:12]'
        //   }
        // })
      }
    },
    router: {
      middleware: ['auth', 'stop_mobile'],
      trailingSlash: false
    }
  }

  if (process.env.NODE_ENV === 'production') {
    config.head.script.push({ src: '/browser-update.js' })
  }

  return config
}
