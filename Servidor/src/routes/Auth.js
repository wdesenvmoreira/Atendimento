import HttpStatus from 'http-status'
import { SESSION_NAME } from '../config'
import { LOGIN_MIDDLEWARE } from '../middleware'

export default app => {
  // setar o model a ser utilizado
  const Usuario = app.datasource.models.Usuario

  app.post('/login', LOGIN_MIDDLEWARE, (req, res, next) => {
    app.auth.authenticate('local', (err, user, info) => {
      if (info) { return res.status(HttpStatus.UNAUTHORIZED).send(info.message) }

      if (err) { return next(err) }

      // Se não encontrar o usuario, devolve status e mensagem
      if (!user) { return res.status(HttpStatus.UNAUTHORIZED).send('Usuário não localizado') }

      req.login(user, (err) => {
        if (err) { return next(err) }
        req.session.key = req.sessionID
        req.headers.Authorization = ''
        // 1a. etapa
        return res.status(HttpStatus.OK).json(user)
        // 2o. etapa - Melhoria de segurança (opcional)
        // res.redirect('/validar') // chama outra rota para validação
      })
    })(req, res, next) // como é uma promisse, passa o req, res e next para que seja usado dentro do contexto de "authenticate"
  })

  app.get('/validar', (req, res) => {
    res.status(HttpStatus.OK).json({
      logado: req.isAuthenticated(),
      usuario: req.user,
      message: 'Você está logado'
    })
  })

  app.get('/logout', (req, res, next) => {
    // Desmonta a sessão
    req.logout()
    req.session.destroy((err) => {
      if (err) { return next(err) }
    })

    // Limpa o cookie - se não limpar, vai ter q esperar o tempo da sessao expirar para conseguir logar novamente
    res.clearCookie(SESSION_NAME)

    // Faz nova verificação se está autenticado
    res.json({
      logado: req.isAuthenticated(),
      message: 'LOGOUT realizado com sucesso'
    })
  })
}
