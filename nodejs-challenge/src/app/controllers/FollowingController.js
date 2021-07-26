const Follow = require('../models/Follow')
const User = require('../models/User')

class FollowingController {
    // method for logged in user follow another user
    async store(req, res) {
        const { followed_id } = req.body
        const follower_id = req.userId

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

        console.log(followedUsers)

        return res.json(followedUsers);
    }

}

module.exports = new FollowingController()