<template lang="html">
    <div clas="deus_result_page">
        <head-banner></head-banner>
        <section class="contact-section bg"  no-ssr>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12 text-center">
                        <div class="contact-area deus_version deus_bloc no_bg_new_bloc">
                            <div class="contact-form-area resultdiv p-0 mr-1 ml-1">
                        <!--    <h1 class="title_deus_test text-left"> {{ $t('message.deus_results_title') }}</h1>-->
                                <div class="row justify-content-center mb-30-none" id="deus_result">
                                    <div class="col-md-3 col-xs-12 col-sm-3">
                                        <v-card class="mx-auto  left_col my-12" max-width="374">                                         
                                            <v-expansion-panels v-if="profileloaded"  multiple focusable v-model="panelleft">
                                                <v-expansion-panel v-if="profilevalues[0]['author']" class="faq-item">
                                                    <v-expansion-panel-header class="mb-0 faq-title text-left deus_result_titles">
                                                        <p>
                                                            <font-awesome-icon :icon="['fa', 'user']" />
                                                            {{ $t('message.general_user')}}
                                                        </p>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content class="search_details profile_card_block text-left faq-content">
                                                        <v-list-item v-if="profilevalues[0]['author']" class="p-2 pa-2 profile_card grow col-md-12 col-sm-12 grow">
                                                            <v-list-item-avatar 
                                                                height="80px"
                                                                width="80px"
                                                                color="grey darken-3 mr-2 col-xs-12">
                                                                <v-img
                                                                class="elevation-6 user_avatar"  
                                                                alt=""
                                                                height="80"
                                                                width="80"
                                                                :src="'https://img.deussearch.fr/static/avatars/botts'+profilevalues[0]['author'].avatar+'.svg'"
                                                                ></v-img>
                                                            </v-list-item-avatar>

                                                            <v-list-item-content class="col-md-12 col-sm-12">
                                                                <v-list-item-title>
                                                                    <span class="pseudo">{{ profilevalues[0]['author'].pseudo }}</span>
                                                                    <span class="member_since">{{ $t('message.general_member_since') }} {{ $dateFns.format(profilevalues[0]['author'].created, 'dd MMM yyyy') }} </span>
                                                                </v-list-item-title>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>

                                                <v-expansion-panel class="faq-item">
                                                    <v-expansion-panel-header class="mb-0 faq-title text-left deus_result_titles">
                                                        <p>
                                                            <font-awesome-icon :icon="['fa', 'chart-bar']" />
                                                            {{ $t('message.general_details')}}
                                                        </p>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content class="search_details text-left faq-content">
                                                        <v-list-item class="pl-0 pr-0">
                                                            <v-list-item-content class="mt-1 detail_list">
                                                                <v-list-item-title>
                                                                    <span class="yellow_link" v-if="profilevalues[0].name != null && profilevalues[0].name != profilevalues[0].u_id">
                                                                        <font-awesome-icon class="mr-2" :icon="['fa', 'link']" />
                                                                            {{ profilevalues[0].name }}
                                                                    </span>
                                                                    <span class="yellow_link" v-else>
                                                                        <font-awesome-icon class="mr-2" :icon="['fa', 'link']" />
                                                                        {{ profilevalues[0].u_id }}
                                                                    </span>
                                                                    <v-tooltip bottom>
                                                                        <template v-slot:activator="{ on, attrs }">
                                                                            <v-btn
                                                                            icon
                                                                            v-bind="attrs"
                                                                            v-on="on"
                                                                            >
                                                                                <v-icon class="yellow_link small">mdi-help-circle</v-icon>
                                                                            </v-btn>
                                                                        </template>
                                                                        <span> {{ $t('message.general_guide_change_in_dashboard') }}  </span>
                                                                    </v-tooltip>
                                                                </v-list-item-title>
                                                                <v-list-item-title>
                                                                    <span>
                                                                        <font-awesome-icon class="mr-2" :icon="['fa', 'calendar-alt']" />
                                                                        {{ profilecreateddate }}
                                                                    </span>
                                                                </v-list-item-title >
                                                                <v-list-item-title>
                                                                    <span>
                                                                        <font-awesome-icon class="mr-2" :icon="['fa', 'gamepad']" />
                                                                        {{$t('message.general_sur') }} {{ profilevalues[0].platform[0] }}
                                                                    </span>
                                                                </v-list-item-title>
                                                                <v-list-item-title>
                                                                    <span v-if="profilevalues[0].type === 'steam'">
                                                                        <font-awesome-icon class="mr-2" :icon="['fab', 'steam']" />
                                                                        {{ $t('message.deus_results_origine_steam')}}
                                                                    </span>
                                                                    <span v-if="profilevalues[0].type === 'poll'">
                                                                        <font-awesome-icon class="mr-2" :icon="['fas', 'poll']" />
                                                                        {{ $t('message.deus_results_origine_test')}}
                                                                    </span>
                                                                </v-list-item-title >
                                                                <!-- <v-list-item-title v-if="profilevalues[0].type === 'poll'">
                                                                    <span>
                                                                        <font-awesome-icon class="mr-2" :icon="['fa', 'money-bill']" />
                                                                        {{ profilevalues[0].price_max }} € maximum
                                                                    </span>
                                                                </v-list-item-title > -->
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            

                                                <v-expansion-panel class="faq-item">
                                                    <v-expansion-panel-header class="mb-0 faq-title text-left deus_result_titles">
                                                        <p>
                                                            <font-awesome-icon :icon="['fa', 'list-alt']" />
                                                            {{ $t('message.deus_results_genres') }}
                                                        </p>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content class="faq-content">
                                                        <v-card-text class="p-0">
                                                            <v-combobox
                                                                v-model="profilevalues[0].deus_genres"
                                                                :items="genres_list"
                                                                chips
                                                                class="p-0 left_col_combo"
                                                                multiple
                                                                solo
                                                                @change="updateGameList()"
                                                            >
                                                                <template v-slot:selection="{ attrs, item, select, selected }">
                                                                    <li
                                                                        v-bind="attrs"
                                                                        :input-value="selected"
                                                                        close
                                                                        @click="select"
                                                                        @click:close="remove(item)"
                                                                        class="text-center deus_same_val li-deus_result_genres"
                                                                    >
                                                                        {{ item }}
                                                                    </li>
                                                                </template>
                                                            </v-combobox>
                                                        </v-card-text>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                                
                                                <v-expansion-panel class="faq-item">
                                                    <v-expansion-panel-header class="mb-0 faq-title text-left deus_result_titles">
                                                        <p>
                                                            <font-awesome-icon :icon="['fa', 'tags']" />
                                                            Tags
                                                        </p>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content class="faq-content">
                                                        <v-card-text class="p-0">
                                                            <v-combobox
                                                                v-model="profilevalues[0].deus_tags"
                                                                :items="tags_list"
                                                                chips
                                                                class="p-0 left_col_combo"
                                                                multiple
                                                                solo
                                                                @change="updateGameList()"
                                                            >
                                                                <template v-slot:selection="{ attrs, item, select, selected }">
                                                                    <li
                                                                        v-bind="attrs"
                                                                        :input-value="selected"
                                                                        close
                                                                        @click="select"
                                                                        @click:close="remove(item)"
                                                                        class="text-center deus_same_val li-deus_result_genres"
                                                                    >
                                                                        {{ item }}
                                                                    </li>
                                                                </template>
                                                            </v-combobox>
                                                        </v-card-text>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                            <loading v-else></loading>
                                        </v-card>
                                    </div>
                                    <div class=" col-xs-12 col-sm-9 col-md-9  pl-0">
                                        
                                        <div class="transp_show_on_hover">
                                            <div class="top-create-profil-head new_head future_title">
                                                <span> {{ $t('message.result_futures_released') }} (bêta) </span>
                                            </div>
                                            <future-results-component  no-ssr :key="componenfutureblockey" v-if="profileloaded" :profile="profilevalues" :startdate="first_start_date_timestamp" :enddate="first_end_date_timestamp" :numberofgames="6" @setgameinmodal="setgameinmodal" ></future-results-component>
                                        </div>
                                        <div class="faq-wrapper mb-5 faq-profile">
                                            <v-expansion-panels multiple focusable v-model="panel">
                                                <v-expansion-panel class="faq-item new_head_holder">
                                                    <v-expansion-panel-header class="faq-title pt-1  pb-0 text-left new_head deus_result_titles">
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
                                                    <v-expansion-panel-content class="p-0 faq-content pt-4">
                                                        <result-component  no-ssr :key="componentfirstblockey" v-if="profileloaded" :profile="profilevalues" :startdate="first_start_date_timestamp" :enddate="first_end_date_timestamp" :numberofgames="9" ></result-component>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                                
                                                <v-expansion-panel class="faq-item new_head_holder">
                                                    <v-expansion-panel-header class="faq-title  pt-1 pb-0 text-left  new_head  deus_result_titles">
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
                                                                    <v-text-field  v-model="second_end_date_formatted"  readonly  v-bind="attrs"  v-on="on"  class="mb-0 pt-0"></v-text-field>
                                                                </template>
                                                                <v-date-picker no-title v-model="second_end_date_readable" type="month" scrollable @change="updateSecondEndDate(second_end_date_readable)">
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
                                                                    <v-text-field v-model="second_start_date_formatted"  readonly  v-bind="attrs"  v-on="on"  class="mb-0 pt-0"></v-text-field>
                                                                </template>
                                                                <v-date-picker no-title v-model="second_start_date_readable" scrollable type="month" @change="updateSecondStartDate(second_start_date_readable)">
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content class="faq-content pt-4">
                                                        <result-component  no-ssr :key="componentsecondblockey" v-if="profileloaded" :profile="profilevalues" :startdate="second_start_date_timestamp" :enddate="second_end_date_timestamp" :numberofgames="6" ></result-component>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                                
                                                <v-expansion-panel class="faq-item new_head_holder">
                                                    <v-expansion-panel-header class="faq-title pt-1 pb-0 text-left  new_head  deus_result_titles">
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
                                                                    <v-text-field  v-model="third_end_date_formatted"  readonly  v-bind="attrs"  v-on="on"  class="mb-0 pt-0"></v-text-field>
                                                                </template>
                                                                <v-date-picker no-title v-model="third_end_date_readable" type="month" scrollable @change="updateThirdEndDate(third_end_date_readable)">
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
                                                                    <v-text-field v-model="third_start_date_formatted"  readonly  v-bind="attrs"  v-on="on"  class="mb-0 pt-0"></v-text-field>
                                                                </template>
                                                                <v-date-picker no-title v-model="third_start_date_readable" scrollable type="month" @change="updateThirdStartDate(third_start_date_readable)">
                                                                </v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-expansion-panel-header>
                                                    <v-expansion-panel-content class="faq-content pt-4">
                                                        <result-component  no-ssr :key="componenthirdblockey" v-if="profileloaded" :profile="profilevalues" :startdate="third_start_date_timestamp" :enddate="third_end_date_timestamp" :numberofgames="6"></result-component>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <v-snackbar
        v-model="gameProfilSaved"
        >
        {{ $t('message.deus_results_saved')}}
        
            <template v-slot:action="{ attrs }">
                <v-btn
                v-bind="attrs"
                plain
                @click="gameProfilSaved = false"
                >
                <font-awesome-icon :icon="['fa', 'times']" />
                </v-btn>
            </template>
        </v-snackbar>
       
    </div>
