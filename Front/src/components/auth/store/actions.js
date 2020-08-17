import * as types from './mutation-types'
import LoginCtrl from '../controller/LoginController'

export const ActionSetUsuario = ({ commit }, payload) => {
  commit(types.SET_USUARIO, payload)
  LoginCtrl.token = ''
}

export const ActionSetLogado = ({ commit }, payload) => {
  commit(types.SET_LOGADO, payload)
}

export const ActionLogin = ({ dispatch }, payload) => {
  // base64
  LoginCtrl.token = btoa(JSON.stringify(payload))

  return LoginCtrl.logar().then(res => {
    dispatch('ActionSetUsuario', res.data)
    dispatch('ActionSetLogado', true)
  })
}

export const ActionValidarSessao = ({ dispatch }) => {
  return LoginCtrl.validarSessao().then(res => {
    if (res.status === 200) {
      dispatch('ActionSetUsuario', res.data.usuario)
      dispatch('ActionSetLogado', res.data.logado)
    }
  })
}

export const ActionLogOut = async ({ dispatch }) => {
  try {
    const res = await LoginCtrl.logout()
    if (!res.logado) {
      dispatch('ActionSetUsuario', {})
      dispatch('ActionSetLogado', false)
    }
  } catch (error) {
    console.error(error)
  }
}
