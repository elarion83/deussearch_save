<template lang="html">
   <header class="header-section deus_head">
        <div class="header">
            <div class="header-top-area">
                <div class="container">
                    <div class="header-top-content d-flex flex-wrap align-items-center justify-content-between">
                        <div class="header-logo">
                          
                            <router-link class="site-logo site-title" :to="{ name: 'home___'+$i18n.locale}">
                              <img src="../assets/images/banner/new_logo.png" class="site_logo" alt="site-logo">
                            </router-link>
                            <p class="deus_subtitle"> {{ $t("message.general_subtitle") }} </p>
                        </div>
                        <div class="header-right d-flex flex-wrap align-items-center">
                            <ul class="blog-social blog-header-social">
                                <li>
                                  <a href="https://www.facebook.com/DeusSearch" target="_blank">
                                    <font-awesome-icon  :icon="['fab', 'facebook-f']" />
                                  </a>
                                </li>
                                <li>
                                  <a href="https://twitter.com/DeusSearch" target="_blank" class="active">
                                    <font-awesome-icon  :icon="['fab', 'twitter']" />
                                  </a>
                                </li>
                            </ul>
                            <div class="language-select-list d-flex flex-wrap">
                                <div class="language-thumb">
                                    <img src="../assets/images/lang.png" alt="language">
                                </div>
                                <div class="language-select">
                                    <ul class="lang_select">
                                        <li><a href="#" v-on:click="updateLocaleVal('fr')">Francais
                                        </a></li>
                                        <li><a href="#" v-on:click="updateLocaleVal('en')">English </a></li>
                                    </ul>
                                </div> 
                                <a class="profile_links login_link pl-3 ml-3 pr-2" :title="$t('message.login_register_title')"  v-if="!loggedin" @click.stop="loginmodaldisplayed = true" :to="{ name: 'login'}">
                                  {{ $t('message.login_title') }} <font-awesome-icon :icon="['fa', 'sign-in-alt']" />   
                                </a>
                                <router-link class="profile_links pl-3 ml-3 pr-2"  :title="$t('message.all_profiles_main_title')" v-if="loggedin" :to="{ name: 'profil'}">
                                  <font-awesome-icon  :icon="['fa', 'user']" />
                                  {{ loggedinuser.pseudo }}      
                                </router-link>
                                <div v-if="loggedin" class="profile_links logout pl-2" :title="$t('message.logout_title')" v-on:click="logout">
                                    <font-awesome-icon  :icon="['fa', 'sign-out-alt']" />   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom">
                <div class="container">
                    <nav-component></nav-component>
                </div>
            </div>
        </div>
        <v-dialog
          v-model="loginmodaldisplayed"
          v-if="!loggedin"
          max-width="450"
        >
          <login-register-modal  :tab_open="2" @logUserIn="logUserIn">
          </login-register-modal>
        </v-dialog>
        
        <v-snackbar v-model="LoggedSnackBar">
          <p v-if="messageloggedin">
            {{$t('message.login_connected')}}
          </p>
          <p v-if="messageloggedout">
            {{$t('message.login_disconnected')}}
          </p>
          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              class="pl-2"
              text
              plain
              v-bind="attrs"
              @click="LoggedSnackBar = false"
            >
              <font-awesome-icon :icon="['fa', 'times']" />
            </v-btn>
          </template>
        </v-snackbar>
    </header>
</template>

<script>
import NavComponent from '../components/Nav';
import loginRegister from '../components/login';

export default {
  name:'Header',
  components: {
    'nav-component' : NavComponent,
    'login-register-modal': loginRegister
  },
  props: ['locale'],
  data () {
    return { 
        langs: ['fr', 'en'],
        login: {
          username: '',
          password: ''
        },
        loggedin:false,
        loggedinuser:null,
        loginmodaldisplayed:false,
        LoggedSnackBar:false,
        messageloggedin:false,
        messageloggedout:false

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
      this.LoggedSnackBar = true;
      this.messageloggedout = false;
      this.messageloggedin = true;
    },
    updateLocaleVal(val) {
      this.used_locale = val;
      this.$emit('update:locale', val);
    },
    logout() {
      this.$cookies.remove("deussearch_connected");
      this.$cookies.remove("deussearch_user");
      this.$router.push('/');
      this.loggedin = false;
      this.messageloggedin = false;
      this.messageloggedout = true;
      this.LoggedSnackBar = true;
    }
  },
  created() {
    this.$nuxt.$on('nuxt_bus_event_login', () => {
      this.loggedin = true;
      this.loggedinuser = JSON.parse(this.$cookies.get('deussearch_user'));
    });
    if(this.$cookies.get('deussearch_connected') == 1) {
      this.loggedin = true;
      this.loggedinuser = JSON.parse(this.$cookies.get('deussearch_user'));
    }
  }
}
</script>
<style scoped>
.site_logo {
  width: 320px;
  margin-bottom: 15px;
}

.profile_links  {
  cursor: pointer;
}
.profile_links,
.profile_links:hover {
  border-left:2px solid rgba(255, 255, 255, 0.2);
  color:white;
  line-height: 40px;
}


.profile_links svg {
  color: white;
}

.profile_links.logout {
  border:none;
  cursor: pointer;
}
.profile_links svg {
  margin-right:5px;
}

.profile_links:hover {
  background: #0e0d2b;
}
.profile_links:hover svg {
  color:rgb(5, 195, 222);
}
.login_link {
  color:rgb(5, 195, 222) !important;
}

.login_link svg {
  margin-left: 15px;
}



</style>
