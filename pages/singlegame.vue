<template>
  <div>
    <div class="game_banner" v-bind:style="{ 'background-image': 'url(' + displayed_game.img_url + ')' }"> 
      <div>
        <h1 class="game_name mb-4">{{ displayed_game.game_name }}</h1>
      
        <router-link v-if="user_logged_in && displayed_game.contribution_pending == 0" :title="$t('message.edit_action')+' '+displayed_game.game_name" :to="{ name: 'edit_single_game', params: { gamename: displayed_game.slug , gameid: displayed_game.id }}" class="btn_edit_game">
          <v-btn rounded class="mt-4">
            <v-icon left>
              mdi-pencil
            </v-icon>
            {{ $t('message.edit_button') }}
          </v-btn>
        </router-link>
        
        <v-btn rounded class="mt-4 btn_edit_game" v-if="!user_logged_in && displayed_game.contribution_pending == 0">
          <v-icon left>
            mdi-pencil
          </v-icon>
          {{ $t('message.edit_button_login') }}
        </v-btn>

      </div>
    </div>
    <section class="contact-section bg single_game profil">
      <div class=" presentation container" v-if="loaded">
        <v-row>
          <div class="col-lg-8 main_col_single_game">
            
            <v-icon class="showimages" :title="$t('message.general_imagegallery')" v-if="screenshots"  @click="index = 1">
              mdi-image-area
            </v-icon>
            
            <h2 v-if="displayed_game.screenshots" class='mt-4 mb-3 video_title'> Image(s) </h2>
              <CoolLightBox v-if="screenshots" :items="screenshots" :index="index" @close="index = null">
              </CoolLightBox>
            
            <v-row class="pr-3 mb-4" v-if="displayed_game.screenshots">
                <v-col
                cols="3"
                v-for="(image, imageIndex) in screenshots"
                :key="imageIndex"
                @click="index = imageIndex"
                class="pr-0 mb-0 pb-0 img_screen"
                v-if="image != ''"> 
                  <v-img
                      :src="image"
                      :lazy-src="image"
                      :alt="$t('message.general_know_more')+' '+displayed_game.game_name"
                      aspect-ratio="1"
                      class="pr-0 c-pointer img"
                  >
                  </v-img>
                </v-col>
            </v-row>
            
            <h2 v-if="displayed_game.description_en || displayed_game.description_fr" class="mt-4 mb-1"> {{ $t('message.general_description_of')}} {{ displayed_game.game_name }}</h2>
              <v-tabs v-if="displayed_game.description_en || displayed_game.description_fr" class="game_descr_tab mt-2">
                <v-tab v-if="displayed_game.description_fr && used_lang_for_route === 'fr'" href="#french_first">
                  Français
                </v-tab>
                <v-tab-item v-if="displayed_game.description_fr"  value="french_first">
                  <div v-html="displayed_game.description_fr" class="single_game_descr description">
                  </div>
                </v-tab-item>

                <v-tab  v-if="displayed_game.description_en" href="#english">
                  English{{ index }}
                </v-tab>
                <v-tab-item v-if="displayed_game.description_en" value="english">
                  <div v-html="displayed_game.description_en" class="single_game_descr description">
                  </div>
                </v-tab-item>
                <v-tab v-if="displayed_game.description_fr && used_lang_for_route === 'en'" href="#french_second">
                  Français
                </v-tab>
                <v-tab-item v-if="displayed_game.description_fr"  value="french_second">
                  <div v-html="displayed_game.description_fr" class="single_game_descr description">
                  </div>
                </v-tab-item>
              </v-tabs>
              
              
              <h2 v-if="displayed_game.clip_url != ' ' && displayed_game.clip_url" class='mt-4 mb-2 video_title'> {{ $t('message.deus_results_modal_videos_title') }}  </h2>
              <div id="video">
                <video v-if="displayed_game.clip_url != ' '&&  displayed_game.clip_url" class="deus_video" id="video_player" controls="" autoplay="autoplay" loop="" muted="" width="250">
                  <source :src="displayed_game.clip_url" type="video/mp4">
                  Sorry, your browser doesn't support embedded videos.
                </video>
              </div>
              <v-row v-if="displayed_game.tags && displayed_game.tags[0] && loaded" class="mb-6 tags_row" no-gutters>
                <v-col sm="12" md="12">
                  <h2 class="mb-1 mt-4"> Tags </h2>

                  <router-link :title="$t('message.general_more_games')+' '+tag.tag_name" class="game_link new_tag tag_link" v-for="tag in displayed_game.tags" :key="tag.id" :to="{ name: 'single_tag', params: { tagname: tag.slug , tagid: tag.id_dDblKey }}">
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
          <div class="col-lg-4 text-right right_info_game">
            <social-share class="single_game_share" :title="displayed_game.game_name+' - DeusSearch'" :description="displayed_game.game_name + 'DeusSearch'"></social-share>

            <v-col>
              <h3 v-if="displayed_game.released != 0 && displayed_game.released != '' || displayed_game.rating" class="mt-4 mb-2"> {{ $t('message.deus_results_modal_informations_title') }} {{ displayed_game.game_name }} </h3>
              <a v-if="displayed_game.released != 0 && displayed_game.released != ''" class="game_know_more_link mb-1" :title="$t('message.released_date_of') +displayed_game.game_name">
                <v-icon>mdi-calendar-end</v-icon>
                {{ displayed_game.released }}
              </a>
              <a v-if="displayed_game.rating" class="game_know_more_link deal mb-1" :title="$t('message.deus_results_modal_note_title') +' '+displayed_game.game_name">
                <v-icon>mdi-star</v-icon>
                {{ displayed_game.rating }} / 5
              </a>
        </span>
              <h3 v-if="displayed_game.genres != ''" > Genres </h3>
              <ul v-if="displayed_game.genres != ''" class="genre_list text-right mb-3 mt-3">
                <router-link :title="$t('message.general_more_games')+' '+genre.name_genre" class="game_link tag_link" v-for="genre in displayed_game.genres" :key="genre.id" :to="{ name: 'single_genre', params: { genrename: genre.slug , genreid: genre.id_dDblKey }}">
                  <v-chip
                    class="ma-2 ml-2 mb-1 updated_genre_chip genre_tag_link"
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
              </ul>

              <h3 class="mt-4 mb-2"> {{ $t('message.deus_results_modal_buy_title') }} {{ displayed_game.game_name }} </h3>
              <div id="game_stores" >
                <a :title="$t('message.look_on')+ ' Instant Gaming : '+displayed_game.game_name" class="game_know_more_link mb-1" :href="'https://www.instant-gaming.com/fr/rechercher/?igr=gamer-3bb22b&query='+displayed_game.game_name" target="_blank"> 
                  <v-icon>mdi-magnify</v-icon>
                  Instant Gaming 
                </a>
                <a :title="$t('message.look_on')+ ' Gog.com : '+displayed_game.game_name" class="game_know_more_link mb-1" :href="'https://www.gog.com/games?page=1&sort=popularity&search='+displayed_game.game_name" target="_blank"> 
                  <v-icon>mdi-magnify</v-icon>
                  Gog.com
                </a>
                <a :title="$t('message.look_on')+ ' Kinguin : '+displayed_game.game_name" class="game_know_more_link mb-1 " :href="'https://www.kinguin.net/listing?r=deussearch&active=0&hideUnavailable=0&page=0&size=25&sort=bestseller.total,DESC&phrase='+displayed_game.game_name" target="_blank"> 
                  <v-icon>mdi-magnify</v-icon>
                  Kinguin
                </a>
                <a :title="$t('message.look_on')+ ' Steam : '+displayed_game.game_name" class="game_know_more_link mb-1 " :href="'https://store.steampowered.com/search/?term='+displayed_game.game_name" target="_blank"> 
                  <v-icon>mdi-magnify</v-icon>
                  Steam
                </a>
                <a :title="$t('message.look_on')+ ' Eneba : '+displayed_game.game_name" class="game_know_more_link mb-1 " :href="'https://www.eneba.com/fr/marketplace?text='+displayed_game.game_name+'&sortBy=RELEVANCE_DESC'" target="_blank"> 
                  <v-icon>mdi-magnify</v-icon>
                  Eneba
                </a>


                <a :href="displayed_game.deal_url" v-if="displayed_game.deal_url" class="game_know_more_link deal mb-1 " target="_blank">                  
                  <v-icon>mdi-magnify</v-icon>
                  ≈ {{ displayed_game.deal_price }}  €
                </a>


                <a  :title="$t('message.look_on')+ ' Gamepass'" href="https://www.xbox.com/fr-FR/xbox-game-pass" v-if="displayed_game.gamepass != 0"  class="game_know_more_link mb-1 " target="_blank">                  
                  <v-icon>mdi-microsoft-xbox</v-icon>
                  Gamepass
                </a>
                <a  :title="$t('message.look_on')+ ' PSNow'" href="https://www.playstation.com/fr-fr/ps-now/" v-if="displayed_game.psnow != 0"  class="game_know_more_link mb-1 " target="_blank">                  
                  <v-icon>mdi-sony-playstation</v-icon>
                  Psnow
                </a>

              
                <!-- <a v-if="displayed_game.gamepass != 0" class="look_on_ig deus_result_price gmp m-0 p-0 pl-2 pr-2"> GamePass </a>                                    
                <a v-if="displayed_game.psnow != 0" class="look_on_ig deus_result_price gmp psn m-0 p-0 pl-2 pr-2"> PSNow </a>  -->
              <!--  <a v-if="game_full_info" :href="store.store.url" v-for="store in game_full_info.stores" class="btn mb-1 btn-sm g_link btn-dark" target="_blank"> {{ store.store.name }} </a> -->
              </div>
              <!-- <span class="price_notice" v-if="displayed_game.deal_url"> * {{ $t('message.deus_results_modal_price_notice') }}  </span>
                -->

              <!-- <h3 > Informations </h3>
                <p class="text-right">
                  Sortie le {{ released_date }}
                </p> -->
              <h3 v-if="loaded"> {{ $t('message.general_discover') }} {{ displayed_game.game_name }}  </h3>
              <ul v-if="loaded" class="text-right genre_list"> 
                <a :title="$t('message.look_on')+ ' Twitch : '+displayed_game.game_name" class="game_know_more_link" target="_blank" :href="'https://www.twitch.tv/directory/game/'+displayed_game.game_name"> 
                  <v-icon>mdi-twitch</v-icon> Twitch
                </a>
                <a :title="$t('message.look_on')+ ' Youtube : '+displayed_game.game_name" class="game_know_more_link" target="_blank" :href="'https://www.youtube.com/results?search_query='+displayed_game.game_name"> 
                  <v-icon>mdi-youtube</v-icon> Youtube
                </a>
                <a :title="$t('message.look_on')+ ' Wikipedia : '+displayed_game.game_name" class="game_know_more_link" target="_blank" :href="'https://fr.wikipedia.org/wiki/'+displayed_game.slug | slugReplace(displayed_game.slug)"> 
                  <v-icon>mdi-magnify</v-icon> Wikipedia 
                </a>
                
                <a :title="$t('message.look_on')+ ' Reddit : '+displayed_game.game_name" class="game_know_more_link" target="_blank" v-if="displayed_game.reddit_url" :href="displayed_game.reddit_url"> 
                  <v-icon>mdi-reddit</v-icon> Reddit
                </a> 
                <a  v-if="displayed_game.metacritic && displayed_game.metacritic_url && displayed_game.metacritic.length != 1" :title="$t('message.look_on')+ ' Metacritic : '+displayed_game.game_name" target="_blank" class="game_know_more_link" :href="displayed_game.metacritic_url"> 
                  <div class="metacritic_icon"><div></div></div>
                  Metacritic ( {{ displayed_game.metacritic }} )
                </a>
                
                <a  v-if="displayed_game.metacritic && displayed_game.metacritic_url && displayed_game.metacritic.length == 1" :title="$t('message.look_on')+ ' Metacritic : '+displayed_game.game_name" target="_blank" class="game_know_more_link" :href="displayed_game.metacritic_url"> 
                  <div class="metacritic_icon"><div></div></div>
                  Metacritic
                </a>
                <a :title="$t('message.look_on')+ ' Metacritic : '+displayed_game.game_name" target="_blank" class="game_know_more_link" v-if="displayed_game.metacritic_url && !displayed_game.metacritic" :href="displayed_game.metacritic_url"> 
                  <div class="metacritic_icon"><div></div></div>
                  Metacritic
                </a>




                <a class="game_know_more_link" target="_blank" v-if="displayed_game.website" :href="displayed_game.website"> 
                  <v-icon>mdi-web</v-icon> 
                  {{ $t('message.general_website')}}
                </a>
              </ul>   
              <h3 v-if="displayed_game.platforms && displayed_game.platforms[0]"> {{$t('message.deus_results_modal_title_platform')}} </h3>
              <ul class="text-right genre_list"> 
                <router-link  v-for="platform in displayed_game.platforms" :key="platform.id" :title="$t('message.general_more_games')+' '+platform.name" class="ml-1 game_know_more_link"  :to="{ name: 'single_platform', params: { platformname: platform.slug , platformid: platform.id_dDblKey }}">
                  <v-icon>mdi-{{ platform.platform_icon }}</v-icon>
                  {{ platform.name }}                 
                </router-link>
              </ul>     
              <h3 v-if="displayed_game.publishers && displayed_game.publishers[0]">  {{ $t('message.deus_results_modal_title_publishers') }} </h3>
              <ul v-if="displayed_game.publishers && displayed_game.publishers[0]" class="text-right genre_list">
                <li v-for="publisher in displayed_game.publishers" :key="publisher.id">
                  {{ publisher.name }}
                </li>
              </ul>
              <h3 v-if="displayed_game.developers && displayed_game.developers[0]"> {{ $t('message.deus_results_modal_title_developers') }} </h3>
              <ul v-if="displayed_game.developers && displayed_game.developers[0]" class="text-right genre_list">
                <li v-for="developer in displayed_game.developers" :key="developer.id">
                  {{ developer.name }}
                </li>
              </ul>
            </v-col>
          </div>
          <h2 v-if="similar_loaded && displayed_game.tags  && displayed_game.tags[1] && similar_games[0]" class="mt-3 mb-1 pl-2"> {{ $t('message.similar_games') }} </h2>
          <div v-if="similar_loaded && displayed_game.tags  && displayed_game.tags[1]" class="col-lg-12 pt-3 game_displayed pb-3 similar_games future_results" id="thisyear">
            <div class="game-item deus_result deus_large" pagination="0" :key="id" v-for="(game,id) in similar_games" v-bind:style="{ backgroundImage: 'url(' + game.img_url + ')' }"> 
                <router-link  :title="$t('message.general_know_more')+' '+game.game_name"  :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_url"  >  
                    <div class="game_deus_bg"></div>
                </router-link>
              
                <router-link  :title="$t('message.general_know_more')+' '+game.game_name"  :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_link"  >  
                    <div class="game-content">
                        <div class="game-content-body">
                          <h3 class="title">{{ game.game_name }} </h3>
                        </div>
                    </div>
                </router-link>
                <span v-if="game.rating > 0" class="deus_see_more game_rating">
                  {{ game.rating }}
                  <font-awesome-icon  :icon="['fas', 'star']" />
                </span>   
            </div>
          </div>
          <loading v-else-if="displayed_game.tags[1] && displayed_game.tags " class="mt-5"></loading>
          <list-of-games pagination="0" class="pl-0 pr-0 col-lg-12" v-if="loaded && displayed_game.tags[1] && displayed_game.tags " v-bind:tag_id="displayed_game.tags[1].id_dDblKey" show_title="1" note_min="4" limit="6" nombre_vote="0" ></list-of-games>           
          <list-of-games pagination="0" class="pl-0 pr-0 col-lg-12" v-if="loaded && displayed_game.genres[0]" v-bind:genre_id="displayed_game.genres[0].id_dDblKey" show_title="1" note_min="4" limit="6" nombre_vote="0" ></list-of-games>
          <!-- <list-of-games class="pl-0 pr-0 col-lg-12" v-if="loaded && displayed_game.platforms[0]" v-bind:platform_id="displayed_game.platforms[0].id_dDblKey" show_title="1" note_min="4" limit="6" nombre_vote="0" ></list-of-games> -->

        </v-row>
      </div>
      <div class="presentation container" v-else>
        <loading class="mt-5"></loading>
      </div>
      
    </section>
  </div>
