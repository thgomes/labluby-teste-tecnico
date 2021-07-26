const Token = require('../models/Token')
const User = require('../models/User')

let userId 

class SessionController {
    async store(req, res) {
        
        const { username } = req.body;

        const user = await User.findOne({where: { username }});
        
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const token = await Token.create({ user_id: user.id })

        userId = user.id;

        return res.json(token)
    }

    async authMiddleware(req, res, next) {
        req.userId = userId

        if (!req.userId) {
            return res.status(401).json({ error: 'unauthorized authentication, please create a session' });
        } 

        next()
    }


}

module.exports = new SessionController()
