const Repository = require('../models/Repository')

class RepositoryController {
    async store(req, res) {
        //req.body.user_id = 2,
        req.body.slug = `${req.body.userId}-${req.body.name}`

        const { name, user_id, description, slug, is_public } = await Repository.create(req.body)

        console.log(`userId = ${req.userId}`)

        return res.json({ name, user_id, description, slug, is_public })
    }

    async show(req, res) {
        const { name, user_id, description, slug, is_public } = await Repository.findByPk(req.params.id)

        return res.json({ name, user_id, description, slug, is_public })

    }

}

module.exports = new RepositoryController()