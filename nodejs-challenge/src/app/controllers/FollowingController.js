const Follow = require('../models/Follow')
const User = require('../models/User')

class FollowingController {
    // method for logged in user follow another user
    async store(req, res) {
        const { followed_id } = req.body

        const follower_id = req.userId

        const alreadyFollow = await Follow.findAndCountAll({
            where: { followed_id, follower_id },
            order: [['created_at', 'DESC']],
            attributes: ['id'],
        });

        if (alreadyFollow.count > 0) {
            return res.status(405).json({ error: "You already this user" })
        }

        const follow = await Follow.create({ followed_id, follower_id })

        return res.json(follow)
    }

    // method to show all users followed by the logged in user
    async index(req, res) {
        const followedUsers = await Follow.findAndCountAll({
            where: { follower_id: req.userId },
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

    async delete(req, res) {
        const followed_id = req.params.id

        const follower_id = req.userId

        const alreadyFollow = await Follow.findAndCountAll({
            where: { followed_id, follower_id },
            order: [['created_at', 'DESC']],
            attributes: ['id'],
        });

        console.log("aquiiiiiii      ------     " + alreadyFollow.count)
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