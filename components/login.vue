<template lang="html">
  <div class="login_modal">
    <v-tabs v-model="tab_openn" slider-color="yellow"  class="login_slid" v-if="!lost_password">
    <v-tab :key="1">
      {{ $t('message.login_title') }} 
    </v-tab>
    <v-tab-item :key="1">
      <v-card color="transparent" class="login_modal_content">
        <v-card-text>
          <form @submit.prevent="userLogin">
              <v-text-field
                label="E-mail"
                v-model="login.email"
                :rules="emailRules"
                name="loginmail"
                filled
                persistent-hint
                hint="mail@mail.fr"
                required
              ></v-text-field>
              <v-text-field
                :label="$t('message.login_register_field_password')"
                v-model="login.password"
                name="loginpass"
                minlength="8"
                filled
                required
                :append-icon="login.showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="login.showpassword ? 'text' : 'password'"
                counter
                @click:append="login.showpassword = !login.showpassword"
              ></v-text-field>
              <p v-if="login.submitted" :class="login.messageType+' pass_status_message mb-2'">
                {{ $t('message.login_'+login.message) }}
              </p>
              <v-btn
                color="primary"
                type="submit"
              >
                {{ $t('message.login_title') }}
              </v-btn>
              <span class="mdp_link" @click="lost_password=true">  {{ $t('message.lost_password_btn') }} </span>
          </form>
        </v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab :key="2">
      {{ $t('message.register_title') }}
    </v-tab>
    <v-tab-item :key="2">
      <v-card flat>
        <v-card-text>
          <form @submit.prevent="userRegister">
              <v-text-field
                required
                filled
                :rules="emailRules"
                label="E-mail"
                hint="mail@mail.fr"
                persistent-hint
                v-model="register.email"
              ></v-text-field>
              <v-text-field
                required
                :label="$t('message.login_register_field_pseudo')"
                minlength="5"
                maxlength="25"
                counter
                filled
                hint="Jijou, PonceFleur, .."
                persistent-hint
                v-model="register.pseudo"
              ></v-text-field>
              <v-text-field
                required
                filled
                :label="$t('message.login_register_field_password')"
                minlength="8"
                v-model="register.password"
                :append-icon="register.showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="register.showpassword ? 'text' : 'password'"
                counter
                :hint="$t('message.password_notice')"
                persistent-hint
                @click:append="register.showpassword = !register.showpassword"
              ></v-text-field>
              <v-text-field
                :hint="$t('message.password_repeat_notice')"
                persistent-hint
                required
                filled
                :label="$t('message.login_register_field_password_again')"
                minlength="8"
                :rules="[passwordConfirmationRule]"
                v-model="register.password_repeat"
                :append-icon="register.showpassword_repeat ? 'mdi-eye' : 'mdi-eye-off'"
                :type="register.showpassword_repeat ? 'text' : 'password'"
                counter
                @click:append="register.showpassword_repeat = !register.showpassword_repeat"
              ></v-text-field>
              <p  v-if="register.submitted" :class="register.messageType+' pass_status_message mb-2'">
                {{ $t('message.register_'+register.message) }}
              </p >
               <v-checkbox required>
                <template v-slot:label>
                  <p class="mdp_link accept_mention">
                      {{ $t('message.login_register_cookie_sentence_1') }}
                      <router-link :to="{ name: 'cgu_'+$i18n.locale}" > {{ $t('message.login_register_cookie_sentence_link') }} </router-link>
                      {{ $t('message.login_register_cookie_sentence_2') }}
                </p>
                </template>
              </v-checkbox>
              <v-btn
                color="primary"
                type="submit"
              >
              {{ $t('message.register_title') }}
              </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
  <div v-else  class="mdp_tab"> 
    <v-card flat>
      <v-card-title>
        <p>{{ $t('message.lost_password_title') }} </p>
      </v-card-title>
      <v-card-text>
        <span class="info">{{ $t('message.lost_password_description') }} </span>  
        <form @submit.prevent="passRecover">
          <v-text-field
            required
            :rules="emailRules"
            label="E-mail"
            filled
            hint="mail@mail.fr"
            persistent-hint
            v-model.lazy="pass_recovery.email"
          ></v-text-field>   
          <v-btn
            v-if="pass_recovery.email"
            color="primary"
            type="submit"
          >
          {{ $t('message.general_send') }}
          </v-btn>  
        </form>
        <p class="pass_status_message" v-if="pass_recovery.status=='mail_sent'">
         {{ $t('message.lost_password_mail_sent')}}
        </p>
        <p class="pass_status_message" v-if="pass_recovery.status=='no_mail_registered'">
          {{ $t('message.lost_password_mail_not_found')}}
        </p>
        <span class="mdp_link"  @click="lost_password=false"> {{ $t('message.general_back') }} </span>
      </v-card-text>
    </v-card>
  </div>
  </div>
