const Sequelize = require('sequelize')

class Star extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {

            }, {
                sequelize
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        this.belongsTo(models.Repository, { foreignKey: 'repository_id', as: 'repository' })
    }
}

module.exports = Star;