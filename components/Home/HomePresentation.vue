<template lang="html">

  <section class="about-section bg pb-12" id="about">
    <div class="about-element-one">
        <img src="../../assets/images/about/icon-1.png" alt="icon">
    </div>
    <div class="about-element-two">
        <img src="../../assets/images/about/icon-2.png" alt="icon">
    </div>
    <div class="about-element-three">
        <img src="../../assets/images/about/icon-3.png" alt="icon">
    </div>
    <div class="about-element-four">
        <img src="../../assets/images/about/icon-4.png" alt="icon">
    </div>
    <div class="about-element-five">
        <img src="../../assets/images/about/icon-5.png" alt="icon">
    </div>
    <div class="about-element-six">
        <img src="../../assets/images/about/icon-5.png" alt="icon">
    </div>
    <div class="about-element-seven">
        <img src="../../assets/images/about/icon-6.png" alt="icon">
    </div>
    <div class="about-element-nine">
        <img src="../../assets/images/about/icon-8.png" alt="icon">
    </div>
    <div class="about-element-ten">
        <img src="../../assets/images/about/icon-9.png" alt="icon">
    </div>
    <div class="container">
        <div class="row justify-content-center align-items-center mb-30-none">
          <div class="col-lg-6 mb-30">
              <div class="about-item-area">
                <div class="row justify-content-center mb-30-none">
                    <div class="col-lg-6 col-sm-6">
                      <div class="about-item text-center">
                          <div class="about-icon">
                            <img src="../../assets/images/about/about-1.png" alt="about">
                          </div>
                          <h3 class="title">{{ $t('message.index_about_bloc1_title') }}</h3>
                          <p>{{ $t('message.index_about_bloc1_text') }}</p>
                      </div>
                    </div>
                    <div class="col-lg-6 col-sm-6">
                      <div class="about-item about-item--style text-center mt-30">
                          <div class="about-icon">
                            <img src="../../assets/images/about/about-2.png" alt="about">
                          </div>
                          <h3 class="title">{{ $t('message.index_about_bloc2_title') }}</h3>
                          <p>{{ $t('message.index_about_bloc2_text') }}</p>
                      </div>
                    </div>
                    <div class="col-lg-6 col-sm-6 mb-30">
                      <div class="about-item text-center">
                          <div class="about-icon">
                            <img src="../../assets/images/about/about-3.png" alt="about">
                          </div>
                          <h3 class="title">{{ $t('message.index_about_bloc3_title') }}</h3>
                          <p>{{ $t('message.index_about_bloc3_text') }}</p>
                      </div>
                    </div>
                    <div class="col-lg-6 col-sm-6 mb-30">
                      <div class="about-item about-item--style-two text-center mt-30">
                          <div class="about-icon">
                            <img src="../../assets/images/about/about-4.png" alt="about">
                          </div>
                          <h3 class="title">{{ $t('message.index_about_bloc4_title') }}</h3>
                          <p>{{ $t('message.index_about_bloc4_text') }}</p>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div class="col-lg-6 mb-30">
              <div class="about-content">
                <h3 class="sub-title">{{ $t('message.index_about_blue_title') }}</h3>
                <h2 class="title">{{ $t('message.index_about_title') }}</h2>
                <p v-html="$t('message.index_about_text')"></p>
                <div class="about-content-btn">
                    <router-link :to="{ name: 'deus_test_'+$i18n.locale}"  v-bind:title="$t('message.index_about_button')" class="cmn-btn" > 
                        {{ $t('message.index_about_button') }}
                    </router-link>
                </div>
              </div>
          </div>
        </div>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'home-presentation',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style>
</style>
