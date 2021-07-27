const User = require('../models/User')
const File = require('../models/File')

class UserController {
    // Método para criar um usuário
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

    /* Método para usuário logado editar as informações do seu perfil
       Neste método é possivel que o usuário coloque uma foto como avatar
    */
    async update(req, res) {
        const { username } = req.body
        
        const usernameExists = await User.findOne({ where: { username } })

        if (usernameExists) {
            return res.status(400).json({ error: 'Username already registered, choose another username' });
        }
        
        const user = await User.findByPk(req.userId)

        await user.update(req.body)

        const { id, name, email, location, bio, avatar } = await User.findByPk(req.userId, {
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'],
              },
            ],
        });

        return res.json({ 
            id,
            name,
            username,
            email,
            location, 
            bio,
            avatar
        })
    }

    // Método para usuário logado deletar sua conta
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