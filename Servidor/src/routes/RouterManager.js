import Auth from './Auth'
import Usuario from './Usuario'
import Atendimento from './Atendimento'
import Query from './Query'

export default app => {
  // configurando Rotas
  Auth(app)
  Usuario(app)
  Atendimento(app)
  Query(app)
}