</template>

<script lang="js">
  import moment from 'moment';
  import CoolLightBox from 'vue-cool-lightbox'
  import Loading from '../components/loading';
  import HomeListOfGames from '../components/Home/HomeListOfGames';
  import HeadBanner from '../components/HeadBanner';
  import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
  export default  {
    name: 'SingleGame',
    props: ['game', 'used_lang_for_route', 'locale'],
    data () {
      return {
        displayed_game:'',
        released_date : '',
        game_full_info:[],
        index: null,
        loaded:false,
        similar_loaded:false,
        similar_games:null,
        screenshots:null,
        user_logged_in:0,
        used_locale : this.$props.locale
      }
    },
    components: {
      'head-banner' : HeadBanner,
      'loading' : Loading,      
      'list-of-games' : HomeListOfGames,
      CoolLightBox
    },
    
    async asyncData({ $axios, params}) {
      const game = await $axios.get('https://api.deussearch.fr/get_single_game.php?&gid='+params.gameid);
      const displayed_game = game.data[0];
      return {
       displayed_game
      }
    },
    filters: {
      slugReplace: function (st) {
        const result = st.replaceAll('-', '_');
        return result;
      }
    },
    head() {
      return {
        title: this.displayed_game.game_name+' - DeusSearch',
        meta: [
          { hid: 'description', name: 'description', content: 'Découvrez le jeu '+this.displayed_game.game_name+' sur DeusSearch.' },
          {
            hid: 'og:image',
            content: this.displayed_game.img_url,
            property: 'og:image'
          },
          {
            hid: 'og:type',
            content: 'website',
            property: 'og:type'
          },
          {
            hid: 'twitter:card',
            content: 'summary_large_image',
            property: 'twitter:card'
          },
          {
            hid: 'og:title',
            content: this.displayed_game.game_name,
            property: 'og:title'
          },
          {
            hid: 'twitter:title',
            content: this.displayed_game.game_name,
            property: 'twitter:title'
          },
          {
            hid: 'twitter:description',
            content: 'Découvrez le jeu '+this.displayed_game.game_name+' sur DeusSearch.',
            property: 'twitter:description'
          },
          {
            hid: 'twitter:image',
            content: this.displayed_game.img_url,
            property: 'twitter:image'
          },
          {
            hid: 'twitter:image:src',
            content: this.displayed_game.img_url,
            property: 'twitter:image:src'
          }
        ]
      }
    },
    created() {
      if(this.$cookies.get('deussearch_connected') == 1) { // si l'user est connecté 
        this.user_logged_in = 1;
      } 
      this.$http.$post("https://api.deussearch.fr/get_similar_games.php?gid="+this.displayed_game.id).then(result => {
        if(result) {
          this.similar_games = result;
          this.similar_loaded = true;
        }
      }, error => {
      });
    },
    mounted() {
      $(window).scrollTop(0);
      var comp = this;
        
      if(comp.displayed_game.screenshots) {
        comp.screenshots = comp.displayed_game.screenshots.split(',');
      }
      this.loaded = true;
    }
  }


