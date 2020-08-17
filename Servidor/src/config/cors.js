import { WHITE_LIST_DOMAIN } from './whitelist-domain'

export const OPTS_CORS = {
  origin: (origin, callback) => {
    if (WHITE_LIST_DOMAIN.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Dominio não permitido pelo CORS'), false)
    }
  },
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  methods: 'GET,HEAD,PUT,PUTCH,POST,DELETE',
  credentials: true,
  preflightContinue: true
}