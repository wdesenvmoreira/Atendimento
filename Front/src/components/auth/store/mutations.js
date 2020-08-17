// Permite mudar o estado que foi declarado em state.js
import * as types from './mutation-types'

export default {
  [types.SET_USUARIO] (state, payload) {
    state.usuario = payload
  },
  [types.SET_LOGADO] (state, payload) {
    state.logado = payload
  }
}
