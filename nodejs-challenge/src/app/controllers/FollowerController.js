const Follow = require('../models/Follow')
const User = require('../models/User')

class FollowerController {
    // Método para usuário logado listar todos os seu seguidores
    async index(req, res) {
        const followed_id = req.userId
        const followerUsers = await Follow.findAndCountAll({
            where: { followed_id },
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
        return res.json(followerUsers)
    }
    
    // Método para usuário logado para de ser seguido por usuário indesejado
    async delete(req, res) {
        const follower_id = req.params.id
        const followed_id = req.userId


        const followed = await User.findByPk(follower_id)

        if (!followed) {
            return res.status(400).json({ error: 'There is not any user with that ID' });
        }

        const alreadyFollow = await Follow.findAndCountAll({
            where: { follower_id, followed_id },
            order: [['created_at', 'DESC']],
            attributes: ['id'],
        });

        if (alreadyFollow.count === 0) {
            return res.status(405).json({ error: "This user does not follow you" })
        }

        const follow = await Follow.findOne({
            where: { follower_id, followed_id }
        })

        await follow.destroy()

        return res.json({ follower_id, followed_id })

    }
}

module.exports = new FollowerController()