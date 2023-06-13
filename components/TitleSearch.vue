<template lang="html">

  <div class="header-search-bar">
      <form method="get" id="searchsimpleform" action="#">
          <input  id="searchbox" v-model="game_search_title"  v-on:input="search_game_by_title(game_search_title)"  v-bind:placeholder="$t('message.general_search_placeholder')"></input >
          <button class="header-search-btn"><i class="fas fa-search"></i></button>
          <div id="search_result" no-ssr>
              <ul>
                <li v-if="!game_list[0]" ><a> {{ $t('message.general_search_placeholder') }} </a></li>
                <li v-for="(game,id) in game_list" v-bind:key="id" >
                  <router-link target="_blank" :to="{ name: 'single_game', params: { gamename: game.slug , gameid: game.id }}"> 
                    {{ game.game_name }} 
                  </router-link>
                </li>
              </ul>
          </div>
      </form>
  </div>

</template>

<script lang="js">
  export default  {
    name: 'title-search',
    props: [],
    data () {
      return {
        game_search_title : '',
        game_list: []
      }
    },
    methods: {
      search_game_by_title: function(value){
        // SEARCH GAME BY NAMES HERE
        this.$http.$post("https://api.deussearch.fr/search_by_title.php?title="+value).then(result => {
            this.game_list = result;
        }, error => {
        });
      }
    },
   // mixins: [SearchByTitle]
}


</script>

<style>

</style>
