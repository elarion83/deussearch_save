<template lang="html">

  <section class="inner-banner-section inner-banner-section--style bg-overlay-black bg bg_img profil_banner">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 text-center">
                    <div class="inner-banner-content">
                      <v-container>
                        <v-row v-if="displayedProfill">
                          <v-col  cols="6"  md="3" sm="12"   class="avatar_bloc text-center">
                            <v-dialog content-class="dialog_avatar" v-model="dialog" width="450px" height="40px" class="modal_avatar">
                              <template v-slot:activator="{ on, attrs }">
                                <v-avatar  
                                  class="user_avatar"  
                                  color="primary"  
                                  v-bind="attrs"
                                  v-on="on"  size="175"  >
                                    <v-img
                                    width="175px"
                                      :src="'https://img.deussearch.fr/static/avatars/botts'+displayedProfill.avatar+'.svg'"
                                      class="grey lighten-2"
                                    >
                                    </v-img>
                                </v-avatar>
                                <div class="edit_avatar" @click="dialog = true">
                                  <font-awesome-icon  :icon="['fa', 'pen']" /></a>
                                </div>
                              </template>

                                <v-row class="select_avatar_dialog p-3">
                                  <div class="title">
                                    <h4 class=""> {{ $t('message.change_avatar_title') }} </h4>
                                    <span class="info_profil">
                                      <font-awesome-icon :icon="['fa', 'question-circle']" class="left_icon" />
                                      {{ $t('message.change_avatar_text') }}
                                    </span>
                                  </div>
                                  <v-col
                                    v-for="n in 9"
                                    :key="n"
                                    cols="3" 
                                    class="avatar_col"
                                    v-on:click="changeAvatar(n)"
                                  >
                                    <v-img
                                      :src="'https://img.deussearch.fr/static/avatars/botts'+n+'.svg'"
                                      aspect-ratio="1"
                                      class="img_avatar_select"
                                    >
                                    </v-img>
                                    <div v-if="n == displayedProfill.avatar" class="avatar_checked">
                                      <font-awesome-icon  :icon="['fa', 'check']" /></a></li>
                                    </div>
                                  </v-col>
                                </v-row>
                            </v-dialog>

                          </v-col>
                          <v-col cols="12" sm="12" md="9"  class="text-left profil_info_head">
                              <h3>{{ displayedProfill.pseudo }}</h3>
                              <ul class="profile_info_list">
                                <li>{{ $t('message.profile_member_since') }} {{ $dateFns.format(displayedProfill.created, 'dd MMM yyyy') }} </li>
                                <li v-if="displayedProfill.description" class="pt-2 profile_descr"> {{ displayedProfill.description }} </li>
                              </ul>
                              <router-link :title="$t('message.add_game_button_in_bdd')" class="add_game_btn_a" :to="{ name: 'add_game'}" >
                                <v-btn depressed class="mt-3 add_game_btn">
                                  <v-icon left>
                                      mdi-plus-box
                                  </v-icon>
                                  {{ $t('message.add_game_button') }}
                                </v-btn>
                              </router-link>                               
                          </v-col>
                    
                        </v-row>
                      </v-container>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script lang="js">
  import moment from 'moment'
  export default {
    name: 'head-profil',
    props: ['displayedUser'],
    mounted () {

    },
    data () {
      return {
        displayedProfill:JSON.parse(this.$props.displayedUser),
        dialog:false,
        avatarselect:null,
      }
    },
    methods: {
      changeAvatar(idavatar) {
        this.$cookies.remove('deussearch_user');
        this.displayedProfill.avatar = idavatar;
        var comp = this;
        this.$axios.$post('https://api.deussearch.fr/user_save_account_value.php', 
        {'champs' : 'avatar', 'value': comp.displayedProfill.avatar, 'user_id':comp.displayedProfill.id})
        .then(function (response) {
      
        })
        .catch(function (error) {
            console.log(error);
        });
        this.$cookies.set('deussearch_user', this.displayedProfill);
      }
    }
  }
</script>

<style>
.add_game_btn {
  background-color:transparent !important;
  background-image: linear-gradient( -30deg, rgb(206, 0, 113) 0%, rgb(7, 79, 134)) !important;
  -webkit-box-shadow: 3px 2px 15px 5px rgba(0,0,0,0.3); 
  box-shadow: 3px 2px 15px 5px rgba(0,0,0,0.3);
  color: white !important;
  font-size: 0.2em !important;
  text-transform: uppercase !important;
}

.add_game_btn span{
font-size: 4.2em;
}

.profil_banner {
  padding-bottom:12em !important;
}

.user_avatar {
  border:3px solid white;
  background-color:rgb(20, 21, 64);
}

.img_avatar_select  {
  width: 50px;
  margin-left: auto;
  margin-right: auto;
}

.select_avatar_dialog {
  background-color:#131326;
  border-radius: 2px;
}

.select_avatar_dialog .col:hover {
  background-color:rgb(11, 11, 34);
  border-radius: 2px;
  cursor: pointer;
}

.select_avatar_dialog .title span{
    font-size: 0.8rem;
    margin-top: 10px;
    margin-bottom: 10px;
}

.avatar_checked {
    background: rgba(0, 128, 0, 0.85);
    width: 40px;
    height: 40px;
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    border-radius: 50%;
    color: white;
    padding: 6px;
    text-align: center;
}


.dialog_avatar  {
  box-shadow: none !important;
  overflow: visible !important;
}

.edit_avatar {
  background: #ffffffd1;
  display: inline-block;
  position: absolute;
  bottom: 10px;
  right: 50px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
  width: 40px;
}

.profil_banner {
    padding-top: 230px !important;
    padding-bottom: 175px !important;
  }
@media (max-width:955px) {
  .profil_banner{
    padding-top: 50px !important;
  }
}

@media (max-width:955px) {
  .profil_info_head h3, .profil_info_head ul {
    text-align: center;
  }

  .profil_info_head {
    background: rgba(28, 29, 85, 0.6);
  }

  .avatar_bloc {
    margin-left: auto;
    margin-right: auto;
  }

  .add_game_btn_a {
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
  }
}

.profile_info_list li {
  font-family: 'hamlin';
}

.profile_descr {
  font-size: .8em;
  -webkit-box-shadow: 4px 4px 15px 2px rgba(14, 15, 45, 0.2);
  box-shadow: 4px 4px 15px 2px rgba(14, 15, 45, 0.2);
  margin-top: 30px;
  background: rgba(28, 29, 85, 0.7);
  padding: 10px;
}
</style>
