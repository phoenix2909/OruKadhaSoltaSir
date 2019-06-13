'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profile_skills', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      skill_rating: {
        type: Sequelize.INTEGER
      },
      skill_id:{
        type: Sequelize.INTEGER,
        onDelete:'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'master_skills',
          key: 'id'
        }
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
    return queryInterface.dropTable('profile_skills');
  }
};