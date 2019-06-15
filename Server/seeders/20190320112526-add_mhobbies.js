'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('master_hobbies', [{
        hobby_name: 'Singing',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hobby_name: 'Speaking',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hobby_name: 'Poetry',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hobby_name: 'Paint',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        hobby_name: 'Dance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        hobby_name: 'Athlete',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        hobby_name: 'Swim',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        hobby_name: 'Foodie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        hobby_name: 'Positivity',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('master_hobbies', null, {});
  }
};
