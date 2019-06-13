'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profile_hobbies', {
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
      hobby_id:{
        type: Sequelize.INTEGER,
        onDelete:'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'master_hobbies',
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
    return queryInterface.dropTable('profile_hobbies');
  }
};