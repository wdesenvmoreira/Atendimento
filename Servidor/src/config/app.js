// create app
import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import morgan from 'morgan'
import BodyParser from 'body-parser'
import RouterManager from '../routes/RouterManager'
import { SESSION_OPTIONS, DATA_SOURCE } from './'
import { AUTH_MIDDLEWARE } from '../middleware'
import Auth from '../modules/auth'
import { OPTS_CORS } from './cors'

// constante que define se está em produção ou desenvolvimento
export const IN_PROD = process.env.NODE_ENV === 'production'

export const CREATE_APP = (store) => {
  const app = express()

  // Desativa o X-Powered-By: Express -> impede que no cache aparece quem é o administrador da requisição.
  // essa publicação pode facilitar ataques porque torna conhecido que é o express()
  app.disable('x-Powered-by')

  // Ativa log
  if (process.env.NODE_ENV === 'development') {
    // morgam dá log nas requisições que chegam, para monitoramentos se necessário.
    app.use(morgan('dev'))
  }

  // inicia modelos
  app.datasource = DATA_SOURCE()

  // Parse JSON
  app.use(BodyParser.json())
  app.use(BodyParser.urlencoded({ extended: true }))

  // Permite acesso externo - cors monitora os redis
  app.use(cors(OPTS_CORS))
  // app.use(cors())

  // Monta Sessao
  app.use(session({ ...SESSION_OPTIONS, store }))

  // Inicia Passport Js
  const auth = Auth(app)
  app.auth = auth
  app.use(auth.initialize())
  app.use(auth.session()) // habilita o uso de sessão
  app.use(AUTH_MIDDLEWARE) // para validar quem vai entrar(logar)

  // Configura Rotas de Acesso
  RouterManager(app)

  return app
}
