<template>
  <div data-view>
    <home-banner></home-banner> 
    <home-presentation ></home-presentation>    
    <!--<streamers-partenaires no-ssr />-->
    <home-blog no-ssr />
   <!-- <home-event></home-event>-->
    <list-of-games show_title="1" pagination="0" tag_id="6" rand="1" limit="6" note_min="4"  nombre_vote="250" no-ssr />
    <list-of-games show_title="1" pagination="0" genre_id="6" rand="1" limit="6"  note_min="4" nombre_vote="50" no-ssr/>   
    <list-of-games show_title="1" pagination="0" class="pl-0 pr-0 col-lg-12" platform_id="7" note_min="4" limit="6" rand="0" nombre_vote="0" ></list-of-games>

    <!-- <list-of-games genre_id="19" rand="1" limit="6" note_min="2" nombre_vote="50" no-ssr/></list-of-games> -->
    <home-lastresults no-ssr />
   <!-- <streamers-recommended no-ssr />-->
  </div>
</template>

<script>
import HomeBanner from '../components/Home/HomeBanner';
//import HomeEvent from '../components/Home/HomeEvent';
import HomeLastresults from '../components/Home/HomeLastsResults';
//import StreamersPartenaires from '../components/StreamersPartners';
//import StreamersRecommanded from '../components/StreamersRecommanded';
import HomePresentation from '../components/Home/HomePresentation';
import HomeBlog from '../components/Home/HomeBlog';
import HomeListOfGames from '../components/Home/HomeListOfGames';


export default {
  scrollToTop: true,
  name:'HomePage',
  props:['used_lang_for_route', 'locale', 'page_title'],
  components: {
    'home-banner' : HomeBanner,
   // 'home-event' : HomeEvent,
    'home-lastresults' : HomeLastresults,
    'home-blog' : HomeBlog,
    'home-presentation' : HomePresentation,
   // 'streamers-partenaires' : StreamersPartenaires,
   // 'streamers-recommended' : StreamersRecommanded,
    'list-of-games' : HomeListOfGames
  },
  created() {
    this.$emit('update:locale', this.$props.used_lang_for_route);
  },
  data() {
    return {
    }
  },
  head() {
    return {
      title: this.page_title,
      bodyAttrs: {
          class:'home'
      }
    }
  },
  metaInfo() {
      return {
          meta: [
              { property: 'og:title', content: this.page_title}
          ]
      }
  },
}
</script>
