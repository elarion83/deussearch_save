<template lang="html">

  <section class="home-event p-5"> 
    <div class="container deus_list_index">
      <h2>Minecraft Island</h2>
    </div>
    <div class="main_event_div">
      <div class="compet_contain pt-4">
        <p> Bienvenue sur Minecraft Islands, un évènement créé par <a class="link" href="https://www.twitch.tv/le_wayzor">Le_Wayzor</a> qui réunit quinze joueurs répartis en trois équipes sur trois îles. </p>
        <br />
        <p> Il faudra tout d'abord retrouver la civilisation. 
          Mais attention, le PvP est actif toute la partie, gare aux pillages et aux combats...
          Une fois cela fait, l'Enderdragon devra être tué.
        </p>
        <br />
        <p>
          L'évènement débute le jeudi 04 mars à 20h00 Il sera diffusé tous les jeudis soir sur la chaîne Twitch de Le_Wayzor, L'Oeuf de dragon sera téléporté au carrefour des trois îles, la première équipe à ramener ce précieux trésor sur son île aura gagné.
        </p>
        <span class="mt-5"> DeusSearch {{ $t('message.index_event_partnership') }} Minecraft Island. </span>
      </div>
      <div class="mt-5">
        <twitch-player :channel="channel"></twitch-player>
      </div>
    </div>
  </section>

</template>

<script lang="js">

  import VueTwitchPlayer from 'vue-twitch-player';

  export default  {
    components: {
      'twitch-player' :VueTwitchPlayer,
    },
    name: 'home-event',
    props: [],
    mounted () {

    },
    data () {
      return {
        channel: 'le_wayzor',
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style >
  .home-event {
    min-height:450px;
    background:url('../../assets/images/minecraft.jpg');
  }

  .compet_contain {
    max-width: 650px;
  }

  .compet_contain ul {
        list-style-type: disc;
  }

  .compet_contain span {
    font-size: 12px;
  }

  .link {
      color: #797982;
  }

  .main_event_div {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>
