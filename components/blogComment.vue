<template>
  <div class="p-0 mt-2 contact-area text_page single_post_content comment_section">
    <h4 class="p-2 article_infos"> Espace commentaire</h4>
    <form v-if="usedUser && comment_status == 'open'" class="pl-4 pr-4 pt-0" v-on:submit.prevent="submitComment">
      <v-row class="mt-1">
        <div class="col-12 col-sm-2 col-md-2 pt-2">
          <v-avatar>
            <v-img
              :src="'https://img.deussearch.fr/static/avatars/botts'+usedUser.avatar+'.svg'"
              aspect-ratio="1"
            >
            </v-img>
          </v-avatar>
          <p class="comm_pseudo"> {{ usedUser.pseudo }}  </p>
        </div>
        
        <div class="col-12 col-sm-10 col-md-10 p-0">
          <v-textarea
            filled
            counter
            class="pt-0 mt-0 textarea_comment"
            label="Ecrire un commentaire (25 charactères min.)"
            v-model="text"
            rows="2"
            row-height="20"
          ></v-textarea>
          <v-col v-if="text.length > 25" class="text-right submit_comm_btn pt-0 pr-0">
            <button name="submit" id="submit" class="btn btn-primary">Commenter</button>
          </v-col>
          
          <v-snackbar
            class="comm_send_snack"
            timeout="6000"
            v-model="comm_send"
          >
            Commentaire envoyé !
          </v-snackbar>
          
          <v-snackbar
            timeout="6000"
            v-model="comm_error"
          >
            {{ comm_message }}
          </v-snackbar>

        </div>
      </v-row>  
    </form> 
    <button v-if="usedUser == null && comment_status == 'open'" name="submit" id="submit" class="mb-3 btn btn-primary" :title="$t('message.login_register_title')" @click.stop="loginmodaldisplayed = true" >Se connecter pour commenter</button>
    <p class="pl-3" v-if="comment_status != 'open'">
      <b>Les commentaires sont désactivés pour cet article.</b>
    </p>
    <v-dialog
      v-model="loginmodaldisplayed"
      v-if="usedUser == null"
      max-width="450"
    >
      <login-register-modal :tab_open="1" @logUserIn="logUserIn">
      </login-register-modal>
    </v-dialog>

    <div class="pl-4 pb-1 pr-4" v-if="comment_list != null">
      <span class="span_mini_title"> Tous les commentaires  ({{ comment_list.length }}) </span>
      <v-row class="row_comment_list mb-3" v-for="(comment, id) in comment_list" :key="id">
        <div class="col-sm-12 col-md-12 p-2 comm_content mb-3">
          <div class="text" v-html="comment.content.rendered">
          </div>
          <span class="text_right date p-2"> 
            <span class="minitext">Le</span> <font-awesome-icon class="ml-1 mr-1" :icon="['fa', 'calendar-alt']" />{{ $dateFns.format(comment.date, 'dd MMM yyyy à HH:MM') }} 
            <span class="minitext">Par</span>
            <v-avatar class="ml-1 mr-1 mini_avatar" size="20px">
            <v-img
              :src="comment.author_url"
              aspect-ratio="1"
            >
            </v-img>
          </v-avatar> {{ comment.author_name }}
          </span>
        </div>
    </v-row> 
    <p class="pl-2" v-if="comment_list.length == 0">
      <b>Aucun commentaire, soyez le premier à commenter cette actualité !</b>
    </p> 
  </div>
  </div>
</template>

<script lang="js">
  import loginRegister from '../components/login';
  import CoolLightBox from 'vue-cool-lightbox'
  import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
  export default  {
    name: 'commentblog',
    components: {
      'login-register-modal': loginRegister
    },
    props: ['display', 'currentuser', 'comment_status', 'post_id'],
    data () {
      return {
          text:'',
          post_id_displayed : this.$props.post_id,
          usedUser:null,
          comm_send:false,
          comm_error:false,
          comm_message:'',
          loginmodaldisplayed:false,
          comment_list:null,
      }
    },
    methods: {
      submitComment() {
          this.$http.post('https://blog.deussearch.fr/wp-json/wp/v2/comments', 
          { 
            'author_email': this.usedUser.email, 
            'author_name': this.usedUser.pseudo, 
            'author_id': this.usedUser.id, 
            'author_url':'https://img.deussearch.fr/static/avatars/botts'+this.usedUser.avatar+'.svg',
            'content': this.text, 
            'post':this.post_id 
          }).then((response) => {
              if(response.status == 201) {
                this.comm_send = true;
                this.text = '';
              }
              var comp = this;
              this.$axios.$get('https://blog.deussearch.fr/wp-json/wp/v2/comments?post='+this.post_id_displayed)
                .then(function(response) {
                  comp.comment_list = response;
                })
                .catch(function(error) {
              });
          }, (response) => {
              console.log('Error');
              this.comm_error = true;
              this.comm_message = 'Une erreur est survenue, peut-être avez-vous avez déjà envoyé ce commentaire.';
              this.text = '';
          });
      },
      logUserIn() {
        this.loginmodaldisplayed = false;
        this.loggedin = true;
        this.LoggedSnackBar = true;
        this.LoggedSnackBarMessage = "Connecté";
      },
      logout() {
        this.$cookies.remove("deussearch_connected");
        this.$cookies.remove("deussearch_user");
        this.$router.push('/');
        this.loggedin = false;
        this.LoggedSnackBar = true;
        this.LoggedSnackBarMessage = "Déconnecté";
      }
    },
    mounted() {
      var comp = this;
      this.$axios.$get('https://blog.deussearch.fr/wp-json/wp/v2/comments?post='+this.post_id_displayed)
        .then(function(response) {
          comp.comment_list = response;
        })
        .catch(function(error) {
        });

      this.usedUser = JSON.parse(this.$props.currentuser);
    }
  }


</script>

<style>
.textarea_comment .v-input__slot {
  padding-right:0 !important;
}

.textarea_comment textarea {
  border:none;
}

p.comm_pseudo {
  font-weight: bolder;
  font-size: 14px !important;
  text-align: center !important;
  color: #1c1d55 !important;
}

.row_comment_list .comm_content {
  background: #171744;
  border-radius: 5px;
  min-height: 100px;
  border-top-left-radius: 10px;
  text-align: right;
}


.row_comment_list .comm_content p {
  color: rgb(224, 224, 224);
  font-family: 'Hamlin' !important;
}

.row_comment_list .comm_content .date {
  font-size: 14px;
  font-style: italic;
  z-index: 2;
  position: absolute;
  width: 100%;
  right: 0;
  bottom: -30px;
  background: #0d0d28;
}

.row_comment_list .comm_content .text{
  z-index: 2;
  position: inherit;
  text-align: left;
}

.span_mini_title {
  display: flex;
  margin-bottom: 2em;
  font-size: 12px;
  color: #3e3d3d;
  border-bottom: 1px solid #c6c6c6;
}

.submit_comm_btn {
  margin-top: 0px;
}

.comm_send_snack .v-snack__content{
  background: #26b026;
}

.mini_avatar {
  background: white;
  margin-top: -5px;
}

.minitext {
    font-size: 12px !important;
}
</style>
