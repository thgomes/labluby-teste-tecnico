const Sequelize = require('sequelize')
const { associate } = require('./Repository')

class User extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                username: Sequelize.STRING,
                email: Sequelize.STRING,
                location: Sequelize.STRING,
                bio: Sequelize.STRING,
            }, {
                sequelize
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' })
    }
}

module.exports = User;