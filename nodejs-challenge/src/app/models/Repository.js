const Sequelize = require('sequelize')

class Repository extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
                slug: Sequelize.STRING,
                public: Sequelize.BOOLEAN,
            }, {
                sequelize
            }
        )

        return this
    }
}

module.exports = Repository;