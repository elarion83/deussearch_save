<template lang="html">

  <section class="inner-banner-section inner-banner-section--style bg-overlay-black bg bg_img">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 text-center">
                    <div class="inner-banner-content">
                        <h1 class="title" v-html="title"></h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script lang="js">

  export default {
    props: ['title']
  }
</script>

<style>
</style>
