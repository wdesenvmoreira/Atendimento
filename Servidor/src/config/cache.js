// arquivo que vai receber as configurações do cache (usa o redis na porta padrão, pode-se configurar)
const {
  REDIS_PORT = 6379,
  REDIS_HOST = 'localhost'
} = process.env

export const REDIS_OPTIONS = {
  port: REDIS_PORT,
  host: REDIS_HOST
}
