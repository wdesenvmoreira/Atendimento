import Controller from '../../../controllers'

class LoginController extends Controller {
  logar (dados) {
    return this.rest.post('/login', dados)
      .then(res => {
        console.log(res.data)
        // this.dispatchResponse('aposLogin', res.data)
        return res
      }
      )
      .catch(erro => {
        // this.dispatchError('errorLogin', erro)
        return erro
      })
  }

  validarSessao () {
    // this.dispatchAntesReq('antesCarregarSessao)
    return this.rest.get('/validar')
      .then(res => {
        return res
        // this.dispatchResponse('sucessoCarregarSessao', res.data)
      })
      .cath(err => {
        return err
        // this.dispatchError('erroCarregarSessao', err.message)
      })
  }

  logout () {
    // this.dispatchAntesReq('antesCarregarSessao')
    return this.rest.get('/logout')
      .then(res => {
        return res

        // this.dispatchResponse('sucessoEncerrarSessao', res.data)
      })
      .catch(err => {
        return err
        // this.dispatchError('erroEncerrarSessao', err.message)
      })
  }
}
export default new LoginController()
