<template lang="html">
  <div class="col-lg-12 p-0 game_displayed future_results pb-2" id="thisyear">
    <div v-if="loaded" class="game-item deus_result " v-for="(game,id) in games" v-bind:style="{ backgroundImage: 'url(' + game.img_url + ')' }"> 
        <router-link :title="$t('message.general_know_more')+' '+game.game_name" :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_url"  >  
            <div class="game_deus_bg"></div>
        </router-link>
      
        <router-link :title="$t('message.general_know_more')+' '+game.game_name" :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_link"  >  
            <div class="game-content">
                <div class="game-content-body">
                  <h3 class="title">{{ game.game_name }} </h3>
                  <span class="deus_same_val" v-for="(genres,id) in game.deus_genres" >
                    {{ genres }}
                  </span>
                  </div>
            </div>
        </router-link>
    </div>
    <div v-if="!loaded">
      <loading></loading>
    </div>
  </div>
</template>

<script lang="js">
  import Loading from '@/components/loading'

  export default  {
    name: 'future-results-component',
    props: ['profile','startdate','enddate','numberofgames','modaled_game' ],
    data () {
      return {
        profileUsed : this.$props.profile,
        startDate: this.$props.startdate,
        endDate : this.$props.enddate,
        numberOfGames: this.$props.numberofgames,
        modaledGame:null,
        games:null,
        offset:0,
        loaded:false
      }
    },
    components: {
      'loading' : Loading,
    },
    created() {
      var comp = this;
      this.$axios.$post('https://api.deussearch.fr/test_get_futures_games.php', {
          profileUsed: this.profileUsed,
          startDate: this.startDate,
          endDate: this.endDate,
          offset:this.offset,
          numberOfGames: this.numberOfGames
      })
      .then(function(response) {
        comp.games = response;
        comp.loaded = true;
      })
      .catch(function(error) {
      });
    }
  }


</script>
