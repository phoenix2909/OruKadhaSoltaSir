'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_languages = sequelize.define('master_languages', {
    language_name: {
      type : DataTypes.STRING
    }
  }, {});
  master_languages.associate = function(models) {
    // associations can be defined here
    master_languages.hasMany(models.profile_languages,{
      foreignKey: 'lang_id',
      onDelete : 'SET NULL',
      onUpdate : 'CASCADE'
    })
  };
  return master_languages;
};