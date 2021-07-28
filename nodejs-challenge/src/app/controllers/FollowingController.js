const Follow = require('../models/Follow')
const User = require('../models/User')

class FollowingController {
    // Método para o usuário logado seguir outro usuário
    async store(req, res) {
        const followed_id = req.params.id
        const follower_id = req.userId

        const followed = await User.findByPk(followed_id)

        if (!followed) {
            return res.status(400).json({ error: 'There is not any user with that ID' });
        }

        const alreadyFollow = await Follow.findAndCountAll({
            where: { followed_id, follower_id },
            order: [['created_at', 'DESC']],
            attributes: ['id'],
        });

        if (alreadyFollow.count > 0) {
            return res.status(405).json({ error: "You already follow this user" })
        }

        const follow = await Follow.create({ followed_id, follower_id })

        return res.json(follow)
    }

    // Método para o usuário logado listar todos os usuários que ele segue
    async index(req, res) {
        const follower_id = req.userId;
        const followedUsers = await Follow.findAndCountAll({
            where: { follower_id },
            order: [['created_at', 'DESC']],
            attributes: ['id', 'follower_id', "followed_id", 'created_at'],
            include: [
                {
                    model: User,
                    as: 'follower',
                    attributes: ['name', 'username', 'email']

                }
            ]
        });

        return res.json(followedUsers);
    }

    // Método para o usuário logado deixar de seguir outro usuário
    async delete(req, res) {
        const followed_id = req.params.id
        const follower_id = req.userId


        const followed = await User.findByPk(followed_id)

        if (!followed) {
            return res.status(400).json({ error: 'There is not any user with that ID' });
        }

        const alreadyFollow = await Follow.findAndCountAll({
            where: { followed_id, follower_id },
            order: [['created_at', 'DESC']],
            attributes: ['id'],
        });

        if (alreadyFollow.count === 0) {
            return res.status(405).json({ error: "You do not follow this user" })
        }

        const follow = await Follow.findOne({
            where: { followed_id, follower_id }
        })

        await follow.destroy()

        return res.json({ followed_id, follower_id })

    }
}

module.exports = new FollowingController()