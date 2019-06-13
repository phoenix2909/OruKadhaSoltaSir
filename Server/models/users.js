'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type:DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate:{
        isEmail: true
      }
    },
    isActive: {
      type : DataTypes.BOOLEAN,
      defaultValue : true
    },
    password: {
      type:DataTypes.STRING    
    }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.profiles,{   
      as:'profiles',   
      foreignKey: 'user_id',
      onDelete:'SET NULL',
      onUpdate: 'CASCADE'
    })
  };
  return users;
};