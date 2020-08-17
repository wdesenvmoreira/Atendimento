import passport from 'passport'
import Strategy from 'passport-local'

export default app => {
  // configufa o modelo a ser utilizado (guarda o modelo)
  const Usuario = app.datasource.models.Usuario

  // Configurar a serialização e deserialização do usuario
  passport.serializeUser((user, done) => {
    done(null, user.id) // se conseguir deserializar, retorna o id do usuario
  })

  // deserializar, se encontrar retorno o usuário, se não encontrar retorna o objeto vazio
  // eslint-disable-next-line camelcase
  passport.deserializeUser((user_id, done) => {
    Usuario.findByPk(user_id)
      .then(user => {
        return done(null, user)
      })
      .catch(() => {
        done(null, false)
      })
  })

  // Configurar as options do Passport
  const opts = {}

  // adicionando as propriedades do options -> poderia ter sido adicionado direto na definição da constante acima
  opts.passReqToCallback = true
  opts.usernameField = 'email'
  opts.passwordField = 'senha'

  // Definindo a estratégia a ser utilizado a cada requisição
  const strategy = new Strategy(opts, (req, email, senha, done) => {
    // Buscar usuario pelo ID
    Usuario.findOne({ where: { email } })
      .then(usuario => {
      // Se o usuario não existir retorna como false
        if (!usuario) { return done(null, false) }
        // Validar a senha informada com a senha cadastrada
        // e retornar o usuario
        if (Usuario.isPassword(usuario.senha, senha)) { return done(null, usuario) }
      })
    // caso ocorrer erro na requisição ao BD retorna o erro
      .catch(err => done(err, null))
  })

  // Configurar a estratégia no Passaport
  passport.use(strategy)

  return passport
}
