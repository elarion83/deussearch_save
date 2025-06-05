<template lang="html">
  <section class="pb-0 home_banner banner-section bg bg_img" :style="sectionStyle">
        <div class="carousel_holders">
            <v-hover v-slot:default="{ hover }">
                <v-carousel 
                  ref="carousel"
                  class="home_carousel" 
                  :cycle="!hover && !isReducedMotion" 
                  v-model="actual_step"  
                  :show-arrows="false"  
                  height="auto"
                  :continuous="false"
                  :interval="6000"
                  hide-delimiter-background
                >
                    <v-carousel-item eager>
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-8">
                                    <div class="banner-content">
                                        <h1 class="title deus_main_title" >{{ $t('message.index_main_title_car_one') }} </h1>
                                        <span class="sub-title">{{ $t('message.index_main_subtitle_1_car_one') }} </span>
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
                        <Suspense>
                          <template #default>
                            <global-search class="mb-3"></global-search>
                          </template>
                          <template #fallback>
                            <div class="loading-placeholder" aria-label="Loading search">
                              <v-progress-circular indeterminate color="primary" />
                            </div>
                          </template>
                        </Suspense>
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
          <Suspense>
            <template #default>
              <login-register-modal :tab_open="1" @logUserIn="handleLogin">
              </login-register-modal>
            </template>
            <template #fallback>
              <div class="loading-placeholder" aria-label="Loading login form">
                <v-progress-circular indeterminate color="primary" />
              </div>
            </template>
          </Suspense>
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

export default {
  name:'home-banner',
  components: {
    'login-register-modal': defineAsyncComponent(() => 
      import('../login')
    ),
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
        isReducedMotion: false
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
    checkReducedMotion() {
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  },
  created() { 
    if(this.$cookies.get('deussearch_connected') == 1) {
        this.loggedin = true;
    }
    this.$nuxt.$on('nuxt_bus_event_login', () => {
      this.loggedin = true;
      this.loggedinuser = JSON.parse(this.$cookies.get('deussearch_user'));
    });
  },
  mounted() {
    this.checkReducedMotion();
    window.matchMedia('(prefers-reduced-motion: reduce)').addListener(this.checkReducedMotion);
  },
  beforeDestroy() {
    window.matchMedia('(prefers-reduced-motion: reduce)').removeListener(this.checkReducedMotion);
  }
}
</script>

<style>
.home_carousel {
  contain: content;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.banner-content {
  transform: translateZ(0);
  will-change: transform;
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
</style>