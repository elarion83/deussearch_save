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
                          v-for="(platform,id) in content" :key="id" :title="$t('message.general_more_games_on')+' '+platform.name" 
                          :to="{ name: 'single_platform', params: { platformname: platform.slug , platformid: platform.id_dDblKey }}">
                          <div class="icon_and_data p-2 text-center mr-3">
                            <v-icon class="mb-1">
                            mdi-{{ platform.platform_icon}}
                            </v-icon>
                            <h2 class="mt-2 mb-2 text-center">{{platform.name}}</h2>
                            <span class="yellow_link"> {{ platform.game_count }} {{$t('message.general_games_availables') }}</span>
                          </div> 
                          <v-icon class="filigrane">
                          mdi-{{ platform.platform_icon}}
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
      this.content = await fetch('https://api.deussearch.fr/get_platforms.php').then(res =>
        res.json()
      )
      this.loaded = true;
    }
  }
</script>

<style>
  .full_list {
    padding: 1em !important;
  }

  .full_content_list {
    display: flex;
    flex-direction: row;
    max-width: none !important;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .full_content_list_item {   
    background: #070716;
    overflow: hidden;
    flex-grow: 0;
    border-radius: 4px;
    flex-shrink: 0;   
    min-height: 250px;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    text-align: left;
    align-items: center;
    flex-basis: 250px;
    flex-direction: row;
    display: flex;
    position: relative;
  }
  .full_content_list_item h2 {
    font-family:'oswald', sans-serif;
    font-size: 2em !important;
    text-transform: uppercase;
    font-weight: 700;
  }
  .full_content_list_item h2::after {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.2em;
  }

  .full_content_list_item .icon_and_data{
    display: flex;
    border-radius: 4px;
    flex-grow: 0;
    flex-shrink: 0;  
    flex-basis: 250px;
    flex-direction: column;
    z-index: 2  ;
  }
  

  .full_content_list_item .filigrane {
    position: absolute !important;
    left: 5px;
    top: 0;
    font-size: 15em !important;
    z-index: 1;
    color: rgba(53, 42, 42, 0.54) !important;
    opacity: .7;

  }

  .full_content_list_item .icon_and_data span {
    font-size: 0.7em;
  }
  .full_content_list_item .icon_and_data i {
    color: white;
  }

  .full_content_list_item:hover .icon_and_data i{
    font-size: 3em;
  }
  
  .full_content_list_item:hover .filigrane {
    transform: rotateZ(15deg);
    opacity: 1;
  }
  .full_content_list_item:hover span {
    color: #f4f80b !important
  }

  
@media (max-width: 767px) {
  .full_content_list_item, .full_content_list_item .icon_and_data {
    flex-basis: 175px;
    height: 175px;
    width: 100%;
  }
  .full_content_list_item h2 {
    font-size: 1.3em !important;
  }

  .full_content_list_item {
    min-height: 175px;
  }
}
</style>
