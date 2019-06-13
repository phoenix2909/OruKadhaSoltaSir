'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('master_languages', [{
     language_name : 'English',
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     language_name : 'Tamil',
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     language_name: 'Hindi',
     createdAt: new Date(),
     updatedAt: new Date()
   }],{})
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('master_languages', null, {});
 
  }
};
