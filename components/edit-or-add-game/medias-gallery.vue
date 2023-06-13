<template lang="html">
  <section class="contact-section">
    <div class="main_col_single_game">
      
      <v-row class="pr-3">
          <v-col
            cols="3"
            v-for="(media, mediaIndex) in mediasUsed"
            :key="mediaIndex"
            class="pr-0 mb-0 pb-0 img_screen"
          > 
            <v-img
              v-if="checkMediaType(media) == 'img'"
              :src="media"
              :lazy-src="media"
              aspect-ratio="1"
              class="pr-0 c-pointer img"
            >
            </v-img>
            <video v-if="checkMediaType(media) == 'video'" class="gallery_video" id="video_player" controls="" muted="">
              <source :src="media" type="video/mp4">
              Sorry, your browser doesn't support embedded videos.
            </video>
            <v-icon :title="$t('message.media_gallery_remove_this_media')" v-on:click="removeMedia(mediaIndex)">
              mdi-close-circle
            </v-icon>
          </v-col>
          <v-col
          v-if="mediasUsed.length < limit"
            cols="3"
            class="pr-0 mb-0 pb-0 img_screen media_add_button"
            >
            <v-img :title="$t('message.media_gallery_add_a_media')" v-on:click="currentlyAddingMedia = true"
              src="http://img.deussearch.fr/static/add_media_to_game.png"
              aspect-ratio="1"
              class="pr-0 c-pointer img"
            >
          </v-img>
          </v-col>
      </v-row>
    </div>

    <v-dialog v-model="currentlyAddingMedia" max-width="500"> 
      <v-card class="edit_profile_modal edit_game">
          <v-card-title class="headline">
            {{ $t('message.media_gallery_add_a_media') }}
          </v-card-title>
          <v-card-text> 
            {{ $t('message.media_gallery_add_a_media_text') }}
          </v-card-text>
          <v-card-text>
           <v-text-field
              v-model="addedMediaUrl"
              :label="$t('message.media_gallery_add_a_media_url')"
              :placeholder="$t('message.media_gallery_add_a_media_url')"
            ></v-text-field>
          </v-card-text>
          <v-card-actions v-if="addedMediaUrl.length > 0">
            <v-btn
              color="deep-purple lighten-2"
              text
              v-on:click="addMedia(addedMediaUrl)"
            >
              {{ $t('message.general_add')}}
            </v-btn>
          </v-card-actions>
       </v-card>
    </v-dialog>
    <v-snackbar
      timeout="6000"
      v-model="addingMediaIssue"
    >
     {{ $t('message.media_gallery_add_a_media_issue_format') }}
    </v-snackbar>
  </section>
</template>

<script>
  import LazyYoutube from "vue-lazytube";
  export default  {  
    name: 'media-gallery',
    props:['medias', 'limit'],
    data () {
      return { 
        'mediasUsed':[],
        'currentlyAddingMedia':false,
        'addingMediaIssue':false,
        'addedMediaUrl': '',
        LazyYoutube
      }
    },
    created() {
      if(this.$props.medias && typeof this.$props.medias != 'string') { // if has media and is not a string
        this.mediasUsed = this.$props.medias;
      } 
      if(typeof this.$props.medias == 'string') { // if has only one media (like featured img)
        this.mediasUsed.push(this.$props.medias);
      }
    },
    methods: {
      removeMedia(id) {
        this.mediasUsed.splice(id, 1);
      },
      addMedia(media) {
        if(!media.endsWith('.jpg') && !media.endsWith('.png') && !media.endsWith('.webp') || media.endsWith('.mp4') ) {
          this.addingMediaIssue = true;
        } else {
          this.mediasUsed.push(media);
          this.addedMediaUrl = '';
          this.currentlyAddingMedia = false;
        }
      },
      checkMediaType(url) {
        if(url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.webp')) {
          return 'img';
        }
        if(url.endsWith('.mp4')) {
          return 'video';
        }
      }
    }
  }
</script>

<style>
.img_screen .mdi-close-circle{
  position: absolute !important;
  top: 12px;
  right: 0px;
  background: rgba(7, 7, 22, 0.8);
  padding: 5px;
}

.img_screen .mdi-close-circle::before {
  color: #ff2424;
}

.media_add_button {
  text-align:center;
}

.gallery_video {
  height: 100%;
  width: 100%;
}

</style>
