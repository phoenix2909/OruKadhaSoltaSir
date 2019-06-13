'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_hobbies = sequelize.define('master_hobbies', {
    hobby_name: {
      type: DataTypes.STRING
    }
  }, {});
  master_hobbies.associate = function(models) {
    // associations can be defined here
    master_hobbies.hasMany(models.profile_hobbies,{
      foreignKey : 'hobby_id',
      onDelete : 'SET NULL',
      onUpdate : 'CASCADE'
    })
  };
  return master_hobbies;
};