const models=require('./../../models');

module.exports = getUser =(req,res)=>{
    //Getting user id from query params
    let id=req.params.id;

    //Getting user by id
    models.users.findOne({where:{id},attributes:['id','email','isActive']})
    .then((user)=>{
        if(user){
            res.status(200).send(user);
        }else{
            res.status(404).send({message:'User not found',status:false});
        }
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({message:'Internal server error',status:false});
    });
}