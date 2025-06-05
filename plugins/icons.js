import Vue from 'vue'
import { mdiMagnify, mdiClose } from '@mdi/js'

// Créer un objet d'icônes minimal
const icons = {
  mdiMagnify,
  mdiClose
}

// Ajouter les icônes au prototype de Vue
Vue.prototype.$mdiIcons = icons 