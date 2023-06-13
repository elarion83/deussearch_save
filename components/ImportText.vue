<template lang="html">

  <div>
    <div>
      <div v-if="!loaded">
        <loading></loading>
      </div>
      <span v-else v-html="text"></span>
    </div>
  </div>

</template>

<script lang="js">

  import Loading from '@/components/loading'

  export default  {
    name: 'import-text',
    props: ['page_id'],
    data () {
      return {
        'text' : '',
        'loaded':false
      }
    },  
    components: {
      'loading' : Loading,
    },
    beforeMount() {
      this.$http.post("https://api.deussearch.fr/get_content.php?content_id="+this.$props.page_id).then(result => {
          this.text = result.data;
          this.loaded = true;
      }, error => {
      });
    },
    watch:{
      page_id (page_id) {
        this.loaded = false;
        this.$http.post("https://api.deussearch.fr/get_content.php?content_id="+page_id).then(result => {
            this.text = result.data;
            this.loaded = true;
        }, error => {
        });
         // my new value in val. Perform your
         // select update methods here
     }
    }
}


</script>

<style>
  .import-text {

  }
</style>
