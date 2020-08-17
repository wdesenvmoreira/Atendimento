// criando um modelo no est.ilo sequelize
import bcrypt from 'bcrypt'

export default (sequelize, Datatype) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: Datatype.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Datatype.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Datatype.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    senha: {
      type: Datatype.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    empresa: {
      type: Datatype.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    filial: {
      type: Datatype.INTEGER,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: usuario => {
        const salt = bcrypt.genSaltSync()
        usuario.set('senha', bcrypt.hashSync(usuario.senha, salt))
      }
    }
  })

  Usuario.isPassword = (encodedPassword, senha) => bcrypt.compareSync(senha, encodedPassword)

  return Usuario
}
