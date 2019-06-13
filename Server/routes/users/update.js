const {verifyToken} = require('./../utils/jwt');
const models=require('./../../models');
const hash = require('crypto'); 


module.exports = update = (req, res) => {

    //Authenticating
    verifyToken(req.headers.authorization).then((user)=>
    {
        //Getting data from payload
        let {id,old_password,new_password} = req.body;

        //Getting Hashing secret key
        const secretKey = process.env.SECRET_KEY

        //Hashing old and new password
        let hashedOldPassword = hash.createHmac('sha256', secretKey)  
                                    .update(old_password)  
                                    .digest('hex');
        let hashedNewPassword = hash.createHmac('sha256', secretKey)  
                                    .update(new_password)  
                                    .digest('hex');


        //Validating id and old password
        models.users.findOne({where:{id,password:hashedOldPassword},attributes:['id','email','isActive']})
            .then((user)=>{
                if(user){
                        //Checking for active user or not
                        if(user.isActive===false){
                            res.status(200).send({
                                message:'User is currently deactivated please login to activate',
                                status:false
                            })                        
                        }else{
                            //Updating the new password
                            models.users.update({
                                password : hashedNewPassword
                            },
                            {
                                where : {id}
                            }).then((user)=> {
                                res.status(200).send({message : 'Password successfully changed!',status:true})
                            }).catch((err)=> {
                                res.status(500).send({message : 'Internal server error',status:false});
                            })
                        }
                        
                }else{
                    res.status(200).send({message:'Invalid old password',status:false});
                }
            })
            .catch((err)=>{
                res.status(401).send({message:'Unauthorized Operation!',status:false});
            });

    }).catch((err)=>{
        res.status(401).send({message : 'Unauthorized Access!'})
    })
}