</template>


<script>

export default {
  props: ['tab_open'],
  components: {
  },
  data() {
    return {
      lost_password:false,
      pass_recovery:{
        email:'',
        status:null
      },
      login: {
        submitted:false,
        email: '',
        password: '',
        message :'',
        messageType:'error',
        showpassword:false
      },
      register: {
        submitted:false,
        email:'',
        password:'',
        pseudo:'',
        message:'',
        messageType:'error',
        showpassword:'',
        password_repeat:'',
        showpassword_repeat:''
      },
      actualUser:null,
      emailRules: [ 
          v => !!v || 'Email is needed.', 
          v => /.+@.+/.test(v) || 'E-mail invalid.' 
      ]
    }
  },
  created() {
    this.tab_openn = this.$props.tab_open;
    this.actualUser = this.$cookies.get('deussearch_user');
  },
  computed: {
    passwordConfirmationRule() {
            return () => (this.register.password === this.register.password_repeat) || 'Passwords must match'
    }
  },
  methods: {
    async passRecover() {
      var comp = this;
      this.$axios.$post('https://api.deussearch.fr/user_recover_password.php', 
      {'credentials' : this.pass_recovery})
      .then(function (response) {
        comp.pass_recovery.status=response.message;
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    async userLogin() {
      var comp = this;
      this.$axios.$post('https://api.deussearch.fr/user_login.php', 
      {'credentials' : this.login})
      .then(function (response) {
        comp.login.message = response[0].message;
        comp.login.submitted = true;
        if(response[0].message == "connected") {
          comp.login.messageType = "success";
          comp.$cookies.set('deussearch_connected', '1', {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
          
          comp.$cookies.set('deussearch_user', response[0], {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
          comp.$emit("logUserIn");
          $nuxt.$emit('nuxt_bus_event_login');
          comp.$router.push({ name: 'profil' });
        }
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    async userRegister() {
      
      var comp = this;
      this.$axios.$post('https://api.deussearch.fr/user_register.php', 
      {'credentials' : this.register})
      .then(function (response) {
        comp.register.message = response.message;
        comp.register.submitted = true;
        if(response.message == "registered") {
          comp.register.messageType = "success";
          comp.$cookies.set('deussearch_connected', '1', {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
          
          comp.$cookies.set('deussearch_user', response.user[0], {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
          comp.$emit("logUserIn") ;
          $nuxt.$emit('nuxt_bus_event_login');
          comp.$router.push({ name: 'profil' });
        }
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }
}
</script>

<style scoped >

.login_modal .v-tab {
  color: #40399f;
}
/* 
.login_slid .v-window-item{
  background-image: url('https://www.deussearch.fr/_nuxt/img/banner.bd7aab4.png');
}

.login_modal_content {
  background-color: transparent !important;
} */

.login_slid .v-window-item::before {
  content:'';
  display: block;
  background-color:#00598d6b !important;
}

.login_modal button {
  margin-left: auto;
  display: block;
  background-image: linear-gradient( -30deg, rgb(193,101,221) 0%, rgb(92,39,254) 100%);
}


.mdp_tab p {
  flex: 0 1 auto;
  font-size: 0.875rem;
  font-weight: 500;
  color: #40399f;
  padding: 10px;
  padding-top: 0px;
  border-bottom: 2px solid black;
  justify-content: center;
  letter-spacing: 0.0892857143em;
  line-height: normal;text-transform: uppercase;
}
.mdp_tab span.info{    
    color: #737171;
    text-transform: none;
    font-size: 0.95em;
}

.mdp_link {
  display: block;
  font-size: 0.9em;
  color: #736d6d;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
}

.mdp_link:hover {
  color: black;
}

.pass_status_message {
    font-size: 0.9em !important;
    padding: 0 10px;
    text-transform: none !important;
    border-bottom:none !important;
    margin-top: 1em;
    color: #40399f;
    padding-bottom: 0 !important;
    border-left: 2px solid #8943ef;
}

.pass_status_message.error {
  border-left: 2px solid #ef6b43;
}

.accept_mention {
  font-size: 0.7em;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 11px;
  margin-top: 5px;
  text-decoration: none;
  line-height: 14px;
}

.accept_mention a {
  text-decoration: underline !important;
}

</style>