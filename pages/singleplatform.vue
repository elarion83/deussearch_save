<template>
  <div>
    <head-banner  class="little_text_banner"  :title="$t('message.general_video_games')+' <span class=\'yellow_link\'> '+displayed_platform.name+'</span>'"></head-banner>
    <section class="contact-section bg presentation profil">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 text-center mt-2">
                    <div class="contact-area text_page p-0">
                      <div>
                        <v-container fluid>
                          <v-row class="search_game_filer_section mb-1">
                            <v-col cols="12" sm='12' md='5' class="pb-0 bg_blue_class filled_field">
                              <v-text-field 
                                filled
                                class="custom_input_color_white"
                                hide-details
                                :label='$t("message.game_title")'
                                v-model="selectedTitle" 
                                @keyup="updateGameListFilter('title',selectedTitle)"
                                placeholder="Battlefield 4022, Luigi Moonshine"> 
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm='10' md='5' class="pb-0 bg_blue_class">
                              <v-subheader class="slider_subheader">{{ $t("message.rating_min") }}</v-subheader>
                              <v-slider
                                v-model="selectedRating" min="0" max="5" step="1"  @change="updateGameListFilter('rating',selectedRating)"
                                thumb-label="always"
                                thumb-color="#0e0e2c"
                              >
                              </v-slider>
                            </v-col>
                            <v-col cols="12" sm='2' md='2' class="pb-0 bg_blue_class">
                              <v-subheader class="pl-0 mb-0 pb-1 slider_subheader">  {{$t('message.order_by') }}  </v-subheader>
                                <v-select
                                v-on:change="updateGameListFilter('order',selectedOrder)"
                                v-model="selectedOrder"
                                :items="listorder"
                                menu-props="auto"
                                class="pt-0 mt-0"
                                label="Select"
                                :hint="`${selectedOrder.order_text}`"
                                :value="`${selectedOrder.value}`"
                                hide-details
                                item-text="order_text"
                                item-value="value"
                                return-object
                                persistent-hint
                                prepend-icon="mdi-sort-variant"
                                single-line
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <list-of-games :key="listFilterKey" :ordering="selectedOrder.value" rand="0" :platform_id="displayed_platform.id_dDblKey" show_title="0" :title="selectedTitle" limit="20" :note_min="selectedRating" nombre_vote="0" no-ssr/></list-of-games>
                          </v-row>
                        </v-container>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
  </div>
</template>

<script lang="js">
  import CoolLightBox from 'vue-cool-lightbox'
  import Loading from '../components/loading';
  import HeadBanner from '../components/HeadBanner';
  import HomeListOfGames from '../components/Home/HomeListOfGames';

  export default  {
    name: 'SinglePlatform',
    props: ['platformid', 'used_lang_for_route', 'locale'],
    data () {
      return {
        displayed_platform:'',
        loaded:false,
        selectedRating:4,
        selectedTitle:'',
        listFilterKey : 0,
        selectedOrder: { order_text: 'rating', value: 'popularity_desc' },
        listorder: [
          { order_text: 'Pop. -/+', value: 'popularity_asc' },
          { order_text: 'Pop. +/-', value: 'popularity_desc' },
          { order_text: 'Rating -/+', value: 'rating_asc' },
          { order_text: 'Rating +/-', value: 'rating_desc' },
          { order_text: 'Name A/Z', value: 'name_asc' },
          { order_text: 'Name Z/A', value: 'name_desc' },
          { order_text: 'Newests', value: 'date_asc' },
          { order_text: 'Oldests', value: 'date_desc' }
        ],
      }
    },
    methods: {
      updateGameListFilter(type, value){
        if(type == 'order') {
        }
        if(type == 'rating') {
          this.selectedRating=value;
        }
        if(type == 'title') {
          this.selectedTitle=value;
        }
        this.listFilterKey += 1;
      }
    },
    head() {
        return {
            title: 'DeusSearch - Jeux-vidéo sur '+ this.displayed_platform.name,
            bodyAttrs: {
                class:'blog single_tag'
            }
        }
    },
    components: {
      'head-banner' : HeadBanner,
      'loading' : Loading,
      'list-of-games' : HomeListOfGames
    },
    
    async asyncData({ $axios, params}) {
      const platform = await $axios.get('https://api.deussearch.fr/get_single_platform.php?pid='+params.platformid);
      const displayed_platform = platform.data[0];
      return {
       displayed_platform
      }
    }
  }


</script>

<style>
.single_tag .list_of_games {
  background:none;
  padding-top: 0 !important;
  width: 100%;
}

.single_tag .list_of_games h2 {
  margin-top: 0;
}


.search_game_filer_section .slider_subheader, 
.search_game_filer_section .v-label {
  color: white !important;
}

.search_game_filer_section {
  background: linear-gradient(-30deg,rgba(206,0,113,0.26667),#074f86) !important;
}

.search_game_filer_section .filled_field .v-input__control{
  background:rgba(0, 0, 0, 0.2);
}
.search_game_filer_section .filled_field .v-input__control:hover{
  background:rgba(0, 0, 0, 0.5);
}

.search_game_filer_section .custom_input_color_white input,
.search_game_filer_section .custom_input_color_white input::placeholder {
  color:#b9bad1  !important;
  border:none !important;
}

.search_game_filer_section .v-select__selection {
  color:#727272  !important;
  padding-left: 10px;
}

.search_game_filer_section .v-select__selection+input {
display: none;
}
.search_game_filer_section .v-input .v-icon {
  color:#888;
}

.search_game_filer_section .slider_subheader {
  height: auto;
  margin-bottom: 15px;
}


.search_game_filer_section .v-messages {
  display: none;
}

.search_game_filer_section .v-slider__track-container {
  cursor: pointer;
}
</style>
