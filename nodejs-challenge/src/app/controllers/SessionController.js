const Token = require('../models/Token')
const User = require('../models/User')

let userId 

class SessionController {
    // Método quer permite que um usuário crie uma sessão por meio do usernme
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

    /*
        Middleware que vai verificar se o usuário está logado e vai disponibilizar
        o ID do usuário logado para os outros controllers
    */
    async authMiddleware(req, res, next) {
        req.userId = userId

        if (!req.userId) {
            return res.status(401).json({ error: 'unauthorized authentication, please create a session' });
        } 

        next()
    }


}

module.exports = new SessionController()
