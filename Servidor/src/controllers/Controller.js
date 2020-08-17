// É uma classe controladora dinâmica
import HttpStatus from 'http-status'

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode
})

const errorResponse = (data, statusCode = HttpStatus.BAD_REQUEST) => ({
  data,
  statusCode
})

export default class Controller {
  constructor (Classe) {
    this.controle = Classe
  }

  getAll () {
    return this.controle.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message))
  }

  getAllFilter (params) {
    return this.controle.findAll(params)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message))
  }

  getById (params) {
    return this.controle.findByPk(params.id)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message))
  }

  findOne (params) {
    return this.controle.findOne(params)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message))
  }

  create (data) {
    return this.controle.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY))
  }

  update (data, params) {
    return this.controle.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY))
  }

  delete (params) {
    return this.controle.destroy({ where: params })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY))
  }
}
