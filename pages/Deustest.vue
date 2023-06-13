<template lang="html">
  <section style="overflow: visible;" class="deus_bloc new_test pb-0 home_banner banner-section bg bg_img">
    <div class="carousel_holders ">
        <form @submit.prevent='submitdeustest' id="msform" class="contact-form p-0 mb-0"> 
            
            <v-carousel v-model="actual_step" :show-arrows="false" class="test_carousel pb-5"  height="auto" delimiter-icon="mdi-minus">
                
                <v-carousel-item>
                    <div class="container new_container ">
                        <div class="text_slide text-center p-5">
                            <h1 class="title_deus_test  m-0 p-0 pb-4"> 
                                {{ $t('message.deus_search_title') }}
                            </h1>
                            <p v-html="$t('message.deus_test_first_slide_text' )">
                            </p>
                            <v-btn x-large class="mt-5 mb-3 new_test_button" @click="actual_step++">
                                <v-icon class="mr-3">
                                    mdi-arrow-right
                                </v-icon>
                                {{ $t('message.general_start' )}}
                            </v-btn>
                        </div>
                    </div>
                </v-carousel-item>
                <v-carousel-item>
                    <div class="container new_container">
                        <div>
                            <step1 :platform="platform" :price="price" @updateFirstsValues="updateFirstsValues"></step1>  
                            <v-btn class="mb-3 new_test_button" v-if="platform" x-large @click="actual_step++">
                                <v-icon class="mr-3">
                                    mdi-arrow-right
                                </v-icon>
                                {{ $t('message.general_continue' )}}
                            </v-btn>
                        </div>
                    </div>
                </v-carousel-item>
                <v-carousel-item  v-if="platform">
                    <div class="container new_container">
                        <div>
                            <step2 :answers="answers" :used-values="used_values" @updatedValues="updatedValues" ></step2>   
                            <v-btn class="mb-3 mt-4 new_test_button" v-if="platform" x-large @click="actual_step++">
                                <v-icon class="mr-3">
                                    mdi-arrow-right
                                </v-icon>
                                {{ $t('message.deus_search_steps_next') }}
                            </v-btn>
                        </div>
                    </div>
                </v-carousel-item>
                <v-carousel-item  v-if="platform">
                    <div class="container new_container">
                        <div>
                            <step3 :answers="answers" :used-values="used_values" @updatedValues="updatedValues" ></step3>  
                            <v-btn class="mb-3 mt-4 new_test_button" x-large @click="actual_step++">
                                <v-icon class="mr-3">
                                    mdi-arrow-right
                                </v-icon>
                                {{ $t('message.deus_search_steps_next') }} 
                            </v-btn> 
                        </div>
                    </div>
                </v-carousel-item>
                <v-carousel-item  v-if="platform">
                    <div class="container new_container">
                        <div>
                            <step4 @updatedLastsValues="updatedLastsValues"></step4>
                        </div>
                    </div>
                </v-carousel-item>
                <div v-if="!loggedin" class="container new_container">
                    <v-alert
                        v-model="deus_form_logged_alert"
                        border="bottom"
                        class="deus_notice_not_connected pt-3 pb-3"
                        close-text="Close"
                        color="deep-purple accent-4 mt-2 mb-2"
                        dark
                        dismissible
                    >
                    <p>
                        {{ $t('message.deus_test_not_logged_in_notice')}}
                    </p>
                    </v-alert>
                </div>
            </v-carousel>
        </form>	 
    </div>
</section>

</template>


