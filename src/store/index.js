import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'

import Charactor from '../assets/json/jsonChara.json'
import Dialogue from '../assets/json/jsonDialogue.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    charactor: parseCharactor(Charactor),
    dialogue: Dialogue,
    selectedChara: [],
    selectedPattern: Object.keys(Dialogue)[0],
    selectedDialogue: null,
    language: 'CN',
    ifMainShow: true,
    ifDLCShow: true
  },
  getters,
  mutations
})

function parseCharactor (charactor) {
  for (let cid in charactor) {
    charactor[cid]['cid'] = cid
    charactor[cid]['img'] = 'http://share.idkiro.xyz/xb2/image/' + cid + '.png'
  }
  return charactor
}
