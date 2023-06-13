<template lang="html">
    <div class="contrib_action">
        <v-btn @click.stop="validateContrib()" depressed class="mt-3 add_game_btn">
            <v-icon>
                mdi-check
            </v-icon>
        </v-btn>
        <v-btn  @click.stop="refuseContrib()" depressed class="mt-3 add_game_btn">
            <v-icon>
                mdi-close-thick
            </v-icon>
        </v-btn>
    </div>
</template>
<script lang="js" type="module" >
    export default {
        props: ["field", "contribId", "newgame"],
        data () {
            return {
                
            }
        }, 
        methods: {
        refuseContrib() {
             this.$http.$post("https://api.deussearch.fr/update_contrib.php?field="+this.$props.field+"&status=refus&id="+this.$props.contribId+"&newgame="+this.$props.newgame).then(result => {
                
             }, error => {
            });
        },
        validateContrib() {
            this.$http.$post("https://api.deussearch.fr/update_contrib.php?field="+this.$props.field+"&status=valide&id="+this.$props.contribId+"&newgame="+this.$props.newgame).then(result => {
                
            }, error => {
            });
        },
        }
    }
</script>

<style>
</style>