</script>

<style>


.single_game_share {
  position: inherit;
  margin-top: 24px;
  text-align: center;
}

.price_notice {
  font-size: 0.8em;
}

.modal-title {
  font-size: 1.4em;
}


.modal-content {    
  background: rgba(62, 62, 111, 0.98) !important;
}

.modal-content h2 {
  font-size: 1.2em;
  color: white;
}

.modal_note {
  background: green;
  padding: 0px 5px;
  border-radius: 2px;
  float: left;
  margin-right: 10px;
  margin-top: 4px;
  margin-top: 10px;
  font-size: 0.8em;
}

.modal_note span {
  font-size: 1.1em;
  font-family: 'oswald', sans-serif;
}

.modal-content .modal-body,
.modal-content .modal-body p {
  font-size: 16px;
  color: white;
}

.g_link {
  font-family: 'oswald', sans-serif;
  margin-right: 5px;
}

#game_modal video,
#game_modal iframe {
  max-width: 350px;
  max-height: 195px;
  margin-right: 10px;
}


.modal {
  z-index: 99999 !important;
}
.c-pointer {
    cursor:pointer;
}
.cool-lightbox {
    position:fixed !important;
}

.modal .tag_list {
  font-size: 12px;
}

.modal-content .modal-title::after{
  display: none !important;
}

