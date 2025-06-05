<template lang="html">
  <section class="pb-0 home_banner banner-section bg bg_img" :style="sectionStyle">
        <div class="carousel_holders">
            <v-hover v-slot:default="{ hover }">
                <v-carousel 
                  ref="carousel"
                  class="home_carousel" 
                  :cycle="!hover" 
                  v-model="actual_step"  
                  :show-arrows="false"  
                  :height="carouselHeight"
                  :continuous="false"
                  :interval="6000"
                  hide-delimiter-background
                >
                    <v-carousel-item eager>
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-8">
                                    <div class="banner-content">
                                        <h1 
                                          class="title deus_main_title"
                                          v-text="mainTitle"
                                        />
                                        <div class="sub-title-wrapper">
                                            <span 
                                              class="sub-title" 
                                              v-text="subTitle"
                                              ref="subTitle"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="banner-btn-area">  
                                        <a  
                                          class="cmn-btn content login_link" 
                                          :title="$t('message.login_register_title')"  
                                          v-if="!loggedin" 
                                          @click.stop="showLoginModal" 
                                          :to="{ name: 'login'}"
                                          role="button"
                                          tabindex="0"
                                        >
                                            {{ $t('message.register_long_title') }}  
                                            <font-awesome-icon class="ml-2" :icon="['fas', 'long-arrow-alt-right']" aria-hidden="true" />
                                        </a>
                                         
                                        <button 
                                          class="cmn-btn content mt-3"  
                                          @click="nextStep" 
                                          :title="$t('message.general_search')"
                                          aria-label="Search"
                                        >
                                            {{ $t('message.general_search') }}  
                                            <v-icon aria-hidden="true">mdi-magnify</v-icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-carousel-item>
                    <v-carousel-item>
                        <global-search class="mb-3"></global-search>
                    </v-carousel-item>
                    <v-carousel-item>
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-8">
                                    <div class="banner-content">
                                        <h1 class="title deus_main_title" >{{ $t('message.index_main_title') }} </h1>
                                        <span class="sub-title">{{ $t('message.index_main_subtitle_1') }}  </span>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="banner-btn-area mt-4">  
                                        <router-link 
                                          :to="{ name: 'deus_test_'+$i18n.locale}" 
                                          class="cmn-btn content" 
                                          :title="$t('message.menu_deus')"
                                        >
                                            {{ $t('message.menu_deus') }}  
                                            <font-awesome-icon class="ml-2" :icon="['fas', 'long-arrow-alt-right']" aria-hidden="true" />
                                        </router-link>
                                        <button 
                                          class="cmn-btn content mt-3"  
                                          @click="previousStep" 
                                          :title="$t('message.general_search')"
                                          aria-label="Search"
                                        >
                                            {{ $t('message.general_search') }}   
                                            <v-icon aria-hidden="true">mdi-magnify</v-icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-hover>
        </div>

        <v-dialog
          v-model="loginmodaldisplayed"
          v-if="!loggedin"
          max-width="450"
          :retain-focus="false"
          transition="fade-transition"
          content-class="login-modal"
        >
          <login-register-modal 
            :tab_open="1" 
            @logUserIn="handleLogin"
          />
        </v-dialog>
        
        <v-snackbar 
          v-model="snackbar.show"
          :timeout="3000"
          :color="snackbar.color"
          position="top"
        >
          {{ snackbar.message }}
          <template #action="{ attrs }">
            <v-btn
              icon
              v-bind="attrs"
              @click="snackbar.show = false"
              aria-label="Close notification"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
    </section>
</template>

<script lang="js">
import { defineAsyncComponent } from 'vue'
import GlobalSearch from '@/components/GlobalSearch'
import loginRegister from '../login'

