import Vue from 'vue'
import Router from 'vue-router'
import Homecomponent from '~/pages/index'
import ContactComponent from '~/pages/Contact'
import DeusTest from '~/pages/Deustest'
import Deusresults from '~/pages/deusResults'
import TextPage from '~/pages/textpage'
import ProfilComponent from '~/pages/profile'
import BlogPage from '~/pages/blogpage'
import SinglePost from '~/pages/singlepost'
import SingleGame from '~/pages/singlegame'
import SingleGameEdit from '~/pages/singlegameedit'
import SingleGameAdd from '~/pages/singlegameadd'
import SingleTag from '~/pages/singletag'
import SingleGenre from '~/pages/singlegenre'
import SinglePlatform from '~/pages/singleplatform'
import SinglePub from '~/pages/singlepub'
import allPlatforms from '~/pages/allPlatforms'
import allGenres from '~/pages/allGenres'
import allPublishers from '~/pages/AllPubs'

Vue.use(Router);

export function createRouter() {
    return new Router({
      mode: 'history',
        routes: [
          {
          path: '/',
          name: 'home___fr',
          component: Homecomponent,
          props: { used_lang_for_route: 'fr' , page_title: 'Deus Search - Des jeux selon ta personnalité - Accueil'}
          },
          {
          path: '/en',
          name: 'home___en',
          component: Homecomponent,
          props: { used_lang_for_route: 'en' , page_title: 'Deus Search - Video games search engine - Homepage'}
          },
            {
              path: '/blog',
              name: 'blog',
              component: BlogPage,
              props: { used_lang_for_route: 'fr',  page_title: 'Blog' }
            },
            {
              path: '/blog/:postid/:postslug',
              name: 'singlepost',
              component: SinglePost,
              props: { used_lang_for_route: 'fr' }
            },
            {
              path: '/game/:gameid/:gamename',
              name: 'single_game',
              component: SingleGame,
              props: { used_lang_for_route: 'fr' }
            },
            {
              path: '/edit-game/:gameid/:gamename',
              name: 'edit_single_game',
              component: SingleGameEdit,
              props: { used_lang_for_route: 'fr' }
            },
            {
              path: '/game/add',
              name: 'add_game',
              component: SingleGameAdd,
              props: { used_lang_for_route: 'fr' }
            },
            {
              path: '/en/game/:gameid/:gamename',
              name: 'single_game_en',
              component: SingleGame,
              props: { used_lang_for_route: 'en' }
            },
            {
              path: '/tag/:tagid/:tagname',
              name: 'single_tag',
              component: SingleTag,
              props: { used_lang_for_route: 'fr' }
            },
            {
            path: '/platforms',
            name: 'platforms_fr',
            component: allPlatforms,
            props: { used_lang_for_route: 'fr' , page_title: 'Toutes les consoles de jeu'}
            },
            {
            path: '/en/platforms',
            name: 'platforms_en',
            component: allPlatforms,
            props: { used_lang_for_route: 'en' , page_title: 'All gaming platforms'}
            },
            {
              path: '/platform/:platformid/:platformname',
              name: 'single_platform',
              component: SinglePlatform,
              props: { used_lang_for_route: 'fr' }
            },
            
            {
              path: '/genres',
              name: 'genres_fr',
              component: allGenres,
              props: { used_lang_for_route: 'fr' , page_title: 'Tous les genres de jeux'}
              },
            {
              path: '/en/genres',
              name: 'genres_en',
              component: allGenres,
              props: { used_lang_for_route: 'en' , page_title: 'All gaming genres'}
              },
            {
              path: '/genre/:genreid/:genrename',
              name: 'single_genre',
              component: SingleGenre,
              props: { used_lang_for_route: 'fr' }
            },
            {
              path: '/publishers',
              name: 'publisher_fr',
              component: allPublishers,
              props: { used_lang_for_route: 'fr' , page_title: 'Tous les éditeurs de jeux'}
              },
            {
              path: '/publisher/:pubid/:pubname',
              name: 'single_pub',
              component: SinglePub,
              props: { used_lang_for_route: 'fr' }
            },
            {
              path: '/profil',
              name: 'profil',
              component: ProfilComponent,
              props: { used_lang_for_route: 'fr',  page_title: 'Deus Search : Tableau de bord' }
            },
            {
            path: '/test-de-personnalite',
            name: 'deus_test_fr',
            component: DeusTest,
            props: { used_lang_for_route: 'fr' , page_title: 'Test de personnalité Deus Search - Trouvez des jeux vidéo'}
            },
            {
            path: '/presentation',
            name: 'presentation_fr',
            component: TextPage,
            props: { used_lang_for_route: 'fr' , page_title: 'Presentation', page_wp_id: 5}
            },
            {
            path: '/contact',
            name: 'contact_fr',
            component: ContactComponent,
            props: { used_lang_for_route: 'fr' , page_title: 'Deus Search - Nous contacter'}
            },
            {
              path: '/studio-partenaire',
              name: 'studio_partenaire_fr',
              component: TextPage,
              props: { used_lang_for_route: 'fr' , page_title: 'Studios de développement partenaire', page_wp_id: 19}
            },
            {
              path: '/streamers-partenaires',
              name: 'streamers_partenaire_fr',
              component: TextPage,
              props: { used_lang_for_route: 'fr' , page_title: 'Streamers Partenaires', page_wp_id: 38}
            },
            {
            path: '/resultat',
            name: 'resultat_fr',
            component: Deusresults,
            props: (route) => ({ query: route.query.q,  used_lang_for_route: 'fr' , page_title: 'Deus Search - Rechercher des jeux vidéo' }) 
            },
            {
            path: '/cgu/',
            name: 'cgu_fr',
            component: TextPage,
            props: { used_lang_for_route: 'fr' , page_title: 'Conditions générales d\'utilisation', page_wp_id: 26}
            },
            {
            path: '/en/personnality-test',
            name: 'deus_test_en',
            component: DeusTest,
            props: { used_lang_for_route: 'en' , page_title: 'Deus Search - Video games personnality test'}
            },
            {
            path: '/en/presentation',
            name: 'presentation_en',
            component: TextPage,
            props: { used_lang_for_route: 'en' , page_title: 'Who are we ?', page_wp_id: 8}
            },
            {
            path: '/en/contact',
            name: 'contact_en',
            component: ContactComponent,
            props: { used_lang_for_route: 'en' , page_title: 'Deus Search - Contact Us'}
            },
            {
            path: '/en/results',
            name: 'resultat_en',
            component: Deusresults,
            props: (route) => ({ query: route.query.q,  used_lang_for_route: 'en' , page_title: 'Deus Search - Search for video games' }) 
            },
            {
            path: '/en/cgu/',
            name: 'cgu_en',
            component: TextPage,
            props: { used_lang_for_route: 'en' , page_title: 'Deus Search - legal notices', page_wp_id: 49}
            },
            {
              path: '/en/partners-studios',
              name: 'studio_partenaire_en',
              component: TextPage,
              props: { used_lang_for_route: 'en' , page_title: 'Partner Development Studios', page_wp_id: 43}
            },
            {
              path: '/en/partners-streamers',
              name: 'streamers_partenaire_en',
              component: TextPage,
              props: { used_lang_for_route: 'en' , page_title: 'Partner streamers', page_wp_id: 45}
            },
        ]
    })
  }