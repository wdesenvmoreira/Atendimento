import { IN_PROD } from './app.js'

// EXEMPLO DE USO
const ONE_HOUR = 1000 * 60 * 90

export const THIRTY_MINUTES = ONE_HOUR / 2

const SIX_HOURS = ONE_HOUR * 6

// criando uma constante, fica mais fácil configurar se necessário alterar
export const {
  SESSION_SECRET = 'tr3in@M3b',
  SESSION_NAME = 'trw', // treinamento web, o padrão e 'sid'
  SESSION_IDLE_TIMEOUT = THIRTY_MINUTES
} = process.env

export const SESSION_ABSOLUTE_TIMEOUT = (process.env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS)

// tem os padrões, quando quer desligar precisa fazer aqui ou atribuir o padrão desejado
export const SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  rolling: true, // atualiza o tempo da sessao
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true
  }
}

