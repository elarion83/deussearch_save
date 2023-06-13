<template lang="html">
    <section class="alluserprofiles">
        
        <p class="info_profil" v-if="no_profile_for_user">
            <font-awesome-icon :icon="['fa', 'question-circle']" class="left_icon" />
            {{ $t('message.all_profiles_profile_add_profile_subtitle') }}
        <p class="profil_user_span sub"> </p>
        <section>
            <v-container class="grey lighten-5  pl-0 pr-0">
                <v-row no-gutters>
                    <v-col
                        cols="12"
                        sm="12"
                        class="top-create-profil-head pl-3 pt-2 pb-2"
                    >
                        <span class="profil_user_span">{{ $t('message.all_profiles_profile_add_profile_title') }}  </span>
                    </v-col>
                </v-row>
                <v-row no-gutters class="mt-0">
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <router-link :to="{ name: 'deus_test_'+$i18n.locale}" class="pt-4 pb-4 create_profil create_profil_test">
                            <font-awesome-icon class="ml-2 mr-2 arrowsvg" :icon="['fas', 'angle-double-right']" />
                            <font-awesome-icon class="ml-2 mr-2" :icon="['fas', 'poll']" />
                                {{ $t('message.all_profiles_profile_add_profile_personnality_button') }}
                        </router-link>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >
                        <div @click="showCreateSteamProfileDialog()" class="pt-4 pb-4 create_profil create_profil_steam">
                           <font-awesome-icon class="ml-2 mr-2 arrowsvg" :icon="['fas', 'angle-double-right']" />
                            <font-awesome-icon class="ml-2 mr-2" :icon="['fab', 'steam']" />
                            {{ $t('message.all_profiles_profile_add_profile_steam_button') }}
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section> 
        <div>
             <v-col
                cols="12"
                sm="12"
                class="top-create-profil-head pt-2 pb-2"
            >
                <span class="profil_user_span"> {{ $t('message.all_profiles_title') }}</span>
            </v-col>
            <div v-if="!profileloaded" class="bg_profile_load">
                <p v-if="!no_profile_for_user">
                    <loading></loading>
                </p>
                <p v-if="no_profile_for_user">
                   {{ $t('message.all_profiles_no_profiles') }}
                </p>
            </div>
            <v-tabs v-model="active_profile" vertical  no-ssr>
                <v-tab class="sm-12 text-left" @click="changeDisplayedProfile(profile.u_id)" v-for="(profile,u_id) in allProfiles" :key="u_id" >
                    <font-awesome-icon v-if="profile.type === 'poll'" class="mr-2" :icon="['fas', 'poll']" />                    
                    <font-awesome-icon v-if="profile.type === 'steam'" class="mr-2" :icon="['fab', 'steam']" />
                    <p class="profile_name_text">#{{ profile.name }}</p>
                </v-tab>
                <v-tab-item v-for="(profile,u_id) in allProfiles" :key="u_id+'__'" >
                        <div class="profile_resume">
                            <v-row no-gutters>
                                <v-col cols="12" sm="6" md="8">
                                    <a target="_blank" class="yellow_link oswald" :title="$t('message.view_separatly')" :href="'resultat/?id='+profile.u_id"> 
                                        <font-awesome-icon class="mr-1"  :icon="['fa', 'link']" />#{{ profile.name }} <br /> 
                                    </a>  
                                    <p v-if="profile.type === 'poll'" class="mt-2">  
                                        <font-awesome-icon class="create_icon mr-2" :icon="['fas', 'poll']" />
                                        {{ $t('message.all_profiles_profile_from_personnality_test') }} 
                                    </p>
                                    <p v-if="profile.type === 'steam'" class="mt-2">  
                                        <font-awesome-icon class="create_icon mr-2" :icon="['fab', 'steam']" />
                                        {{ $t('message.all_profiles_profile_from_steam') }}
                                    </p>
                                </v-col>
                                <v-col cols="6" md="4" sm="12" class="right_side mt-2 text-right">
                                    <span>    
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon   v-bind="attrs"
                                                        v-on="on"
                                                        v-on:click="showEditProfilModal(profile)">
                                                    <font-awesome-icon  :icon="['fa', 'pen']" />
                                                </v-btn>
                                            </template>
                                            <span>{{ $t('message.all_profiles_profile_action_rename') }}</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon class="ml-2" v-bind="attrs" v-on:click="showRemoveProfilModal(profile)"
                                                        v-on="on">
                                                    <font-awesome-icon  :icon="['fa', 'trash']" />
                                                </v-btn>
                                            </template>
                                            <span>{{ $t('message.all_profiles_profile_action_remove') }}</span>
                                        </v-tooltip>
                                    </span> 
                                </v-col>
                                <v-col cols="12" md="12" sm="12" class="mt-3">
                                        <router-link :title="$t('message.general_more_games')+' '+profile.platform.name" class="ml-1 game_know_more_link"  :to="{ name: 'single_platform', params: { platformname: profile.platform.slug , platformid: profile.platform.id_dDblKey }}">
                                            <v-icon>mdi-{{ profile.platform.platform_icon }}</v-icon>
                                            {{ profile.platform.name }}                 
                                        </router-link>
                                        <router-link v-for="(genre,id) in profile.all_genres" :key="id" :title="$t('message.general_more_games')+' '+genre.name_genre" class="game_link tag_link" :to="{ name: 'single_genre', params: { genrename: genre.slug , genreid: genre.id_dDblKey }}">
                                            <v-chip
                                            class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                            color="pink"
                                            label
                                            text-color="white"
                                            >
                                            <v-icon left>
                                                mdi-folder
                                            </v-icon>
                                            {{ genre.name_genre }} 
                                            </v-chip>
                                        </router-link>
                                        <router-link :title="$t('message.general_more_games')+' '+tag.tag_name" class="game_link new_tag tag_link" v-for="(tag,id) in profile.all_tags" :key="tag.id" :to="{ name: 'single_tag', params: { tagname: tag.slug , tagid: tag.id_dDblKey }}">
                                            <v-chip
                                            class="ma-2 ml-1 mb-1 updated_genre_chip genre_tag_link"
                                            color="pink"
                                            label
                                            text-color="white"
                                            >
                                            <v-icon left>
                                                mdi-tag
                                            </v-icon>
                                                {{ tag.tag_name }}
                                            </v-chip>
                                        </router-link>
                                </v-col>
                            </v-row> 
                        </div>
                        <div class="faq-wrapper mb-5 faq-profile">
                            <v-expansion-panels focusable v-model="panel">
                                <v-expansion-panel
                                class="faq-item" v-model="panel"
                                >
                                    <v-expansion-panel-header class="faq-title pt-1  pb-0  text-left deus_result_titles">
                                        <v-col class="p-0" cols="6" md="6" sm="12" >
                                            <span><font-awesome-icon class="mr-2" :icon="['fa', 'calendar-alt']" /> {{$t('message.general_from')}}</span>
                                            <v-menu
                                                ref="menu"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field  v-model="first_end_date_formatted"  readonly  v-bind="attrs"  v-on="on"  class="mb-0 pt-0"></v-text-field>
                                                </template>
                                                <v-date-picker no-title v-model="first_end_date_readable" type="month" scrollable @change="updateFirstEndDate(first_end_date_readable)">
                                                </v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col class="p-0" cols="6" md="6" sm="12" >
                                            <span><font-awesome-icon class="mr-2" :icon="['fa', 'calendar-alt']" />{{$t('message.general_to')}} </span>
                                            <v-menu
                                                ref="menu"
                                                :close-on-content-click="false"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="first_start_date_formatted"  readonly  v-bind="attrs"  v-on="on"  class="mb-0 pt-0"></v-text-field>
                                                </template>
                                                <v-date-picker no-title v-model="first_start_date_readable" scrollable type="month" @change="updateFirstStartDate(first_start_date_readable)">
                                                </v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content class="faq-content">
                                        <result-component :key="componentfirstblockey" v-if="profileloaded" :profile="active_profile_value" :startdate="first_start_date_timestamp" :enddate="first_end_date_timestamp" :numberofgames="6" ></result-component>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                </v-tab-item>
            </v-tabs>
        </div>

        <!-- dialog for rename profile -->
        <v-dialog v-model="edit_profil_dialog" max-width="500" >
            <v-card class="edit_profile_modal">
                <v-card-title class="headline grey lighten-2">
                    {{ $t('message.all_profiles_profile_rename_profil_title') }}
                </v-card-title>
                <v-card-text>
                <p class="info_profil">
                    <font-awesome-icon :icon="['fa', 'question-circle']" class="left_icon" />
                    {{ $t('message.all_profiles_profile_rename_profil_text') }}
                </p>
                <v-text-field
                    class="mt-2 mb-3"
                    hint="Ex : Shooter solo, Chill Co-op"
                    persistent-hint
                    v-if="edited_or_deleted_profile"
                    v-model="edited_or_deleted_profile.name"
                    :label="$t('message.all_profiles_profile_rename_profil_field')"
                ></v-text-field>
                <v-btn
                    color="green darken-1"
                    text
                    v-on:click="updateProfilname(edited_or_deleted_profile)"
                >
                    {{ $t('message.general_save') }}
                </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>


        
        <!-- dialog for delete profile -->
        <v-dialog v-model="delete_profile_dialog" max-width="500">
            <v-card  class="edit_profile_modal">
                <v-card-title class="headline">
                    {{ $t('message.all_profiles_profile_remove_profil_title') }}
                </v-card-title>
                <v-card-text>
                    <p class="info_profil">
                        <font-awesome-icon :icon="['fa', 'question-circle']" class="left_icon" />
                            {{ $t('message.all_profiles_profile_remove_profil_text') }}
                    </p>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" class="red" text @click="delete_profile_dialog = false">
                    {{ $t('message.general_no') }}
                </v-btn>
                <v-btn
                    color="green darken-1"
                    class="ml-2"
                    text
                    v-on:click="removeProfile()"
                >
                    {{ $t('message.general_yes') }}
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        
        <!-- dialog for add profile from steam -->
        <v-dialog v-model="add_steam_profile_dialog" v-if="user_loaded" max-width="500">
            <v-card class="edit_profile_modal">
                <v-card-title class="headline">
                    {{ $t('message.all_profiles_steam_modal_title') }}
                </v-card-title>
                <v-card-text v-if="editingsteamid">
                    <span class="mb-2 span_info info_profil">
                        <font-awesome-icon :icon="['fa', 'question-circle']" class="left_icon" />
                        {{ $t('message.all_profiles_steam_modal_text_part1') }}
                        <a class="yellow_link" href="https://support.ubisoft.com/en-gb/Article/000060565" target="_blank">Steam ID</a>
                        {{ $t('message.all_profiles_steam_modal_text_part2') }}
                    </span>
                    <v-text-field
                        prepend-icon="mdi-steam"
                        class="mt-2 mb-4"
                        hint="Ex : 76561198162433946"
                        persistent-hint
                        v-model="currentuser.steamappid"
                        label="Steam ID"
                    ></v-text-field>
                    <v-btn
                        color="green darken-1"
                        text
                        v-on:click="changeSteamId(currentuser.steamappid)"
                    >
                        {{ $t('message.general_save') }}
                        
                    </v-btn>
                </v-card-text>
                <v-card-text v-else>
                    <section v-if="!creating_from_steam.loaded">
                        <span class="info_profil"> 
                            <font-awesome-icon :icon="['fa', 'question-circle']" class="left_icon" />
                            {{ $t('message.all_profiles_steam_select_games_explanation') }}
                         <br />
                        <a class="yellow_link" v-on:click="resetSteam()">Steam ID : {{ currentuser.steamappid }}  <font-awesome-icon :icon="['fa', 'pen']" /> </a></span>
                        <v-btn
                            color="green darken-1"
                            text
                            class="mt-2"
                            v-on:click="synchronizeFromSteam()"
                        >
                            {{ $t('message.general_start') }}
                             
                        </v-btn>
                        <div class="deus_error mt-2" v-if="creating_from_steam.errored">
                            <span class="pt-1 pb-1"> 
                            {{ $t('message.all_profiles_steam_generate_error') }}</span>
                        </div>
                    </section>
                    <div v-if="creating_from_steam.loaded" class="mb-2">                    
                        <span class="mb-3 info_profil"> 
                            <font-awesome-icon :icon="['fa', 'question-circle']" class="left_icon" />
                            {{ $t('message.all_profiles_steam_select_games_text') }}</span>
                        <ul class="game_list">
                            <li class="pl-2 pt-1 pb-1 mb-1 deus_steam_games_list"  v-bind:class="{ active:  game.selected }" v-for="game in creating_from_steam.games" v-on:click="removegameFromSynchro(game)">
                                <font-awesome-icon class="mr-2" v-if="game.selected" :icon="['fa', 'check']" />
                                {{ game.name }} - <span class="st_game_title">({{ game.playtime_forever }} {{ $t('message.all_profiles_steam_select_games_playtime') }})</span>
                            </li> 
                        </ul>
                        <v-btn
                            color="green darken-1"
                            text
                            class="mt-2"
                            v-on:click="createNewProfile()"
                            v-if="creating_from_steam.synchronized_games.length > 0"
                        >
                            {{ $t('message.all_profiles_steam_generate_profile') }}
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>


        
        <!-- snackbar profile created -->
        <v-snackbar v-model="creating_from_steam.snackbar">
            {{ $t('message.all_profiles_profile_created') }}
            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                class="pl-2"
                text
                plain
                v-bind="attrs"
                @click="creating_from_steam.snackbar = false"
                >
                <font-awesome-icon :icon="['fa', 'times']" />
                </v-btn>
            </template>
        </v-snackbar>

        
        <!-- snackbar profile removed -->
        <v-snackbar v-model="profile_removed">
            {{ $t('message.all_profiles_profile_removed') }}
            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                class="pl-2"
                text
                plain
                v-bind="attrs"
                @click="profile_removed = false"
                >
                <font-awesome-icon :icon="['fa', 'times']" />
                </v-btn>
            </template>
        </v-snackbar>
    </section>
   
