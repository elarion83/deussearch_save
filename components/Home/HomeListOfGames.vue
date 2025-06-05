<template lang="html">
    <section class="list_of_games about-section bg pb-1 pt-3">
      <div class="container deus_list_index">
          <div v-if="loaded">
            <div v-if="show_title && show_title == 1">
              <h2 v-if="games_displayed.tag" class="mb-3 list_games_title text-left"> 
                {{$t('message.index_some_games_title')}} 
                <router-link :title="$t('message.general_more_games')+' '+games_displayed.tag.tag_name" class="game_link tag_link":to="{ name: 'single_tag', params: { tagname: games_displayed.tag.slug , tagid: used_tag_id }}">
                  {{ games_displayed.tag.tag_name }}
                </router-link>
              </h2>
              <h2 v-if="games_displayed.genre" class="mb-3 list_games_title text-left"> 
                {{$t('message.index_some_games_title')}} 
                <router-link :title="$t('message.general_more_games')+' '+games_displayed.genre.name_genre" class="game_link tag_link":to="{ name: 'single_genre', params: { genrename: games_displayed.genre.slug , genreid: used_genre_id }}">
                  {{ games_displayed.genre.name_genre }}
                </router-link>
              </h2>          
              <h2 v-if="games_displayed.platform" class="mb-3 list_games_title text-left"> 
                {{$t('message.index_some_games_title_on')}} 
                <router-link :title="$t('message.general_more_games_on')+' '+games_displayed.platform.id_dDblKey" class="game_link tag_link":to="{ name: 'single_platform', params: { platformname: games_displayed.platform.slug , platformid: games_displayed.platform.id_dDblKey }}">
                  {{ games_displayed.platform.name }}
                </router-link>
              </h2>
            </div>
            <div class="deus_index_row_games">
              <div class="game-item deus_result deus_large" :key="game.id" v-for="(game,id) in games_displayed.games" v-bind:style="{ backgroundImage: 'url(' + game.img_url + ')' }">
                  <router-link :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_url"  :title="$t('message.general_know_more')+' '+game.game_name" >  
                    <div class="game_deus_bg"></div>
                    <router-link :title="$t('message.general_know_more')+' '+game.game_name" :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}"> 
                      <i class="fas fa-long-arrow-alt-right deus_see_more">
                        <font-awesome-icon  :icon="['fas', 'long-arrow-alt-right']"   />
                      </i> 
                    </router-link>
                    <span v-if="game.rating > 0" class="deus_see_more game_rating">
                      {{ game.rating }}
                      <font-awesome-icon  :icon="['fas', 'star']" />
                    </span>     
                  </router-link>
                  <router-link :title="$t('message.general_know_more')+' '+game.game_name" :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_link mb-4">
                    <div class="game-content">
                        <div class="game-content-body">
                          <h4 class="title">{{ game.game_name }}</h4>
                        </div>
                    </div>
                  </router-link>
              </div>
            </div>
            <p class="no-result p-2 text-center mb-3" v-if="!games_displayed.games[0]"> {{ $t('message.no_result') }} </p>

            <div v-if="loaded && pagination_used != '0'" class="game_pagination pagination_container">
              <v-icon 
                class="new_pagination game_pagination blog_pagination"
                v-on:click="changepage(1)"
                v-if="page > 3"
                :title="$t('message.general_backfirstpage')"
                >
                mdi-rewind-outline
              </v-icon>
              <v-icon
                class="new_pagination game_pagination blog_pagination"
                v-if="page != 1"
                v-on:click="changepage(page-1)"
                :title="$t('message.general_previouspage')"
                >
                mdi-chevron-left
              </v-icon>
              <v-icon
                v-if="games_displayed.games[0]"
                class="new_pagination game_pagination blog_pagination"
                v-on:click="changepage(page+1)"
                :title="$t('message.general_nextpage')"
                >
                mdi-chevron-right
              </v-icon>
            </div>
          </div>
          
          <div v-else class="loading_while_loading col-lg-12">
            <loading></loading>
          </div>
      </div> 
    </section>

</template>

