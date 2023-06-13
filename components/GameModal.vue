<template>
  <div>
    <div class="background_game_modal" v-on:click="closeModal">
    </div>
      <div class="modal vuemodal" id="game_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content" v-if="loaded">
                <div class="modal-header">
                    <span v-if="game_full_info.rating > 1" class="modal_note mt-1"> 
                      <span id="note">{{ game_full_info.rating }} </span>
                      <font-awesome-icon  :icon="['fas', 'star']" />
                    </span>
                    <h2 class="modal-title" id="exampleModalLabel">{{ game.game_name }}</h2>
                    <font-awesome-icon v-on:click="closeModal" class="close c-pointer" :icon="['fa', 'times-circle']"   />
                </div>
                <div class="modal-body" v-bind:style="{ backgroundImage: 'url(' + game.img_url + ')' }">
                    <v-row class="mb-6" no-gutters>
                      <v-col sm="12" md="6">
                        <h3 class="mb-2 mt-2"> {{$t('message.deus_results_modal_title_platform')}} </h3>
                        <ul class="genre_list">
                          <li v-for="platform in game_full_info.platforms" :key="platform.platform.id">
                            {{ platform.platform.name }}
                          </li>
                        </ul>
                        <h3 class="mb-2 mt-2"> Genres </h3>
                        <ul class="genre_list">
                          <li v-for="genre in game_full_info.genres" :key="genre.id">
                            {{ genre.name }}
                          </li>
                        </ul>
                      </v-col>
                      <v-col sm="12" class="text-right" md="6">
                        <h3 v-if="game_full_info.publishers" class="mb-2 mt-2">  {{ $t('message.deus_results_modal_title_publishers') }} </h3>
                        <ul v-if="game_full_info.publishers" class="genre_list">
                          <li v-for="publisher in game_full_info.publishers" :key="publisher.id">
                            {{ publisher.name }}
                          </li>
                        </ul>
                        <h3 v-if="game_full_info.developers" class="mb-2 mt-2"> {{ $t('message.deus_results_modal_title_developers') }} </h3>
                        <ul v-if="game_full_info.developers" class="genre_list">
                          <li v-for="developer in game_full_info.developers" :key="developer.id">
                            {{ developer.name }}
                          </li>
                        </ul>
                      </v-col>
                    </v-row>
                    <div v-if="game_full_info" id="game_description_modal" v-bind:class="{ active: description_big } " v-html="game_full_info.description" class="description mt-5">
                    </div>
                    <p id="modal_descr" v-on:click="changeDescriptionClass" class="pb-0 mb-3" title="Cliquez pour plus de description"> 
                      <font-awesome-icon v-if="!description_big" :icon="['fas', 'plus']" />
                      <font-awesome-icon v-if="description_big" :icon="['fas', 'minus']" />
                      description 
                    </p>
                    <h3 class="mb-2"  v-if="game.deal_url"> {{ $t('message.deus_results_modal_available_title') }} </h3>
                    <div id="game_stores"  v-if="game.deal_url">
                      <a :href="game.deal_url" class="golden btn mb-1 btn-sm g_link btn-dark" target="_blank"> ≈ {{ game.deal_price }}  €</a>
                    <!--  <a v-if="game_full_info" :href="store.store.url" v-for="store in game_full_info.stores" class="btn mb-1 btn-sm g_link btn-dark" target="_blank"> {{ store.store.name }} </a> -->
                    </div>
                    <span class="price_notice" v-if="game.deal_ur"> * {{ $t('message.deus_results_modal_price_notice') }}  </span>
                    <h3 v-if="game.clip_url != ' ' && game.clip_url" class='mt-4 mb-2 video_title'> {{ $t('message.deus_results_modal_videos_title') }}  </h3>
                    <div id="video">
                      <video v-if="game.clip_url != ' '&&  game.clip_url" class="deus_video" id="video_player" controls="" autoplay="autoplay" loop="" muted="" width="250">
                        <source :src="game.clip_url" type="video/mp4">
                        Sorry, your browser doesn't support embedded videos.
                      </video>
                    </div>
                    <h3 v-if="game.screenshots" class='mt-4 mb-2 video_title'> Image(s) </h3>
                    <CoolLightBox :items="screenshots" :index="index" @close="index = null">
                    </CoolLightBox>
                    <v-row v-if="game.screenshots">
                        <v-col
                        cols="1"
                        v-for="(image, imageIndex) in screenshots"
                        :key="imageIndex"
                        @click="index = imageIndex"
                        class="pr-0 img_screen"
                        > 
                          <v-img
                              :src="image"
                              :lazy-src="image"
                              aspect-ratio="1"
                              class="pr-0 c-pointer"
                          >
                          </v-img>
                        </v-col>
                    </v-row>
                    <v-row class="mb-6 tags_row" no-gutters>
                      <v-col sm="12" md="12">
                        <h3 class="mb-2 mt-2"> Tags </h3>
                        <ul class="genre_list tag_list">
                          <li v-for="tag in game_full_info.tags" :key="tag.id">
                            {{ tag.name }}
                          </li>
                        </ul>
                      </v-col>
                    </v-row>
                </div>
            </div>
            <div class="modal-content" v-else>
              </div>
        </div>
      </div>
  </div>
