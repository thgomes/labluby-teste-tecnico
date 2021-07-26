const User = require('../models/User')

class UserController {
    async store(req, res) {
        const usernameExists = await User.findOne({ where: { username: req.body.username } })

        if (usernameExists) {
            return res.status(400).json({ error: 'Username already registered' });
        }

        const { id, name, email, location, bio } = await User.create(req.body)

        return res.json({ 
            id,
            name,
            email,
            location,
            bio
        })
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

    async update(req, res) {
        const user = await User.findByPk(req.userId)


    }

}

module.exports = new UserController()