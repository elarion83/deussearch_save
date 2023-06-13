<template lang="html">

 <fieldset>
      <div class="deus_platform col-lg-12 p-0 form-group">
        <div class="deus_form">
            <legend> {{ $t('message.deus_search_question1') }} </legend>
            <select class=" m-4 nice-select platformselect" v-model="selectedPlatform" @change="updateFirstsValues('platform',selectedPlatform)" id="platform">
                <option value="0" disabled selected="selected">{{ $t('message.deus_search_answer_select_holder') }}</option>
                <option v-for="platform in platforms" :value="platform.id">
                    <div v-if="id=4">
                        {{ $t(platform.name)}}
                    </div>
                </option>
            </select>
        </div>
      </div>
       
  </fieldset>

</template>

<script lang="js">

  export default  {
    name: 'step-1',
    props: ['platform','price'],
    mounted () {
    },
    data () {
      return {
          'selectedPrice':this.price,
          'selectedPlatform': this.platform,
          'platforms':[
              {'id':7,'name':'Nintendo Switch'},
              {'id':5,'name':'MacOs'},
              {'id':18,'name':'Playstation 4'},
              {'id':1,'name':'Xbox One'},
              {'id':187,'name':'Playstation 5'},
              {'id':186,'name':'Xbox Series (X|S)'},
              {'id':4,'name':'message.deus_search_platform_pc'},
          ],
      }
    },
    methods: {
      updateFirstsValues(type, value){
         this.$emit("updateFirstsValues", [type,value]) ;
      }
    }
}


</script>


