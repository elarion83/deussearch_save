<template lang="html">

  <nav class="deus_mobile_nav navbar navbar-expand-lg">
      <router-link class="site-logo site-title d-lg-none" :to="{ name: 'home___'+$i18n.locale}"> <img src="../assets/images/banner/new_logo.png" alt="site-logo"> </router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav main-menu">
            <li>
              <router-link :to="{ name: 'home___'+$i18n.locale}"> {{ $t('message.menu_accueil') }} </router-link>
            </li>
            <li class="deus_class" >
              <router-link :to="{ name: 'deus_test_'+$i18n.locale}" > {{ $t('message.menu_deus') }} </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'genres_'+$i18n.locale}" > {{ $t('message.menu_genres') }} </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'platforms_'+$i18n.locale}"> {{ $t('message.menu_platforms') }} </router-link>
            </li>
            <li>
              <router-link active-class="router-link-exact-active" :to="{ name: 'blog'}"> Blog </router-link>
            </li>
          </ul>    
      </div>
      <nav-search></nav-search>
  </nav>


</template>

<script>
  import NavSearch from '../components/TitleSearch';
  export default  {
    props:['locale'],
    data () {
      return { 
        'mobileMenuVisible':false,
        'used_locale' : this.$props.locale
      }
    },  
    components: {
    'nav-search' : NavSearch,
    }, 
    methods: {
      ShowMobileMenu() {
        if(this.mobileMenuVisible == false) {
          this.mobileMenuVisible = true;
        } else {
          this.mobileMenuVisible = false;
        }
      }

    }
  }
</script>

<style>

.mobile_menu_icon {
  display: none;
}
@media (max-width:991px) {

  .mobile_menu {
    z-index: 9998;
    position:fixed;
    top: 0;
  }

  .mobile_menu_icon { 
    position:fixed;
    display: block;
    z-index: 999;
    top:15px;
    right:15px;
  }

  .mobile_menu_icon i::before  {
    color:white;
  }

  .header-bottom {
    position:fixed;
  }

  .deus_mobile_nav {    
    height: 60px;
    padding: 15px !important;
  }

  .deus_mobile_nav img { 
    width: 220px;   
  }
  .v-navigation-drawer__content .v-list-item {
    padding: 15px;
  }

  .v-navigation-drawer__content {
      background: #1a1a33;
  }

  .v-navigation-drawer__content .v-list-item__title {
    color:white;
  }
}
</style>
