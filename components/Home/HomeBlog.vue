<template lang="html">
    <section class="about-section bg pb-60 pt-3">
      <div class="container deus_list_index">
          <h2> Le blog  </h2>
          <h3> Retrouves ici les derniers articles du blog    </h3>
          <div  v-if="loaded === true">
            <v-container fluid>
                <v-row>
                    <v-col
                    v-for="post in posts" 
                    :key="post.id"
                    cols="12" sm="6" md="4"
                    >
                      <v-card class="blog_card">
                          <router-link class="blog_link"  :title="$t('message.general_know_more')+' '+post.title.rendered" :to="{ name: 'singlepost', params: { postslug: post.slug , postid: post.id }}"> 
                              <v-img
                              height="200px"
                              :src="post.better_featured_image.source_url"
                              >
                              </v-img>
                              <v-card-subtitle class="pb-0"><font-awesome-icon class="mr-2" :icon="['fa', 'calendar-alt']" /> {{ post.formatted_date }}</v-card-subtitle>

                              <v-card-text class="text--primary">
                                  <v-card-title class="pl-0 pr-0"><h2>{{post.title.rendered | strreplace(post.title.rendered) }}</h2></v-card-title>
                                  <p v-html="post.excerpt.rendered"></p>
                              </v-card-text>
                          </router-link>
                      </v-card>
                    </v-col>
                </v-row>
                <router-link :to="{ name: 'blog'}" class="cmn-btn mt-3"  >  Voir le blog <font-awesome-icon  :icon="['fas', 'long-arrow-alt-right']" /> </router-link>
            </v-container>
          </div>
          <loading v-else></loading>
      </div>
    </section>

</template>

<script lang="js">


  export default  {
    name: 'home-blog',
    props: [],
    data () {
      return {
        posts:'',
        loaded:false,
        contentType:''
      }
    },
    created() {
      this.$http.$get("https://blog.deussearch.fr/wp-json/wp/v2/posts?per_page=3").then(result => {
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
    }
}


</script>

<style >
  .blog_card {
    height: 100%;
  }
</style>
