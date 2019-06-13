'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile_skills = sequelize.define('profile_skills', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    skill_rating: {
      type : DataTypes.INTEGER
    }
  }, {});
  profile_skills.associate = function(models) {
    // associations can be defined here
    profile_skills.belongsTo(models.profiles,{
      foreignKey: 'profile_id',
      onDelete:'SET NULL',
      onUpdate: 'CASCADE'
    });

    profile_skills.belongsTo(models.master_skills,{
      as:'skill',
      foreignKey:'skill_id',
      onDelete: 'SET NULL',
      onUpdate : 'CASCADE'
    })
  };
  return profile_skills;
};