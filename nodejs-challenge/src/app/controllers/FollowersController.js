const Follow = require('../models/Follow')

class FollowersController {
    async store(req, res) {
        return res.json('ok')
    }
    async index(req, res) {

    
        return res.json(req.userId);
    }

}

module.exports = new FollowersController()