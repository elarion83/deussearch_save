<template>
    <section>
        <h2 >Jeux que je recommande </h2>
            <div v-if="!jeux_recommandes_loaded">
                Chargement 
            </div>
            <v-slide-group v-else lass="pa-4" how-arrows >

                <v-slide-item >
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-card v-on:click="ShowRecommendationModal" height="375" width="220" v-bind="attrs" v-on="on" class="defaultgamecard mt-4 mb-4 mr-3">
                            <v-btn 
                                color="primary"
                                dark
                                class="add_rec_btn"
                            >
                                <font-awesome-icon class="ml-2 mr-2" :icon="['fa', 'plus']" />
                            </v-btn>
                        </v-card>
                        </template>
                        <span>Ajouter une recommandation</span>
                    </v-tooltip>
                </v-slide-item>
                <v-slide-item 
                    v-for="n in jeux_recommandes"
                    :key="n.id"
                    v-slot="{ active, toggle }"
                >
                    <single-game @showModal="showModal" :game="n" class="mt-4 mb-4 mr-3"></single-game>
                </v-slide-item>
            </v-slide-group>
            <v-dialog
            v-model="recommendationsmodal"
            width="500"
            >
            
             <v-card
                class="mx-auto"
            >
                <v-card-title class="white--text orange darken-4">
                    Jeux Recommandés
                <v-spacer></v-spacer>

                <v-btn
                    color="white"
                    class="text--primary"
                    fab
                    small
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                </v-card-title>

                <v-card-text class="pt-4">
                    Retrouvez ici les jeux que vous recommandez. vous pouvez en ajouter ou en supprimer. Ils seront visibles sur votre profil.
                </v-card-text>

                <v-divider></v-divider>

                <v-virtual-scroll
                :items="jeux_recommandes"
                :item-height="50"
                height="300"
                >
                <template v-slot:default="{ item }">
                    <v-list-item>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.game_name }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn class="mx-2">
                            <font-awesome-icon class="ml-2 mr-2" :icon="['fa', 'trash']" />
                        </v-btn>
                    </v-list-item-action>
                    </v-list-item>
                </template>
                </v-virtual-scroll>
            </v-card>
            </v-dialog>
            <game-modal v-if="modal" :modal="modal" :game="modaled_game" @changeModalStatus="changeModalStatus"></game-modal>
    </section>
</template>

<script lang="js">
    import SingleGame from '../../pages/singlegame'
    import GameModal from '../GameModal';

     
  export default  {
    name: 'jeu_recommandes',
    data () {
      return {
          'jeux_recommandes_id':[159973,159975,159981,159976,159977,159978,159979,159980,159981,159982],
          'jeux_recommandes_loaded':false,
          'jeux_recommandes':null,
          'displayed_game':null,
          'modal':false,
          'modaled_game':null,
          'recommendationsmodal':false
      }
    },  
    computed: {
      
    },
    components: {
      'single-game' : SingleGame,
    },
    methods: {
        
        showModal(game) {
            this.modaled_game = game;
            this.modal = true;
        },
        changeModalStatus() {
            this.modal=false;
        },
        ShowRecommendationModal() {
            this.recommendationsmodal=true;
        }
    },
    created() {
        var comp = this;
        this.$axios.$post('https://api.deussearch.fr/get_game_by_id.php', {
            jeux_recommandes: comp.jeux_recommandes_id,
        })
        .then(function(response) {
            comp.jeux_recommandes = response;
            comp.jeux_recommandes_loaded = true;
        })
        .catch(function(error) {
        });
    }
  }


</script>

<style>
.add_rec_btn {
    margin-top: 2em;
    background-image: linear-gradient( -30deg, rgb(193,101,221) 0%, rgb(92,39,254) 100%);
}

.defaultgamecard {
    background:url('../../static/default_game_couv.jpg');
    cursor: pointer;
    line-height: 320px;
}

.defaultgamecard:hover {
    background:url('../../static/default_game_couv_hover.jpg');
}


.mdi-chevron-right, .mdi-chevron-left {
    transform-origin: center top 0px;
    font-size: 3em !important;
    color: rgb(49, 72, 127);
}

.recomm_modal {
    background-color: #1b1b33 !important;
    padding: 15px;
}

.recomm_modal .v-list-item {
    padding: 10px;
    margin-top: 5px;
    background: #121222;
    border: 1px solid #2b2222;
    cursor: pointer;
}

.v-list-item__title {
    color: #b0a9a9   !important;
}


.recomm_modal .v-list-item:hover {
    border-color:#51a651;
}

.recomm_modal .v-list-item:hover .v-list-item__title  {
    color: white !important;
}
</style>
