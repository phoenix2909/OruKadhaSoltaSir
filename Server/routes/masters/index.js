const express = require('express');
const masterRouter = express.Router();

//Requring routes
const {getMasterLanguages}=require('./get_languages');
const {getMasterCourses}=require('./get_courses');
const {getMasterSkills}=require('./get_skills');
const {getMasterValues}=require('./get_values');
const {getMasterHobbies}=require('./get_hobbies');

//Routes
masterRouter.get('/api/v1/masters/languages',getMasterLanguages);
masterRouter.get('/api/v1/masters/courses',getMasterCourses);
masterRouter.get('/api/v1/masters/skills',getMasterSkills);
masterRouter.get('/api/v1/masters/values',getMasterValues);
masterRouter.get('/api/v1/masters/hobbies',getMasterHobbies);

module.exports={masterRouter};