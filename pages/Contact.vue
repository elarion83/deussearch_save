<template lang="html">

  <div data-view>
    <head-banner :title ="$t('message.contact_main_title')"></head-banner>
    <section class="contact-section bg">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <div class="contact-area">
              <div class="contact-header">
                <h3 class="sub-title">{{ $t('message.contact_blue_title') }}</h3>
                <h2 class="title">{{ $t('message.contact_sub_title') }}</h2>
                <p>
                  {{ $t('message.contact_text') }}  
                </p>
              </div>
              <div class="contact-form-area">
                <form v-if="!send" class="contact-form" @submit="formSubmit">
                  <div class="row">
                    <div class="col-lg-12 form-group text-left wow fadeIn" data-wow-delay="0.1s">
                      <label>{{ $t('message.contact_form_label_nom') }} <span>*</span></label>
                      <input type="text" v-model="name" required=""  v-bind:placeholder="$t('message.contact_form_placeholder_nom')">
                    </div>
                    <div class="col-lg-12 form-group text-left wow fadeIn" data-wow-delay="0.1s">
                      <label>{{ $t('message.contact_form_label_email') }}<span>*</span></label>
                      <input type="email" v-model="email" required="" v-bind:placeholder="$t('message.contact_form_placeholder_email')">
                    </div>
                    <div class="col-lg-12 form-group text-left wow fadeIn" data-wow-delay="0.1s">
                      <label>{{ $t('message.contact_form_label_sujet') }}  <span>*</span></label>
                      <input type="text"  v-model="subject" required="" v-bind:placeholder="$t('message.contact_form_placeholder_sujet')">
                    </div>
                    <div class="col-lg-12 form-group text-left wow fadeIn" data-wow-delay="0.1s">
                      <label>{{ $t('message.contact_form_label_message') }} <span>*</span></label>
                      <textarea required="" v-model="message" v-bind:placeholder="$t('message.contact_form_placeholder_message')"></textarea>
                    </div>
                    <div class="col-lg-12 form-group text-center wow fadeIn" data-wow-delay="0.1s">
                      <input type="submit" class="cmn-btn color_white" v-bind:value="$t('message.contact_form_button')">
                    </div>
                  </div>
                </form>
                <p v-else class="deus_info success">
                  {{ $t('message.contact_form_success') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import HeadBanner from '../components/HeadBanner';
  export default {
    scrollToTop: true,
    name:'ContactComponent',
    props:['used_lang_for_route', 'locale', 'page_title'],
    mounted () {
      this.$emit('update:locale', this.$props.used_lang_for_route);
    },
    components: {
      'head-banner' : HeadBanner,
    },
    head() {
        return {
            title: this.page_title,
            bodyAttrs: {
                class:'contact'
            }
        }
    },
    data() {
        return {
          name: '',
          email: '',
          output:'',
          subject: '',
          message: '',
          send:false
        };
    },
    metaInfo() {
        return {
            meta: [
                { property: 'og:title', content: this.$props.page_title},
            ]
        }
    },
    methods: {
      formSubmit(e) {
        e.preventDefault();
        let currentObj = this;
         this.$axios.$post('https://api.deussearch.fr/contact_form_send_mail.php', 
          {
              'name': this.name,
              'email': this.email,
              'sujet': this.subject,
              'message': this.message
            },  
          {
              headers: {
                  'Content-Type': '*'
              }
          })
          .then(function (response) {
            currentObj.send = true;
          })
          .catch(function (error) {
              console.log(error);
          });
      }
    }
  }
</script>

<style>
.color_white {
  color: white !important;
}
.contact input, .contact textarea {
  text-transform: initial;
}

</style>
