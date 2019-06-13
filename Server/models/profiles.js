'use strict';
module.exports = (sequelize, DataTypes) => {
  const profiles = sequelize.define('profiles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    full_name: {
      type:DataTypes.STRING
    },
    mobile: {
      type:DataTypes.STRING,
      unique:true,
      validate:{
        len:[10,10]
      }
    },
    father_occupation: {
      type : DataTypes.STRING
    },
    eco_status:{
      type: DataTypes.INTEGER
    },
    age: {
      type : DataTypes.INTEGER
    },
    gender: {
      type : DataTypes.INTEGER
    },
    about: {
      type : DataTypes.STRING
    },
    per_loc: {
      type: DataTypes.STRING
    },
    cur_loc: {
      type: DataTypes.STRING
    },
    photo: {
      type:DataTypes.STRING
    },
    sm_intro: {
      type : DataTypes.STRING
    },
    project_abst: {
      type : DataTypes.STRING
    },
    isActive : {
      type : DataTypes.BOOLEAN,
      defaultValue:true
    }
  }, {});
  profiles.associate = function(models) {
    // associations can be defined here
    profiles.belongsTo(models.users,{
      as:'user_info',
      foreignKey: 'user_id',
      onDelete:'SET NULL',
      onUpdate: 'CASCADE'
    });

    profiles.hasMany(models.profile_languages,{
      as:'languages_known',
      foreignKey: 'profile_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'      
    })
    profiles.hasMany(models.profile_educations,{
      as:'education_details',
      foreignKey: 'profile_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'      
    })
    profiles.hasMany(models.profile_skills,{
      as:'skills',
      foreignKey: 'profile_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'      
    })
    profiles.hasMany(models.profile_values,{
      as:'values',
      foreignKey: 'profile_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'      
    })
    profiles.hasMany(models.profile_hobbies,{
      as:'hobbies',
      foreignKey: 'profile_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'      
    })
  };
  return profiles;
};