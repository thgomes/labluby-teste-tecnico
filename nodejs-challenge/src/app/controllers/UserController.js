const User = require('../models/User')

class UserController {
    async store(req, res) {
        const { id, name, email, location, bio } = await User.create(req.body)

        return res.json({ id, name, email, location, bio })
    }

    async show(req, res) {
        const { id, name, location, bio } = await User.findByPk(req.params.id)

        return res.json({ id, name, location, bio })

    }

    async index(req, res) {
        const { page = 1 } = req.query;

        const users = await User.findAndCountAll({
            where: { user_id: req.userId }
        })
    }

}

module.exports = new UserController()