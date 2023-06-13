<template lang="html">

  <section class="global_search p-4">
    <div class="p-5">
     <!-- <h1 class="title deus_main_title" >{{ $t('message.general_search_in_bdd') }} </h1>-->
      <div class="input_holder">
        <input class="global_input" 
          v-model="global_search_value"  
          v-on:input.lazy="search_game_by_title(global_search_value)" 
          v-on:change.lazy="search_game_by_title(global_search_value)" 
          v-bind:placeholder="$t('message.general_search_in_bdd_placeholder')"
          append-icon="mdi-map-marker"
        >
        </input >
        <v-icon class="global_input_icon">mdi-magnify</v-icon>
      </div>
      <div class="suggestions" v-if="global_search_value == ''">
        <span>{{ $t('message.general_in_ex')}} :</span>
        <span class="yellow_link" v-on:click="global_search_value ='Playstation 5'; search_game_by_title(global_search_value)">Playstation 5</span>, 
        <span class="yellow_link" v-on:click="global_search_value ='Dear Villagers'; search_game_by_title(global_search_value)">Dear Villagers</span>, 
        <span class="yellow_link" v-on:click="global_search_value ='Mario Kart'; search_game_by_title(global_search_value)">Mario Kart</span>, 
        <span class="yellow_link" v-on:click="global_search_value ='Nintendo'; search_game_by_title(global_search_value)">Nintendo</span>, 
        <span class="yellow_link" v-on:click="global_search_value ='Cross-Platform'; search_game_by_title(global_search_value)">Cross-Platform</span>, 
        <span class="yellow_link" v-on:click="global_search_value ='Adventure'; search_game_by_title(global_search_value)">Adventure</span>, 
        <span class="yellow_link" v-on:click="global_search_value ='Indie'; search_game_by_title(global_search_value)">Indie</span>
      </div>

      <div v-if="global_search_value != ''" class="result_list mt-4">
        <ul v-if="results.platforms && results.platforms.length > 0" class="pl-4 ml-1">
          <span class="yellow_link"> {{ $t('message.general_search_in_bdd_platforms') }} </span>
          <router-link 
            v-for="(result,id) in results.platforms" 
            :key="id" 
            :title="$t('message.general_more_games_on')+' '+result.name" 
            :to="{ name: 'single_platform', params: { platformname: result.slug , platformid: result.id_dDblKey }}">{{ result.name }} 
          </router-link>
        </ul>
        <ul v-if="results.games && results.games.length > 0" class="pl-4 ml-1">
          <span class="yellow_link">{{ $t('message.general_search_in_bdd_games') }} </span>
          <router-link 
          v-for="(result,id) in results.games" 
          :key="id"
          :title="$t('message.general_know_more')+' '+result.game_name" 
          :to="{ name: 'single_game', params: { gamename: result.slug , gameid: result.id }}">
            {{ result.game_name }}
          </router-link>
        </ul>
        
        <ul v-if="results.publishers && results.publishers.length > 0" class="pl-4 ml-1">
          <span class="yellow_link"> {{ $t('message.general_search_in_bdd_publishers') }}
          </span>
          <router-link 
            v-for="(result,id) in results.publishers" 
            :key="id" :title="$t('message.general_more_games')+' '+result.name" 
            :to="{ name: 'single_pub', params: { pubname: result.slug , pubid: result.id }}">
              {{ result.name }} 
          </router-link>
        </ul>
        
        <ul v-if="results.tags && results.tags.length > 0" class="pl-4 ml-1">
          <span class="yellow_link"> Tag(s) </span>
          <router-link 
            v-for="(result,id) in results.tags"
            :key="id"
            :title="$t('message.general_more_games')+' '+result.tag_name" 
            :to="{ name: 'single_tag', params: { tagname: result.slug , tagid: result.id_dDblKey }}">
             {{ result.tag_name }} 
          </router-link>
        </ul>
        <ul v-if="results.genres && results.genres.length > 0" class="pl-4 ml-1">
          <span class="yellow_link"> Genre(s) </span>
          <router-link 
            v-for="(result,id) in results.genres"
            :key="id"
            :title="$t('message.general_more_games')+' '+result.name_genre" 
            :to="{ name: 'single_genre', params: { genrename: result.slug , genreid: result.id_dDblKey }}">
             {{ result.name_genre }} 
          </router-link>
        </ul>
      </div>
      <loading v-if="loading"></loading>
    </div>
  </section>
     
</template>

<script lang="js">
  import Loading from '@/components/loading';
  export default  {
    name: 'global-search',
    props: [],
    data () {
      return {
        global_search_value : '',
        results: [],
        loading:false
      }
    },
    components: {
      'loading' : Loading,
    },
    methods: {
      search_game_by_title: function(value){
   //     this.loading=true;
        this.$http.$post("https://api.deussearch.fr/search_global.php?title="+value).then(result => {
            this.results = result;
            this.loading=false;
        }, error => {
        });
      }
    },
    created() {
      this.$http.$post("https://api.deussearch.fr/search_global.php?title="+this.global_search_value).then(result => {
          this.results = result;
      }, error => {
      });
    }
  }
</script>

<style>
.global_search {
  /*  background: #0e0c0c; */
    display: flex;
    justify-content: space-around;
}

.global_search>div {
  flex-basis:1115px;
  background: linear-gradient(-30deg,rgba(206,0,113,0.23137),rgba(7,79,134,0.72941));
  z-index: 50;
  box-shadow: 1px 3px 15px 5px rgba(0, 0, 0, 0.2);
}

.global_search .global_input{
  background:#171744;
  background: rgba(1, 87, 139, 0.3);
  width: 100%;
  height: 80px;
  padding-right: 100px;
  font-size: 2em;
  border-radius: 11px;
  caret-color: rgb(247, 247, 247);
  color: white;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}

.input_holder {
  position: relative;
}

.global_input_icon {
  position: absolute !important;
  opacity: 0.7;
  right: 20px;
  top: 15px;
  font-size: 3em !important;
}

.input_holder:hover .global_input_icon{
  opacity: 0.9;
}

.global_search .global_input:hover {
  background: rgba(1, 87, 139, 1);
}

.suggestions {
  color: white;
  font-family: 'Hamlin';
  margin-left: 15px;
  margin-top: 10px;
}

.suggestions .yellow_link {
  margin-right:3px;
  cursor: pointer;
}

.result_list{
  max-height: calc(50vh - 170px);
  overflow-y: scroll;
  scrollbar-color: rgba(229, 233, 13, 0.5)   #0d0e28;
  scrollbar-width: thin;
  direction:rtl; 
}

.result_list:hover {
  scrollbar-color: rgba(229, 233, 13, 0.9)   #0d0e28;
}

@media (max-width: 575px) {
  .result_list{
    max-height: 175px;
  }

  .global_search .global_input {
    font-size: 1.2em;
  }
  .global_input_icon {
    font-size: 2.2em !important;
    margin-top: 6px;
  }
}
@media (max-width: 775px) {
  .global_search>div {
    padding: 1em !important;
  }
  .global_search .global_input{
    height: 50px;
  }
  .global_input_icon {
    font-size: 2em !important;
    margin-top:-5px;
  }
}
.result_list ul {
  margin-top: 20px;
}


.result_list ul:first-of-type {
  margin-top: 0;
}

.result_list a {
  margin: 8px 0px;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}

.result_list ul span {
  font-size: 0.8em;
}

.result_list a:hover {
  margin-left: 20px;
  color: rgb(255, 255, 255);
}

.result_list ul * {
  display: block;
}


</style>
