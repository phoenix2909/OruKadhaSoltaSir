const graphql = require('graphql');
const hash = require('crypto');
const dotenv = require('dotenv');
const { verifyToken } = require('../routes/utils/jwt');
const Op= require('sequelize').Op;

dotenv.config();

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
} = graphql;

const {
    UserType,
    ProfileType,
    AuthResponseType,
    InfoType,
    MasterType
} = require('./types');

//Getting hash secret key
const secretKey = process.env.SECRET_KEY;

const models = require('../models');

const RootQueries = new GraphQLObjectType({
    name: 'okssQueries',
    fields: () => ({
        //Auth root query
        
        login_user: {
            type: AuthResponseType,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve(parentValues, { email, password }) {
                return models.users.findOne({ where: { email: email, password: encrypedPassword(password) } })
                    .then((user) => {
                        user.message = "success";

                        //Updating user status (isActive) to true
                        if (!user.isActive) {
                            models.users.update({ isActive: true }, { where: { id: user.id } }).then((metadata) => {
                                return user;
                            }).catch((error) => {
                                return { id: "", email: "", isActive: null, message: "Invalid Credentials", auth_token: "" };
                            });
                        } else {
                            return user;
                        }

                    })
                    .catch((error) => {
                        return { id: "", email: "", isActive: null, message: "Invalid Credentials", auth_token: "" };
                    })
            }
        },

        reset_password: {
            type: InfoType,
            args: {
                id: {
                    type: GraphQLString
                },
                old_password: {
                    type: GraphQLString
                },
                new_password: {
                    type: GraphQLString
                }
            },
            resolve(parentValues, arg, context, info) {
                return verifyToken(context.headers.authorization).then((user) => {
                    //Getting data from payload
                    let { id, old_password, new_password } = arg;

                    //Hashing old and new password
                    let hashedOldPassword = hash.createHmac('sha256', secretKey)
                        .update(old_password)
                        .digest('hex');
                    let hashedNewPassword = hash.createHmac('sha256', secretKey)
                        .update(new_password)
                        .digest('hex');

                    //Validating id and old password
                    return models.users.findOne({ where: { id, password: hashedOldPassword }, attributes: ['id', 'email', 'isActive'] })
                        .then((user) => {
                            if (user) {
                                //Checking for active user or not
                                if (user.isActive === false) {                                   
                                    return {
                                        message: 'User is currently deactivated please login to activate',
                                        status: false
                                    };
                                } else {
                                    //Updating the new password
                                    return models.users.update({
                                        password: hashedNewPassword
                                    },
                                        {
                                            where: { id }
                                        }).then((user) => {                                           
                                            return { message: 'Password successfully changed!', status: true };
                                        }).catch((err) => {                                           
                                            console.log(err);
                                            return { message: 'Internal server error', status: false };
                                        })
                                }

                            } else {                                  
                                return { message: 'Invalid old password', status: false };
                            }
                        })
                        .catch((err) => {  
                            console.log(err);              
                            return { message: 'Unauthorized Operation!', status: false };
                        });

                }).catch((err) => {    
                    console.log(err)                    
                    return { message: 'Unauthorized Access!', status: false };
                })
            }
        },

        deactivate: {
            type: InfoType,
            args: {
                id: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve(parentValues, args, context) {
                //Getting data from payload
                const { id, password } = args;


                //Hashing the password
                const encryptedPassword = hash.createHmac('sha256', secretKey)
                    .update(password)
                    .digest('hex');

                //Authenticating
                return verifyToken(context.headers.authorization).then((user) => {
                    if (user.id === id) {
                        //Deactivating user
                        return models.users.update({
                            isActive: false
                        },
                            {
                                where: { id, password: encryptedPassword }
                            }).then((user) => {
                                if (user[0] === 1) {
                                    return { message: 'User successfully deactivated!', status: true };
                                } else {
                                    return { message: 'Invalid password', status: false };
                                }
                            }).catch((err) => {
                                console.log(err);
                                return { message: 'User not found or does not exist', status: false };
                            })
                    } else {
                        return { message: 'Unauthorized Access!', status: false };
                    }
                }).catch((err) => {
                    console.log(err);
                    return { message: 'Unauthorized Access!', status: false };
                })
            }
        },

        //User Root Queries
        all_users: {
            type: new GraphQLList(UserType),
            resolve() {
                return models.users.findAll({
                    include:[{
                        model:models.profiles,
                        as:'profiles',
                        include:[{
                            model:models.users,
                            as:'user_info',
                            include : [{
                                model: models.profiles,
                                as: 'profiles',
                            }]
                        }]
                    }]
                });
            }
        },

        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValues, args) {
                return models.users.findOne({ where: { id: args.id } });
            }

        },

        //Profile Root Queries
        user_profiles: {
            type: new GraphQLList(ProfileType),
            args: {
                user_id: {
                    type: GraphQLString
                }
            },
            resolve(parentValues, args) {
                return models.profiles.findAll({ where: { user_id: args.user_id } });
            }
        },

        profile: {
            type: ProfileType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValues, args) {
                return models.profiles.findOne({ 
                    where: 
                    { 
                        id: args.id 
                    },                   
                    include:[
                        {
                            model:models.users,
                            as:'user_info'
                        },
                        {
                            model:models.profile_values,                            
                            as:'values',
                            include:[
                                {
                                    model:models.master_values,
                                    as:'value',
                                    attributes:['id',['value_name','label'],['value_name','extra_info']]
                                }
                            ],
                        },                        
                        {
                            model:models.profile_skills,
                            as:'skills',
                            include:[
                                {
                                    model:models.master_skills,
                                    as:'skill',
                                    attributes:['id',['skill_name','label'],['skill_name','extra_info']]
                                }
                            ],
                        },                        
                        {
                            model:models.profile_languages,
                            as:'languages_known',
                            include:[
                                {
                                    model:models.master_languages,
                                    as:'language',
                                    attributes:['id',['language_name','label'],['language_name','extra_info']]
                                }
                            ],
                        },                        
                        {
                            model:models.profile_hobbies,
                            as:'hobbies',
                            include:[
                                {
                                    model:models.master_hobbies,
                                    as:'hobby',
                                    attributes:['id',['hobby_name','label'],['hobby_name','extra_info']]
                                }
                            ],
                        },                        
                        {
                            model:models.profile_educations,
                            as:'education_details',
                            include:[
                                {
                                    model:models.master_courses,
                                    as:'course',
                                    attributes:['id',['course_name','label'],['course_detail','extra_info']]
                                }
                            ],
                        }                      
                    ] 
                }).then((profile)=>{
                    console.log(JSON.stringify(profile));
                    return JSON.parse(JSON.stringify(profile));
                })
            }
        },

        //Master Root Queries
        courses:{
            type: new GraphQLList(MasterType),
            resolve(){
                return models.master_courses.findAll({attributes:['id',['course_name','label'],['course_detail','extra_info']]})
                    .then((courses)=>{
                        return JSON.parse(JSON.stringify(courses));
                    });
            }
        },
        
        search_course:{
            type: new GraphQLList(MasterType),
            args:{
                course_name:{
                    type:GraphQLString
                }
            },
            resolve(parentValues,{course_name}){
                return models.master_courses.findAll(
                    {
                        where:
                        {
                            course_name:{
                                [Op.iLike]: '%'+course_name+'%'
                            }
                        },
                        attributes:['id',['course_name','label'],['course_detail','extra_info']]
                    },
                ).then((courses)=>{
                    return JSON.parse(JSON.stringify(courses));
                })
            }
        },

        hobbies:{
            type: new GraphQLList(MasterType),
            resolve(){
                return models.master_hobbies.findAll({attributes:['id',['hobby_name','label'],['hobby_name','extra_info']]})
                    .then((hobbies)=>{
                        return JSON.parse(JSON.stringify(hobbies));
                    });
            }
        },

        search_hobbies:{
            type: new GraphQLList(MasterType),
            args:{
                hobby_name:{
                    type:GraphQLString
                }
            },
            resolve(parentValues,{hobby_name}){
                return models.master_hobbies.findAll(
                    {
                        where:
                        {
                            hobby_name:{
                                [Op.iLike]: '%'+hobby_name+'%'
                            }
                        },
                        attributes:['id',['hobby_name','label'],['hobby_name','extra_info']]
                    },
                ).then((hobbies)=>{
                    return JSON.parse(JSON.stringify(hobbies));
                })
            }
        },

        languages:{
            type: new GraphQLList(MasterType),
            resolve(){
                return models.master_languages.findAll({attributes:['id',['language_name','label'],['language_name','extra_info']]})
                    .then((languages)=>{
                        return JSON.parse(JSON.stringify(languages));
                    });
            }
        },

        search_languages:{
            type: new GraphQLList(MasterType),
            args:{
                language_name:{
                    type:GraphQLString
                }
            },
            resolve(parentValues,{language_name}){
                return models.master_languages.findAll(
                    {
                        where:
                        {
                            language_name:{
                                [Op.iLike]: '%'+language_name+'%'
                            }
                        },
                        attributes:['id',['language_name','label'],['language_name','extra_info']]
                    },
                ).then((languages)=>{
                    return JSON.parse(JSON.stringify(languages));
                })
            }
        },

        skills:{
            type: new GraphQLList(MasterType),
            resolve(){
                return models.master_skills.findAll({attributes:['id',['skill_name','label'],['skill_name','extra_info']]})
                    .then((skills)=>{
                        return JSON.parse(JSON.stringify(skills));
                    });
            }
        },

        search_skills:{
            type: new GraphQLList(MasterType),
            args:{
                skill_name:{
                    type:GraphQLString
                }
            },
            resolve(parentValues,{skill_name}){
                return models.master_skills.findAll(
                    {
                        where:
                        {
                            skill_name:{
                                [Op.iLike]: '%'+skill_name+'%'
                            }
                        },
                        attributes:['id',['skill_name','label'],['skill_name','extra_info']]
                    },
                ).then((skills)=>{
                    return JSON.parse(JSON.stringify(skills));
                })
            }
        },

        values:{
            type: new GraphQLList(MasterType),
            resolve(){
                return models.master_values.findAll({attributes:['id',['value_name','label'],['value_name','extra_info']]})
                    .then((values)=>{
                        return JSON.parse(JSON.stringify(values));
                    });
            }
        },

        search_values:{
            type: new GraphQLList(MasterType),
            args:{
                value_name:{
                    type:GraphQLString
                }
            },
            resolve(parentValues,{value_name}){
                return models.master_values.findAll(
                    {
                        where:
                        {
                            value_name:{
                                [Op.iLike]: '%'+value_name+'%'
                            }
                        },
                        attributes:['id',['value_name','label'],['value_name','extra_info']]
                    },
                ).then((values)=>{
                    return JSON.parse(JSON.stringify(values));
                })
            }
        }
                
    })
})

encrypedPassword = (pass) => {
    try {
        const password = hash.createHmac('sha256', secretKey)
            .update(pass)
            .digest('hex');
        return password;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = RootQueries;