'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profile_educations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      comp_date: {
        type: Sequelize.STRING
      },
      course_id:{
        type: Sequelize.INTEGER,
        onDelete:'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'master_courses',
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
    return queryInterface.dropTable('profile_educations');
  }
};