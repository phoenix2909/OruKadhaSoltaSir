'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('master_skills', [{
        skill_name: 'Machine Learning',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        skill_name: 'PHP',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        skill_name: 'Javascript',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        skill_name: 'React',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        skill_name: 'MS Office',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        skill_name: 'Leadership',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        skill_name: 'Internal Audit',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        skill_name: 'Sketch',
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('master_skills', null, {});
  }
};
