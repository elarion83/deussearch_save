<template lang="html">
    <section class="alluserprofiles edit_account_form">
        <v-form class="text-right">
            <v-container class="pl-0 pr-0">
                <v-col
                    cols="12"
                    sm="12"
                    class="top-create-profil-head pl-3 pt-2 pb-2"
                >
                    <span class="profil_user_span">{{ $t('message.pending_contributions_title')}} ({{contributions.length}})</span>
                </v-col>
                <v-row v-if="loaded" class="edit_info_form">
                    <v-expansion-panels v-if="contributions != ''">
                        <v-expansion-panel
                        v-for="(contrib,i) in contributions"
                        :key="i"
                        >
                            <v-expansion-panel-header class="text-left">
                                <p v-if="contrib.contribution.new_game == '0'"> {{ $t('message.contribution_edition_of')}}
                                    <router-link target="_blank" :title="$t('message.general_know_more')+' '+contrib.original.game_name" :to="{ name: 'single_game', params: { gamename: contrib.original.slug , gameid: contrib.original.id }}"  class="yellow_link">
                                        {{ contrib.original.game_name }} 
                                    </router-link>
                                </p>
                                <p v-if="contrib.contribution.new_game == '1'">{{ $t('message.contribution_add_of') }}
                                    <a class="yellow_link">
                                        {{ contrib.contribution.game_name }} 
                                    </a>
                                </p>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content v-if="contrib.contribution.new_game == '0'">
                                <span class="notice_contrib"> 
                                                <v-icon left>
                                                    mdi-help-circle
                                                </v-icon>{{ $t('message.contrib_table_notice') }} </span>
                                <table class="contribtable">
                                    <thead>
                                        <td></td>
                                        <td>{{ $t('message.original_datas')}}</td>
                                        <td>{{ $t('message.contribution_datas')}}</td>
                                    </thead>
                                    <tr v-if="contrib.original.game_name != contrib.contribution.game_name">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="game_name" :contribId="contrib.contribution.id"></contribButtons>

                                            {{ $t('message.general_name')}}
                                        </td>
                                        <td>
                                            <p>{{ contrib.original.game_name}}</p>
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.game_name}}</p>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.rating != contrib.contribution.rating">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="rating" :contribId="contrib.contribution.id"></contribButtons>

                                            {{ $t('message.rating')}}
                                        </td>
                                        <td>
                                            <p>{{ contrib.original.rating}}</p>
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.rating}}</p>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.released != contrib.contribution.released">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="released" :contribId="contrib.contribution.id"></contribButtons>

                                            {{ $t('message.released_date')}}
                                        </td>
                                        <td>
                                            <p>{{ contrib.original.released}}</p>
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.released}}</p>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.website != contrib.contribution.website">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="website" :contribId="contrib.contribution.id"></contribButtons>

                                            {{ $t('message.general_website')}}
                                        </td>
                                        <td>
                                            <p>{{ contrib.original.website}}</p>
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.website}}</p>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.reddit_url != contrib.contribution.reddit_url">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="reddit_url" :contribId="contrib.contribution.id"></contribButtons>

                                            Reddit url
                                        </td>
                                        <td>
                                            <p>{{ contrib.original.reddit_url}}</p>
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.reddit_url}}</p>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.metacritic != contrib.contribution.metacritic">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="metacritic" :contribId="contrib.contribution.id"></contribButtons>

                                            Metacritic
                                        </td>
                                        <td>
                                            <p>{{ contrib.original.metacritic}}</p>
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.metacritic}}</p>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.metacritic_url != contrib.contribution.metacritic_url">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="metacritic_url" :contribId="contrib.contribution.id"></contribButtons>

                                            Metacritic URL
                                        </td>
                                        <td>
                                            <p>{{ contrib.original.metacritic_url}}</p>
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.metacritic_url}}</p>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.screenshots != contrib.contribution.screenshots">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="screenshots" :contribId="contrib.contribution.id"></contribButtons>
                                            Screenshots
                                        </td>
                                        <td>
                                            <img
                                                v-for="(img, id) in contrib.original.screenshots.split(',').filter(i => i)" :key="id"
                                                :src="img"
                                                :lazy-src="img"
                                                aspect-ratio="1"
                                                class="contrib_img"
                                            >
                                        </td>
                                        <td>
                                            <img
                                                v-for="(img, id) in contrib.contribution.screenshots.split(',').filter(i => i)" :key="id"
                                                :src="img"
                                                :lazy-src="img"
                                                aspect-ratio="1"
                                                class="contrib_img"
                                            >
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.img_url != contrib.contribution.img_url">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="img_url" :contribId="contrib.contribution.id"></contribButtons>
                                            Image
                                        </td>
                                        <td>
                                            <p>{{ contrib.original.img_url}}</p>
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.img_url}}</p>
                                        </td>
                                    </tr>
                                    
                                    <tr v-if="contrib.publishers_modifie == 1">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="publishers" :contribId="contrib.contribution.id"></contribButtons>

                                            {{ $t('message.deus_results_modal_title_publishers')}}
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(publisher,i) in contrib.original.publishers"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ publisher.name }}
                                            </v-chip>
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(publisher,i) in contrib.contribution.publishers"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ publisher.name }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.developers_modifie == 1">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="developers" :contribId="contrib.contribution.id"></contribButtons>

                                            {{ $t('message.deus_results_modal_title_developers')}}
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(developer,i) in contrib.original.developers"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ developer.name }}
                                            </v-chip>
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(developer,i)  in contrib.contribution.developers"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ developer.name }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.platforms_modifie == 1">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="platforms" :contribId="contrib.contribution.id"></contribButtons>

                                            {{ $t('message.deus_results_modal_title_platform')}}
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(platform,i) in contrib.original.platforms"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ platform.name }}
                                            </v-chip>
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(platform,i) in contrib.contribution.platforms"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ platform.name }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.tags_modifie == 1">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="tags" :contribId="contrib.contribution.id"></contribButtons>

                                            Tags
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(tag,i) in contrib.original.tags"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-tag
                                                </v-icon>
                                                {{ tag.tag_name }}
                                            </v-chip>
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(tag,i) in contrib.contribution.tags"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-tag
                                                </v-icon>
                                                {{ tag.tag_name }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.genres_modifie == 1">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="genres" :contribId="contrib.contribution.id"></contribButtons>

                                            Genres
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(genre,i) in contrib.original.genres"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ genre.name_genre }}
                                            </v-chip>
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(genre,i) in contrib.contribution.genres"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ genre.name_genre }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.steamappid != contrib.contribution.steamappid">
                                        <td>
                                            <contribButtons v-if="admin" newgame="false" field="steamappid" :contribId="contrib.contribution.id"></contribButtons>

                                            ID Steam
                                        </td>
                                        <td>
                                            <p>{{ contrib.original.steamappid}}</p>
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.steamappid}}</p>
                                        </td>
                                    </tr>
                                    <tr v-if="contrib.original.description_en != contrib.contribution.description_en">
                                        <td>
                                            <contribButtons newgame="false" v-if="admin" field="description_en" :contribId="contrib.contribution.id"></contribButtons>

                                            Description (EN)
                                        </td>
                                        <td>
                                            <div v-if="contrib.original.description_en" v-html="contrib.original.description_en">
                                            </div>
                                        </td>
                                        <td>
                                            <div v-if="contrib.contribution.description_en" v-html="contrib.contribution.description_en">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="description_line" v-if="contrib.original.description_fr != contrib.contribution.description_fr">
                                        <td>
                                            <contribButtons  newgame="false" v-if="admin" field="description_fr" :contribId="contrib.contribution.id"></contribButtons>

                                            Description (FR)
                                        </td>
                                        <td>
                                            <div v-if="contrib.original.description_fr" v-html="contrib.original.description_fr">
                                            </div>
                                        </td>
                                        <td>
                                            <div v-if="contrib.contribution.description_fr" v-html="contrib.contribution.description_fr">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="description_line" v-if="contrib.original.clip_url != contrib.contribution.clip_url">
                                        <td>
                                            <contribButtons newgame="false" v-if="admin" field="clip_url" :contribId="contrib.contribution.id"></contribButtons>

                                            {{$t('message.deus_results_modal_videos_title')}}
                                        </td>
                                        <td>
                                            {{ contrib.original.clip_url}}
                                        </td>
                                        <td>
                                            {{ contrib.contribution.clip_url}}
                                        </td>
                                    </tr>
                                </table>
                                <v-btn @click.stop="finishValidateContrib(contrib.contribution.id)" v-if="admin"  depressed class="mt-3 add_game_btn">
                                    <v-icon>
                                        mdi-check
                                    </v-icon>
                                </v-btn>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content v-if="contrib.contribution.new_game == '1'">
                                <table class="contribtable add">
                                    <thead>
                                        <td></td>
                                        <td>{{ $t('message.contribution_datas')}}</td>
                                    </thead>
                                    <tr>
                                        <td>
                                            {{ $t('message.general_name')}}
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.game_name}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {{ $t('message.general_website')}}
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.website}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Reddit url
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.reddit_url}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Metacritic
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.metacritic}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Metacritic URL
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.metacritic_url}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Image
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.img_url}}</p>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            {{ $t('message.deus_results_modal_title_publishers')}}
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(publisher,i) in contrib.contribution.publishers"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ publisher.name }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {{ $t('message.deus_results_modal_title_developers')}}
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(developer,i) in contrib.contribution.developers"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ developer.name }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {{ $t('message.deus_results_modal_title_platform')}}
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(platform,i) in contrib.contribution.platforms"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ platform.name }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Tags
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(tag,i) in contrib.contribution.tags"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-tag
                                                </v-icon>
                                                {{ tag.tag_name }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Genres
                                        </td>
                                        <td>
                                            <v-chip
                                                v-for="(genre,i) in contrib.contribution.genres"
                                                class="ma-2 ml-2 updated_genre_chip genre_tag_link"
                                                color="pink"
                                                label
                                                :key="i"
                                                text-color="white"
                                                >
                                                <v-icon left>
                                                    mdi-folder
                                                </v-icon>
                                                {{ genre.name_genre }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            ID Steam
                                        </td>
                                        <td>
                                            <p>{{ contrib.contribution.steamappid}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Description (EN)
                                        </td>
                                        <td>
                                            <div v-if="contrib.contribution.description_en" v-html="contrib.contribution.description_en">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="description_line" >
                                        <td>
                                            Description (FR)
                                        </td>
                                        <td>
                                            <div v-if="contrib.contribution.description_fr" v-html="contrib.contribution.description_fr">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="description_line" >
                                        <td>
                                            {{$t('message.deus_results_modal_videos_title')}}
                                        </td>
                                        <td>
                                            {{ contrib.contribution.clip_url}}
                                        </td>
                                    </tr>
                                </table>
                                <contribButtons v-if="admin" field="all" newgame="true" :contribId="contrib.contribution.id"></contribButtons>
                            </v-expansion-panel-content>
                            
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <p class="p-5" v-else>
                        {{ $t('message.no_contribution_available')}} 
                    </p>
                </v-row>
            </v-container>
        </v-form>
        <div class="p-5" v-if="!loaded">
            <loading class="pa-5"></loading>
        </div>
        
    </section>
   
</template>
<script lang="js" type="module" >
    import contribActionbutton from '@/components/profil/contribActionbuttons'
    import Loading from '@/components/loading'
    export default {
        props: ['user_id', "admin"],
    data () {
        return {
            contributions:'',
            loaded:false
        }
    },
    components: {
      'loading' : Loading,
      'contribButtons' : contribActionbutton
    },
    created() {
        var comp = this;
        if(this.$props.user_id) {
            this.$http.$get("https://api.deussearch.fr/get_contributions.php?uid="+this.$props.user_id).then(response => {
                comp.contributions = response;
                console.log(comp.contributions);
                comp.loaded=true;
            });
        } else {
            this.$http.$get("https://api.deussearch.fr/get_contributions.php").then(response => {
            comp.contributions = response;
            comp.loaded=true;
            });
        }
    },
    methods: {
        finishValidateContrib(id) {
             this.$http.$post("https://api.deussearch.fr/update_contrib.php?status=complete&id="+id).then(result => {
                
             }, error => {
            });
        }
    }
}
</script>

<style>
.contribtable thead {
    text-align: center;
    padding: 10px;
    height: 50px;
    background: #0e0f2d;
    color: #959595 !important;
    font-size: 0.9em;
}

.contribtable tr td {
    padding: 20px;
}

.contribtable:not(.add) tr td:nth-of-type(2) p{
    color: rgb(219, 46, 46);
    text-align: right;
}
.contribtable:not(.add) tr td:nth-of-type(3) p{
    color: rgb(36, 161, 36);
    text-align: right;
}


.contribtable thead td:first-of-type,
.contribtable tr td:first-of-type {
    background: #0e0f2d;
    text-align: center;
    color: #959595 !important;
    font-size: 0.9em;
    border-bottom: 1px solid #28293a !important;
}

.contribtable thead td:nth-of-type(2),
.contribtable thead td:nth-of-type(3) {
    width: 50%; 
    border-left: 1px solid #28293a !important;
}
.contribtable tr td {
    border-right: 1px solid #0e0f2d !important;
}

.contribtable tr {
    border-bottom: 1px solid #0e0f2d;
}

.contribtable div:not(.contrib_action) {
    color: white;
    max-height: 250px;
    overflow-y: scroll;
    text-align: left;
    background: #070817;
    padding: 5px 15px;
}
.contribtable div *{
    color: white !important;
    text-align: left !important;
}

.contribtable .updated_genre_chip {
    margin-bottom: 5px;
}

.contrib_tab .v-expansion-panel-header {
    background: #070817;
    border-radius: 0 !important;
    margin-top: 5px;
}
.contrib_tab .v-expansion-panel-header .mdi-chevron-down,
.contrib_tab .v-expansion-panel-header .mdi-chevron-up {
    color: white !important;
}

.notice_contrib {
    display: block;
    margin-bottom: 5px;
    padding-left: 10px;
    font-size: 0.8em;
    text-align: left;
}

.notice_contrib i {
    color:#ffff76 !important;    
    font-size: 1.4em !important;
    margin-top: -3px;
}

.contrib_img {
    width: auto;
    height: 70px;
    margin-top: 5px;
    margin-right: 5px;
}

</style>