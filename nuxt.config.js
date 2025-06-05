import { messages } from './lang/lang.js';

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'DeusSearch',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'DeusSearch - Base de donnée collaborative française de jeu-vidéo.' },
      { hid: 'theme-color', name: 'theme-color', content: '#1c1d55' },
      { hid: 'og:description', property: 'og:description', content: 'DeusSearch - Base de donnée collaborative française de jeu-vidéo.'},
      { hid: 'og:title', property: 'og:title', content: 'DeusSearch - La base de donnée collaborative'},       
      { hid: 'og:type', property: 'og:type', content: 'website'},
      { hid: 'og:image', property: 'og:image', content: 'https://img.deussearch.fr/static/share_n.jpg'},
      { hid: 'twitter:description', property: 'twitter:description', content: 'DeusSearch - Base de donnée collaborative française de jeu-vidéo.'},
      { hid: 'twitter:title', property: 'twitter:title', content: 'DeusSearch - La base de donnée collaborative'},
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image'},
      { hid: 'twitter:image', property: 'twitter:image', content: 'https://img.deussearch.fr/static/share_n.jpg'},
      { hid: 'twitter:image:src', property: 'twitter:image:src', content: 'https://img.deussearch.fr/static/share_n.jpg'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/fav.png' },
      { 
        rel: 'preload',
        as: 'style',
        href: '/css/critical-title.css',
        onload: "this.onload=null;this.rel='stylesheet'"
      },
      { 
        rel: 'preload',
        as: 'style',
        href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
        onload: "this.onload=null;this.rel='stylesheet'"
      }
    ],
    style: [
      {
        cssText: '@import url("/css/critical-title.css");',
        type: 'text/css'
      }
    ],
    script: [
      {
        src: "https://code.jquery.com/jquery-3.5.1.min.js",
        defer: true
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/critical.css',
    '~/assets/css/critical-title.css',
    '~/assets/css/bootstrap.min.css',
    '~/assets/css/style.css',
    '~/assets/css/keyframes.css',
    '~/assets/css/nice-select.css',
    '~/assets/css/responsive.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/ga.client.js', mode: 'client' },
    { src: '~/plugins/TiptapVuetify', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ['@nuxtjs/vuetify', {
      defaultAssets: {
        font: false,
        icons: false
      },
      treeShake: true
    }],
    '@nuxtjs/date-fns',
    ['@nuxtjs/google-fonts', {
      download: true,
      display: 'swap',
      preload: true,
      families: {
        Oswald: {
          wght: [700],
        }
      }
    }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-i18n',
    '@nuxt/http',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    'vue-social-sharing/nuxt',
    '@nuxtjs/router',
    ['cookie-universal-nuxt', { parseJSON: false }],
    '@nuxtjs/auth-next',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        }
      ]
    }]
  ],

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    vueI18n: {
      fallbackLocale: 'fr',
      messages: messages
    }
  },

  auth: {
    strategies: {
      facebook: {
        endpoints: {
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
        },
        clientId: '436752417535504',
        scope: ['public_profile', 'email']
      },
      auth0: {
        domain: 'dev-6r1hb6em.eu.auth0.com',
        clientId: 'KIJgggrmxdvdlvMUFFmp8IrW02CcbG49'
      }
    }
  },

  image: {
    provider: 'static',
    dir: 'static'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: true,
        maxSize: 244000
      }
    },
    babel: {
      compact: true
    },
    transpile: ['vuetify/lib', "tiptap-vuetify"],
    postcss: {
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  },

  router: {
    trailingSlash: false
  },

  // Configuration spécifique pour Vercel
  generate: {
    dir: 'dist',
    fallback: true,
    exclude: [
      /^\/admin/ // Exclure les routes admin de la génération statique
    ]
  }
}
