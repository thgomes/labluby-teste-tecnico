const Follow = require('../models/Follow')

class FollowersController {
    // Método para usuário logado listar todos os seu seguidores
    async index(req, res) {

        return res.json(req.userId);
    }

    // Método para usuário logado para de ser seguido por usuário indesejado
    async delete(req, res) {

        return res.json(req.userId);
    }
}

module.exports = new FollowersController()