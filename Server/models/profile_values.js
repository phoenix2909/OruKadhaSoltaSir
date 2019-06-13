'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile_values = sequelize.define('profile_values', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {});
  profile_values.associate = function(models) {
    // associations can be defined here
    profile_values.belongsTo(models.profiles,{
      foreignKey: 'profile_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'      
    })

    profile_values.belongsTo(models.master_values,{
      as:'value',
      foreignKey :  'value_id',
      onDelete: 'SET NULL',
      onUpdate : 'CASCADE'
    })
  };
  return profile_values;
};