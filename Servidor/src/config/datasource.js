import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'
import { DB } from './'

// cria e seta null para uma variável database
let database = null

const loadModels = (sequelize) => {
  // Retorna o endereço path do diretório models
  const dir = path.join(__dirname, '../models')

  // Cria um array vazio chamado models
  // eslint-disable-next-line prefer-const
  let models = []

  // Ler todos os arquivos do diretorio models
  fs.readdirSync(dir).forEach(arquivo => {
    // Monta um path para cada um dos arquivos
    const modelDir = path.join(dir, arquivo)

    // Importa o model para o sequelize recebido
    const model = sequelize.import(modelDir)

    // Atribuir o model importado para o array de models
    models[model.name] = model
  })

  return models
}

export const DATA_SOURCE = () => {
  if (!database) {
    // Passa as configurações do app para a constante config
    const config = DB

    // Configura e instancia o Sequelize
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    )

    // Atribui ao database uma instancia do Sequelize, a biblioteca e um objeto models
    database = {
      sequelize,
      Sequelize,
      models: { }
    }

    // Carrega os modelos de forma dinamica para propriedades models
    database.models = loadModels(sequelize)
    sequelize.sync().done(() => database)
  }
  return database
}
