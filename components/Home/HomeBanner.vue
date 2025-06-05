<template lang="html">
  <section class="pb-0 home_banner banner-section bg bg_img" :style="sectionStyle">
        <div class="carousel_holders">
            <v-hover v-slot:default="{ hover }">
                <v-carousel 
                  class="home_carousel" 
                  :cycle="hover ? false : true" 
                  v-model="actual_step"  
                  :show-arrows="false"  
                  height="auto"
                  :continuous="false"
                  :interval="6000"
                  hide-delimiter-background
                >
                    <v-carousel-item eager>
                        <div class="container">
                            <div class="row align-items-center mb-30-none">
                                <div class="col-lg-8 mt-4">
                                    <div class="banner-content">
                                        <h1 class="title deus_main_title" >{{ $t('message.index_main_title_car_one') }} </h1>
                                        <span class="sub-title">{{ $t('message.index_main_subtitle_1_car_one') }} </span>
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-30 mt-2">
                                    <div class="banner-btn-area">  
                                        <a  
                                          class="cmn-btn content login_link pl-4 ml-3 pr-3" 
                                          :title="$t('message.login_register_title')"  
                                          v-if="!loggedin" 
                                          @click.stop="loginmodaldisplayed = true" 
                                          :to="{ name: 'login'}"
                                          role="button"
                                          tabindex="0"
                                        >
                                            {{ $t('message.register_long_title') }}  
                                            <font-awesome-icon class="ml-2 mr-2" :icon="['fas', 'long-arrow-alt-right']" aria-hidden="true" />
                                        </a>
                                         
                                        <button 
                                          class="cmn-btn content pl-4 mt-3 ml-3 pr-3"  
                                          @click="actual_step++" 
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
                          <global-search class="mb-3"></global-search>
                          <template #fallback>
                            <div class="loading-placeholder">Loading search...</div>
                          </template>
                        </Suspense>
                    </v-carousel-item>
                    <v-carousel-item>
                        <div class="container">
                            <div class="row align-items-center mb-30-none">
                                <div class="col-lg-8 mt-4">
                                    <div class="banner-content">
                                        <h1 class="title deus_main_title" >{{ $t('message.index_main_title') }} </h1>
                                        <span class="sub-title">{{ $t('message.index_main_subtitle_1') }}  </span>
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-30 mt-2">
                                    <div class="banner-btn-area mt-4">  
                                        <router-link 
                                          :to="{ name: 'deus_test_'+$i18n.locale}" 
                                          class="cmn-btn content pl-4 ml-3 pr-3" 
                                          :title="$t('message.menu_deus')"
                                        >
                                            {{ $t('message.menu_deus') }}  
                                            <font-awesome-icon class="ml-2 mr-2" :icon="['fas', 'long-arrow-alt-right']" aria-hidden="true" />
                                        </router-link>
                                        <button 
                                          class="cmn-btn content pl-4 mt-3 ml-3 pr-3"  
                                          @click="actual_step--" 
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
        >
          <Suspense>
            <login-register-modal :tab_open="1" @logUserIn="logUserIn">
            </login-register-modal>
            <template #fallback>
              <div class="loading-placeholder">Loading login form...</div>
            </template>
          </Suspense>
        </v-dialog>
        
        <v-snackbar 
          v-model="LoggedSnackBar"
          :timeout="3000"
          position="top"
        >
          {{ LoggedSnackBarMessage }} 
          <template v-slot:action="{ attrs }">
            <v-btn
              class="pl-2"
              text
              v-bind="attrs"
              @click="LoggedSnackBar = false"
              aria-label="Close notification"
            >
              <font-awesome-icon :icon="['fa', 'times']" aria-hidden="true" />
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
        LoggedSnackBar: false,
        LoggedSnackBarMessage: '',
        sectionStyle: {
          overflow: 'visible',
          contain: 'content',
          willChange: 'transform'
        }
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
    logUserIn() {
      this.loginmodaldisplayed = false;
      this.loggedin = true;
      this.LoggedSnackBar = true;
      this.LoggedSnackBarMessage = "Connecté";
    },
    logout() {
      this.$cookies.remove("deussearch_connected");
      this.$cookies.remove("deussearch_user");
      this.$router.push('/');
      this.loggedin = false;
      this.LoggedSnackBar = true;
      this.LoggedSnackBarMessage = "Déconnecté";
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
  }
}
</script>

<style>
.home_carousel {
  contain: content;
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
    padding: 2rem;
    text-align: center;
    background: rgba(9, 10, 29, 0.1);
}
</style>