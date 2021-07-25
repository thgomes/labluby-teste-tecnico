const Token = require('../models/Token')
const User = require('../models/User')

class SessionController {
    async store(req, res) {
        
        const { username } = req.body;

        const user = await User.findOne({where: { username }});
        
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const token = await Token.create({ user_id: user.id })

        return res.json(token)
    }


}

module.exports = new SessionController()