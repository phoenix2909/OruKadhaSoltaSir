'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('master_courses', [{
        course_name: 'Engineering',
        course_detail : '',
        createdAt: new Date(),
        updatedAt : new Date()

      },
    {
      course_name: 'Non-Engineering',
      course_detail : '',
      createdAt: new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
  
     
      return queryInterface.bulkDelete('master_courses', null, {});
  }
};
