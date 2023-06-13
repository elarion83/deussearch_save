<template lang="html">

<fieldset>
  <div class="deus_form" >
      <legend>{{ $t('message.deus_search_question10') }}    </legend>
      <div class="container">
          <div class="radio-tile-group fat_line">
              <div class="input-container fat_basis" v-for="(mode, id) in modes_choices" :key='id'> 
                   <input :for="mode.label" class="radio-button" @change="updateLastsValues('modes',selectedModes)"  type="radio" v-model="selectedModes" :value="mode.value" />
                  <div class="radio-tile">
                        <v-icon class="choice_icon">
                          mdi-{{ mode.icon }}
                        </v-icon>
                      <label :for="mode.label" class="radio-tile-label"> {{ mode.label }} </label>
                  </div>
              </div>

          </div>
      </div>
  </div>
  <div class="deus_form" >
      <legend> {{ $t('message.deus_search_question_specificites') }} </legend>

      <div class="container">
              <div class="radio-tile-group">
              <div class="input-container" v-for="(keyword,id) in keywords" :key="id">
                  <input :id="id" class="radio-button key_cloud_check" @change="updateLastsValues('keywords',selectedKeyword)"  type="checkbox" v-model="selectedKeyword" :value="keyword.id" />
                  <div class="radio-tile">
                      <label :for="id" class="radio-tile-label"> {{ $t(keyword.keyword) }}</label>
                  </div>
              </div>
          </div>
      </div>
  </div>    
  <div v-if="selectedKeyword.length > 0 && selectedModes.length > 0" class="col-lg-12 form-group text-center submit_field">
        <v-btn type="submit" class="mb-3 new_test_button" x-large>
            <v-icon class="mr-3">
                mdi-arrow-right
            </v-icon>
            {{ $t('message.deus_search_button')}}
        </v-btn>
      <div class="deus_info error notice deus_issue">
      </div>
  </div>
</fieldset> 

</template>

<script lang="js">

  export default  {
    name: 'step-4',
    mounted () {

    },
    data () {
      return {
          'selectedModes':[],
          'selectedKeyword':[],
          'keywords':[
            {'keyword':'message.deus_search_keyword_1', 'id' : 36}, 
            {'keyword':'message.deus_search_keyword_2', 'id' : 4}, 
            {'keyword':'message.deus_search_keyword_3', 'id' : 32},  
            {'keyword':'message.deus_search_keyword_4', 'id' : 111}, 
            {'keyword':'message.deus_search_keyword_5', 'id' : 6}, 
            {'keyword':'message.deus_search_keyword_6', 'id' : 118},
            {'keyword':'message.deus_search_keyword_7', 'id' : 165}, 
            {'keyword':'message.deus_search_keyword_8', 'id' : 41},
            {'keyword':'message.deus_search_keyword_9', 'id' : 15}
          ],
          'modes_choices': [
            {
                'label': "Solo",
                'value': "31",
                'icon': 'human-greeting-variant'
            },
            {
                'label': "Solo + Multi local",
                'value': "31,72",
                'icon': 'human-male-male'
            },
            {
                'label': "Solo + Multi Online",
                'value': "31,40832,7",
                'icon': 'human-greeting-proximity'
            },
            {
                'label': "Multi",
                'value': "40832,72,7",
                'icon': 'human-capacity-decrease'
            },
        ]
      }
    },
    methods: {
        updateLastsValues(type, selectedvalue) {
         this.$emit("updatedLastsValues", [type,selectedvalue]) ;
        }
    }

}


</script>

<style>
.slider__label {
    background:linear-gradient(150deg,#ce007136,#01588c91) !important;
    border-radius: 2px;
    color: white;
    padding: 1em;
    -webkit-box-shadow: 4px 4px 15px 5px #0000006b; 
box-shadow: 4px 4px 15px 5px #00000046;
    top: -40px;
}

.choice_icon {
    font-size: 3.5em !important;
    margin-bottom: 0.5em;
    color: #079ad9 !important;
}

.deus_bloc .radio-tile-group .input-container.fat_basis {
    flex-basis: 120px !important;
    flex-grow: 1;
}
.deus_bloc .radio-tile-group.fat_line {
    width: 100%;
}

</style>