</template>

<script lang="js">
    import moment from 'moment'
    import Loading from '../components/loading'
    import HeadBanner from '../components/HeadBanner';
    import ResultsComponent from '../components/ResultsComponent';
    import FutureResultsComponent from '../components/futureResultComponent';

  export default  {
    name: 'deus-results',
    title: 'DeusSearch - Test de la personnalité, résultats du test',
    props:['used_lang_for_route', 'locale', 'page_title'],
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
    },
    components: {
      'head-banner' : HeadBanner,
      'result-component' : ResultsComponent,
      'future-results-component' : FutureResultsComponent,
      'loading' : Loading
    },
    head() {
        return {
            title: this.page_title,
            bodyAttrs: {
                class:'deus deus_results_page'
            },
        }
    },
    data () {
      return {
        first_start_date_readable : new Date().toISOString().substr(0, 7),
        second_start_date_readable : new Date(1483228800*1000).toISOString().substr(0, 7),
        third_start_date_readable : new Date(1356998400*1000).toISOString().substr(0, 7),
        first_end_date_readable : new Date(1483228800*1000).toISOString().substr(0, 7),
        second_end_date_readable : new Date(1356998400*1000).toISOString().substr(0, 7),
        third_end_date_readable : new Date(1104537600*1000).toISOString().substr(0, 7),
        
        first_start_date_timestamp : new Date().getTime(),
        second_start_date_timestamp : 1483228800,
        third_start_date_timestamp : 1356998400,
        first_end_date_timestamp : 1483228800,
        second_end_date_timestamp : 1356998400,
        third_end_date_timestamp : 1104537600,

        componentfirstblockey:0,
        componentsecondblockey:0,
        componenthirdblockey:0,
        componenfutureblockey:0,

        genres_list: [],
        tags_list: [],
        profileId : null,
        profilecreateddate:null,
        profilevalues:[],
        componentKey: 0,
        profileloaded:false,
        modal:false,
        modaled_game:null,
        panel:[0],
        panelleft:[0,1,2,3],
        gameProfilSaved:false,
        actual_user : null
      }
    },
    mounted () { 
        if(this.$cookies.get('deussearch_connected') == 1 && this.$cookies.get('deussearch_user')) { // si l'user est connecté 
            this.actual_user = JSON.parse(this.$cookies.get('deussearch_user'));
        }      
        if(this.$cookies.get('deussearch_just_do_profile_test') == 1) {
            this.gameProfilSaved = true;
        }        
        this.$emit('update:locale', this.$props.used_lang_for_route);
    },
    created() {
    },
    metaInfo() {
        return {
            meta: [
                { property: 'og:title', content: this.$props.page_title},
            ]
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
        updateGameList() {
            this.componentfirstblockey += 1;
            this.componentsecondblockey += 1;
            this.componenthirdblockey += 1;
            this.componenfutureblockey += 1;
        },
    },
    created() {
        this.$http.$get("https://api.deussearch.fr/get_genres.php").then(genres_list => {
            this.genres_list = genres_list;
        });
        
        this.$http.$get("https://api.deussearch.fr/get_tags.php").then(tags_list => {
            this.tags_list = tags_list;
        });

        this.$http.$post("https://api.deussearch.fr/test_get_profile.php?unicid="+this.$route.query.id).then(result => {
            this.profilevalues = result;
            this.profilecreateddate = new Date(this.profilevalues[0].created*1000).toISOString().substr(0, 10);
            this.profilecreateddate = moment(this.profilecreateddate).format('DD MMM YYYY');
            this.profileloaded = true;
        }, error => {
        });
    }
  }
