// vai criar a rota de usuario
import Rotas from './Rotas'
import UsuarioController from '../controllers/UsuarioController'

export default app => {
  const modelUsuario = new UsuarioController(app.datasource.models.Usuario)
  Rotas(app, modelUsuario, 'usuario')
}