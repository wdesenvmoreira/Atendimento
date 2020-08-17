// Rota que recebe uma propriedade SQL e passa para o Sequelize resolver (executa uma instrução SQL)
// tem q ser usado com cautela
export default app => {
  app.post('/query', (req, res) => {
    app.datasource.sequelize.query(req.body.sql)
      .then(result => {
        res.json(result[0])
      })
      .catch(err => res.status(err.statusCode))
  })
}
