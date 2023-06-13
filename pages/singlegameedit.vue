<template>
  <div class="game_edit">
    <div class="game_banner" v-bind:style="{ 'background-image': 'url(' + displayed_game.img_url + ')' }"> 
      <div>
        <h1 class="mb-4">
          {{ $t('message.editing_of' )}} {{ displayed_game.game_name }}</h1>
        <span v-if="displayed_game.rating > 1" class="modal_note mt-1"> 
        </span>
      </span>  
      </div>
    </div>
    <section class="contact-section bg single_game single_game_edit profil">
        <div class=" presentation container" v-if="loaded">
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
                      class="col-lg-12 title_field"
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
              <h3> Infos </h3>
              <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                class="datepicker_field"
                  v-model="displayed_game.released_date_picker"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
              class="datepicker_field_picker"
                v-model="displayed_game.released_date_picker"
                @input="menu2 = false"
              ></v-date-picker>

            </v-menu>
              <v-text-field
                v-if="displayed_user.is_admin != 0"
                v-model="displayed_game.rating"
                class="col-lg-12 title_field"
                :placeholder="$t('message.metacritic_rating')"
                required  
                filled
              ></v-text-field>
              <h3> Genres</h3>
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
                            {{ $t('message.no_result_for') }}  "<strong>{{ search }}</strong>".
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
                              {{ $t('message.no_result_for') }}  "<strong>{{ search }}</strong>".
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
        <div class="presentation container" v-else>
          <loading class="mt-5"></loading>
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
    <v-dialog persistent v-model="updated_dialog" v-if="updated_is_fully_complete" max-width="500">
       <v-card class="edit_profile_modal edit_game">
          <v-card-title class="headline">
            {{ $t('message.editing_of' )}} {{ displayed_game.game_name }}
          </v-card-title>
          <v-card-text>
            <v-icon class="succes_icon">
              mdi-check
            </v-icon>
            <p v-html="$t('message.edit_game_message_success')"></p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :title="$t('message.general_know_more')+' '+displayed_game.game_name" :to="{ name: 'single_game', params: { gamename: displayed_game.slug , gameid: displayed_game.id }}" class="game_link mb-4">
              <v-btn text class="back_to_game_link">
                <v-icon class="mr-2">
                  mdi-arrow-left-thin-circle-outline
                </v-icon>
              {{ $t('message.back_to_game') }}
              </v-btn>
            </router-link>
            <v-spacer></v-spacer>
          </v-card-actions>
       </v-card>
    </v-dialog>
    <v-dialog v-else v-model="updated_dialog" max-width="500"> 
      <v-card class="edit_profile_modal edit_game">
          <v-card-title class="headline">
            {{ $t('message.editing_of' )}} {{ displayed_game.game_name }}
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
            v-if="create_dev_or_pub_dialog_value != ''"
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
        displayed_user:'',
        displayed_game:'',
        search:'',
        search_platform:'',
        search_genres:'',
        search_tags:'',
        search_dev:'',
        search_pub:'',
        index: null,
        loaded:false,
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
      'media-gallery':MediaGallery,    
      'edit-featured-image':FeaturedImage,
      TiptapVuetify 
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
          for (var i = 0; i < this.displayed_game.screenshots.length; i++) {
            temp_screenshots_string = temp_screenshots_string+','+this.displayed_game.screenshots[i];
          }
          this.displayed_game.screenshots = temp_screenshots_string;
          this.$axios.$post('https://api.deussearch.fr/front_create_new_contribution.php', {
              game: this.displayed_game,
          });
          this.displayed_game.screenshots = temp_screenshots_string.split(',').filter(i => i);
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
    async asyncData({ $axios, params}) {
      const game = await $axios.get('https://api.deussearch.fr/get_single_game.php?&gid='+params.gameid);
      const displayed_game = game.data[0];
      displayed_game.screenshots = displayed_game.screenshots.split(',').filter(i => i);
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
    mounted() {
      this.loaded = true;
      this.displayed_game.new_game = 0;
    },
    created() {
        if(this.$cookies.get('deussearch_connected') == 1) { // si l'user est connecté 
        var currentuser = JSON.parse(this.$cookies.get('deussearch_user'));
        this.displayed_game.user_id = currentuser.id;
        this.displayed_user = currentuser;
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
        title: 'Editer '+this.displayed_game.game_name+' - DeusSearch',
        meta: [
          { hid: 'description', name: 'description', content: 'Modifiez le jeu '+this.displayed_game.game_name+' sur DeusSearch.' },
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

.game_edit input::placeholder {
  color: #5a5959  !important;
}


.new_tag {
  transform:scale(0.9);
}

.description_body_editor .theme--light.v-toolbar.v-sheet{
  background: #171744;
}

.description_body_editor .theme--light.v-toolbar.v-sheet button {
  color: white;
}

.description_body_editor .tiptap-vuetify-editor__content {
  background: rgb(7, 7, 22) !important;
}

.game_edit .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: none;
}

.game_edit .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow: none;
}


.game_edit .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control .v-icon {
  cursor: pointer;
}

.game_edit .modal_note+.genre_list {
  max-width: 30%;
  margin-left: auto;
  margin-right: auto;
}

.submit_center_row {
  justify-content: center;
}

.submit_center_row button {
  background-color: #4caf50 !important;
  padding: 0 10px !important;
  color: white !important;
}

.submit_center_row button span {
  font-family: 'hamlin';
  text-transform: uppercase;
  font-size: 0.9em !important;
}

.main_col_single_game .title_field .v-input__slot {
  background-color: rgb(7, 7, 22) !important;
}
.main_col_single_game .title_field input {
  color: #7c7979 !important;
  border: none;
}

.game_know_more_link+input {
  border: none;
}

.edit_game p {
  font-size: 1em;
  padding: 5px 0;
}

.edit_game .v-card__text {
  display: flex;
}

.edit_game .v-card__text .succes_icon  {
  background: #1f411f;
}
.edit_game .v-card__text .succes_icon+p {
  border-left:2px solid #157915;
  padding-left: 10px;
}

.edit_game .v-card__text .error_icon  {
  background: #532c2c;
} 
.edit_game .v-card__text .error_icon+p {
  border-left:2px solid #ac231f;
  padding-left: 10px;
}

.edit_game .v-card__text .v-icon {
  font-size: 1em;
  padding: 5px;
}

.back_to_game_link span{
  font-size: 12px;
}

.field_custom_width {
  width: 79%;
  display: inline-block !important;
}

.single_game_edit .v-text-field__details {
  display: none;
}

.field_custom_width input {
  text-transform: lowercase;
  
}

.img_jeu_pres {    
  background-size: contain;
  background-position: 50%;
  display: inline-block;
  width: 20%;
  height: 56px;
  vertical-align: middle;
  margin-top: 0px;
}

.mandatory {
  font-size: 0.7em;
  color: rgb(226, 51, 51);
}

.datepicker_field {
  background: rgb(7, 7, 22) !important;
}
.datepicker_field * {
  color: white !important;
}

.datepicker_field .v-input__icon {
  margin-left: 15px;
  margin-right: 15px;
}

.datepicker_field_picker .v-picker__title__btn {
  color: #171744 !important;
}

.datepicker_field_picker .v-date-picker-years li {
  color: rgba(0, 0, 0, 0.4);
}
.datepicker_field_picker .v-date-picker-years li.active {
  color: rgba(0, 0, 0, 1);
}

</style> 