.modal-content .modal-title {
  margin-bottom: 0 !important;
}


.game_banner {
  position: relative;
  top:0;
  padding-bottom: 25px;
  text-align: center;
  padding-top: 38vh;
  background-position: 50% 70%;
  left: 0;
  width: 100%;
  background-attachment: fixed;
  background-size: cover;
}

@media (max-width: 991px) {
  .game_banner {
    padding-top: 11vh;
    margin-top: 60px;
  }
  .game_banner h1 {
    font-size: 3.8em;
  }
}
@media (max-width: 550px) {
  .game_banner {
    padding-top: 7vh;
    margin-top: 60px;
  }
}

.game_banner::before {
    content: '';
    background: rgba(23, 23, 68, 0.75);
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 1;
}

.game_banner div {
  z-index: 2;
  position: relative;
}

.game_banner .modal_note {
  float: none;
  margin-right: 0;
}

.right_info_game ul,
.right_info_game h2 {
  text-align: right;
}


.right_info_game h3 {
  margin-top: 2em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 12px;
  margin-bottom: 10px;
  font-size: 20px;
}

.single_game_descr {
  color: white;
  padding: 15px;
}

.single_game_descr a, .tiptap-vuetify-editor__content a {
  color: #ffff76;
}
.single_game_descr,
.single_game_descr p {
    font-size: 13px;
    color: var(--para-color);
}


