const Sequelize = require('sequelize')

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
}

module.exports = User;