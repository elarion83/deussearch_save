<template lang="html">

  <fieldset>
      <div class="deus_form">
          <legend> {{ $t('message.deus_search_question2') }} </legend>
          <deus-answers :answers="answers" :props_values="selectUsedValues" @updatedValues="updatedValues" :value="'extraversion_val_1'"></deus-answers>
      </div>

      <div class="deus_form">
          <legend>{{ $t('message.deus_search_question3') }} </legend>
          <deus-answers :answers="answers" :props_values="selectUsedValues" @updatedValues="updatedValues"  :value="'conscencieux_val_1'"></deus-answers>
      </div>

      <div class="deus_form">
          <legend>{{ $t('message.deus_search_question4') }} </legend>
          <deus-answers :answers="answers" :props_values="selectUsedValues" @updatedValues="updatedValues"  :value="'extraversion_val_2'"></deus-answers>
      </div>

      <div class="deus_form">
          <legend>{{ $t('message.deus_search_question5') }} </legend>
          <deus-answers :answers="answers" :props_values="selectUsedValues" @updatedValues="updatedValues"  :value="'ouverture_val_1'"></deus-answers>
      </div>
    
  </fieldset>

</template>

<script lang="js">
  import DeusAnswers from '../deusTestresponse';

  export default  {
    name: 'step-2',
    props:['used_values'],
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

    },
    props: ['answers']
}


</script>

<style>
 
</style>
