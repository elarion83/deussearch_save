<template lang="html">
  <div>
    <head-banner :title="page_title"></head-banner>
    <section class="contact-section bg presentation profil">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 text-center">
                    <div class="contact-area text_page">
                      <div  v-if="loaded === true">
                          
                        <v-container fluid>
                            <v-row class="mb-3">
                                <v-col
                                v-for="post in posts" 
                                cols="12" sm="6" md="4"
                                :key="post.id"
                                >
                                        <v-card class="blog_card"> 
                                            <router-link class="blog_link" :title="post.title.rendered" :to="{ name: 'singlepost', params: { postslug: post.slug , postid: post.id }}"> 
                                                <v-img
                                                height="200px"
                                                :src="post.better_featured_image.source_url"
                                                :alt="post.title.rendered"
                                                >
                                                </v-img>
                                                <v-card-subtitle class="pb-0 blog_date"><font-awesome-icon class="mr-2" :icon="['fa', 'calendar-alt']" /> {{ post.formatted_date }}</v-card-subtitle>

                                                <v-card-text class="text--primary">
                                                    <v-card-title class="pl-0 pr-0"><h2>{{post.title.rendered | strreplace(post.title.rendered) }}</h2></v-card-title>
                                                    <p v-html="post.excerpt.rendered"></p>
                                                </v-card-text>
                                            </router-link>
                                        </v-card>
                                </v-col>
                            </v-row>
                            
                            <div v-if="loaded" class="game_pagination pagination_container">
                              <v-icon 
                                class="new_pagination game_pagination blog_pagination"
                                v-on:click="changepage(1)"
                                v-if="page > 3"
                                :title="$t('message.general_backfirstpage')"
                                >
                                mdi-rewind-outline
                              </v-icon>
                              <v-icon
                                class="new_pagination game_pagination blog_pagination"
                                v-on:click="changepage(page-1)"
                                v-if="page != 1"
                                :title="$t('message.general_previouspage')"
                                >
                                mdi-chevron-left
                              </v-icon>
                              <v-icon
                                class="new_pagination game_pagination blog_pagination"
                                v-on:click="changepage(page+1)"
                                :title="$t('message.general_nextpage')"
                                >
                                mdi-chevron-right
                              </v-icon>
                            </div>
                            <span class="pagination_loading" v-if="pagination_load">
                              <loading class="mt-5"></loading>
                            </span>
                        </v-container>
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
  import Loading from '../components/loading';
  import HeadBanner from '../components/HeadBanner';
  export default {
    name:'BlogPage',
    props:['used_lang_for_route', 'locale', 'page_title', 'page_wp_id'],
    mounted () {
      this.$emit('update:locale', this.$props.used_lang_for_route);
    },
    data () {
      return {
        posts:'',
        loaded:false,
        pagination_load:false,
        page:1,
        contentType:''
      }
    },
    head() {
        return {
            title: 'DeusSearch - '+ this.page_title +' - L\'actualité des Jeux-vidéo', 
            meta: [
              { hid:'og:title', property: 'og:title', content: 'DeusSearch - '+ this.page_title +' - L\'actualité des Jeux-vidéo'},
              { hid:'twitter:title', property: 'twitter:title', content: 'DeusSearch - '+ this.page_title +' - L\'actualité des Jeux-vidéo'}
            ],
            bodyAttrs: {
                class:'blog'
            }
        }
    },
    components: {
      'head-banner' : HeadBanner,
      'loading' : Loading
    },
    created() {
        this.$http.$get("https://blog.deussearch.fr/wp-json/wp/v2/posts?per_page=9").then(result => {
            this.posts = result;
            this.loaded = true;
        }, error => {
        });
    },
    filters: {
      strreplace: function (st) {
        const result = st.replaceAll('&rsquo;', "'");
        return result;
      }
    },
    methods: {
      changepage(page) {
        this.page = page;
        this.pagination_load = true;
        this.$http.$get("https://blog.deussearch.fr/wp-json/wp/v2/posts?per_page=9&page="+page).then(result => {
            this.posts = result;
            this.pagination_load = false;
        }, error => {
        });
        
      }
    },
  }
</script>
<style >
.blog_date {
  color: #1c1d55;
}

.blog_pagination {
  margin-left: 0;
}

.new_pagination  {
  width: 50px !important;
  height: 50px;
  background: #0B0B24 !important;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  color: rgb(172, 170, 170) !important;
}
  .new_pagination:hover {
    background: linear-gradient(-30deg,rgb(206, 0, 113),#074f86) !important;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
  }
</style>