</template>
<script lang="js">
    import moment from 'moment';
    import ResultsComponent from '../ResultsComponent';
    import Loading from '../loading';

  export default {
    mounted () {
    
    },
    data () {
      return {
        'allProfiles':null,
        'active_profile':0,
        'active_profile_value': null,
        'no_profile_for_user':null,
        'editingsteamid':true,
        'profileloaded':false,
        'result_component_key':0,
        'displayed_game':null,
        'profile_removed':false,
        'edited_or_deleted_profile':null,
        'edit_profil_dialog':false,
        'delete_profile_dialog':false,
        'currentuser': null,
        'user_loaded': false,
        'add_steam_profile_dialog':false,
        'panel':0   ,
        creating_from_steam: {
            status:null,
            errored:false,
            loaded:false,
            games:null,
            synchronized_games:[],
            snackbar:false
        },
          
        first_start_date_readable : new Date().toISOString().substr(0, 7),
        second_start_date_readable : new Date(1483228800*1000).toISOString().substr(0, 7),
        third_start_date_readable : new Date(1356998400*1000).toISOString().substr(0, 7),
        first_end_date_readable : new Date(1483228800*1000).toISOString().substr(0, 7),
        second_end_date_readable : new Date(1356998400*1000).toISOString().substr(0, 7),
        third_end_date_readable : new Date(1104537600*1000).toISOString().substr(0, 7),
        
        componentfirstblockey:0,
        componentsecondblockey:0,
        componenthirdblockey:0,
        first_start_date_timestamp : new Date().getTime(),
        second_start_date_timestamp : 1483228800,
        third_start_date_timestamp : 1356998400,
        first_end_date_timestamp : 1483228800,
        second_end_date_timestamp : 1356998400,
        third_end_date_timestamp : 1104537600
        }
    },
    methods: {
        updateThirdStartDate(new_date) {
            this.third_start_date_timestamp = new Date(new_date).getTime() / 1000;
            this.componenthirdblockey += 1;
        },
        updateThirdEndDate(new_date) {
            this.third_end_date_timestamp = new Date(new_date).getTime() / 1000;
            this.componenthirdblockey += 1;
        },
        updateSecondStartDate(new_date) {
            this.second_start_date_timestamp = new Date(new_date).getTime() / 1000;
            this.componentsecondblockey += 1;
        },
        updateSecondEndDate(new_date) {
            this.second_end_date_timestamp = new Date(new_date).getTime() / 1000;
            this.componentsecondblockey += 1;
        },
        updateFirstStartDate(new_date) {
            this.first_start_date_timestamp = new Date(new_date).getTime() / 1000;
            this.componentfirstblockey += 1;
        },
        updateFirstEndDate(new_date) {
            this.first_end_date_timestamp = new Date(new_date).getTime() / 1000;
            this.componentfirstblockey += 1;
        },
        updateProfilname(profile) {
            var comp = this;
            this.$http.$post("https://api.deussearch.fr/update_profile.php?unicid="+profile.u_id+"&name="+profile.name).then(result => {
                this.edit_profil_dialog = false;
            });
        },
        resetSteam() {
            this.editingsteamid = true;
        },
        changeDisplayedProfile(profileid) {
            var comp = this;
            comp.profileloaded = false;
            comp.$http.$post("https://api.deussearch.fr/test_get_profile.php?unicid="+profileid).then(result => {
                comp.active_profile_value = result;
                comp.profileloaded = true;
                comp.result_component_key += 1;
                
                comp.first_start_date_timestamp = new Date().getTime();
                comp.second_start_date_timestamp = 1483228800;
                comp.third_start_date_timestamp = 1356998400;
                comp.first_end_date_timestamp = 1483228800;
                comp.second_end_date_timestamp = 1356998400;
                comp.third_end_date_timestamp = 1104537600;
            });
        },
        showEditProfilModal(profile) {
            this.edited_or_deleted_profile = profile;
            this.edit_profil_dialog = true;
        },
        showRemoveProfilModal(profile) {
            this.edited_or_deleted_profile = profile;
            this.delete_profile_dialog = true;
        },
        showCreateSteamProfileDialog() {
            this.add_steam_profile_dialog = true;
        },
        changeSteamId(steamAppId) {
            this.creating_from_steam.errored = false;
            this.editingsteamid = false;
            this.$cookies.remove('deussearch_user');
            this.currentuser.steamappid = steamAppId;
            var comp = this;
            this.$axios.$post('https://api.deussearch.fr/user_save_account_value.php', 
            {'champs' : 'steamappid', 'value': comp.currentuser.steamappid, 'user_id':comp.currentuser.id})
            .then(function (response) {
        
            })
            .catch(function (error) {
                console.log(error);
            });
            this.$cookies.set('deussearch_user', this.currentuser);
        },
        synchronizeFromSteam() {
            this.creating_from_steam.status = 'loading';
            var comp = this;
            this.$http.$get("https://api.deussearch.fr/get_games_for_steamappid.php?id="+this.currentuser.steamappid).then(response => {
                if(response && response.response.games) {
                    comp.creating_from_steam.games = response.response.games;
                    comp.creating_from_steam.synchronized_games = response.response.games.slice(0,3);
                    comp.creating_from_steam.loaded = true;
                    comp.creating_from_steam.errored = false;
                } else {
                    comp.creating_from_steam.errored = true;
                }
            });
        },
        removegameFromSynchro(game) {
            if(this.creating_from_steam.synchronized_games.find(obj => obj.appid === game.appid) == undefined) {
                this.creating_from_steam.synchronized_games.push(game);
                game.selected = true;
            } else {
                this.creating_from_steam.synchronized_games = this.creating_from_steam.synchronized_games.filter(obj => obj.appid !== game.appid);
                game.selected = false;
            }
        },
        createNewProfile() {
            var comp = this;
            this.$axios.$post('https://api.deussearch.fr/create_profile_value_from_game.php', 
            {'games' : this.creating_from_steam.synchronized_games, 'user_id':this.currentuser.id})
            .then(function (response) {
                console.log(response);
                comp.creating_from_steam.snackbar = true;
                comp.add_steam_profile_dialog = false;
                comp.$router.go(0);
            })
            .catch(function (error) {
            });
        },
        removeProfile() {
            var comp = this;
            this.$axios.$post('https://api.deussearch.fr/remove_profile.php', {
                profile_id: this.active_profile_value[0].u_id,
            })
            .then(function(response) {
             comp.$router.go(0);
             comp.profile_removed = true;
             comp.delete_profile_dialog = false;
            })
            .catch(function(error) {
            });
        }
    },
    components: {
      'result-component' : ResultsComponent
    },
    beforeCreate() {
        var comp = this;
        if(this.$cookies.get('deussearch_connected') == 1) {
            var currentuser = JSON.parse(this.$cookies.get('deussearch_user'));
            comp.currentuser = currentuser;
            this.$axios.$post('https://api.deussearch.fr/user_get_all_profiles.php', {
                user_id: currentuser.id,
            })
            .then(function(response) {
                comp.allProfiles = response;
                if(response[0]) {
                    comp.$http.$post("https://api.deussearch.fr/test_get_profile.php?unicid="+response[0].u_id).then(result => {
                        comp.active_profile_value = result;
                        comp.profileloaded = true;
                    });
                } else {
                    comp.no_profile_for_user = true;
                }
            })
            .catch(function(error) {
            });    
        }
        
    },
    mounted() {
        this.currentuser = JSON.parse(this.$cookies.get('deussearch_user'));
        if(this.currentuser.steamappid) {
            this.editingsteamid = false;
        }
        this.user_loaded = true;
    },
    computed: {
      first_start_date_formatted () {
        return moment(this.first_start_date_readable).format('MMM YYYY')
      },
      first_end_date_formatted () {
        return moment(this.first_end_date_readable).format('MMM YYYY')
      },
      second_start_date_formatted () {
        return moment(this.second_start_date_readable).format('MMM YYYY')
      },
      second_end_date_formatted () {
        return moment(this.second_end_date_readable).format('MMM YYYY')
      },
      third_start_date_formatted () {
        return moment(this.third_start_date_readable).format('MMM YYYY')
      },
      third_end_date_formatted () {
        return moment(this.third_end_date_readable).format('MMM YYYY')
      }
    }
  }