<script lang="js">

  import Loading from '@/components/loading'
  import GameImage from '../GameImage.vue'

  export default  {
    name: 'home-list-of-games',
    props: ['tag_id', 'pagination','genre_id','platform_id','pub_id','ordering', 'show_title', 'title', 'rand', 'used_locale', 'note_min', 'nombre_vote', 'limit'],
    
    components: {
      'loading' : Loading,
      GameImage
    },
    mounted () {

    },
    data () {
      return {
        games_displayed:[],
        loaded:false,
        page:1,
        offset:0,
        pagination_load:false,
        pagination_used:this.$props.pagination,
        used_locale_in_comp:this.$props.used_locale,
        used_tag_id :this.$props.tag_id,
        used_rand_or_not :this.$props.rand,
        used_genre_id :this.$props.genre_id,
        used_pub_id :this.$props.pub_id,
        used_platform_id :this.$props.platform_id,
        selectedTitle:this.$props.title,
        note_min_used : this.$props.note_min,
        limit_of_games : this.$props.limit,
        nbre_vote_min : this.$props.nombre_vote,
        used_ordering : this.$props.ordering,
        used_api_url : ''
      }
    },
    created() {  
      if(this.$props.tag_id) {
        this.used_api_url = "https://api.deussearch.fr/get_games_by_tag_or_genre.php?NoteMin="+this.note_min_used+"&nbrNoteMin="+this.nbre_vote_min+"&number="+this.limit_of_games+"&rand="+this.used_rand_or_not+"&tags="+this.used_tag_id+"&title="+this.selectedTitle+"&ordering="+this.used_ordering;
      }
      if(this.$props.genre_id) {
        this.used_api_url = "https://api.deussearch.fr/get_games_by_tag_or_genre.php?NoteMin="+this.note_min_used+"&nbrNoteMin="+this.nbre_vote_min+"&number="+this.limit_of_games+"&rand="+this.used_rand_or_not+"&genres="+this.used_genre_id+"&title="+this.selectedTitle+"&ordering="+this.used_ordering;
      }
      if(this.$props.platform_id) {
        this.used_api_url = "https://api.deussearch.fr/get_games_by_tag_or_genre.php?NoteMin="+this.note_min_used+"&nbrNoteMin="+this.nbre_vote_min+"&number="+this.limit_of_games+"&rand="+this.used_rand_or_not+"&platform="+this.used_platform_id+"&order="+this.selectedOrder+"&title="+this.selectedTitle+"&ordering="+this.used_ordering;
      }
      if(this.$props.pub_id) {
        this.used_api_url = "https://api.deussearch.fr/get_games_by_tag_or_genre.php?NoteMin="+this.note_min_used+"&nbrNoteMin="+this.nbre_vote_min+"&number="+this.limit_of_games+"&rand="+this.used_rand_or_not+"&pub="+this.used_pub_id+"&order="+this.selectedOrder+"&title="+this.selectedTitle+"&ordering="+this.used_ordering;
      }


      this.$http.$post(this.used_api_url).then(result => {
        if(result) {
          this.games_displayed = result;
          this.loaded = true;
        }
      }, error => {
      });
      
    },
    methods: {
      changepage(page) {
        this.page =page;
        this.pagination_load = true;
        this.loaded = false;
        var comp = this;
        comp.offset = page*this.limit_of_games-this.limit_of_games;
         this.$http.$post(this.used_api_url+'&offset='+this.offset+'&page_size='+this.limit_of_games).then(result => {
        if(result) {
          this.games_displayed = result;
          this.loaded = true;
        }
      }, error => {
      });
      }
    }
}


</script>

<style >
  .list_games_title {
    font-size: 1.5em;
  }
  .list_games_title a {
    font-size: 1em;
    color: #ffff76 !important;
  }
  
  .list_games_title a:hover {
    color: #949446 !important;
  }
  .list_games_title::after {
    content:'';
    width: 50px;
    height:2px;
    margin-top: 10px;
    background-color:white;
    display: block;
  }
  .deus_large {
    flex-basis: 175px !important;
    min-height: 150px !important;
    max-height: 150px;
    margin-left: 5px;
    animation:none !important;
  }
  .deus_large h4 {
    font-size: 17px;
    text-align: left;
  }

  .no-result {
    background-color: var(--bg-main-color);
    color: #caaaaa;
    font-size: 0.9em !important;
    text-transform: uppercase;
  }

</style>
