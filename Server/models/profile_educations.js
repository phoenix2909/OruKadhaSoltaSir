'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile_educations = sequelize.define('profile_educations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    comp_date: {
      type : DataTypes.STRING
    }
  }, {});
  profile_educations.associate = function(models) {
    // associations can be defined here
    profile_educations.belongsTo(models.profiles,{
      foreignKey: 'profile_id',
      onDelete:'SET NULL',
      onUpdate: 'CASCADE'
    });

    profile_educations.belongsTo(models.master_courses,{
      as:'course',
      foreignKey : 'course_id',
      onDelete:'SET NULL',
      onUpdate : 'CASCADE'
    });
  };
  return profile_educations;
};