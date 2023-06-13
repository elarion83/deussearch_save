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
                          class="full_content_list_item mb-4 background_card"
                          v-for="(publisher,id) in content" :key="id" :title="$t('message.general_more_games_on')+' '+publisher.name" 
                          v-bind:style="{ backgroundImage: 'url(' + publisher.img + ')' }"
                          :to="{ name: 'single_pub', params: { pubname: publisher.slug , pubid: publisher.id }}">
                          <div class="icon_and_data p-2 text-center mr-3">
                            <h2 class="mt-2 mb-2 text-center">{{publisher.name}}</h2>
                            <span class="yellow_link"> {{ publisher.nbr_of_games }} {{$t('message.general_games_availables') }}</span>
                          </div> 
                        </router-link>
                      </div>
                      <loading v-else></loading>
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
    name:'all_publisher_list',
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
      this.content = await fetch('https://api.deussearch.fr/get_publisher.php').then(res =>
        res.json()
      )
      this.loaded = true;
    }
  }
</script>

<style>
.background_card {
  background-size: cover;
  background-position: 50% 50%;
}

.background_card *{
  color: #d6d6e4;
}

.background_card::before {
  content:'';
  background:#070716;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  position: absolute;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}

.background_card:hover::before {
  opacity: 0.3;
}
</style>
