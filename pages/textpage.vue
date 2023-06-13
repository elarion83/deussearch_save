<template lang="html">
  <div>
    <head-banner :title="page_title"></head-banner>
    <section class="contact-section bg presentation">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 text-center">
                    <div class="contact-area text_page">
                      <div v-html="this.content" v-if="loaded === true">
                      </div>
                      <loading v-else></loading>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <streamers-partners v-if="contentType == 'streamers_partenaire'" no-ssr class="pt-5"></streamers-partners>
  </div>
</template>

<script>
  import StreamersPartenaires from '../components/StreamersPartners';
  import Loading from '../components/loading';
  import HeadBanner from '../components/HeadBanner';
  import ImportText from '../components/ImportText';
  export default {
    scrollToTop: true,
    name:'Presentation',
    props:['used_lang_for_route', 'locale', 'page_title', 'page_wp_id'],
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
      'import-text' : ImportText,
      'streamers-partners' : StreamersPartenaires,
      'loading' : Loading
    },
    created() {
      this.contentType = this.$nuxt.$route.name.slice(0,-3);
    },
    async fetch() {
      this.content = await fetch('https://api.deussearch.fr/get_content.php?content_id='+this.$props.page_wp_id).then(res =>
        res.json()
      )
      this.loaded = true;
    }
  }
</script>

<style>
  .text_page:not(.single_post_content) a {
    color: #d9d15a;
  }

  .text_page h2 {
    margin-top:2em;
  }

  .text_page ul {
    list-style-type: circle;
    margin-left: 2em;
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>