.single_game_descr p {
  margin-bottom: 10px;
}

.single_game_descr h3 {
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 8px;
}

.main_col_single_game {
  background: #131337;
  padding: 20px;
} 

.single_game .tag_list li {
  font-size: .6em;
}

.similar_games {
  max-height: none;
}

.look_on_ig {
    background: rgba(225, 225, 120, 0.78);
    padding: 3px 10px;
    color: white !important;
    font-weight: 400;
    font-size: 0.9em;
    border:none !important;
    border-radius: 2px;
/*    box-shadow: 0px 0px 5px #b4b46c; */
}

.look_on_ig i {
  color: white !important;
  font-size: 20px !important;
}

.look_on_ig.gmp {
    height: 27px !important;
    padding: 0 !important;
    width: 79px;
    position: initial;
    opacity: 1;
    margin-right: 5px !important;
}

.look_on_ig.gmp.psn {
    height: 30px !important;
    position: initial;
    padding-top: 0px !important;
}

.game_know_more_link {
  background: #0f0f2e;
  padding: 0;
  font-family : "Oswald", sans-serif;
  margin-bottom: 5px;
  padding-right: 10px;
  color: white !important;
  font-size: 0.8em;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}
.game_know_more_link i,
.metacritic_icon {
  color: white !important;
  padding: 5px 10px;
  background: #070716;
  margin-right: 5px;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}


