<template lang="html">

  <section class="loading">
    <v-progress-linear
      color="deep-purple accent-4"
      indeterminate
      rounded
      height="6"
      class="mb-2"
    ></v-progress-linear>
   <p> {{ $t('message.general_loading') }} </p>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'loading',
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
  .loading p{
    width: 100%;
    color: #cecece;
    font-family: "Oswald", sans-serif;
    text-align: center !important;
  }

  .v-progress-linear {
    background: rgb(204, 203, 203) !important;
  }

  .v-progress-linear .short {    
    background: #13143c !important;
  }
</style>
