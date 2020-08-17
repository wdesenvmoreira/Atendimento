export default (sequelize, Datatype) => {
  const Atendimento = sequelize.define('Atendimento', {
    id: {
      type: Datatype.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: Datatype.STRING,
      allowNull: false,
      validate:{
        notEmpty:true
      }
    }
  })

  return Atendimento

}
