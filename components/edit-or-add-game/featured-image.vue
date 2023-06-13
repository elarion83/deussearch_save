<template lang="html">
  <section class="contact-section">
    <div class="main_col_single_game">
        <v-row class="pr-3">
          <v-col
            v-if="medias"
            cols="3"
            class="pr-0 mb-0 pb-0 img_screen"
          > 
            <v-img
              :src="medias"
              :lazy-src="medias"
              aspect-ratio="1"
              class="pr-0 c-pointer img"
            >
            </v-img>
            <v-icon :title="$t('message.media_gallery_remove_this_media')" v-on:click="removeMedia(mediaIndex)">
              mdi-close-circle
            </v-icon>
          </v-col>
          <v-col
            v-if="medias == ''"
            cols="3"
            class="pr-0 mb-0 pb-0 media_add_button"
            >
            <v-img  :title="$t('message.media_gallery_add_a_media')" v-on:click="currentlyAddingMedia = true"
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
  export default  {  
    name: 'edit-featured-image-gallery',
    props:['medias'],
    data () {
      return { 
        'currentlyAddingMedia':false,
        'addingMediaIssue':false,
        'addedMediaUrl': ''
      }
    },
    methods: {
      removeMedia(id) {
        this.$props.medias = '';
        this.$emit('updateImage', this.$props.medias);
      },
      addMedia(media) {
            if(!media.endsWith('.jpg') && !media.endsWith('.png') && !media.endsWith('.webp') || media.endsWith('.mp4') ) {
             this.addingMediaIssue = true;
            } else {
                this.$props.medias = media;
                this.addedMediaUrl = '';
                this.currentlyAddingMedia = false;
                this.$emit('updateImage', this.$props.medias);
            }
        }
    }
  }
</script>