.game_know_more_link:hover {
  background: #070716;
}
.game_know_more_link:hover i,
.game_know_more_link:hover .metacritic_icon {
  background: #0f0f2e;
}

.game_know_more_link.deal {
  border-radius: 4px;
}
.game_know_more_link.deal * {
  background: rgba(23, 145, 19, 0.4) !important;
}

.game_know_more_link.deal i {
  border-radius: 4px;
  color: rgb(23, 145, 19) !important;
}

.metacritic_icon {
  padding: 7px 10px;
  vertical-align: middle;
  display: inline-block;
}

.metacritic_icon div {
  background:url('../static/metacritic_icon.png');
  height: 20px;
  width: 20px;
  background-size: cover;
}


.tag_link {
  display: inline-block !important;
}

.genre_tag_link {
  cursor: pointer !important;
  background: rgba(7, 7, 22, 0.7) !important;
  color: rgba(255, 255, 255, 0.63) !important;
}

.genre_tag_link:hover {
  background: rgba(7, 7, 22, 1) !important;
  color: white;

}

.updated_genre_chip>span {
    transform: scale(0.8);
    font-family: 'Oswald', sans-serif;
}

.new_tag {
  transform:scale(0.9);
}

.btn_edit_game {
  transform: scale(0.8);
  font-family: 'Oswald', sans-serif;    
  font-weight: bold;
  opacity: .5;
  display: block !important;
  margin-left: auto;
  font-weight: lighter;
  margin-right: auto;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}

.btn_edit_game:hover {
  opacity: 1;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}

.game_name {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.game_descr_tab .theme--light.v-tabs-items,
.game_descr_tab .theme--light.v-card {
  background-color: transparent;
}

.game_descr_tab .v-tab {
  color:#ffff76 !important;
  font-size: 0.7em;
}

.game_descr_tab .v-tab--active {
  background: #171744;
}

.game_descr_tab .v-tabs-slider {
  background-color:#ffff76 ;
}

.game_descr_tab .v-tabs-bar {
  background: #0f0f2e !important;
}

.game_descr_tab li p {
  margin: 0;
} 
.game_descr_tab li {
  font-size: 0.8em;
  margin-left: 10px;
}

.game_descr_tab h2 {
    margin-top: 1em;
}

.single_game_descr  {
    background: #070716;
}

.img_screen:hover .img {
  -webkit-box-shadow:0px 0px 15px 5px rgba(159,162,9,0.1); 
box-shadow: 0px 0px 15px 5px rgba(159,162,9,0.1);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.showimages {
  position: absolute !important;
  left: 0;
  top: -56px;
  border: 2px solid #545480;
  border-bottom-color: rgb(84, 84, 128);
  border-bottom-style: solid;
  border-bottom-width: 2px;
  padding: 15px;
  color: white !important;
  z-index: 5 !important;
  background: #0d0d28;
  border-bottom: 0;
  cursor: pointer;
}

</style>
