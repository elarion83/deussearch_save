<template lang="html">
  <div>
    <head-banner class="little_text_banner" :title="page_title"></head-banner>
    <section class="contact-section bg presentation">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 text-center">
                    <div class="contact-area text_page full_list">
                      <div class="full_content_list" v-if="loaded === true">
                        <router-link 
                          target="_blank" 
                          class="full_content_list_item mb-4"
                          v-for="(genre,id) in content" :key="id" :title="$t('message.general_more_games')+' '+genre.name_genre" 
                          :to="{ name: 'single_genre', params: { genrename: genre.slug , genreid: genre.id_dDblKey }}">
                          <div class="icon_and_data p-2 text-center mr-3">
                            <v-icon class="mb-1">
                            mdi-{{ genre.genre_icon}}
                            </v-icon>
                            <h2 class="mt-2 mb-2 text-center">{{genre.name_genre}}</h2>
                            <span class="yellow_link"> {{ genre.game_count }} {{$t('message.general_games_availables') }}</span>
                          </div> 
                          <v-icon class="filigrane">
                          mdi-{{ genre.genre_icon}}
                          </v-icon>
                        </router-link>
                      </div>
                      <loading class="pt-5 pb-5" v-else></loading>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import HeadBanner from '../components/HeadBanner';
  import Loading from '../components/loading';
  export default {
    scrollToTop: true,
    name:'all_platforms_list',
    props:['used_lang_for_route', 'locale', 'page_title'],
    mounted () {
      this.$emit('update:locale', this.$props.used_lang_for_route);
    },
    data () {
      return {
        content:'',
        loaded:false,
        contentType:''
      }
    },
    head() {
        return {
            title: 'DeusSearch - '+ this.page_title
        }
    },
    components: {
      'head-banner' : HeadBanner,
      'loading' : Loading
    },
    created() {
      this.contentType = this.$nuxt.$route.name.slice(0,-3);
    },
    async fetch() {
      this.content = await fetch('https://api.deussearch.fr/get_genres_advanced.php').then(res =>
        res.json()
      )
      this.loaded = true;
    }
  }
</script>
<style>

.little_text_banner.inner-banner-section {
  padding-top: 220px !important;
  padding-bottom: 150px !important;
}


.little_text_banner h1::before {
  content:url('https://api.iconify.design/mdi/chevron-right.svg?color=%23d4d80c&height=40&width=40');
  display: inline-block;
  vertical-align: middle;
}

.little_text_banner h1 {
  text-align: left;
  font-size: 1.8em !important;
}
@media (max-width: 991px) {
  .little_text_banner.inner-banner-section{
    padding-top: 65px !important;
  }
  .little_text_banner h1 {
    font-size: 1em !important;
  }
}
</style>
