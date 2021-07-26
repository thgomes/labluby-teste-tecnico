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

        return res.json({
            id,
            name,
            location,
            bio
        })

    }

    async update(req, res) {
        const { name, username, email, location, bio } = req.body
        
        const usernameExists = await User.findOne({ where: { username } })

        if (usernameExists) {
            return res.status(400).json({ error: 'Username already registered' });
        }
        
        const user = await User.findByPk(req.userId)

        await user.update(req.body)

        return res.json({ 
            name,
            username,
            email,
            location, 
            bio
        })

    }

    async delete(req, res) {
        const user = await User.findByPk(req.userId)

        const {id, name, username} = user

        await user.destroy();

        return res.json({ 
            id,
            name,
            username
        })
    }
}



module.exports = new UserController()