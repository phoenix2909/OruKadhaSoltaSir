const models = require('./../../models');
const asyncEach = require('async/each');


let set_skills_rating=(req,res)=>{
    let {profile_id,rated_skills}=req.body;

    if(profile_id,rated_skills){
        asyncEach(rated_skills,(rated_skill,callback)=>{
            models.profile_skills.update({
                skill_rating:rated_skill.rating
            },{
                returning:true,
                where:{skill_id:rated_skill.id,profile_id}
            }).then(([affectedRow,[skills]])=>{
                callback();
            }).catch((err)=>{
                callback(err);
            })
        },(err)=>{
            if(err){
                res.status(500).send({message:'Internal Server Error',status:false});
            }else{
                res.status(200).send({message:'Updated Successfully',status:true});
            }
        })
    }else{
        res.status(400).send({message:'Bad request',status:false});
    }
}

module.exports={set_skills_rating};
