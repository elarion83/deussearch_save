<template>
  <div class="game_edit">
    <div class="game_banner" v-bind:style="{ 'background-image': 'url(' + displayed_game.img_url + ')' }"> 
      <div>
        <h1 class="mb-4">
          {{ $t('message.adding_of' )}}</h1>
      </span>  
      </div>
    </div>
    <section class="contact-section bg single_game single_game_edit profil">
        <div class=" presentation container">
          <v-row>
            <div class="col-lg-8 main_col_single_game">
                <h2 class="mt-4 mb-3"> Informations </h2>

                <label> {{ $t('message.game_title') }} <span class="mandatory">*</span> </label>
                <v-text-field
                  v-model="displayed_game.game_name"
                  class="title_field"
                  required  
                  filled
                ></v-text-field>

                <v-row class="mt-2">
                  <v-col class=" col-sm-12  col-md-2 col-lg-2">
                    <label> ID Steam </label>
                    <v-text-field
                      v-model="displayed_game.steamappid"
                      class="title_field"
                      required  
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col class=" col-sm-12 col-md-3  col-lg-3">
                    <label> {{ $t('message.metacritic_rating') }} </label>
                    <v-text-field
                      v-model="displayed_game.metacritic"
                      class="col-lg-12 field_custom_width title_field"
                      :placeholder="$t('message.metacritic_rating')"
                      required  
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col class="col-md-7 col-lg-7">
                    <label> {{ $t('message.metacritic_url') }} </label>
                    <v-text-field
                      v-model="displayed_game.metacritic_url"
                      class="col-lg-12 field_custom_width title_field"
                      :placeholder="$t('message.metacritic_url')"
                      required  
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class=" col-lg-6">
                    <label> URL Reddit </label>
                    <v-text-field
                      v-model="displayed_game.reddit_url"
                      class="col-lg-12 field_custom_width title_field"
                      placeholder="https://www.reddit.com/r/subreditofthegame/"
                      required  
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col class="col-lg-6">
                    <label style="display:block;">{{ $t('message.general_website') }} </label>
                    <v-text-field
                      v-model="displayed_game.website"
                      class="col-lg-12 field_custom_width title_field"
                      placeholder="https://example.com"
                      required  
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                
                <!-- <h2 class="mt-2 mb-1"> {{ $t('message.general_description_of')}} {{ displayed_game.game_name }}</h2> -->
                <label class="mt-2"> Description </label>
                <v-tabs class="game_descr_tab mt-2">
                  <v-tab href="#french">
                    Français
                  </v-tab>
                  <v-tab-item  value="french">
                    <tiptap-vuetify
                      class="description_body_editor mt-0"
                      v-model="displayed_game.description_fr"
                      :extensions="extensions"
                      :toolbar-attributes="{ color: 'yellow' }"
                    >
                    </tiptap-vuetify>
                  </v-tab-item>

                  <v-tab  href="#english">
                    English
                  </v-tab>
                  <v-tab-item  value="english">
                    <tiptap-vuetify
                      class="description_body_editor mt-0"
                      v-model="displayed_game.description_en"
                      :extensions="extensions"
                      :toolbar-attributes="{ color: 'yellow' }"
                    >
                    </tiptap-vuetify>
                  </v-tab-item>
                </v-tabs>

                <h2 class="mt-4 mb-3"> Medias </h2>
                <v-row>
                  <label class="col-lg-12 m-0 pb-0"> {{$t('message.top_image')}}</label>
                  <edit-featured-image class="mb-1" @updateImage="updateFeaturedImage" limit="1" :medias="displayed_game.img_url"></edit-featured-image>

                  <label class="col-lg-12 m-0 pb-0"> Images (12 max)</label>
                  <media-gallery limit="12" :medias="displayed_game.screenshots"></media-gallery>
                </v-row>

                <h2 class="mb-1 mt-4"> Tags </h2>
                <v-combobox
                  v-model="displayed_game.tags"
                  :items="tags_list"
                  :search-input.sync="search_tags"
                  item-text="tag_name"
                  class="mt-3 left_col_combo"
                  multiple
                  solo
                >

                  <template v-slot:selection="{ attrs, item, select, selected }">
                        <div class="ml-1 game_know_more_link"
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="remove(item)">
                          <v-icon>mdi-tag</v-icon>
                          {{ item.tag_name }}                 
                        </div>
                  </template> 
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ $t('message.no_result_for') }} "<strong>{{ search_tags }}</strong>".
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox> 
            </div>
            <div class="col-lg-4 text-right right_info_game">
              <v-col>
              <h3> Genres </h3>
              <ul class="genre_list mt-3">
                  <v-combobox
                      v-model="displayed_game.genres"
                      :items="genres_list"
                      item-text="name_genre"
                      :search-input.sync="search_genres"
                      class="p-0 left_col_combo"
                      multiple
                      solo
                  >
     
                    <template v-slot:selection="{ attrs, item, select, selected }">
                          <div class="ml-1 game_know_more_link"
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            @click="select"
                            @click:close="remove(item)">
                            <v-icon>mdi-folder</v-icon>
                            {{ item.name_genre }}                               
                          </div>
                    </template>
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ $t('message.no_result_for') }}  "<strong>{{ search_genres }}</strong>".
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox> 
                </ul>

                <h3> {{$t('message.deus_results_modal_title_platform')}} </h3>
                <v-combobox
                    v-model="displayed_game.platforms"
                    :items="platforms_list"
                    class="p-0 left_col_combo"
                    multiple
                    :search-input.sync="search_platform"
                    item-text="name"
                    solo
                >               

                  <template v-slot:selection="{ attrs, item, select, selected }">
                        <div class="ml-1 game_know_more_link"
                        v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="remove(item)">
                          <v-icon>mdi-{{ item.platform_icon }}</v-icon>
                          {{ item.name }}                 
                        </div>
                  </template>
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ $t('message.no_result_for') }}  "<strong>{{ search_platform }}</strong>".
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox> 



                <h3>  {{ $t('message.deus_results_modal_title_publishers') }} </h3>
                <v-row>
                  <v-col cols="10" class="pr-0">
                    <v-combobox
                        v-model="displayed_game.publishers"
                        :items="publishers_list"
                        chips
                        class="p-0 left_col_combo"
                        :search-input.sync="search_pub"
                        multiple
                        item-text="name"
                        solo
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
                              {{ item.name }}
                          </li>
                      </template>
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ $t('message.no_result_for') }}  "<strong>{{ search_pub }}</strong>".
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="2" class="pl-0" :title="$t('message.add_publisher_button')">
                    <v-icon class="btn_add_content" v-on:click="open_dialog_create_dev_or_pub('pub')">
                      mdi-plus
                    </v-icon>
                  </v-col>
                </v-row>

                <h3> {{ $t('message.deus_results_modal_title_developers') }} </h3>
                <v-row>
                  <v-col cols="10" class="pr-0">
                  <v-combobox
                        v-model="displayed_game.developers"
                        :items="developers_list"
                        chips
                        class="p-0 left_col_combo"
                        multiple
                        :search-input.sync="search_dev"
                        solo
                        item-text="name"
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
                              {{ item.name }}
                          </li>
                      </template>
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ $t('message.no_result_for') }}  "<strong>{{ search_dev }}</strong>".
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="2" class="pl-0" :title="$t('message.add_publisher_button')">
                    <v-icon class="btn_add_content" v-on:click="open_dialog_create_dev_or_pub('dev')">
                      mdi-plus
                    </v-icon>
                  </v-col>
                </v-row>
              </v-col>
            </div>
            </v-row>
        </div>
        <v-row class="mt-4 submit_center_row text-center d-flex justify-center">
        <v-btn
          v-if="loaded"
          class="mt-4 mb-4"
          type="submit"
          v-on:click="CheckForUpdatedOrSavedGame()"
        >
        <v-icon
          right
          dark
          class="mr-3 ml-1"
        >
          mdi-content-save
        </v-icon>
          {{ $t('message.general_save' )}}
        </v-btn>
      </v-row>
    </section>    

    <v-dialog v-model="updated_dialog" v-if="updated_is_fully_complete" max-width="500">
       <v-card class="edit_profile_modal edit_game">
          <v-card-title class="headline">
            {{ $t('message.adding_of_dialog' )}} {{ displayed_game.game_name }}
          </v-card-title>
          <v-card-text>
            <v-icon class="succes_icon">
              mdi-check
            </v-icon>
            <p v-html="$t('message.adding_game_message_success')"></p>
          </v-card-text>
       </v-card>
    </v-dialog>

    <v-dialog v-else v-model="updated_dialog" max-width="500"> 
          <v-card-title class="headline">
            {{ $t('message.adding_of_dialog' )}} {{ displayed_game.game_name }}
          </v-card-title>
          <v-card-text>
            <v-icon class="error_icon">
              mdi-alert-circle
            </v-icon>
            <p v-html="$t('message.edit_game_message_error')">   </p>
          </v-card-text>
       </v-card>
    </v-dialog>

    <v-dialog v-model="create_dev_or_pub_dialog" max-width="500">
      <v-card class="edit_profile_modal edit_game">
        <v-card-title class="headline" v-if="create_dev_or_pub_dialog_type == 'dev'">
            {{ $t('message.add_developper_button')}} 
        </v-card-title>
        <v-card-title class="headline" v-else>
            {{ $t('message.add_publisher_button')}} 
        </v-card-title>
        <v-card-text class="mb-0 pb-0"> 
          <v-text-field class="add_pub_or_dev_dialog_input" placeholder="Dear Villagers, Unexpected, .." v-model.lazy="create_dev_or_pub_dialog_value"></v-text-field>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-col class="text-right">
            <v-btn
            class="mb-2 mt-0"
            type="submit"
            v-if="create_dev_or_pub_dialog_value != null"
            v-on:click="InsertNewContentInBDD()"
            >
            <v-icon
              right
              dark
              class="mr-3 ml-1"
            >
              mdi-content-save
            </v-icon>
              {{ $t('message.general_add' )}}
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="js">
  import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify';
  import moment from 'moment';
  import FeaturedImage from '../components/edit-or-add-game/featured-image';
  import MediaGallery from '../components/edit-or-add-game/medias-gallery';
  import Loading from '../components/loading';
  import HeadBanner from '../components/HeadBanner';
  export default  {
    name: 'SingleGame',
    props: ['game', 'used_lang_for_route', 'locale'],
    data () {
      return {
        extensions: [
          History,
          Blockquote,
          Link,
          Underline,
          ListItem,
          BulletList,
          OrderedList,
          [Heading, {
            options: {
              levels: [2, 3]
            }
          }],
          Bold,
          HorizontalRule,
          Paragraph,
          HardBreak
        ],

        displayed_game:{
          released:'4564544',
          clip_url:'',
          new_game:'1',
          img_url:'https://img.deussearch.fr/static/game_no_image.jpg',
          tags:'',
          platforms:'',
          deal_price:''
        },
        search:'',
        search_platform:'',
        search_genres:'',
        search_tags:'',
        search_dev:'',
        search_pub:'',
        index: null,
        loaded:false,
        screenshots:[],
        currentused_id:'',
        genres_list: [],
        publishers_list : [],
        platforms_list: [],
        developers_list : [],
        tags_list: [],
        used_locale : this.$props.locale,
        updated_is_fully_complete:false,
        updated_dialog:false,
        create_dev_or_pub_dialog:false,
        create_dev_or_pub_dialog_type:null,
        create_dev_or_pub_dialog_value:'',
      }
    },
    
    components: {
      'head-banner' : HeadBanner,
      'loading' : Loading,      
      TiptapVuetify ,
      'edit-featured-image':FeaturedImage,
      MediaGallery
    },
    methods: {
      updateFeaturedImage(newFeaturedImage) {
        this.displayed_game.img_url = newFeaturedImage;
      },
      CheckForUpdatedOrSavedGame() {
        this.updated_dialog = true;
        if(this.displayed_game.game_name && this.displayed_game.tags.length > 0 && this.displayed_game.genres.length > 0 && this.displayed_game.platforms.length > 0) {
          this.updated_is_fully_complete = true;
          var temp_screenshots_string='';

          if(this.screenshots) {
            for (var i = 0; i < this.screenshots.length; i++) {
              temp_screenshots_string = temp_screenshots_string+','+this.screenshots[i];
            }
            this.displayed_game.user_id = this.currentuser_id;
            this.displayed_game.screenshots = temp_screenshots_string;
            
          }
          this.$axios.$post('https://api.deussearch.fr/front_create_new_contribution.php', {
              game: this.displayed_game,
          });
        } else {
          this.updated_is_fully_complete = false;
        }
      },
      open_dialog_create_dev_or_pub(type) {
        this.create_dev_or_pub_dialog = true;
        this.create_dev_or_pub_dialog_type = type;
        this.create_dev_or_pub_dialog_value = '';
      },

      InsertNewContentInBDD() {
        var comp= this;
        this.$axios.$post('https://api.deussearch.fr/create_new_simple_content.php', {
            type: this.create_dev_or_pub_dialog_type,
            data: this.create_dev_or_pub_dialog_value,
        }).then(response =>{
          if(this.create_dev_or_pub_dialog_type == 'pub') {
            if(!comp.displayed_game.publishers) { 
              comp.displayed_game.publishers = [];
            }
            comp.displayed_game.publishers.push(response[0]);
            comp.publishers_list.push(response[0]);
          }

          if(this.create_dev_or_pub_dialog_type == 'dev') {
            if(!comp.displayed_game.developers) { 
              comp.displayed_game.developers = [];
            } 
            comp.displayed_game.developers.push(response[0]);
            comp.developers_list.push(response[0]);
          }

          // reset the modal and the values
          comp.create_dev_or_pub_dialog = false;
          comp.create_dev_or_pub_dialog_value = '';
          comp.create_dev_or_pub_dialog_type = '';
        }).catch(err =>{
          console.log(err);
        })
      }
    },
    mounted() {
      this.loaded = true;
      this.displayed_game.new_game = 1;
    },
    created() {
        if(this.$cookies.get('deussearch_connected') == 1) { // si l'user est connecté 
        var currentuser = JSON.parse(this.$cookies.get('deussearch_user'));
        this.currentuser_id = currentuser.id;
        } else {
          // Sinon je le redirige vers l'accueil
          this.$router.push('/');
        }


        this.$http.$get("https://api.deussearch.fr/get_all_genres.php").then(genres_list => {
            this.genres_list = genres_list;
        });
        
        this.$http.$get("https://api.deussearch.fr/get_platforms.php").then(platforms_list => {
            this.platforms_list = platforms_list;
        });
        
        this.$http.$get("https://api.deussearch.fr/get_developers.php").then(developers_list => {
            this.developers_list = developers_list;
        });

        this.$http.$get("https://api.deussearch.fr/get_publishers.php").then(publishers_list => {
            this.publishers_list = publishers_list;
        });
        
        this.$http.$get("https://api.deussearch.fr/get_all_tags.php").then(tags_list => {
            this.tags_list = tags_list;
        });
    },
    head() {
      return {
        title: 'Ajouter un jeu - DeusSearch',
        meta: [
          { hid: 'description', name: 'description', content: 'Ajoutez un jeu sur DeusSearch.' },
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
            property: 'twitter:description'
          },
          {
            hid: 'twitter:image',
            content: this.displayed_game.background_image,
            property: 'twitter:image'
          }
        ]
      }
    },
  }


</script>

<style>

.single_game_edit .right_info_game input, .single_game_edit .left_col_combo input {
  border:none !important;
}

.btn_add_content {
  font-size: 1.5em !important;
  color: white !important;
  padding: 7px;
  opacity: 0.3;
  margin-top: 3px;
  background-color: #0a0a20;
  border: 1px solid white;
  border-radius: 50%;
  cursor: pointer;
}

.btn_add_content:hover {
  opacity: 1;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}

.add_pub_or_dev_dialog_input input::placeholder {
  color: rgb(255, 255, 255) !important;
}
.add_pub_or_dev_dialog_input input {
  padding-left: 5px !important;
  border: none;
}
</style> 