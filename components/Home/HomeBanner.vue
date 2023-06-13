<template lang="html">
  <section style="overflow: visible;" class=" pb-0 home_banner banner-section bg bg_img">
        
        <div class="carousel_holders">
            <v-hover v-slot:default="{ hover }">
                <v-carousel class="home_carousel" :cycle="hover ? false : true" v-model="actual_step"  :show-arrows="false"  height="auto">
                    
                    <v-carousel-item>
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
                                        <a  class="cmn-btn content login_link pl-4 ml-3 pr-3" :title="$t('message.login_register_title')"  v-if="!loggedin" @click.stop="loginmodaldisplayed = true" :to="{ name: 'login'}">
                                            {{ $t('message.register_long_title') }}  <font-awesome-icon class="ml-2 mr-2" :icon="['fas', 'long-arrow-alt-right']" />
                                        </a>
                                         
                                        <button class="cmn-btn content pl-4 mt-3 ml-3 pr-3"  @click="actual_step++" :title="$t('message.general_search')">
                                            {{ $t('message.general_search') }}  
                                            <v-icon>mdi-magnify</v-icon>
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-carousel-item>
                    <v-carousel-item class="pb-4">
                        <global-search class="mb-3"></global-search>
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
                                        <router-link :to="{ name: 'deus_test_'+$i18n.locale}" class="cmn-btn content pl-4 ml-3 pr-3" :title="$t('message.menu_deus')">
                                            {{ $t('message.menu_deus') }}  <font-awesome-icon class="ml-2 mr-2" :icon="['fas', 'long-arrow-alt-right']" />
                                        </router-link>
                                        <button class="cmn-btn content pl-4 mt-3 ml-3 pr-3"  @click="actual_step--" :title="$t('message.general_search')">
                                            {{ $t('message.general_search') }}   
                                            <v-icon>mdi-magnify</v-icon>
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
        >
          <login-register-modal :tab_open="1" @logUserIn="logUserIn">
          </login-register-modal>
        </v-dialog>
        
        <v-snackbar v-model="LoggedSnackBar">
          {{ LoggedSnackBarMessage }} 
          <template v-slot:action="{ attrs }">
            <v-btn
              class="pl-2"
              text
              v-bind="attrs"
              @click="LoggedSnackBar = false"
            >
              <font-awesome-icon :icon="['fa', 'times']" />
            </v-btn>
          </template>
        </v-snackbar>
    </section>

</template>

<script lang="js">

import loginRegister from '../login';
import GlobalSearch from '@/components/GlobalSearch';

export default {
  name:'home-banner',
  components: {
    'login-register-modal': loginRegister,
    'global-search' : GlobalSearch
  },
  props: ['locale'],
  data () {
    return { 
        langs: ['fr', 'en'],
        login: {
          username: '',
          password: ''
        },
        actual_step:0,
        loggedin:false,
        loggedinuser:null,
        loginmodaldisplayed:false,
        LoggedSnackBar:false,
        LoggedSnackBarMessage:'',
    }
  }, 
  metaInfo() {
      return { 
          htmlAttrs: {
              lang: this.$props.locale
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
}

.login_link.content::before {
    background-image: linear-gradient( -30deg, rgb(61, 155, 67) 0%, rgb(61, 204, 110) 100%) !important;
}

.v-window-item{
    background-size: cover;
    background-position: 50% 50%;
}


.v-carousel__controls {
    text-align: center;
    background: rgba(9, 10, 29, 0.7) !important;
}


</style>