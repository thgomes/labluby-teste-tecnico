const Repository = require('../models/Repository')
const User = require('../models/User')

class RepositoryController {
    // Método que permite usuário logado criar um repositório
    async store(req, res) {
        req.body.user_id = req.userId

        const { username } = User.findByPk({ user_id: req.userId })

        req.body.slug = `${username}-${req.body.name}`

        const { id, name, user_id, description, slug, is_public } = await Repository.create(req.body)

        console.log(`userId = ${req.userId}`)

        return res.json({ id, name, user_id, description, slug, is_public })
    }

    // Método que permite usuário logado listar todos os seus repositórios
    async index(req, res) {
        const user_id = req.userId
        const repositories = await Repository.findAndCountAll({
            where: { user_id },
            order: [['created_at', 'DESC']],
            attributes: ['id', 'name', 'description', 'slug', 'created_at'],
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['name', 'username', 'email'],
              },
            ],

          });
      
        return res.json(repositories);
    }

    // Método que permite um usuário logado ver qualquer repositório pelo ID
    async show(req, res) {
        const repository = await Repository.findByPk(req.params.id)

        if (!repository) {
            return res.status(400).json({ error: 'There is not any repository with that ID' });
        }

        const { id, name, user_id, description, slug, is_public, created_at } = repository

        return res.json({ id, name, user_id, description, slug, is_public, created_at })

    }

    // Método que permite um usuário logado atualizar um dos seus repositórios
    async update(req, res) {
        const { id } = req.body
        
        const repositoryExists = await Repository.findOne({ where: { id } })

        if (!repositoryExists) {
            return res.status(400).json({ error: 'There is not any repository with that ID' });
        }
        
        const repository = await Repository.findByPk(id)

        if (repository.user_id != req.userId) {
            return res.status(400).json({ error: 'You cannot edit a repository of another user' });
        }

        await repository.update(req.body)

        const { name, user_id, description, slug, is_public, created_at } = await User.findByPk(req.userId);

        return res.json({ 
            id, 
            name, 
            user_id, 
            description, 
            slug, 
            is_public, 
            created_at 
        })
    }


    // Método que permite um usuário logado deletar um de seus repositórios
    async delete(req, res) {
        const repository = await Repository.findByPk(req.params.id)

        if (!repository) {
            return res.status(400).json({ error: 'invalid repository id' })
        }

        if (repository.user_id != req.userId) {
            return res.status(401).json({
                error: "You don't have permission to delete this repository",
            })
        }

        const { id, name, slug } = repository

        await repository.destroy()

        return res.json({ id, name, slug })
    }

}

module.exports = new RepositoryController()