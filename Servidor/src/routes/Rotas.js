export default (app, model, rota) => {
  app.route(`/${rota}`)
    .get((req, res) => {
      model.getAll()
        .then(response => {
          res.status(response.statusCode)
          res.json(response.data)
        })
        .catch(error => {
          res.status(error.statusCode)
          res.json(error.data)
        })
    })
    .post((req, res) => {
      model.create(req.body)
        .then(response => {
          res.status(response.statusCode)
          res.json(response.data)
        })
        .catch(error => {
          res.status(error.statusCode)
          res.json(error.data)
        })
    })

  app.route(`/${rota}/:id`)
    .get((req, res) => {
      model.getById(req.params)
        .then(response => {
          res.status(response.statusCode)
          res.json(response.data)
        })
        .catch(error => {
          res.status(error.statusCode)
          res.json(error.data)
        })
    })
    .put((req, res) => {
      model.update(req.body, req.params)
        .then(response => {
          res.status(response.statusCode)
          res.json(response.data)
        })
        .catch(error => {
          res.status(error.statusCode)
          res.json(error.data)
        })
    })
    .delete((req, res) => {
      model.delete(req.params)
        .then(response => {
          res.status(response.statusCode)
          res.json(response.data)
        })
        .catch(error => {
          res.status(error.statusCode)
          res.json(error.data)
        })
    })
}