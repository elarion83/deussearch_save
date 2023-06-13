<template lang="html">

  <div>    

      <v-speed-dial
        v-model="dialShare"
        absolute
        right
        bottom
        direction="left"
        open-on-hover
      >
        <template v-slot:activator>
          <v-btn fab bottom small color="primary">
            <v-icon  class="btn_share_activ" v-if="dialShare">mdi-close</v-icon>
            <v-icon  class="btn_share_activ" v-else>mdi-share-variant</v-icon>
          </v-btn>
        </template>
        <ShareNetwork
            network="facebook"
            :url = url
            :title= Sharetitle
            :description= Sharedescription
            class="ml-2 share_buttons"
            >
            <font-awesome-icon class="whitesvg ":icon="['fab', 'facebook-f']" />
        </ShareNetwork>
      
        <ShareNetwork
            network="twitter"
            :url = url
            :title= Sharetitle
            :description= Sharedescription
            hashtags="gaming,deussearch"
            class="ml-2 share_buttons"
            >
            <font-awesome-icon class="whitesvg ":icon="['fab', 'twitter']" />
        </ShareNetwork>
        <ShareNetwork
            network="Email"
            :url = url
            :title= Sharetitle
            class="ml-2 share_buttons"
        >
            <font-awesome-icon class="whitesvg ":icon="['fa', 'envelope']" />
        </ShareNetwork>
      </v-speed-dial>
  </div>

</template>

<script lang="js">

  export default  {
    name: 'social-share',
    props:['title', 'description'],
    mounted () {

    },
    data () {
      return {
        dialShare:false,
        Sharetitle:this.$props.title,
        url: 'https://www.deussearch.fr'+this.$nuxt.$route.fullPath,
        Sharedescription:this.$props.description
      }
    },
    methods: {

    },
    computed: {

    },
    mounted() {
    }
}


</script>

<style>
  .share_buttons {
    background: rgb(10, 10, 32) !important;
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 50%;
  }
.whitesvg {
    color:white !important;
}
.share_buttons:hover {
    background: rgb(20, 20, 20) !important;
  }
  .btn_share_activ {
    color: rgb(10, 10, 32) !important;
  }
</style>
