<template lang="html">
  <div>
    <head-profil  no-ssr :displayedUser="displayedUser"></head-profil>
    <section class="contact-section bg presentation profil">
      <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 text-center">
                <div class="profile_area pa-2 pt-0" v-if="connected">
                  <v-tabs class="profile_tab">
                      <v-tab href="#tdb">
                        {{ $t('message.all_profiles_title')}}
                      </v-tab>
                      <v-tab-item value="tdb">
                        <account-all-profiles no-ssr></account-all-profiles>
                      </v-tab-item>

                      <v-tab href="#profil">
                        {{ $t('message.my_account_title')}}
                      </v-tab>
                      <v-tab-item value="profil">
                        <account-edit-account no-ssr></account-edit-account>
                      </v-tab-item>

                       <v-tab href="#contributions">
                        {{$t('message.tabs_my_contributions')}}
                      </v-tab>
                      <v-tab-item value="contributions" class="contrib_tab">
                        <account-view-contrib :admin="false" :user_id="used_user.id" no-ssr></account-view-contrib>
                        <finished-contribs type="per_user"  :user_id="used_user.id" status="valide" no-ssr></finished-contribs>
                        <finished-contribs type="per_user"  :user_id="used_user.id" status="refus" no-ssr></finished-contribs>
                      </v-tab-item>  
                      <v-tab href="#admin" v-if="used_user.is_admin == 1">
                        Administration 
                      </v-tab>
                      <v-tab-item value="admin" class="contrib_tab">
                        <account-admin-contrib :admin="true" no-ssr></account-admin-contrib>
                      </v-tab-item> 
                    </v-tabs>
                 <!-- <jeux-recommandes class="mt-5"></jeux-recommandes> -->
                </div>
                <div class="contact-area pa-2" v-else>
                  <p>
                    {{ $t('message.general_notloggedin')}}
                  </p>
                </div>
            </div>
          </div>
        </div>
    </section>
  </div>
</template>


<script>
import HeadProfil from '../components/HeadProfil';
// import JeuxRecommandes from '../components/profil/JeuxRecommandes';
import AllProfiles from '../components/profil/accountAllProfils';
import AccountEdit from '../components/profil/accountEditAccount';
import AdminContrib from '../components/profil/accountAdminContrib';
import FinishContribs from '../components/getFinishedContribs';
export default {
  props:['page_title'],
  components: {
    'head-profil' : HeadProfil,
    // 'jeux-recommandes' : JeuxRecommandes,
    'account-all-profiles': AllProfiles,
    'account-admin-contrib': AdminContrib,
    'account-view-contrib': AdminContrib,
    'account-edit-account': AccountEdit,
    'finished-contribs': FinishContribs
  },
  computed: {
  },
  head() {
    return {
      title: this.page_title
    }
  },
  data() {
    return {
      connected: false,
      displayedUser : null,
      used_user: null,
      title: this.page_title
    }
  },
  created() {
    if(this.$cookies.get('deussearch_connected') == 1) { // si l'user est connecté 
      this.displayedUser = this.$cookies.get('deussearch_user');
      this.used_user = JSON.parse(this.displayedUser);
      this.connected = true;
    } else {
      // Sinon je le redirige vers l'accueil
      this.$router.push('/');
    }
  },
  metaInfo() {
      return {
          meta: [
              { property: 'og:title', content: this.page_title}
          ]
      }
  },
}
</script>

<style>
.profil .contact-area {
  padding: 1em;
}


.profil .contact-area>div {
  margin: 0;
  min-width: 100%;
}

.profil .deus_result {
  animation:none;
}

.profile_tab>.v-window {
  background-color: rgba(23, 23, 68, 0) !important;
}

.profile_tab .v-tab {
  font-family: 'Oswald';
  color: #959595 !important;
}

.profile_tab .v-tab--active {
  color:#ffff76 !important;
  border-bottom: 2px solid #ffff76;
}

.profile_tab .v-tabs-slider-wrapper {
  display: none;
}

.profile_tab>div>div>.v-slide-group__content {
  background: #1c1d55;
}
.profile_tab {
  -webkit-box-shadow: 4px 4px 15px 2px rgba(14, 15, 45, 0.2);
  box-shadow: 4px 4px 15px 2px rgba(14, 15, 45, 0.2);
}

.profile_tab .v-slide-group__prev--disabled {
  display: none !important;
}

.profile_area {
  margin-top: -180px;
  z-index: 2 !important;
  position: relative;
}

</style>