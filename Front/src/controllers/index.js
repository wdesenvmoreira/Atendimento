import axios from 'axios'
import EventDispatcher from './EventDispatcher'

export default class Controller extends EventDispatcher {
  constructor () {
    super()
    this.token_auth = ''
  }

  get token () {
    return this.token_auth
  }

  set token (val) {
    this.token_auth = val
  }

  get rest () {
    return axios.create({
      baseURL: `http://${location.hostname}:3000`,
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true
    })
  }

  dispatchError (eventName, error = null) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: error }))
  }

  dispatchResponse (eventName, response = null) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: response }))
  }

  dispatchAntesReq (eventName) {
    this.dispatchEvent(new CustomEvent(eventName))
  }
}
