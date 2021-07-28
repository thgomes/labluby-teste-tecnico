const Router = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = new Router()
const upload = multer(multerConfig)

const UserController = require('./app/controllers/UserController')
const RepositoryController = require('./app/controllers/RepositoryController')
const SessionController = require('./app/controllers/SessionController')
const FollowerController = require('./app/controllers/FollowerController')
const FollowingController = require('./app/controllers/FollowingController')
const FileController = require('./app/controllers/FileController')
const StarController = require('./app/controllers/StarController')

routes.get('/', (req, res) => {
    res.json({message: 'ok'})
})

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(SessionController.authMiddleware)

routes.get('/users/:id', UserController.show)
routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)

routes.get('/repository/:id', RepositoryController.show)
routes.get('/repository', RepositoryController.index)
routes.post('/repository', RepositoryController.store)
routes.put('/repository', RepositoryController.update)
routes.delete('/repository/:id', RepositoryController.delete)

routes.get('/followers', FollowerController.index)
routes.delete('/followers/:id', FollowerController.delete)

routes.get('/stars', StarController.index)
routes.post('/stars/:id', StarController.store)
routes.delete('/stars/:id', StarController.delete)

routes.get('/following', FollowingController.index)
routes.post('/following/:id', FollowingController.store)
routes.delete('/following/:id', FollowingController.delete)


routes.post('/files', upload.single('file'), FileController.store)

module.exports = routes