const Star = require('../models/Star')
const Repository = require('../models/Repository')

class StarsController {
    // Método para o usuário logado dar uma estrela para determinado repositório
    async store(req, res) {
        const repository_id = req.params.id
        const user_id = req.userId

        const alreadyStarred = await Star.findAndCountAll({
            where: { user_id, repository_id },
            order: [['created_at', 'DESC']],
            attributes: ['id'],
        });

        if (alreadyStarred.count > 0) {
            return res.status(405).json({ error: "You already starred in this repository" })
        }

        const star = await Star.create({ user_id, repository_id })

        return res.json(star)
    }

    // Método para o usuário logado ver todos os repositórios que ele deu estrela
    async index(req, res) {
        const user_id = req.userId
        
        const starredRepositories = await Star.findAndCountAll({
            where: { user_id },
            order: [['created_at', 'DESC']],
            attributes: ['id', 'user_id', "repository_id", 'created_at'],
            include: [
                {
                    model: Repository,
                    as: 'repository',
                    attributes: ['name', 'user_id', 'description', 'slug', 'is_public', 'created_at']

                }
            ]
        });

        return res.json(starredRepositories);
    }

    // Método para retirar estrela de determinado repositório
    async delete(req, res) {
        const repository_id = req.params.id
        const user_id = req.userId

        const alreadyStarred = await Star.findAndCountAll({
            where: { user_id, repository_id },
            order: [['created_at', 'DESC']],
            attributes: ['id'],
        });

        if (alreadyStarred.count === 0) {
            return res.status(405).json({ error: "You do not starred this repository" })
        }

        const star = await Star.findOne({
            where: { user_id, repository_id }
        })

        await star.destroy()

        return res.json({ user_id, repository_id })
    }
}

module.exports = new StarsController()