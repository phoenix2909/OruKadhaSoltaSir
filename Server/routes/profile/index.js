const express = require('express');
const profileRouter = express.Router();

// Profile Controllers
const {update_basic_info} = require('./update_basic_info');
const {update_profile_pic} = require('./update_profile_pic');
const {add_self_intro} = require('./add_self_intro');
const {update_location} = require('./update_location');
const {add_project_abst} = require('./add_project_abst');
const {update_personal_info} = require('./update_personal_info');
const {update_languages} = require('./update_languages');
const {update_education} = require('./update_education');
const {update_edu_compdate} = require('./update_edu_compdate');
const {update_skills} = require('./update_skills');
const {update_values} = require('./update_values');
const {update_hobbies} = require('./update_hobbies');
const {set_skills_rating} = require('./set_skills_rating')


//Routes
profileRouter.post('/api/v1/profile/basic_info', update_basic_info);
profileRouter.put('/api/v1/profile/profile_pic',update_profile_pic);
profileRouter.put('/api/v1/profile/self_intro',add_self_intro);
profileRouter.put('/api/v1/profile/update_location',update_location);
profileRouter.put('/api/v1/profile/project_abst',add_project_abst);
profileRouter.put('/api/v1/profile/personal_info',update_personal_info);
profileRouter.post('/api/v1/profile/languages',update_languages);
profileRouter.post('/api/v1/profile/education',update_education);
profileRouter.put('/api/v1/profile/add_education_compdate',update_edu_compdate);
profileRouter.post('/api/v1/profile/skills',update_skills);
profileRouter.put('/api/v1/profile/set_skills_rating',set_skills_rating);
profileRouter.post('/api/v1/profile/values',update_values);
profileRouter.post('/api/v1/profile/hobbies',update_hobbies);









module.exports={profileRouter};