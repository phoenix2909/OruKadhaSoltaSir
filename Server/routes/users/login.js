const hash = require('crypto'); 
const models=require('./../../models');
const {generateToken} = require('../utils/jwt');


module.exports = login = (req,res) => {

    //Getting data from payload
    const {email,password} = req.body;
    console.log(req.body);
    

    //Getting hash secret key
    const secretKey = process.env.SECRET_KEY;
    console.log(secretKey);

    //Hashing the password
    const encryptedPassword = hash.createHmac('sha256', secretKey)  
                                    .update(password)  
                                    .digest('hex');
    
    //Login in user
    models.users.findOne({where:{email:email,password:encryptedPassword},attributes:['id','email','isActive']})
    .then((user)=>{

        //Forming response object
        var resObj={
            //Generating JWT
            auth_token:generateToken({
                id:user.id,
                email:user.email
            }),
            id:user.id,
            email:user.email,
            message:"Success",
            status:true
        }

        //Updating user status (isActive) to true
        if(!user.isActive){
            models.users.update({isActive:true},{where:{id:user.id}}).then((metadata)=>{
                res.status(200).send(resObj);
            }).catch((error)=>{
                res.status(200).send({error,message:'Invalid email or password',status:false});
            });
        }else{
            res.status(200).send(resObj);
        }


    }).catch((error)=>{
        res.status(200).send({message:'Invalid email or password',status:false});
    });
}