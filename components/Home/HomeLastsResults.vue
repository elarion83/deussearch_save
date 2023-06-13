<template lang="html">
    <section class="about-section bg pb-120 pt-0">
      <div class="container deus_list_index">
          <!--<h2>  {{ $t('message.index_last_results_title') }}   </h2>
          <h3> {{ $t('message.index_last_results_blue_title') }}    </h3>
           <div class="deus_index_row_games">
            <div class="game-item deus_result" v-for="(game,id) in games_displayed" v-bind:style="{ backgroundImage: 'url(' + game.img_url + ')' }">
                <router-link :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_url"  >  
                  <div class="game_deus_bg"></div>
                </router-link>
                <router-link :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}" class="game_link mb-4">
                  <div class="game-content">
                      <div class="game-content-body">
                        <h4 class="title">{{ game.game_name }}</h4>
                      </div>
                  </div>
                </router-link>
            </div>
          </div> -->
          <div class="about-content-btn">
            <p>  {{ $t('message.index_last_results_notice') }}  </p>
            <router-link :to="{ name: 'deus_test_'+$i18n.locale}" class="cmn-btn mt-3"  >  
              {{ $t('message.index_last_results_button') }} 
              <font-awesome-icon  :icon="['fas', 'long-arrow-alt-right']" /> 
            </router-link>
          </div>
      </div>
    </section>

</template>

<script lang="js">

  export default  {
    name: 'home-lasts-results',
    props: [],
    mounted () {

    },
    data () {
      return {
        games_displayed:[],
      }
    },
    created() {
      // var comp = this;
      // this.$axios.$post('https://api.deussearch.fr/select_games.php', {
      //     number: 4,
      //     nbrNoteMin: 80,
      //     NoteMin: 3.5
      // })
      // .then(function(response) {
      //   comp.games_displayed = response;
      // })
      // .catch(function(error) {
      // });
    }
}


</script>

<style >
  .home-lasts-results {

  }
</style>