</template>

<script lang="js">
  import CoolLightBox from 'vue-cool-lightbox'
  import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
  export default  {
    name: 'game-modal',
    props: ['game'],
    data () {
      return {
        displayed_game:this.$props.game,
        description_big:false,
        game_full_info:[],
        locale:this.$i18n.locale,
        index: null,
        loaded:false,
        screenshots:null,
      }
    },
    methods: {
      closeModal() { 
        this.$emit("changeModalStatus") ;
      },
      changeDescriptionClass() {
        if(this.description_big == false) {
          this.description_big = true;
        } 
        else {
          this.description_big = false;
        } 
      }
    },
    mounted() {
      var comp = this;
      this.$axios.$post('https://api.deussearch.fr/dDblKey_get_game_info.php', 
      {'game_id' : this.displayed_game.id_dDblKey},  
      {
          headers: {
              'Content-Type': '*'
          }
      })
      .then(function (response) {
        comp.game_full_info = response;
        const options = {
          method: 'POST',
          url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
          headers: {
            'content-type': 'application/json',
            "x-rapidapi-key": "4d829797f8msh43a17d4bae9eaecp1bc4edjsn3331d3d707d0",
            'x-rapidapi-host': 'deep-translate1.p.rapidapi.com'
          },
          data: {q: comp.game_full_info.description, source: 'en', target: comp.locale}
        };

          comp.$axios.$request(options).then(function (translatedText) {
          comp.game_full_info.description = translatedText.data.translations.translatedText;
        }).catch(function (error) {
          console.error(error);
        });
      })
      .catch(function (error) {
          console.log(error);
      });      
      this.loaded = true;
      if(this.$props.game.screenshots) {
        this.screenshots = this.$props.game.screenshots.split(',');
      }
    },
    components: {
      CoolLightBox,
    }
  }


</script>

<style>
  #game_modal {
    text-align: left;
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

.modal-content h3 {
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

.modal-content .description {
  height: 100px;
  max-height: 100px;
  overflow: hidden;
  background: rgba(81, 82, 87, 0.42);
  padding: 10px 15px;
  transition: all 0.3s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  border-bottom: 2px solid #474748;
}
.modal-content .description.active {
  max-height: 2000px;
  height: auto;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
}

#game_modal #modal_descr {
  margin-top: 0;
  cursor: pointer;
  background: #474748;
  padding: 0px 10px;
  font-family: 'oswald', sans-serif;
  font-size: 0.8em;
  display: inline-block;
  border-top: 2px solid #474748;
}

.modal-header {
  border-bottom: none !important;
}
.modal-footer,
.modal-header {
  border-color: #181837 !important;
}
#game_modal .modal-body {
  background-size:100%;
  background-repeat:no-repeat;
}
#game_modal .modal-body:before {
  content:'';
  width: 100%;
  height: 100%;
  background: rgb(21,21,48);
  background: linear-gradient(0deg, rgb(21, 21, 48) 25%, rgba(11,11,33,0.65) 100%);
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
} 

#game_modal .modal-body>* {
  z-index: 2;
  position: relative;
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

#game_modal .close {
  position: absolute;
  font-size: 2em;
  top: 30px;
  right: 30px;
  padding: 0;
  color: white;
}

.modal-header {
  display: block !important;
}

.background_game_modal {
  background: #00000087;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
