<template lang="html">
<v-list-item-group active-class="deep-purple--text text--accent-4">
  <v-list-item no-ssr v-if="!loggedin"  @click.stop="loginmodaldisplayed = true" >
    <v-list-item-title> {{ $t('message.login_register_title')}}
    </v-list-item-title>
  </v-list-item>                         
  <v-list-item v-if="loggedin">
    <v-list-item-title>
        <router-link :to="{ name: 'profil'}"> 
          <font-awesome-icon class="mr-2" :icon="['fa', 'user']" /> {{ loggedinuser.pseudo }}
        </router-link>
    </v-list-item-title>
  </v-list-item>
  <v-list-item v-if="loggedin" v-on:click="logout">
    <v-list-item-title>
      <font-awesome-icon  :icon="['fa', 'sign-out-alt']" />     {{ $t('message.logout_title')}}
    </v-list-item-title>
  </v-list-item>
  <router-link :to="{ name: 'home___'+$i18n.locale}" class="menu_mobile_item"> 
    <v-list-item>
      <v-list-item-title>{{ $t('message.menu_accueil') }}
      </v-list-item-title>
    </v-list-item>
  </router-link>
  <router-link :to="{ name: 'deus_test_'+$i18n.locale}"  class="menu_mobile_item">
    <v-list-item>
      <v-list-item-title> {{ $t('message.menu_deus') }}
      </v-list-item-title>
    </v-list-item>
  </router-link>
  <router-link :to="{ name: 'genres_'+$i18n.locale}"  class="menu_mobile_item" >
    <v-list-item>
      <v-list-item-title>{{ $t('message.menu_genres') }}
      </v-list-item-title>
    </v-list-item>
  </router-link>
  <router-link :to="{ name: 'platforms_'+$i18n.locale}"  class="menu_mobile_item" > 
    <v-list-item>
      <v-list-item-title> {{ $t('message.menu_platforms') }} 
      </v-list-item-title>
    </v-list-item> 
  </router-link>
  
  <router-link active-class="router-link-exact-active" class="menu_mobile_item"  :to="{ name: 'blog'}">
    <v-list-item>
      <v-list-item-title> Blog 
      </v-list-item-title>
    </v-list-item>
  </router-link>
  
  <ul class="lang_select mobile">
      <li><a href="#" :class="{'active':(used_locale == 'fr')}" v-on:click="updateLocaleVal('fr')">Francais
      </a></li>
      <li><a href="#" :class="{'active':(used_locale == 'en')}" v-on:click="updateLocaleVal('en')">English </a></li>
  </ul>
   <v-dialog
      v-model="loginmodaldisplayed"
      v-if="!loggedin"
      max-width="450"
    >
      <login-register-modal  :tab_open="2" @logUserIn="logUserIn"></login-register-modal>
    </v-dialog>

</v-list-item-group>

</template>

<script>

import loginRegister from '../components/login';
export default {


  name:'Header',

  props: ['locale'],
  data () {
    return { 
        langs: ['fr', 'en'],
        loggedin:false,
        used_locale:this.$props.locale,
        loggedinuser:null,
        loginmodaldisplayed:false
    }
  },
  components: {
    'login-register-modal': loginRegister
  },
  methods:{
    updateLocaleVal(val) {
      this.used_locale = val;
      this.$emit('update:locale', val);
    },
    logUserIn() {
      this.loginmodaldisplayed = false;
      this.LoggedSnackBar = true;
      this.messageloggedout = false;
      this.messageloggedin = true;
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
.lang_select.mobile a {
  padding: 5px 10px;
}

.lang_select.mobile {
  position: fixed;
  bottom: 10px;
}

.lang_select.mobile .active {
  background: #121224;
}

.lang_select.mobile .li a{
  font-size: 0.8em;
}
</style>