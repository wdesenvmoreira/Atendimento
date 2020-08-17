// Define a rota de "Atendimento"
import Rotas from './Rotas'
import AtendimentoController from '../controllers/AtendimentoController'

export default app => {
  const modelAtendimento = new AtendimentoController(app.datasource.models.Atendimento)
  Rotas(app, modelAtendimento, 'atendimento')
}
