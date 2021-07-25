const Router = require('express')

const routes = new Router()

const UserController = require('./app/controllers/UserController')
const RepositoryController = require('./app/controllers/RepositoryController')
const SessionController = require('./app/controllers/SessionController')

routes.get('/', (req, res) => {
    res.json({message: 'hello'})
})

routes.post('/session', SessionController.store)

routes.post('/users', UserController.store)
routes.get('/users/:id', UserController.show)

routes.get('/repository/:id', RepositoryController.show)
routes.post('/repository', RepositoryController.store)



module.exports = routes