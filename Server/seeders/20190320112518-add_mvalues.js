'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('master_values', [{
        value_name: 'Honesty',
        createdAt : new Date(),
        updatedAt : new Date()
      },
    {
      value_name : 'Humbleness',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      value_name : 'Humor',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      value_name : 'Humanity',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('master_values', null, {});
  }
};
