'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile_languages = sequelize.define('profile_languages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    lang_id: {
      type : DataTypes.INTEGER
    }
  }, {});
  profile_languages.associate = function(models) {
    // associations can be defined here
    profile_languages.belongsTo(models.profiles,{
      foreignKey: 'profile_id',
      onDelete:'SET NULL',
      onUpdate: 'CASCADE'
    });

    profile_languages.belongsTo(models.master_languages,{
      as:'language',
      foreignKey:'lang_id',
      onDelete: 'SET NULL',
      onUpdate : 'CASCADE'
    })
  };
  return profile_languages;
};