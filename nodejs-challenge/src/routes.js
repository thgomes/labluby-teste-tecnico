const Router = require('express')

const routes = new Router()

const UserController = require('./app/controllers/UserController')
const RepositoryController = require('./app/controllers/RepositoryController')
const SessionController = require('./app/controllers/SessionController')
const FollowersController = require('./app/controllers/FollowersController')
const FollowingController = require('./app/controllers/FollowingController')

routes.get('/', (req, res) => {
    res.json({message: 'hello'})
})

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(SessionController.authMiddleware)

routes.get('/users/:id', UserController.show)

routes.get('/repository/:id', RepositoryController.show)
routes.post('/repository', RepositoryController.store)
routes.get('/repository', RepositoryController.index)

routes.get('/follower', FollowersController.index)

routes.get('/following', FollowingController.index)
routes.post('/following', FollowingController.store)


module.exports = routes