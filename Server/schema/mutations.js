'use-strict';

const graphql = require('graphql');
const hash = require('crypto');
const dotenv = require('dotenv');
const { verifyToken } = require('../routes/utils/jwt');
const {
    update_basic_info,
    update_skills,
    update_profile_pic,
    update_self_intro,
    update_location,
    update_languages,
    update_project_abstraction,
    update_education,
    update_education_compdate,
    update_skills_rating,
    update_values,
    update_hobbies,
    update_personal_info
}= require('./mutation_resolvers')

dotenv.config();

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInputObjectType,
} = graphql;

const {
    UserType,
    ProfileType,
    AuthResponseType,
    InfoType,
    BasicInfoType,
    ProfileSkills,
    ProfileValues,
    ProfileLanguages
} = require('./types');

//Getting hash secret key
const secretKey = process.env.SECRET_KEY;

const models = require('../models');


const okssMutations = new GraphQLObjectType({
    name: 'okssMutations',
    fields:{

        //Auth mutations
        signup_user: {
            type: InfoType,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValues, { email, password }) {
                return models.users.findOrCreate({ where: { email: email }, defaults: { email: email, password: encrypedPassword(password) } })
                    .spread((user, created) => {
                        if (!created){                                                                              
                            return { message: "User already exists", status: false };
                        }else {
                            return { message: 'Registered successfully!', status: true };
                        }
                    }).catch((err) => {                       
                        return { message: "Internal Server Error", status: false };
                    })
            }
        },      
        
        //Profile Updation Mutations
        update_basic_info : {
            type : BasicInfoType,
            args : {
                profile_id :{
                    type : (GraphQLString)
                },
                full_name : {
                    type : GraphQLString
                },
                user_id : {
                    type: new GraphQLNonNull(GraphQLString)
                },
                mobile : {
                    type : GraphQLString
                }
            },
            resolve(parentValues,args){
                return update_basic_info(args);
            }
        },

        // Update Profile Picture Mutations
        update_profile_pic : {
            type : InfoType,
            args : {
                profile_id : {
                    type : new GraphQLNonNull(GraphQLString)
                },
                photo : {
                    type : GraphQLString
                }
            },
            resolve(parentValues,args) {
                return update_profile_pic(args)
            }
        },

        // Update Self Intro Mutations
        update_self_intro : {
            type : InfoType,
            args : {
                profile_id : {
                    type: new GraphQLNonNull(GraphQLString)
                },
                sm_intro : {
                    type : GraphQLString
                }
            },
            resolve(parentValues,args){
                return update_self_intro(args)
            }
        },

        // Update Location Mutations
        update_location : {
            type : InfoType,
            args : {
                profile_id : {
                    type : new GraphQLNonNull (GraphQLString)
                },
                cur_loc : {
                    type : GraphQLString
                },
                per_loc : {
                    type : GraphQLString
                }
            },
            resolve(parentValues,args) {
                return update_location(args)
            }
        },

        // Update Languages Mutations
        update_languages : {
            type : InfoType,
            args : {
                profile_id : {
                    type : new GraphQLNonNull(GraphQLString)
                },
                selected_lang_arr : {
                    type : new GraphQLList(GraphQLInt)
                }
            },
            resolve (parentValues,args){
                return update_languages(args)
            }
        },

        // Update Project Abstraction Mutations
        update_project_abstraction : {
            type : InfoType,
            args : {
                profile_id : {
                    type : new GraphQLNonNull(GraphQLString)
                },
                project_abst : {
                    type : GraphQLString
                }
            },
            resolve(parentValues,args){
                return update_project_abstraction(args)
            }
        },

        // Update Education Details
        update_education : {
            type : InfoType,
            args : {
                id : {
                    type : GraphQLString
                },
                profile_id : {
                    type: new GraphQLNonNull(GraphQLString)
                },
                course_id : {
                    type : GraphQLInt
                }
            },
            resolve (parentValues,args){
                return update_education(args)
            }
        },

        // Update Education Completion Date Mutations
        update_education_compdate : {
            type : InfoType,
            args : {
                profile_id : {
                    type: new GraphQLNonNull(GraphQLString)
                },
                comp_date : {
                    type : GraphQLString
                }
            },
            resolve(parentValues,args){
                return update_education_compdate(args)
            }
        },

        // Update Skills Mutations
        update_skills: {
            type: InfoType,
            args: {
                profile_id: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                selected_skillsArr: {
                    type: new GraphQLList(GraphQLInt)
                },
            },
            resolve(parentValues, args) {
                return update_skills(args);
            }
        },

        // Update Skill Rating Mutations
        update_skills_rating : {
            type : InfoType,
            args : {
                profile_id : {
                    type : GraphQLString
                },
                rated_skills : {
                    type : new GraphQLList(new GraphQLInputObjectType({
                        name : 'rated_skills',
                        fields:{
                            id:{
                                type:GraphQLInt
                            },
                            rating:{
                                type:GraphQLInt
                            }
                        }
                    }))
                }
            },
            resolve(parentValues,args){
                console.log(args);
                return update_skills_rating(args)                
            }
        },

        // Update Values Mutations
        update_values : {
            type : InfoType,
            args : {
                profile_id : {
                    type : GraphQLString
                },
                selected_valuesArr : {
                    type : new GraphQLList(GraphQLInt)
                }
            },
            resolve(parentValues,args){
                return update_values(args)
            }
        },

        // Update Hobbies Mutations
        update_hobbies : {
            type : InfoType,
            args : {
                profile_id : {
                    type : GraphQLString
                },
                selected_hobbiesArr : {
                    type : new GraphQLList(GraphQLInt)
                }
            },
            resolve(parentValues,args){
                return update_hobbies(args)
            }
        },

        // Update Basic Info Mutations
        update_personal_info : {
            type : InfoType,
            args : {
                profile_id : {
                    type : GraphQLString
                },
                about : {
                    type : GraphQLString
                },
                father_occupation : {
                    type : GraphQLString
                },
                eco_status : {
                    type : GraphQLInt
                },
                age : {
                    type : GraphQLInt
                },
                gender : {
                    type : GraphQLInt
                }
            },
            resolve(parentValues,args){
                return update_personal_info(args)
            }
        }

    }

})

const encrypedPassword = (pass) => {
    try {
        const password = hash.createHmac('sha256', secretKey)
            .update(pass)
            .digest('hex');
        console.log(password);
        return password;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = okssMutations;