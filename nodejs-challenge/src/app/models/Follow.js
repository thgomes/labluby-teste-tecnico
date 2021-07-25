const Sequelize = require('sequelize')

class Follow extends Sequelize.Model {
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
        this.belongsTo(models.User, { foreignKey: 'followed_id', as: 'followed' })
        this.belongsTo(models.User, { foreignKey: 'follower_id', as: 'follower' })
    }
}

module.exports = Follow;