'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      full_name: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING,
        unique:true
      },
      cur_loc: {
        type: Sequelize.STRING
      },
      per_loc: {
        type: DataTypes.STRING
      },
      father_occupation: {
        type: Sequelize.STRING
      },
      eco_status: {
        type: Sequelize.INTEGER
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.INTEGER
      },
      about: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      sm_intro: {
        type: Sequelize.STRING
      },
      project_abst: {
        type: Sequelize.STRING
      },
      isActive: {
        type : Sequelize.BOOLEAN,
        allowNull : false
      },
      user_id:{
        type: Sequelize.UUID,
        onDelete:'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
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
    return queryInterface.dropTable('profiles');
  }
};