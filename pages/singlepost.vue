<template lang="html">
  <div>
   <head-banner class="single_post_head"></head-banner>
    <section class="contact-section bg profil" v-if="loaded === true">
        <div class="presentation container">
            <div class="row justify-content-center">
                <div class="col-lg-12 text-center">
                  <v-row>
                    <div class="col-md-8 pt-0">
                      <div class="p-0 contact-area text_page single_post_content ">
                        <v-container fluid class="p-0">     
                              <social-share class="share_post_top" :title="content.title.rendered" :description="content.excerpt.rendered"></social-share>
                              <img class="mb-3 single_post_img" :src="content.better_featured_image.source_url" :title="content.title.rendered">   
                              <h1 class="mb-4 pl-4 pr-4">{{ content.title.rendered | strreplace(content.title.rendered)}} </h1>
                              <div class="pl-4 pr-4" v-html="content.content.rendered">
                              </div> 
                              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                              <social-share :title="content.title.rendered" :description="content.excerpt.rendered"></social-share>
                        </v-container>
                        <ul class="article_infos mt-3 ml-0 mb-0">
                          <li class="mb-1">
                            <font-awesome-icon class="mr-2" :icon="['fa', 'calendar-alt']" /> Publié le {{ content.formatted_date}}
                          </li>
                          <li class="mb-1">
                            <font-awesome-icon class="mr-2" :icon="['fa', 'user']" /> Par DeusSearch
                          </li>
                        </ul>
                      </div>
                        <blog-comment :comment_status="content.comment_status" :currentuser="actualUser" :post_id="content.id"></blog-comment>

                    </div>
                    
                    <div class="text_page col-md-4 pt-0 pl-0">
                        <v-container class="p-0 alt_col contact-area text-left" fluid>
                          <ul class="m-0">
                            <li v-if="game_subject && game_subject.game_name" class="game_about single_post_content mb-4 pb-1">
                              <div class="genres_list">
                                <span v-if="game_subject.genres" v-for="(genre,id) in game_subject.genres">
                                      {{ genre.name_genre }}
                                </span>
                              </div>
                              <router-link target="_blank" :title="$t('message.general_know_more')+''+game_subject.game_name" :to="{ name: 'single_game', params: { gamename: game_subject.slug , gameid: content.acf.id_du_jeu }}" class="mb-2">
                                <img class="col-lg-12 p-0" :src="game_subject.img_url" :title="$t('message.general_know_more')+' '+game_subject.game_name">
                                <p class="pa-2 pb-0 mb-0">{{ $t('message.general_know_more') }} {{ game_subject.game_name }}</p> {{ }}
                              </router-link>
                            </li>
                            <li v-for="post in posts" v-if="post.id != content.id" class="single_post_content more_news mb-4">
                              <router-link class="col-lg-12 p-0 blog_link" :to="{ name: 'singlepost', params: { postslug: post.slug , postid: post.id }}"> 
                                <img class="col-lg-12 p-0" :src="post.better_featured_image.media_details.sizes.medium.source_url" :title="post.title.rendered">
                                <span><font-awesome-icon class="ml-1 mr-1" :icon="['fa', 'calendar-alt']" />  {{ post.formatted_date}} </span>
                                <p class="pa-2 mb-0 col-lg-12">{{ post.title.rendered | strreplace(post.title.rendered)}}</p>
                              </router-link>
                            </li>
                          </ul>      
                        </v-container>
                    </div>
                  </v-row>
                </div>
            </div>
        </div>
        <liste-articles-blog offset="1" nbarticles="6" no-ssr /></liste-articles-blog>
        <streamers-partners></streamers-partners>
    </section>
    <section class="contact-section bg profil" v-if="!loaded">
        <div class="presentation container">
            <div class="row justify-content-center">
              <loading></loading>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import HomeBlog from '../components/Home/HomeBlog';
  import Loading from '../components/loading';
  import blogComment from '../components/blogComment';
  import HeadBanner from '../components/HeadBanner';
  export default {
    scrollToTop: true,
    name:'SinglePost',
    props:['used_lang_for_route', 'locale', 'page_title', 'page_wp_id'],
    data () {
      return {
        content:'',
        posts: '',
        game_subject:'',
        loaded:false,
        actualUser:null
      }
    },
    components: {
      'head-banner' : HeadBanner,
      'liste-articles-blog' : HomeBlog,
      'blog-comment' : blogComment,
      'loading' : Loading
    },
    async asyncData({ $axios, params}) {
      const post = await $axios.get('https://blog.deussearch.fr/wp-json/wp/v2/posts/'+params.postid);
      const post_data = post.data;
      return {
       post_data
      }
    },
    head() {
        return {
        title: this.post_data.title.rendered,
        meta: [
          { hid: 'description', name: 'description', content: this.post_data.excerpt.rendered },
          {
            hid: 'og:image',
            content: this.post_data.better_featured_image.source_url,
            property: 'og:image'
          },
          {
            hid: 'og:type',
            content: 'website',
            property: 'og:type'
          },
          {
            hid: 'twitter:card',
            content: 'summary_large_image',
            property: 'twitter:card'
          },
          {
            hid: 'og:title',
            content: this.post_data.title.rendered,
            property: 'og:title'
          },
          {
            hid: 'twitter:title',
            content: this.post_data.title.rendered,
            property: 'twitter:title'
          },
          {
            hid: 'twitter:description',
            content: this.post_data.excerpt.rendered,
            property: 'twitter:description'
          },
          {
            hid: 'twitter:image',
            content: this.post_data.better_featured_image.source_url,
            property: 'twitter:image'
          },
          {
            hid: 'twitter:image:src',
            content: this.post_data.better_featured_image.source_url,
            property: 'twitter:image:src'
          }
        ]
      }
    },
    mounted () {    
        $(window).scrollTop(0);
        this.content = this.post_data;
        var comp = this;
        this.$axios.$post('https://api.deussearch.fr/get_game_by_id.php?gid='+this.post_data.acf.id_du_jeu+'&with_genres=1')
        .then(function(response) {
            comp.game_subject = response[0];
        })
        .catch(function(error) {
        });
        this.loaded = true;
    }, 
    created() {
      this.actualUser = this.$cookies.get('deussearch_user');
      this.$http.$get("https://blog.deussearch.fr/wp-json/wp/v2/posts?per_page=5").then(result => {
          this.posts = result;
      }, error => {
      });
    },
    filters: {
      strreplace: function (st) {
        const result = st.replaceAll('&rsquo;', "'");
        return result;
      }
    },
  }
