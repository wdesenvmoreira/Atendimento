import httpStatus from 'http-status'
import atob from 'atob'
export const AUTH_MIDDLEWARE = (req, res, next) => {
  if (req.method === 'OPTIONS') { return next() }

  if (req.path === '/login' && req.method === 'POST') {
    return req.isAuthenticated()
      ? res.status(httpStatus.OK).json({
        logado: req.isAuthenticated(),
        mensagem: 'Já existe uma sessão ativa'
      })
      : next()
  }

  // eslint-disable-next-line eqeqeq
  if (req.path === '/logout' && req.method == 'GET') {
    return req.isAuthenticated()
      ? next()
      : res.status(httpStatus.UNAUTHORIZED)
        .json({
          logado: req.isAuthenticated(),
          mensagem: 'Não há sessão a ser eliminada!'
        })
  }

  if (!req.isAuthenticated()) {
    return res.status(httpStatus.UNAUTHORIZED)
      .json({
        logado: req.isAuthenticated(),
        mensagem: 'Você não está logado.'
      })
  }

  next()
}

export const LOGIN_MIDDLEWARE = (req, res, next) => {
  if (req.headers.authorization) {
    req.body = JSON.parse(atob(req.headers.authorization))
  }
  next()
}
