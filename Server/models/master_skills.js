'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_skills = sequelize.define('master_skills', {
    skill_name: {
      type: DataTypes.STRING
    }
  }, {});
  master_skills.associate = function(models) {
    // associations can be defined here
    master_skills.hasMany(models.profile_skills,{
      foreignKey: 'skill_id',
      onDelete : 'SET NULL',
      onUpdate : 'CASCADE'
    })
  };
  return master_skills;
};