</script>

<style>
.alluserprofiles .faq-profile .faq-item{
 padding: 0 !important;
 border:none !important;
}
.alluserprofiles .v-tabs-slider-wrapper {
  left: auto !important;
  right: 0; 
  background-color:#a5bb3b;
}
.alluserprofiles .v-slide-group__wrapper {
    border-right:3px solid #a5bb3b;
    background: #0a0a20;
}

.alluserprofiles .v-tab {
  justify-content: left;
  color: white !important;
  padding: 1em;
}

.alluserprofiles .v-tab.v-tab--active {    
    background-color: #1c1d55;
}
.alluserprofiles .v-tabs-slider {
    background-color:#a5bb3b;
}

.profile_resume {
    padding: 1em;
    background: #0a0a20;
    text-align: left;
    color: white;
    font-size: 0.8em;
}

.profile_resume .right_side svg {
    color: white;
    height: 35px;
    width: 35px;
    padding: 10px;
    border: 1px solid white;
    border-radius: 50%;
}
.profile_resume .right_side svg:hover {
    background-color: #a5bb3b;
    border-color: #a5bb3b;
}
.profile_resume .right_side button.ml-2 svg:hover {
    background-color: #bd4747;
    border: 1px solid #e05555;
}


.alluserprofiles .theme--light.v-tabs-items {
    background-color:#1C1D55;
}

