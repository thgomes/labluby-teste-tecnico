const Router = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = new Router()
const upload = multer(multerConfig)

const UserController = require('./app/controllers/UserController')
const RepositoryController = require('./app/controllers/RepositoryController')
const SessionController = require('./app/controllers/SessionController')
const FollowersController = require('./app/controllers/FollowersController')
const FollowingController = require('./app/controllers/FollowingController')
const FileController = require('./app/controllers/FileController')

routes.get('/', (req, res) => {
    res.json({message: 'hello'})
})

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(SessionController.authMiddleware)

routes.get('/users/:id', UserController.show)
routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)

routes.get('/repository/:id', RepositoryController.show)
routes.post('/repository', RepositoryController.store)
routes.get('/repository', RepositoryController.index)
routes.delete('/repository/:id', RepositoryController.delete)

routes.get('/follower', FollowersController.index)

routes.get('/following', FollowingController.index)
routes.post('/following', FollowingController.store)
routes.delete('/following/:id', FollowingController.delete)

routes.post('/files', upload.single('file'), FileController.store)

module.exports = routes