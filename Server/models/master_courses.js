'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_courses = sequelize.define('master_courses', {
    course_name: DataTypes.STRING,
    course_detail: DataTypes.STRING
  }, {});
  master_courses.associate = function(models) {
    // associations can be defined here
    master_courses.hasMany(models.profile_educations,{
      foreignKey : 'course_id',
      onDelete : 'SET NULL',
      onUpdate : 'CASCADE'
    })
  };
  return master_courses;
};