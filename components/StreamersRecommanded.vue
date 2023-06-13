<template lang="html">
  <section class="about-section bg pb-10" id="about">
    <div class="about-element-one">
        <img src="../assets/images/about/icon-1.png" alt="icon">
    </div>
    <div class="about-element-two">
        <img src="../assets/images/about/icon-2.png" alt="icon">
    </div>
    <div class="about-element-three">
        <img src="../assets/images/about/icon-3.png" alt="icon">
    </div>
    <div class="about-element-four">
        <img src="../assets/images/about/icon-4.png" alt="icon">
    </div>
    <div class="about-element-five">
        <img src="../assets/images/about/icon-5.png" alt="icon">
    </div>
    <div class="about-element-six">
        <img src="../assets/images/about/icon-5.png" alt="icon">
    </div>
    <div class="about-element-seven">
        <img src="../assets/images/about/icon-6.png" alt="icon">
    </div>
    <div class="about-element-eight">
        <img src="../assets/images/about/icon-7.png" alt="icon">
    </div>
    <div class="about-element-ten">
        <img src="../assets/images/about/icon-9.png" alt="icon">
    </div>
    <!-- STREAMERS PARTENAIRES -->
    <div class="container deus_list_index">
        <h2> {{ $t('message.index_streamer_recommended') }}   </h2>
        <h3> {{ $t('message.index_streamer_recommended_sub') }}   </h3>
        <div class="deus_index_row_games streamers_row recommended mb-5 mt-5 pb-5">
          <div v-if="!loaded">
              <loading ></loading>
          </div>
          <div v-for="(streamer,id) in streamers" v-bind:key="id" :class="'streamerbackground pt-5 pb-2 '+streamer.status" v-bind:style="{ 'background-image': 'url(' + streamer.image + ')' }">
              <a target="_blank" v-bind:href="streamer.twitchUrl">
                <div class="title">
                    <h4> {{ streamer.name }} </h4>
                    <div v-html="streamer.text"></div>                  
                </div>
              </a>
          </div>
        </div>
    </div>
    <!-- FIN STREAMERS PARTENAIRES -->
  </section>


</template>

<script lang="js">
  import Loading from '@/components/loading'

  export default  {
    name: 'streamers-recommended',
    props: [],
    mounted () {

    },
    data () {
      return {
        'loaded':false,
        'streamers':[]
      }
    },
    components: {
      'loading' : Loading
    },
    created() {
      // Simple POST request with a JSON body using fetch
        this.$http.$get("https://api.deussearch.fr/get_streamers_recommended_status.php").then(result => {
            this.streamers = result;
            this.loaded = true;
        }, error => {
        });
    }
}


</script>

<style>
</style>
