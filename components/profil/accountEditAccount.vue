<template lang="html">
    <section class="alluserprofiles edit_account_form">
        <v-form class="text-right">
            <v-container class="pl-0 pr-0">
                <v-col
                    cols="12"
                    sm="12"
                    class="top-create-profil-head pl-3 pt-2 pb-2"
                >
                    <span class="profil_user_span">{{ $t('message.personnal_datas') }}</span>
                </v-col>
                <v-row class="edit_info_form">
                        <v-col
                        cols="12"
                        md="4"
                        class="text-left"
                        
                        >
                            <label> Pseudo *</label>
                            <v-text-field
                                v-model="currentuser.pseudo"
                                required
                                clearable
                                filled
                                prepend-icon="mdi-account"
                            ></v-text-field>
            
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        class="text-left"
                        >
                            <label> E-mail *</label>
                            <v-text-field
                                v-model="currentuser.email"
                                required
                                filled
                                :rules="emailRules"
                                clearable
                                prepend-icon="mdi-email"
                            ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        class="text-left"
                        >
                            <label> {{$t('message.new_password')}}</label>
                            <v-text-field
                                required
                                v-model="newpass"
                                filled
                                :input="updatePassLocally()"
                                clearable
                                prepend-icon="mdi-lock"
                                :hint="$t('message.password_notice')"
                            ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        class="text-left"
                        >
                            <label> ID Steam </label>
                            <v-text-field
                                v-model="currentuser.steamappid"
                                required
                                filled
                                clearable
                                prepend-icon="mdi-steam"
                            ></v-text-field>
                        </v-col>
                        

                        <v-col
                        cols="12"
                        md="12"
                        class="text-left"
                        >
                            <label> {{$t('message.biography')}} </label>
                            <v-textarea
                                required
                                v-model="currentuser.description"
                                filled
                            ></v-textarea>
                        </v-col>
                </v-row>
                
                 <!-- <v-col
                    cols="12"
                    sm="12"
                    class="top-create-profil-head mt-4 pl-3 pt-2 pb-2"
                >
                    <span class="profil_user_span">
                        {{$t('message.my_wallet_crypto')}}
                    </span>
                </v-col>
               <v-row class="edit_info_form">
                    <v-col
                    cols="12"
                    md="6"
                    class="text-left"
                    
                    >
                        <label>{{$t('message.my_metamask')}} </label>
                        <v-text-field
                            v-model="currentuser.metamask"
                            required
                            clearable
                            filled
                            prepend-icon="mdi-card-account-mail-outline"
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    class="text-left"
                    
                    >
                        <label> {{$t('message.my_deuscoin_amount')}}</label>

                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                    color="primary "
                                    dark
                                    v-bind="attrs"
                                    v-on="on" 
                                    class="help_tooltip"
                                    >
                                    mdi-help-circle
                                    </v-icon>
                                </template>
                                <span>{{$t('message.deuscoin_explanation')}}</span>
                            </v-tooltip>

                        </label>
                        <v-text-field
                            value="0"
                            disabled
                            filled
                            prepend-icon="mdi-currency-usd"
                        ></v-text-field>
                    </v-col> 
                </v-row> -->
                <v-btn
                    class="mt-5 acount_edit_submit mb-0"
                    v-on:click="CheckForUpdatedAccount()"
                    >
                    <v-icon
                    right
                    dark
                    class="mr-3 ml-1"
                    >
                    mdi-content-save
                    </v-icon>
                    {{ $t('message.general_save' )}}
                </v-btn>
            </v-container>
        </v-form>
        <v-snackbar class="success_snack" v-model="update_account_dialog" v-if="account_is_fully_complete">
            {{$t('message.modification_success')}} 
            <template v-slot:action="{ attrs }">
                <v-btn
                class="pl-2"
                text
                v-bind="attrs"
                @click="update_account_dialog = false"
                >
                <font-awesome-icon :icon="['fa', 'times']" />
                </v-btn>
            </template> 
        </v-snackbar>
        <v-snackbar class="error_snack" v-else v-model="update_account_dialog">
            {{$t('message.modification_error')}}
            <template v-slot:action="{ attrs }">
                <v-btn
                class="pl-2"
                text
                v-bind="attrs"
                @click="update_account_dialog = false"
                >
                <font-awesome-icon :icon="['fa', 'times']" />
                </v-btn>
            </template> 
        </v-snackbar>
        <!--  <vue-metamask 
            userMessage="msg" 
            @onComplete="onComplete"
        >
        </vue-metamask> 
        {{ metamasktest }}  -->
    </section>
   
</template>
<script lang="js" type="module" >
  //  import VueMetamask from 'vue-metamask';
    export default {
    data () {
        return {
            metamasktest:'',
            currentuser: '',
            newpass:'',
            update_account_dialog:false,
            account_is_fully_complete:false,
            emailRules: [ 
                v => !!v || 'Le mail est requis', 
                v => /.+@.+/.test(v) || 'E-mail invalide.' 
            ]
        }
    },
    components: {
    //    VueMetamask,
    },
    created() {
        var currentuser = JSON.parse(this.$cookies.get('deussearch_user'));
        this.currentuser = currentuser;
    },
    methods: {
         //  onComplete(data){
         //       this.metamasktest = data;
         //  },
        updatePassLocally() {
            this.currentuser.pass = this.newpass;
        },
        CheckForUpdatedAccount() {
            this.update_account_dialog = true;
            if(this.currentuser.pseudo && this.currentuser.email.length > 0) {
                this.account_is_fully_complete = true;
                this.$axios.$post('https://api.deussearch.fr/update_account.php', {
                    account: this.currentuser,
                });
                this.$cookies.set('deussearch_user', this.currentuser, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7
                });
                this.$router.go(0);
            } else {
            this.account_is_fully_complete = false;
            }
        }
    },
}
</script>

<style>
.edit_account_form .v-input__prepend-outer {
    margin-right: 9px;
    background: #171744;
    padding: 10px;
    margin-top: 8px !important;
    border-radius: 50%;
}


.edit_account_form .v-input__prepend-outer i,
.edit_account_form .v-input__prepend-outer i.v-icon.v-icon--disabled {
    color:#ffff76 !important;
}
.edit_account_form label {
    font-family: 'Hamlin';
}

.edit_account_form label::after{
    content:'';
    width: 20px;
    display: block;
    margin-top:5px;
    height: 1px;
    background-color:#ffff76;
}

.edit_account_form input,
.edit_account_form textarea {
    color: grey !important;
    text-transform: initial;
    border:none !important;
}

.edit_info_form {
    width: 100%;
    background: #1f1f55;
    margin-top: 1px !important;
    margin-left: auto !important;
    margin-right: auto !important;
}

.help_tooltip {
    cursor: pointer;
    font-size: 1em !important;
    color: #ffff76 !important;
    margin-left: 10px;
    margin-top: -4px;
}

.acount_edit_submit {
    margin-right: auto;
    background-color: #4caf50 !important;
    color: white !important;
}

.edit_info_form .v-text-field__details *{
    color: rgba(189, 179, 179, 0.6);
}

.success_snack .v-snack__wrapper{
    background-color:#4caf50 !important;
    text-align: center;
}

.error_snack .v-snack__content,
.success_snack .v-snack__content {
    text-align: center;
}
.success_snack,
.error_snack {
    cursor: pointer;
}
.error_snack .v-snack__wrapper{
    background-color:#ac231f !important;
    text-align: center;
}

</style>