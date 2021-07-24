const Router = require('express')

const routes = new Router()

const UserController = require('./app/controllers/UserController')

routes.get('/', (req, res) => {
    res.json({message: 'hello'})
})

routes.post('/users', UserController.store)
routes.get('/users/:id', UserController.show)

module.exports = routes