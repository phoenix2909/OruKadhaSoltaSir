const models = require('../models')
const asyncEach = require('async/each');
module.exports = {
    update_basic_info: (args) => {
        const { profile_id, user_id, full_name, mobile } = args;
        if (profile_id) {
            if (user_id && full_name && mobile) {
                //Updating the basic info
                return models.profiles.update({
                    full_name,
                    mobile
                },
                    {
                        returning: true,
                        where: { id: profile_id }
                    }).then(([affectedRows, [profile]]) => {
                        let resObj = {
                            message: 'Profile updated Successfully!',
                            profile_id,
                            profile,
                            status: true
                        }
                        return JSON.parse(JSON.stringify(resObj));
                    }).catch((err) => {
                        console.log(err);
                        return {
                            message: 'Internal Server Error',
                            status: false
                        }
                    })
            } else {
                return {
                    message: 'Bad request',
                    status: false
                };
            }
        } else {
            if (user_id && full_name && mobile) {
                //Creating user profile
              return  models.profiles.create({ user_id, full_name, mobile })
                    .then((profile, created) => {
                        if (!created) {
                            let resObj = {
                                message: 'Profile Created Successfully!',
                                profile_id,
                                profile,
                                status : created
                            }
                            return JSON.parse(JSON.stringify(resObj));
                        } else {
                            return { message: 'Profile Not Created', status: created }
                        }
                    })
                    .catch((err) => {
                        var resObj = {
                            message: err.errors[0].message,
                            status: false
                        }
                        return JSON.parse(JSON.stringify(resObj));
                    })
            } else {
                return { message: 'Bad request', status: false }
            }
        }
    },

    update_profile_pic : (args) => {
        const { profile_id, photo } = args

        if (profile_id && photo) {
            //Updating the profile picture
            return models.profiles.update({
                photo
            },
                {
                    returning: true,
                    where: { id : profile_id}
                }).then(([affectedRows, [profile]]) => {
                    let resObj = {
                        message: 'Profile picture updated Successfully!',
                        profile,
                        profile_id,
                        status : true
                    }
                    return JSON.parse(JSON.stringify(resObj));
                }).catch((err) => {
                    console.log(err);
                    return{ message: 'Internal server error', status: false }
                })
        } else {
            return{ message: 'Bad request', status: false }
        }
    },

    update_self_intro : (args) => {
        const { profile_id, sm_intro } = args

        if (profile_id && sm_intro) {
            //Adding some intro about yourself
         return models.profiles.update({
                sm_intro
            },
                {
                    returning: true,
                    where: { id : profile_id }
                }).then(([affectedRows, [profile]]) => {
                    let resObj = {
                        message: 'Updated Successfully!',
                        profile,
                        profile_id,
                        status: true
                    }
                    return resObj;
                }).catch((err) => {
                    console.log(err);
                    return { message: 'Internal server error', status: false };
                })
        } else {
            return { message: 'Bad request', status: false }
        }
    },

    update_location : (args) => {
        const { profile_id, per_loc, cur_loc } = args

        if (profile_id && per_loc && cur_loc) {
            //Updating the Permanent and current location
          return models.profiles.update({
                per_loc,
                cur_loc
            },
                {
                    returning: true,
                    where: { id : profile_id }
                }).then(([affectedRows, [profile]]) => {
                    let resObj = {
                        message: 'Location updated Successfully!',
                        profile,
                        status : true
                    }
                    return resObj
                }).catch((err) => {
                    console.log(err);
                    return { message: 'Internal server error', status: false }
                })
        } else {
            return { message: 'Bad request', status: false }
        }
    },

    update_languages : (args) => {
        let { profile_id, selected_lang_arr } = args;

        if (profile_id && selected_lang_arr) {
            //Preparing array to insert
            selected_lang_arr = selected_lang_arr.map(lang => ({
                lang_id: lang,
                profile_id
            }));

            //Adding known languages
           return models.profile_languages.destroy({ where: { profile_id } },
                {
                    returning: true,
                    where: { profile_id }
                }).then((lang) => {
                   return models.profile_languages.bulkCreate(selected_lang_arr).then(lang => {
                        return {
                            message: 'Languages added successfully!',
                            profile_id,
                            status : true
                        }
                    }).catch((err) => {
                        console.log(err);
                        return{ message: 'Internal server error', status: false }
                    })
                }).catch((err) => {
                    console.log(err);
                    return { message: 'Internal server error', status: false }
                })
        } else {
            return{ message: 'Bad request', status: false }
        }
    },

    update_project_abstraction : (args) => {
        const { profile_id, project_abst } = args

        if (profile_id && project_abst) {
            //Adding some intro about yourself
           return models.profiles.update({
                project_abst
            },
                {
                    returning: true,
                    where: { id:profile_id }
                }).then(([affectedRows, [profile]]) => {
                    let resObj = {
                        message: 'Added project info Successfully!',
                        profile,
                       status : true
                    }
                    return (resObj);
                }).catch((err) => {
                    console.log(err);
                    return { message: 'Internal server error',err, status: false }
                })
        } else {
            return { message: 'Bad request', status: false }
        }
    },

    update_education  : args => {
        let { id, profile_id, course_id } = args

        if (profile_id && course_id) {
            if (id) {
                // Updating education details
               return models.profile_educations.update({
                    course_id
                },
                    {
                        returning: true,
                        where: { id, profile_id }
                    }).then(([affectedRows, [profile]]) => {
                        let resObj = {
                            message: 'Updated education details successfully!',
                            profile,
                            status : true
                        }
                        return (resObj);
                    }).catch((err) => {
                        console.log(err);
                       return { message: 'Internal server error', status: false }
                    })
            } else {
                //Inserting education detail to the table
                return models.profile_educations.create({ profile_id, course_id })
                    .then((education, created) => {
                        if (!created) {
                            let resObj = {
                                message: 'Inserted education details successfully!',
                                profile_id,
                                status : true
                            }
                            return (resObj);
                        }
                    }).catch((err) => {
                        console.log(err);
                        return{ message: 'Internal Server Error', status: false }
                    })
            }
        } else {
           return { message: 'Bad request', status: false }
        }
    },

    update_education_compdate : args => {
        let { profile_id, comp_date } = args

        if (profile_id && comp_date) {
            // Updating education completion date
           return models.profile_educations.update({
                comp_date
            },
                {
                    returning: true,
                    where: { id : profile_id }
                }).then(([affectedRows, [profile]]) => {
                    let resObj = {
                        message: 'Updated education details successfully!',
                        profile,
                        status : true
                    }
                    return (resObj);
                }).catch((err) => {
                    console.log(err);
                    return { message: 'Internal server error', status: false }
                })
        } else {
            return { message: 'Bad request', status: false }
        }
    },

    update_skills : (args) => {
        let {profile_id,selected_skillsArr} = args
        if (profile_id && selected_skillsArr) {
            //Preparing to insert
            selected_skillsArr = selected_skillsArr.map(skill => ({
                skill_id: skill,
                profile_id
            }));
            // First destroy every row with this id
           return models.profile_skills.destroy({ where: { profile_id } },
                {
                    returning: true,
                    where: { profile_id }
                }).then((skill) => {
                    //  Then bulkCreate everything again
                  return  models.profile_skills.bulkCreate(selected_skillsArr).then(skill => {
                        return {
                            message: 'Skills added successfully!',
                            profile_id,
                            status : true
                        }
                    }).catch((err) => {
                        console.log(err);
                        return { message: 'Internal server error', status: false }
                    })
                }).catch((err) => {
                    console.log(err);
                    return { message: 'Internal server error', status: false }
                })
        } else {
            return { message: 'Bad request', status: false }
        }
    },

    update_skills_rating : args => {
            const { profile_id, rated_skills } = args;
            const methods = rated_skills.map(skill => models.profile_skills.update({
                                        skill_rating:skill.rating,
                }, {
                    returning:true,
                    where:{
                        skill_id:skill.id,
                        profile_id,
                    }
                }));
            
            return Promise.all(methods).then(data => {
                return { message: 'Updated Successfully', status: true }
            })
            .catch(err => {
                console.log(err);
                return { message: 'Internal Server Error', status: false }
            })
            // return asyncEach (rated_skills, (currentSkill, callback) => {
                
            //     return models.profile_skills.update({
            //         skill_rating:currentSkill.rating,
            //     }, {
            //         returning:true,
            //         where:{
            //             skill_id:currentSkill.id,
            //             profile_id,
            //         }
            //     }).then(updatedSkillResp => {
            //         callback('success',null);
            //     })
            //     .catch(updatedSkillErr => {
            //         callback('error',updatedSkillErr)
            //     })
            // }, (message, data) => {
            //     if(message === 'success') {
            //         return ({ message: 'Updated Successfully', status: true })
            //     } else {
            //         return ({ message: 'Internal Server Error', status: false })
            //     }
            // })
            // asyncEach(rated_skills, (rated_skill, callback) => {
            //    return models.profile_skills.update({
            //         skill_rating: rated_skill.rating
            //     }, {
            //             returning: true,
            //             where: { skill_id: rated_skill.id, profile_id }
            //         }).then(([affectedRow, [skills]]) => {
            //             callback();
            //         }).catch((err) => {
            //             callback(err);
            //         })
            // }, (err) => {
            //     if (err) {
            //         return JSON.parse(JSON.stringify({ message: 'Internal Server Error', status: false }))
            //     } else {
            //         return JSON.parse(JSON.stringify({ message: 'Updated Successfully', status: true }))
            //     }
            // })
    },

    update_values : args => {
        let { profile_id, selected_valuesArr } = args

        if (profile_id && selected_valuesArr) {
            //Preparing to insert
            selected_valuesArr = selected_valuesArr.map(value => ({
                value_id: value,
                profile_id
            }));

            // First destroy every row with this id
           return models.profile_values.destroy({ where: { profile_id } },
                {
                    returning: true,
                    where: { profile_id }
                }).then((value) => {
                    //  Then bulkCreate everything again
                   return models.profile_values.bulkCreate(selected_valuesArr).then(value => {
                        return {
                            message: 'Values added successfully!',
                            status : true
                        }
                    }).catch((err) => {
                        return { message: 'Internal server error', status: false }
                    })
                }).catch((err) => {
                    console.log(err);
                    return{ message: 'Internal server error', status: false }
                })
        } else {
            return{ message: 'Bad request', status: false }
        }
    },

    update_hobbies : args => {
        let { profile_id, selected_hobbiesArr } = args

        if (profile_id && selected_hobbiesArr) {

            //Preparing for bulk insert
            selected_hobbiesArr = selected_hobbiesArr.map(hobby => ({
                hobby_id: hobby,
                profile_id
            }));

            // First destroy every row with this id
           return models.profile_hobbies.destroy({ where: { profile_id } },
                {
                    returning: true,
                    where: { profile_id }
                }).then((hobby) => {
                    //  Then bulkCreate everything again
                   return models.profile_hobbies.bulkCreate(selected_hobbiesArr).then(hobby => {
                        return {
                            message: 'Hobbies added successfully!',
                            status:true
                        }
                    }).catch((err) => {
                        console.log(err);
                        return { message: 'Internal server error', status: false }
                    })
                }).catch((err) => {
                    console.log(err);
                    return { message: 'Internal server error', status: false }
                })
        } else {
            return { message: 'Bad request', status: false }
        }
    },

    update_personal_info : args => {
        const { profile_id, about, father_occupation, eco_status, age, gender, } = args

        if (profile_id && about && father_occupation && eco_status && age && gender) {
            //Adding some intro about yourself
           return models.profiles.update({
                about,
                father_occupation,
                eco_status,
                age,
                gender,
            },
                {
                    returning: true,
                    where: { id : profile_id}
                }).then(([affectedRows, [profile]]) => {
                    let resObj = {
                        message: 'Updated personal info Successfully!',
                        status : true
                    }
                    return (resObj);
                }).catch((err) => {
                    console.log(err);
                    return { message: 'Internal server error',status: false }
                })
        } else {
            return { message: 'Bad request', status: false }
        }
    }

}
