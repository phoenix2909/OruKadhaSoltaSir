'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile_hobbies = sequelize.define('profile_hobbies', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {});
  profile_hobbies.associate = function(models) {
    // associations can be defined here
    profile_hobbies.belongsTo(models.profiles,{
      foreignKey: 'profile_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'      
    })

    profile_hobbies.belongsTo(models.master_hobbies, {
      as:'hobby',
      foreignKey : 'hobby_id',
      onUpdate : 'CASCADE',
      onDelete: 'SET NULL'
    })
  };
  return profile_hobbies;
};