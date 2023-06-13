<template lang="html">
  <div class="col-lg-12 p-0 game_displayed" id="thisyear">
    <!-- <div v-if="loaded" class="game-item deus_result" v-on:click="showmodal(game)" v-for="(game,id) in games" v-bind:style="{ backgroundImage: 'url(' + game.img_url + ')' }">  -->
      <div v-if="loaded" class="game-item deus_result" v-for="(game,id) in games" v-bind:style="{ backgroundImage: 'url(' + game.img_url + ')' }"> 
        <router-link  :title="$t('message.general_know_more')+' '+game.game_name" target="_blank" :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_url">
            <div class="game_deus_bg"></div>
        </router-link>
      
        <router-link :title="$t('message.general_know_more')+' '+game.game_name" target="_blank" :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_link ">
            <div class="game-content">
                <div class="game-content-body">
                  <h3 class="title">{{ game.game_name }} </h3>
                  <v-chip x-small v-for="(platform,id) in game.deus_platforms"
                    class="ma-2 ml-1 mb-1 updated_genre_chip genre_tag_link small_chip"
                    color="pink"
                    label
                    text-color="white"
                    :key="id"
                  >
                    <v-icon left>
                      mdi-{{ platform.platform_icon }}
                    </v-icon>
                      {{ platform.name }}
                  </v-chip>
                  <v-chip x-small v-for="(genre,id) in game.deus_genres"
                    class="ma-2 ml-1 mb-1 updated_genre_chip genre_tag_link small_chip"
                    color="pink"
                    label
                    text-color="white"
                    :key="id"
                  >
                    <v-icon left>
                      mdi-folder
                    </v-icon>
                      {{ genre }}
                  </v-chip>
                  <v-chip x-small v-for="(tag,id) in game.deus_tags"
                    class="ma-2 ml-1 mb-1 updated_genre_chip genre_tag_link small_chip"
                    color="pink"
                    label
                    text-color="white"
                    :key="id"
                  >
                    <v-icon left>
                      mdi-tag
                    </v-icon>
                      {{ tag }}
                  </v-chip>
                </div>
            </div>
            <router-link target="_blank" :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}"> 
              <i class="fas fa-long-arrow-alt-right deus_see_more">
                <font-awesome-icon  :icon="['fas', 'long-arrow-alt-right']"   />
              </i> 
            </router-link>
            <span class="deus_see_more game_rating" title="Note du jeu">
              {{ game.rating }}
              <font-awesome-icon  :icon="['fas', 'star']" />
            </span>                                                                 
            <p v-if="game.deal_url" class="deus_result_price m-0 p-0 pl-2 pr-2" data-toggle="tooltip" data-placement="top"> 
              {{ game.deal_price}} € 
            </p>
            <p v-if="game.gamepass != 0" class="deus_result_price gmp m-0 p-0 pl-2 pr-2"> GamePass </p>                                    
            <p v-if="game.psnow != 0" class="deus_result_price gmp psn m-0 p-0 pl-2 pr-2"> PSNow </p> 
            <video v-if="game.clip_url != ' ' && !pagination_load" class="deus_video" id="video_player" controls=""  autoplay="autoplay" loop="" muted="" width="250">
                <source :src="game.clip_url" type="video/mp4">
                Sorry, your browser doesn't support embedded videos.
            </video>
        </router-link>
    </div>



    <div v-if="loaded" class="game_pagination pagination_container">
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
        class="new_pagination game_pagination blog_pagination"
        v-on:click="changepage(page+1)"
        :title="$t('message.general_nextpage')"
        >
        mdi-chevron-right
      </v-icon>
    </div>
    
    <div v-if="!loaded">
      <loading></loading>
    </div>
    <span class="game_pagination pagination_loading" v-if="pagination_load">
      <loading class="mt-5"></loading>
    </span>
  </div>
</template>

<script lang="js">
  import Loading from '../components/loading';

  export default  {
    name: 'results-component',
    props: ['profile','startdate','enddate','numberofgames','modaled_game' ],
    mounted () {

    },
    data () {
      return {
        profileUsed : this.$props.profile,
        startDate: this.$props.startdate,
        endDate : this.$props.enddate,
        numberOfGames: this.$props.numberofgames,
        modaledGame:null,
        games:null,
        offset:0,
        page:1,
        pagination_load:false,
        loaded:false
      }
    },
    components: {
      'loading' : Loading,
    },
    methods: {
      showmodal(game) {
        this.$emit("setgameinmodal", this.modaledGame);
      },
      changepage(page) {
        this.page = page;
        this.pagination_load = true;
        var comp = this;
        comp.offset = page*6-6;
        this.$axios.$post('https://api.deussearch.fr/test_get_games.php', {
          profileUsed: this.profileUsed,
          startDate: this.startDate,
          endDate: this.endDate,
          offset:this.offset,
          numberOfGames: this.numberOfGames
        })
        .then(function(response) {
          comp.games = response;
          comp.pagination_load = false;
        })
        .catch(function(error) {
        });
      }
    },
    computed: {

    },
    created() {
      var comp = this;
      this.$axios.$post('https://api.deussearch.fr/test_get_games.php', {
          profileUsed: this.profileUsed,
          startDate: this.startDate,
          endDate: this.endDate,
          offset:this.offset,
          numberOfGames: this.numberOfGames
      })
      .then(function(response) {
        comp.games = response;
        comp.offset += 6;
        comp.loaded = true;
      })
      .catch(function(error) {
      });
    }
  }


</script>

<style>
  .game_pagination {
    width: 100%;
  }
  .game_pagination button {
    background: #0B0B24 !important;
    
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    color: rgb(172, 170, 170) !important;
    font-size: 0.8rem;
  }
  .game_pagination button.v-pagination__item--active {
    background: linear-gradient(-30deg,rgb(206, 0, 113),#074f86) !important;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
  }
  .game_pagination .v-pagination__navigation {
    display: none !important;
  }
  .pagination_loading {
    font-size: 0.8em;
    color: #000;
  }
  .updated_genre_chip.small_chip {
    padding: 8px 0 !important;
    height: 20px !important;
  }
  
  .updated_genre_chip.small_chip .v-icon {
    font-size: 18px !important;
  }

  .updated_genre_chip.small_chip span {
    font-size: 1.6em;
  }
</style>
