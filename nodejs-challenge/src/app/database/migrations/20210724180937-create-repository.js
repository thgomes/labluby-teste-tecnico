'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('repositories', 
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
                name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
                user_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
                description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
                slug: {
                type: Sequelize.STRING,
                allowNull: false,
            },
                is_public: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
                created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
                updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('repositories');
    }
};
