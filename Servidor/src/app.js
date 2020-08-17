// é o app da aplicação propriamente dito - da API
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis' // tem outros "redis" cuidado - esse "ioredes" tem mais algumas funções - faz cache
import { CREATE_APP, REDIS_OPTIONS, THIRTY_MINUTES } from './config'

const RedisStore = connectRedis(session) // cria sessao RedisStore e carrega o session dentro do connectRedis

const client = new Redis(REDIS_OPTIONS) // instanciando uma sessão do Redis

const store = new RedisStore({ client, ttl: THIRTY_MINUTES }) // instancia uma sessap do RedisStore e passa os parâmetros sendo q ttl é o tempo q vai ficar ativo

const app = CREATE_APP(store)

export default app