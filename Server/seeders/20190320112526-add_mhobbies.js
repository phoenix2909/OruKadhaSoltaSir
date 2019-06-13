'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('master_hobbies', [{
        hobby_name: 'Singing',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hobby_name: 'Swimming',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hobby_name: 'Dancing',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hobby_name: 'Running',
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('master_hobbies', null, {});
  }
};
