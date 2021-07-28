'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('follows', 
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
                followed_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
                follower_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        await queryInterface.dropTable('follows');
    }
};