</script>

<style>
    .left_col {
        background-color: transparent !important;
        font-family:"Oswald", sans-serif;
    }

    .deus_result_genres_sim i {
        color: white !important;
        cursor: pointer;
    }

  .v-list-item{
   min-height: 20px !important;
  }
  .v-list-item__action {
      margin-top:5px !important;
      margin-bottom:5px !important;
  }
  .v-list-item__content {
      padding-top:5px !important;
      padding-bottom:5px !important;
  }

    .profile_card {
        background: #0a0a20;
        text-align: left;
        flex-wrap:wrap;
    }

    .left_col .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
        background-color:#0a0a20 !important;
        box-shadow: none !important;
        margin-top: 10px;
        padding-left: 0 !important;
        padding-right: 0 !important;
        cursor: pointer;
    }

    .left_col .deus_same_val {
        border-radius: 6px;
        padding: 6px 15px;
        display: inline-block;
    }

    .left_col .faq-title {
        min-height: none;    
        margin-bottom: 0 !important;
        padding: 10px 10px;
    }
    
    .left_col .faq-title svg {
        margin-right: 10px;
        color: #0a0a20;
    }

    .left_col .faq-item {
        margin-top: 0 !important;
    }
    .left_col .faq-content {
        background: #0a0a20;
    }

    .li-deus_result_genres  input {
        border:none !important;
    }


    .v-expansion-panel--active:not(:first-child), .v-expansion-panel--active + .v-expansion-pane {
        margin-top: 0 !important;
    }

    .profile_card .pseudo { 
        font-size: 1.2rem;
        color: white;
        font-weight:bold;
    }
    .profile_card .member_since {     
        font-size: 0.8rem;
        margin-top: 7px;
    }
    .mdi-menu-down {    
        background-color: #0a0a20;
        padding: 2px;
        border-radius: 50%;
        font-size: 2em !important;
        border: 1px solid white;
        color: #ffffffb3 !important;
    }


    .faq-title .v-input{
        width: 150px;
        overflow: hidden;
    }
    .faq-title input {
        border: none;
        border-left: 2px solid #817d4d;
        border-radius: 0;
        padding: 7px !important;
        height: 32px;
        background: #1c1d55;  
        color: #a29e9e !important;
    }
        
    .faq-title input li+input {
        border: none !important;
    }
    .faq-title  .v-text-field__details {
        display:none !important;
    }
    .deus_result_titles p,
    .deus_result_titles span, .search_details span , .v-dialog > .v-card > .v-card__title{
        font-family:"Oswald", sans-serif;
    }

    .detail_list span{
        font-size: 0.9em;
    }

    .v-date-picker-table .v-btn--active {
            color: #1c1d55 !important;
    }
    .yellow_link.small {
        font-size: 18px !important;
        opacity: 0.8;
    }

    .resultdiv .member_since {
        display: block;
        margin-top: 0;
        font-size: 12px;
    }

    .deus_results_page .new_head span {
        color: var(--para-color);
        line-height: 1.7;
        font-size: 16px;
        font-family: 'Oswald';
    }

    .deus_results_page .new_head  {
        background: linear-gradient(-30deg,rgba(206,0,113,0.26667),#074f86) !important;;
        padding:9px;
        border-radius:0px;
        margin-bottom:10px;
        border:none;
    }


    .deus_results_page .faq-title.new_head  {
        margin-bottom:0px !important;
    }
    
    
    .deus_results_page .new_head_holder{
        margin-bottom:15px !important;
    }
    .deus_results_page .new_head::before {
        display:none;
    }

    .deus_results_page .new_head input {
        background: #1c1d55;
    }

    @media (min-width: 991px) {
       
        .transp_show_on_hover {
            opacity:0.7;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
        }
    
        .transp_show_on_hover:hover {
            opacity:1;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
        }
        .deus.deus_results_page .inner-banner-section--style {
                padding-top: 185px;
        }

    }
    @media (max-width: 991px) {
        .deus.deus_results_page .inner-banner-section--style {
                padding-top: 245px !important;
        }
        .deus.deus_results_page .member_since {
            display:none;
        }
    }


    .profile_card,
    .profile_card .v-list-item__title {
        justify-content: center;
        text-align:center;
    }
    @media (min-width: 557px) and (max-width: 991px) {
        .profile_card_block .v-expansion-panel-content__wrap{
            padding:0em;
        }


    }

    .no_bg_new_bloc {
        background:none !important;
    }

    .v-expansion-panel-header__icon {
        justify-content: right;
    }

</style>
