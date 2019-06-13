const models=require('./../../models');

const getMasterHobbies=(req,res)=>{
    //Getting all the hobbies in the master
    models.master_hobbies.findAll().then((hobbies)=>{
        res.status(200).send(hobbies);
    }).catch((err)=>{
        console.log(err);        
        res.status(500).send({message:'Internal Server Error'});
    })
}

module.exports={getMasterHobbies};