</script>

<style>
.blog_card .v-card__title{
    color: #1c1d55;
}

.blog_card {
    text-align: left;
}

.blog_card p {    
    color: #4d4b4b;
}

.single_post_head {
  padding-top: 150px !important;
}

.single_post_content h1{
  text-align: left;
  font-size: 40px;
}

.single_post_content a,
.single_post_content h1 ,
.single_post_content h2,
.single_post_content h3,
.single_post_content h4 {
  color:var(--bg-second-color);
  font-weight: bold;
}

.single_post_content h2::after {
  background-color:var(--bg-second-color) !important;
}


.single_post_content h3,
.single_post_content h4 {
  text-align: left !important;
  font-size: 1.4em !important;
  margin-bottom: 15px !important;
}

.single_post_content h4 {
  font-size: 1.2em !important;
}

.single_post_content h3::after,
.single_post_content h4::after {
  background-color:var(--bg-second-color) !important;
}

.single_post_content p, 
.single_post_content li {
    color: #4d4b4b;
}

.single_post_content p {
  margin-bottom: 15px;
  font-family:  'Open Sans', sans-serif !important;
}

.single_post_content blockquote {
  font-size: 1em;
  width: 100%;
  margin: 20px auto;
  font-family: Lato;
  font-style: italic;
  color: #555;
  text-align: right;
  padding: 1.2em 30px 1.2em 75px;
  border-left: 8px solid #ccc;
  line-height: 1.6;
  position: relative;
  background: #ededed;
}

.single_post_content blockquote cite {
    font-family: Hamlin;
    font-size: 0.8em;
    font-weight: bold;
}

.single_post_content blockquote::before {
  font-family: Arial;
  content: "\201C";
  color: #999;
  font-size: 4em;
  position: absolute;
  left: 10px;
  top: -10px;
}

.single_post_content {
    background-color: #f4f4f4 !important;
}

.article_infos {
  background: #eaeaea;
  padding: 10px;
  margin-top: 0;
}

.article_infos, 
.article_infos li {
  font-family: oswald;
  color: #1c1d55 !important;
  list-style-type: none !important;
  text-align: left;
  width: 100%;
  margin-bottom: 2em;
}

.share_post_top .v-speed-dial {
  top: 16px;
  bottom: initial;
}

figcaption {
  font-size: 0.8em;
  font-style: italic;
  color: gray;
  margin-top:0.3em;
}

.twitter-tweet {
  margin-left: auto;
  margin-right: auto;
}


.alt_col ul {
  list-style-type: none !important;
}

.alt_col li {
  border-radius: 5px;
}


.alt_col a p {
  font-size: .9em;
  color: #1c1d55 !important;
  padding: 10px;
  font-weight: bold;
}


.alt_col a:hover p {
  color: rgb(0, 89, 141) !important;
}

.alt_col a {
  display: block;
}

.alt_col span {
  position: absolute;
  top: 10px;
  left: 10px;
  background:#074f86 !important;
  padding: 5px;
  font-size: 0.7em;
  border-radius: 4px;
}

.alt_col.contact-area {
  background:none;
}

.single_post_content a {
  color: #1c1d55 !important;
}

.alt_col a:hover,
.single_post_content a:hover {
  color: #1c1d55 !important;
}
@media (max-width: 770px) {
  .contact-area.alt_col {
    display: none;
  }
}

.wp-block-embed__wrapper iframe {
  width: 100%;
}

.single_post_img {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
}


.more_news p {
  position: absolute;
  bottom: 0;
  background: rgba(255, 255, 255, 0.726);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}

.more_news:hover p {
  padding-bottom: 25px;
  background: rgba(255, 255, 255, 1);
}


.game_about .genres_list {
  position: absolute;
}
.game_about .genres_list span{    
  z-index: 9;
  background: rgba(7, 7, 22, 1) !important;
  position: relative;
  padding: 2px 7px;
  font-family: 'Hamlin';
  display: inline-block;
  margin-right: 1em;
}

</style>