<script lang="js">

    import HeadBanner from '../components/HeadBanner';
    import axios from 'axios';

    import Step1 from '../components/deus_steps/step1';
    import Step2 from '../components/deus_steps/step2';
    import Step3 from '../components/deus_steps/step3';
    import Step4 from '../components/deus_steps/step4';
    export default  {
        scrollToTop: true,
        name: 'deus-test',
        props:['used_lang_for_route', 'locale', 'page_title'],
        title: 'DeusSearch - Test de la personnalité',
        data () {
            return {
                'searched':false,
                'platform':0,
                'loggedin':false,
                'deus_form_logged_alert': true,
                'loggedinuser':null,
                'actual_step':0,
                'price':90,
                'used_values':[
                    {'title':'ouverture_val_1', 'value' : 2},
                    {'title':'ouverture_val_2', 'value' : 2},
                    {'title':'conscencieux_val_1', 'value' : 2},
                    {'title':'conscencieux_val_2', 'value' : 2},
                    {'title':'extraversion_val_1', 'value' : 2},
                    {'title':'extraversion_val_2', 'value' : 2},
                    {'title':'agreabilite_val_1', 'value' : 2},
                    {'title':'agreabilite_val_2', 'value' : 2}
                ],
                'answers' : [
                    {'value':0,'title':'message.deus_search_answer_disagree_x'},
                    {'value':1,'title':'message.deus_search_answer_disagree'},
                    {'value':2,'title':'message.deus_search_answer_neutral'},
                    {'value':3,'title':'message.deus_search_answer_agree'},
                    {'value':4,'title':'message.deus_search_answer_agree_x'}
                ],
                'selectedKeywords':[],
                'selectedModes':[],
                'resultsUrl':[]
            }
        },
        components: {
            'head-banner' : HeadBanner,
            'step1' : Step1,
            'step2' : Step2,
            'step3' : Step3,
            'step4' : Step4
        },
        head() {
            return {
                title: this.page_title,
                bodyAttrs: {
                    class:'deus'
                }
            }
        },
        metaInfo() {
            return {
                meta: [
                    { property: 'og:title', content: this.$props.page_title},
                ]
            }
        },
        methods:{
            updateFirstsValues(FirstsValues){
                if(FirstsValues[0] == 'platform') {
                    this.platform = FirstsValues[1];
                }
                if(FirstsValues[0] == 'price') {
                    this.price = FirstsValues[1];
                }
            },
            updatedValues(newValue) {
                var used_value_update;
                for (used_value_update in this.used_values) {
                    if(this.used_values[used_value_update].title == newValue[0]) {
                        this.used_values[used_value_update].value = newValue[1];
                    }
                }
            },
            updatedLastsValues(lastsValues) {
                if(lastsValues[0] == 'keywords') {
                    this.selectedKeywords = lastsValues[1];
                }
                if(lastsValues[0] == 'modes') {
                    this.selectedModes = lastsValues[1];
                }
            },
            submitdeustest() {
                this.searched = true;
                var comp = this;

                var actualuser = null;
                if(this.$cookies.get('deussearch_connected') == 1) {
                    actualuser = JSON.parse(this.$cookies.get('deussearch_user'));
                    actualuser = actualuser.id;
                }
                
                var profile = {
                    'platform': this.platform,
                    'price':this.price,
                    'modes':this.selectedModes,
                    'keywords':this.selectedKeywords,
                    'responses':this.used_values,
                    'user_id':actualuser,
                    
                    'type': 'poll'
                    };
                axios.post('https://api.deussearch.fr/test_create_profile.php', 
                profile,  
                {
                    headers: {
                        'Content-Type': '*'
                    }
                })
                .then(function (response) {
                    if(comp.loggedin == true) {
                        comp.$cookies.set('deussearch_just_do_profile_test', 1, {
                            path: '/',
                            maxAge: 15
                        });
                    }
                    if(comp.$props.used_lang_for_route == 'fr') {
                        comp.$router.push('resultat?id='+response.data);
                    }
                    if(comp.$props.used_lang_for_route == 'en') {
                        comp.$router.push('/en/results?id='+response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }
        },
        mounted() {
           
            
        },
        created() {
            if(this.$cookies.get('deussearch_connected') == 1) {
                this.loggedin = true;
                this.loggedinuser = JSON.parse(this.$cookies.get('deussearch_user'));
            }
        }
    }

</script>

<style>
.deus_notice_not_connected {
    margin-bottom: 0;
    background: #6c1a38;
    text-align: left;
}

.deus_notice_not_connected p {
    font-size: 0.9em !important;
}

.login_btn {
    display: block;    
    background-color: #4e4f9f;
}

.new_test {
    margin-top: 0 !important;
    padding-top: 15em !important;
    background-color: yellow;
    background-image: url('@/assets/images/banner/banner_square.png');
}


@media (max-width: 991px) {
    .new_test {
        padding-top: 4em !important;
   }
}

.new_test.deus_bloc {
    background-color: rgb(28, 29, 85);
}

.new_test .deus_form {
    margin-bottom: 2em;
}

.new_test.home_carousel {
    height: auto !important;
}

.new_test #msform {
    background: none;
}

.new_test .new_container {
    flex-direction: column;
}

.new_test .title_deus_test {
    background:none;
}
.new_test .title_deus_test::after {
    content:'';
    width:150px;
    background-color: white;
    height: 3px;
    margin-top: 2em;
    margin-bottom: 2em;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.new_test legend {
    margin-top: 0em !important;
    margin-bottom: 0em !important;
}

.new_test.deus_test {
    margin-bottom: 1em;
}


.test_carousel .text_slide p {
    text-align: center;
}
.new_container>div {
    text-align: center;
    width: 100%;
    background:linear-gradient(-30deg,#ce00713b,#074f86ba);
}

.new_test .no_flex {
    display: inline;
}

@media (min-width: 50px) {
    .test_carousel  {
        min-height: calc(100vh - 240px);
    }
}

@media (min-width: 1100px) {
    .test_carousel  {
        min-height: calc(100vh - 240px) !important;
    }
}

.deus_form legend {
    border-left: 5px solid #9fa209 !important;
    background:linear-gradient(150deg,#ce007136,#01588c91) !important;
}

.new_test_button {
    background:linear-gradient(150deg,#01598c,#ce0071) !important;
}


</style>
