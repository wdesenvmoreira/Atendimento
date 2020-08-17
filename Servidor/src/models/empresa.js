export default (sequelize, DataType) =>{
  const Empresa = sequelize.define('Empresa', {
    id:{
      type: DataType.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    }
    ,
    nome:{
      type: DataType.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    }
  })
  return Empresa
}