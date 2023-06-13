<template>
  <div data-app>  
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="mobile_menu mobile_menu_icon"></v-app-bar-nav-icon>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      class="mobile_menu"
    >
      <v-list nav dense>
        <mobileNav :locale.sync="$i18n.locale"></mobileNav>       
      </v-list>
    </v-navigation-drawer>
    <app-header :locale.sync="$i18n.locale"></app-header>
    <Nuxt />
    <app-footer></app-footer>
    <v-snackbar v-model="LoggedSnackBar">
      {{ LoggedSnackBarMessage }} 
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          class="pl-2"
          text
          v-bind="attrs"
          @click="LoggedSnackBar = false"
        >
          <font-awesome-icon :icon="['fa', 'times']" />
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="loginmodaldisplayed"
      v-if="!loggedin"
      max-width="450"
    >
      <login-modal  :tab_open="2" @logUserIn="logUserIn">
      </login-modal>
    </v-dialog>
     <vue-cookie-accept-decline
          :ref="'myPanel1'"
          :elementId="'myPanel1'"
          :debug="false"
          :position="'bottom-left'"
          :type="'floating'"
          :disableDecline="false"
          :transitionName="'slideFromBottom'"
          :showPostponeButton="false"
          @status="cookieStatus"
          @clicked-accept="cookieClickedAccept"
          @clicked-decline="cookieClickedDecline">

          <!-- Optional -->
          <div slot="postponeContent">
              &times;
          </div>

          <!-- Optional -->
          <div slot="message">
              {{$t('message.cookies_main_sentence')}} 
              <br />

              <a href="https://cookiesandyou.com/" target="_blank">- {{$t('message.cookies_descr_link')}} </a>
              <br />
              <router-link :to="{ name: 'cgu_'+$i18n.locale}" >- {{$t('message.cgu_main_title')}}... </router-link>
          </div>

          <!-- Optional -->
          <div slot="declineContent">
            {{$t('message.cookies_no')}} 
          </div>

          <!-- Optional -->
          <div slot="acceptContent">
             {{$t('message.cookies_yes')}} 
          </div>
      </vue-cookie-accept-decline>
  </div>
</template>

<script>

import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import MobileNav from '../components/mobileNav';
import loginRegister from '../components/login';
import VueCookieAcceptDecline from 'vue-cookie-accept-decline';
import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default {
    name: 'App',
    props: ['locale'],
    components: {
        'app-header' : AppHeader,
        'mobileNav' : MobileNav,
        'app-footer' : AppFooter,
        'login-modal': loginRegister,
        'vue-cookie-accept-decline':VueCookieAcceptDecline
    },
     data: () => ({
      drawer: false,
      cookie_status: null,
      loggedin:false,
      loginmodaldisplayed:false,
      loggedinuser:null,
      thislocale:'fr',
      LoggedSnackBar:false,
      LoggedSnackBarMessage:''
    }),
    methods:{
      cookieStatus (status) {
          this.status = status
      },
      cookieClickedAccept () {
        	Vue.use(VueGtag, {
            config: { id: 'G-XGNBVJEK2R' }
          });
          console.log('here in accept')
          this.status = 'accept'
      },
      cookieClickedDecline () {
          console.log('here in decline')
          this.status = 'decline'
      },
      cookieClickedPostpone () {
          console.log('here in postpone')
          this.status = 'postpone'
      },
      cookieRemovedCookie () {
          console.log('here in cookieRemoved')
          this.status = null
          this.$refs.myPanel1.init()
      },
      removeCookie () {
          console.log('Cookie removed')
          this.$refs.myPanel1.removeCookie()
      },
      logUserIn() {
        // Vue.use(VueGtag, {
        //   config: { id: 'G-XGNBVJEK2R' }
        // });
        this.loginmodaldisplayed = false;
        this.loggedin = true;
        this.LoggedSnackBar = true;
        this.LoggedSnackBarMessage = "Connecté";
        this.$cookies.set('deussearch_connected', '1', {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        });
      },
      logout() {
        this.$cookies.remove("deussearch_connected");
        this.$cookies.remove("deussearch_user");
        this.$router.push('/');
        this.loggedin = false;
        this.LoggedSnackBar = true;
        this.LoggedSnackBarMessage = "Déconnecté";
      },
    },
    computed: {
        statusText () {
            return this.status || 'No cookie set'
        }
    },
    beforeCreate() {
      if(this.$cookies.get('deussearch_connected') == 1) {
        this.loggedin = true;
        if(this.$cookies.get('deussearch_user')) {
          this.loggedinuser = JSON.parse(this.$cookies.get('deussearch_user'));
        } else {
          this.$cookies.remove("deussearch_user");
          this.$cookies.set("deussearch_connected",0);
        }
      }
      else {
        this.$cookies.remove("deussearch_connected");
        this.$cookies.remove("deussearch_user");
      }
    },
    created() {
      this.$nuxt.$on('nuxt_bus_event_login', () => {
        this.loggedin = true;
        this.loggedinuser = JSON.parse(this.$cookies.get('deussearch_user'));
      });
      if(this.$cookies.get('deussearch_connected') == 1) {
        this.loggedin = true;
        if(this.$cookies.get('deussearch_user')) {
          this.loggedinuser = JSON.parse(this.$cookies.get('deussearch_user'));
        } else {
          this.$cookies.remove("deussearch_user");
          this.$cookies.set("deussearch_connected",0);
        }
      }
      else {
        this.$cookies.remove("deussearch_connected");
        this.$cookies.remove("deussearch_user");
      }
    },
    head() {
      return {
        title: 'DeusSearch - La base de donnée collaborative'
      }
    },
}


</script>

<style>
.container {
  max-width: 1140px;
}

.v-snack p {
  font-size: 14px;
}

.mobile_menu .menu_mobile_item {
  width: 100%;
}
</style>
