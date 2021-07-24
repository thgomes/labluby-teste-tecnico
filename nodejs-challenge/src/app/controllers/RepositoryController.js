const Repository = require('../models/Repository')

class RepositoryController {
    async store(req, res) {
        req.body.slug = `${req.body.username}-${req.body.name}`

        const { name, username, description, slug, is_public } = await Repository.create(req.body)

        return res.json({ name, username, description, slug, is_public })
    }

}

module.exports = new RepositoryController()