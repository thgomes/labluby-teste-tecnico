const Router = require('express')

const routes = new Router()

const UserController = require('./app/controllers/UserController')
const RepositoryController = require('./app/controllers/RepositoryController')

routes.get('/', (req, res) => {
    res.json({message: 'hello'})
})

routes.post('/users', UserController.store)
routes.get('/users/:id', UserController.show)

routes.get('/repository/:id', RepositoryController.show)
routes.post('/repository', RepositoryController.store)



module.exports = routes