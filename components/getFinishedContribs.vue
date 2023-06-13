<template>
    <section class="mb-2 mt-2">
        <v-col
            cols="12"
            sm="12"
            class="top-create-profil-head pl-3 pt-2 pb-2"
        >   
            <span class="profil_user_span" v-if="type_d == 'per_user' && status_d == 'valide'"> {{ $t('message.finished_contribution_accepted') }} ({{contributions.length}})</span>
            <span class="profil_user_span" v-if="type_d == 'per_user' && status_d == 'refus'"> {{ $t('message.finished_contribution_refused') }} ({{contributions.length}})</span>
        
        </v-col>   
        <v-row class="edit_info_form contrib_finished_list">  
            <ul v-if="contributions != ''">
                <li v-for="(contribution,id) in contributions" :key="id" class="p-1 pl-3">
                    <p v-if="contribution.type == 'add' && contribution.game != null">
                        {{ contribution.date}} - {{$t('message.finished_added_the_game')}} 
                            <router-link target="_blank" :title="$t('message.general_know_more')+' '+contribution.game.game_name" :to="{ name: 'single_game', params: { gamename: contribution.game.slug , gameid: contribution.id_jeu }}" class="yellow_link"  >  
                                {{ contribution.game.game_name }}
                            </router-link>
                    </p>
                    <p v-if="contribution.type == 'add' && contribution.game == null">
                        {{ contribution.date}} - {{$t('message.finished_added_a_game')}}
                    </p>
                    <p v-if="contribution.type == 'mod'">
                        {{ contribution.date}} - {{$t('message.finished_modified_game')}}
                        <router-link target="_blank" :title="$t('message.general_know_more')+' '+contribution.game.game_name" :to="{ name: 'single_game', params: { gamename: contribution.game.slug , gameid: contribution.id_jeu }}" class="yellow_link"  >  
                            {{ contribution.game.game_name }}
                        </router-link> <span class="fields_list">( {{$t('message.finished_field')}} {{ contribution.fields }} )</span>
                    </p>
                </li>
            </ul>
            <p class="p-5" v-else>
                {{ $t('message.no_contribution_available')}} 
            </p>
        </v-row>
    </section>
</template>

<script lang="js">
  export default  {
    name: 'finished-contribs',    
    props: ['type', 'status', 'user_id'],
    data () {
      return {
        contributions:'',
        type_d : this.$props.type,
        status_d : this.$props.status,
      }
    },  
    created() {
        this.$http.$get("https://api.deussearch.fr/get_finished_contributions.php?type="+this.$props.type+"&status="+this.$props.status+"&value="+this.$props.user_id).then(response => {
            this.contributions = response;
        });
    }
  }


</script>

<style>
.fields_list {
    background: #0e0f2d;
    padding: 5px;
    font-size: 0.8em;
    margin-left: 10px;
    border-radius: 5px;
}

.contrib_finished_list li p {
    font-size: 0.8em;
    border-left: 2px solid #e5e90d;
    padding-left: 0.8em;
    opacity: 0.8;
    margin-top: 0.5em;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
}
.contrib_finished_list li p:hover {
    opacity: 1;
    padding-left: 1em;
}

.contrib_finished_list {
    margin-bottom: 1em;
    padding-bottom:1em;
}

.profil_user_span {
    text-transform: uppercase;
}

</style>