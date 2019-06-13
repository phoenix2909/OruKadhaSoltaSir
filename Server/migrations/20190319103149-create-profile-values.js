'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profile_values', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      profile_id:{
        type: Sequelize.UUID,
        onDelete:'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'profiles',
          key: 'id'
        }
      },
      value_id:{
        type: Sequelize.INTEGER,
        onDelete:'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'master_values',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('profile_values');
  }
};