.top-create-profil-head {
    color:white;
    text-align: left;
    padding-left: 10px;    
    background: linear-gradient(-30deg,rgba(206,0,113,0.26667),#074f86) !important;;    
    border-bottom: 1px solid #616473;
}


.top-create-profil-head span {
    font-family: 'hamlin';
    font-size: 0.8em;
}


.top-create-profil-head span::before {
    width: 5px;
    height: 5px;
    content:'';
    background:yellow;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    margin-top: -7px;
}

.create_profil_test {
    background:url('../../static/profile/create_profile_test.jpg');
}
.create_profil_steam {
    cursor: pointer;
    background:url('../../static/profile/create_profile_xbox.jpg');
}

.create_profil .arrowsvg {
    color: #7373df;
    -webkit-transition:all 0.1s ease-out;
	-moz-transition:all 0.1s ease-out;
	-o-transition:all 0.1s ease-out;
	transition:all 0.1s ease-out;
}

.create_profil:hover .arrowsvg {
    margin-right: 25px !important;
    -webkit-transition:all 0.1s ease-out;
	-moz-transition:all 0.1s ease-out;
	-o-transition:all 0.1s ease-out;
	transition:all 0.1s ease-out;
}

.create_profil {
    font-family: "Oswald", sans-serif;
    letter-spacing: 2px;
    background-position: 0% 00%;
    background-size: cover;
    color: white !important;
    width: 100%;
    -webkit-transition:background-position 0.5s ease-out;
	-moz-transition:background-position 0.5s ease-out;
	-o-transition:background-position 0.5s ease-out;
	transition:background-position 0.5s ease-out;
}

.create_profil:hover {
    background-position: 0% 10%;
    -webkit-transition:background-position 0.5s ease-out;
	-moz-transition:background-position 0.5s ease-out;
	-o-transition:background-position 0.5s ease-out;
	transition:background-position 0.5s ease-out;
}

.profil_user_span {    
    font-size: 0.9em;
    font-weight: 600;
}

.faq-wrapper .faq-item .faq-title {
    color: white;
    background:linear-gradient(-30deg,rgba(206,0,113,0.26667),#074f86) !important;
    font-size: 1.2rem;
    margin-top: 0;
    min-height: auto;
    margin-bottom: 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
}

.v-expansion-panel-header--active {
    margin-bottom: 15px !important;
}

.v-expansion-panel {
    background-color:#1C1D55 !important;
}
.v-expansion-panel::before {
    box-shadow: none !important;
}
.faq-title .v-icon {
    background: #0a0a20;
    margin-left: 15px;
    border-radius: 50%;
    color: white !important;
}

.v-expansion-panel-content__wrap {
    margin-bottom: 0 !important;
    margin-bottom: 0 !important;
}

.edit_profile_modal {
    background-color: #131326 !important;
}
.edit_profile_modal * {
    color: white !important;
}

.edit_profile_modal .v-btn {
    background-image: linear-gradient(-30deg,#c165dd,#5c27fe);
}

.edit_profile_modal input {
    background: #0d0d20;
}

@media (min-width:767px) {
    .profile_name_text {
        max-width: 175px;
        word-break: revert;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}

/*.deus_results_page .header-bottom .containe
*/
@media (max-width:767px) {
    .v-tabs {
        display: block !important;
    }

    .v-item-group {
        width:100%;
    }

    .top-create-profil-head+.v-tabs .v-tab {
        max-width: inherit !important;
    }
}


@font-face {
  font-family: 'Hamlin';
  src: url('../../assets/fonts/hamlin/Hamlin-Regular.eot');
  src: local('Hamlin Regular'), local('Hamlin-Regular'),
      url('../../assets/fonts/hamlin/Hamlin-Regular.eot?#iefix') format('embedded-opentype'),
      url('../../assets/fonts/hamlin/Hamlin-Regular.woff2') format('woff2'),
      url('../../assets/fonts/hamlin/Hamlin-Regular.woff') format('woff'),
      url('../../assets/fonts/hamlin/Hamlin-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Hamlin';
  src: url('../../assets/fonts/hamlin/Hamlin-Bold.eot');
  src: local('Hamlin Bold'), local('Hamlin-Bold'),
      url('../../assets/fonts/hamlin/Hamlin-Bold.eot?#iefix') format('embedded-opentype'),
      url('../../assets/fonts/hamlin/Hamlin-Bold.woff2') format('woff2'),
      url('../../assets/fonts/hamlin/Hamlin-Bold.woff') format('woff'),
      url('../../assets/fonts/hamlin/Hamlin-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Hamlin';
  src: url('../../assets/fonts/hamlin/Hamlin-Light.eot');
  src: local('Hamlin Light'), local('Hamlin-Light'),
      url('../../assets/fonts/hamlin/Hamlin-Light.eot?#iefix') format('embedded-opentype'),
      url('../../assets/fonts/hamlin/Hamlin-Light.woff2') format('woff2'),
      url('../../assets/fonts/hamlin/Hamlin-Light.woff') format('woff'),
      url('../../assets/fonts/hamlin/Hamlin-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Hamlin';
  src: url('../../assets/fonts/hamlin/Hamlin-ExtraBold.eot');
  src: local('Hamlin ExtraBold'), local('Hamlin-ExtraBold'),
      url('../../assets/fonts/hamlin/Hamlin-ExtraBold.eot?#iefix') format('embedded-opentype'),
      url('../../assets/fonts/hamlin/Hamlin-ExtraBold.woff2') format('woff2'),
      url('../../assets/fonts/hamlin/Hamlin-ExtraBold.woff') format('woff'),
      url('../../assets/fonts/hamlin/Hamlin-ExtraBold.ttf') format('truetype');
  font-weight: 800;
  font-style: normal;
}


.genre_list li{
  font-family: 'Hamlin';
  background: rgba(0, 0, 0, 0.5);
  font-size: 0.8em;
  border-radius: 25px;
  width: auto;
  padding: 2px 10px;
  display: inline-block;
  margin-left: 5px;
  line-height: 1;
  color: #9f9f9f;
  border: 1px solid #464544;
}

.tag.tag {
    text-align: right;
}

.yellow_link {
    color: #e5e90d !important;
}

a.yellow_link {
    border-bottom: 1px solid #e5e90d;
}

a.yellow_link:hover {
    border-color: #9fa209 !important;
}

.yellow_link path {
    fill:#e5e90d;
}

.yellow_link:hover {
    color: #9fa209 !important;
}
.yellow_link:hover path {
    fill:#9fa209 !important;
}


.info_profil .yellow_link {
    cursor: pointer;
}

.info_profil {
    font-size: 0.85rem !important;
    background: rgba(32, 32, 60, 0.7);
    padding: 10px;
    width: 100%;
    position: relative;
    font-family: 'hamlin' !important;
}

.info_profil .left_icon {  
    position: absolute;
    left: -8px;
    top: 0px;
}

.deus_steam_games_list {
    background: #1e1e3d;
    cursor: pointer;
    font-size: 0.9em;
}

.deus_steam_games_list:hover,
.deus_steam_games_list.active {    
    background: #2c2c59;
    border-left:2px solid rgb(76, 185, 76);
}

.st_game_title {
    font-family: 'hamlin';
    font-size: 0.8em;
}

.game_list {
    max-height: 450px;
    overflow-y: scroll;
}

.deus_error span {    
    font-size: 0.9em;
    border-left: 5px solid #b34545;
    padding-left: 10px;
    background: #402929;
}

.span_info {
    font-size: 0.9rem;
}

.bg_profile_load {   
    background: #2c2c59;
    padding:10px;
    font-size: 0.9rem;
    color: white;
}
.red {
    background-image: linear-gradient(-30deg,#dd656b,#8a0d0d) !important;
}

.profil_user_span.sub {
    font-size: 0.9em;
    font-weight: initial;
}
.border-left-yellow {
    border-left: 2px solid #797955;
}

.profile_resume .oswald{
    font-family: "Oswald", sans-serif;
    letter-spacing: 1px;
}

.create_icon {
    transform: scale(1.5);
}

</style>