export default {
  name:'home-banner',
  components: {
    'login-register-modal': loginRegister,
    'global-search' : GlobalSearch
  },
  props: {
    locale: {
      type: String,
      required: true
    }
  },
  data () {
    return { 
        langs: ['fr', 'en'],
        login: {
          username: '',
          password: ''
        },
        actual_step: 0,
        loggedin: false,
        loggedinuser: null,
        loginmodaldisplayed: false,
        snackbar: {
          show: false,
          message: '',
          color: 'success'
        },
        sectionStyle: {
          overflow: 'visible',
          contain: 'layout style paint',
          willChange: 'transform'
        },
        mainTitle: '',
        subTitle: '',
        carouselHeight: 'auto',
        resizeObserver: null
    }
  },
  metaInfo() {
      return { 
          htmlAttrs: {
              lang: this.locale
          }
      }
  },
  methods:{
    showLoginModal() {
      this.loginmodaldisplayed = true;
    },
    handleLogin() {
      this.loginmodaldisplayed = false;
      this.loggedin = true;
      this.showSnackbar('Connecté', 'success');
    },
    logout() {
      this.$cookies.remove("deussearch_connected");
      this.$cookies.remove("deussearch_user");
      this.$router.push('/');
      this.loggedin = false;
      this.showSnackbar('Déconnecté', 'info');
    },
    showSnackbar(message, color = 'success') {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    nextStep() {
      this.actual_step++;
    },
    previousStep() {
      this.actual_step--;
    },
    initializeCarouselHeight() {
      this.$nextTick(() => {
        this.updateCarouselHeight()
      })
    },
    updateCarouselHeight() {
      const vh = window.innerHeight
      const height = window.innerWidth >= 1100 ? 
        `${vh - 210}px` : 
        window.innerWidth >= 768 ? 
          `${vh - 180}px` : 
          `${vh - 150}px`
      
      this.carouselHeight = height
    },
    setupResizeObserver() {
      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            if (entry.target.classList.contains('home_carousel')) {
              this.updateCarouselHeight()
            }
          }
        })
        
        const carousel = this.$refs.carousel?.$el
        if (carousel) {
          this.resizeObserver.observe(carousel)
        }
      }
    }
  },
  created() { 
    this.mainTitle = this.$t('message.index_main_title_car_one')
    this.subTitle = this.$t('message.index_main_subtitle_1_car_one')
    
    if(this.$cookies.get('deussearch_connected') == 1) {
        this.loggedin = true;
    }
    this.$nuxt.$on('nuxt_bus_event_login', () => {
      this.loggedin = true;
      this.loggedinuser = JSON.parse(this.$cookies.get('deussearch_user'));
    });
  },
  mounted() {
    this.initializeCarouselHeight()
    this.setupResizeObserver()
    window.addEventListener('resize', this.updateCarouselHeight)
    
    this.$nextTick(() => {
      requestAnimationFrame(() => {
        const title = this.$el.querySelector('.deus_main_title')
        const subTitle = this.$refs.subTitle
        
        if (title) {
          title.style.visibility = 'visible'
          title.style.opacity = '1'
        }
        
        if (subTitle) {
          subTitle.style.visibility = 'visible'
          subTitle.style.opacity = '1'
        }
      })
    })
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
    window.removeEventListener('resize', this.updateCarouselHeight)
  }
}
</script>

<style>
.deus_main_title {
  font-size: clamp(2.5rem, 5vw, 4.75rem);
  line-height: 1.1;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-family: "Oswald", system-ui, -apple-system, sans-serif;
  contain: style layout;
  transform: translateZ(0);
  will-change: transform;
  text-rendering: optimizeLegibility;
  max-width: 100%;
  overflow-wrap: break-word;
  height: min-content;
}

.home_carousel {
  contain: size layout style;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  min-height: 400px;
}

.banner-content {
  transform: translateZ(0);
  will-change: transform;
  contain: layout style;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sub-title-wrapper {
  contain: content;
  transform: translateZ(0);
  will-change: transform;
}

.sub-title {
  display: block;
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
  color: #ffffff;
  margin-top: 10px;
  font-weight: 400;
  transform: translateZ(0);
  will-change: transform;
  text-rendering: optimizeLegibility;
}

@media (max-width: 991px) {
    .home_carousel  {
        height: auto;
    }
}

@media (min-width:50px) {
    .home_carousel  {
        min-height: calc(100vh - 220px);
        height: auto;
    }
}

@media (min-width: 1100px) {
    .home_carousel  {
        height: calc(100vh - 210px) !important;
    }
}

.login_link.content {
    cursor: pointer;
    color: white !important;
    transform: translateZ(0);
}

.login_link.content::before {
    background-image: linear-gradient( -30deg, rgb(61, 155, 67) 0%, rgb(61, 204, 110) 100%) !important;
    will-change: transform;
}

.v-window-item {
    background-size: cover;
    background-position: 50% 50%;
    contain: content;
}

.v-carousel__controls {
    text-align: center;
    background: rgba(9, 10, 29, 0.7) !important;
    contain: content;
}

.loading-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background: rgba(9, 10, 29, 0.1);
}

.login-modal {
  contain: content;
  will-change: transform;
}

.cmn-btn {
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  transform: translateZ(0);
  will-change: transform;
}

/* Optimisations pour le mobile */
@media (max-width: 991px) {
  .banner-content {
    text-align: center;
    padding: 1rem;
    contain: content;
  }
  
  .banner-btn-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }

  .sub-title {
    font-size: 16px;
    line-height: 24px;
  }
}

/* Optimisations de performance */
@media (prefers-reduced-motion: reduce) {
  .home_carousel,
  .banner-content,
  .deus_main_title,
  .sub-title-wrapper,
  .sub-title {
    transition: none !important;
    animation: none !important;
  }
}
</style>