const models=require('./../../models');

const getMasterValues=(req,res)=>{
    //Getting all the values in the master
    models.master_values.findAll().then((values)=>{
        res.status(200).send(values);
    }).catch((err)=>{
        console.log(err);        
        res.status(500).send({message:'Internal Server Error'});
    })
}

module.exports={getMasterValues};