const Sequelize = require('sequelize')

class Token extends Sequelize.Model {
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
    }
}

module.exports = Token;