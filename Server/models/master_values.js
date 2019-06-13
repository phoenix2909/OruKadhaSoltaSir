'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_values = sequelize.define('master_values', {
    value_name: {
      type: DataTypes.STRING
    }
  }, {});
  master_values.associate = function(models) {
    // associations can be defined here
    master_values.hasMany(models.profile_values,{
      foreignKey : 'value_id',
      onDelete : 'SET NULL',
      onUpdate : 'CASCADE'
    })
  };
  return master_values;
};