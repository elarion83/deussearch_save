<template lang="html">

  <fieldset>
      <div class="deus_form">
          <legend>{{ $t('message.deus_search_question6') }} </legend>
          <deus-answers :answers="answers" :used_values="selectUsedValues"  @updatedValues="updatedValues"  :value="'agreabilite_val_2'"></deus-answers>
      </div>
      <div class="deus_form">
          <legend>{{ $t('message.deus_search_question7') }} </legend>
          <deus-answers :answers="answers" :used_values="selectUsedValues"  @updatedValues="updatedValues"  :value="'conscencieux_val_2'"></deus-answers>
      </div>

      <div class="deus_form">
          <legend>{{ $t('message.deus_search_question8') }} </legend>
          <deus-answers :answers="answers" :used_values="selectUsedValues"  @updatedValues="updatedValues"  :value="'ouverture_val_2'"></deus-answers>
      </div>

      <div class="deus_form" >
          <legend>{{ $t('message.deus_search_question9') }} </legend>
          <deus-answers :answers="answers" :used_values="selectUsedValues"  @updatedValues="updatedValues"  :value="'agreabilite_val_1'"></deus-answers>
      </div>
  </fieldset>

</template>

<script lang="js">

  import DeusAnswers from '../deusTestresponse';

  export default  {
    name: 'step-3',
    props: ['answers', 'used_values'],
    mounted () {

    },
    components: {
      'deus-answers' : DeusAnswers
    },
    data () {
      return {
        'selectUsedValues':this.used_values
      }
    },
    methods: {
      updatedValues(newValue) {
         this.$emit("updatedValues", newValue) ;
      }
    },
    computed: {

    }
}


</script>

<style>

</style>
