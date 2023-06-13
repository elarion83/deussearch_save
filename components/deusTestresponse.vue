<template lang="html">

  <div class="radio-tile-group">
    <div class="input-container deus_radio" v-for="(answer,id) in answers" :key="id" >
        <input class="radio-button" :model="SelectedValue" @change="updateValue(askedValue, id)"  type="radio" :name="value" :value="id" />
        <div class="radio-tile pt-3 pb-3"> 
        <label for="" class="radio-til3-la-bel pt-2 pb3">{{ $t(answer.title) }} </label>
        
        </div>
    </div>
  </div>

</template>

<script lang="js">


  export default  {
    name: 'deus-testresponse',
    props: ['answers', 'value','used_values'],
    mounted () {

    },
    data () {
      return {
        'askedValue': this.value, // the name of input
        'SelectedValue': null
      }
    },
    methods: {
      updateValue(askedvalue, selectedvalue) {
         var response = [askedvalue,selectedvalue];
         this.$emit("updatedValues", response) ;
      }
    }
}


</script>

<style>
  .radio-tile {
    cursor: pointer;
    font-family: 'hamlin';
  }
</style>
