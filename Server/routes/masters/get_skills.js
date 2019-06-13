const models=require('./../../models');

const getMasterSkills=(req,res)=>{
    //Getting all the skills in the master
    models.master_skills.findAll().then((skills)=>{
        res.status(200).send(skills);
    }).catch((err)=>{
        console.log(err);        
        res.status(500).send({message:'Internal Server Error'});
    })
}

module.exports={getMasterSkills};