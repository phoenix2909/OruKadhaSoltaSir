'use strict';

const graphql = require('graphql');
const {generateToken} = require('../routes/utils/jwt');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

const models = require('../models');

//User types
const UserType=new GraphQLObjectType({
    name:'UserType',
    fields: ()=>({
        id:{
            type: GraphQLString
        },
        email:{
            type: GraphQLString
        },        
        isActive:{
            type: GraphQLBoolean
        },
        profiles:{
            type: new GraphQLList(ProfileType),
        }
    })
})

//Profile Types
const ProfileType=new GraphQLObjectType({
    name:'ProfileType',
    fields: ()=>({
        id:{
            type: GraphQLString
        },
        full_name:{
            type: GraphQLString
        },        
        mobile:{
            type: GraphQLString
        },
        father_occupation:{
            type: GraphQLString
        },
        eco_status:{
            type: GraphQLInt
        },
        age:{
            type: GraphQLInt
        },
        gender:{
            type: GraphQLInt
        },
        about:{
            type: GraphQLString
        },
        per_loc:{
            type: GraphQLString
        },
        cur_loc:{
            type: GraphQLString
        },
        photo:{
            type: GraphQLString
        },
        sm_intro:{
            type: GraphQLString
        },
        project_abst:{
            type: GraphQLString
        },
        isActive:{
            type: GraphQLBoolean
        },
        user_id:{
            type: GraphQLString,            
        },
        user_info:{
            type: UserType            
        },
        values:{
            type: new GraphQLList(ProfileValues)           
        },
        skills:{
            type: new GraphQLList(ProfileSkills)
        },
        languages_known:{
            type: new GraphQLList(ProfileLanguages)
        },
        hobbies:{
            type: new GraphQLList(ProfileHobbies)
        },
        education_details:{
            type: new GraphQLList(ProfileEducations)
        }
    })
})
const ProfileValues=new GraphQLObjectType({
    name:'ProfileValues',
    fields:()=>({
        id:{
            type:GraphQLString
        },
        value:{
            type:MasterType
        }
    })
})
const ProfileSkills=new GraphQLObjectType({
    name:'ProfileSkills',
    fields:()=>({
        id:{
            type:GraphQLString
        },
        skill:{
            type:MasterType
        },
        skill_rating:{
            type:GraphQLString
        }
    })
})
const ProfileLanguages=new GraphQLObjectType({
    name:'ProfileLanguages',
    fields:()=>({
        id:{
            type:GraphQLString
        },
        language:{
            type:MasterType
        }
    })
})
const ProfileHobbies=new GraphQLObjectType({
    name:'ProfileHobbies',
    fields:()=>({
        id:{
            type:GraphQLString
        },
        hobby:{
            type:MasterType
        }
    })
})
const ProfileEducations=new GraphQLObjectType({
    name:'ProfileEducations',
    fields:()=>({
        id:{
            type:GraphQLString
        },
        comp_date:{
            type:GraphQLString
        },
        education_detail:{
            type:MasterType
        }
    })
})

//Mutation Type
const BasicInfoType = new GraphQLObjectType ({
    name: 'BasicInfoType',
    fields: ()=> ({  
        profile : {
            type : ProfileType
        },      
        message : {
            type : GraphQLString
        },
        status : {
            type :GraphQLBoolean
        }
    })
})

//Util types
const InfoType= new GraphQLObjectType({
    name:'InfoType',
    fields:()=>({
        profile:{
            type: ProfileType
        },
        profile_id:{
            type: GraphQLString
        },
        message:{
            type: GraphQLString
        },
        status:{
            type: GraphQLBoolean
        }
    })
})

//Auth response type
const AuthResponseType =new GraphQLObjectType({
    name:'AuthResponseType',
    fields:()=>({
        id:{
            type: GraphQLString
        },
        email:{
            type: GraphQLString
        },        
        isActive:{
            type: GraphQLBoolean
        },
        message:{
            type: GraphQLString
        },
        auth_token:{
            type: GraphQLString,
            resolve(parentValues){
                return parentValues.id?generateToken({
                    id:parentValues.id,
                    email:parentValues.email
                }):"";
            }
        }
    })
})

//Master generic type
const MasterType = new GraphQLObjectType({
    name: 'MasterType',
    fields: ()=>({
        id:{
            type: GraphQLInt
        },
        label:{
            type: GraphQLString
        },
        extra_info:{
            type: GraphQLString
        }
    })
})

const RatedSkillsType = new GraphQLObjectType({
    name: 'RatedSkillsType',
    fields: {
        id: {
            type: GraphQLInt
        },
        rating: {
            type: GraphQLInt
        }
    }
})

module.exports={
    UserType,
    ProfileType,
    AuthResponseType,
    InfoType,
    MasterType,
    BasicInfoType,
    RatedSkillsType  
}