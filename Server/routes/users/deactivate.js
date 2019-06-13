const {verifyToken} = require('./../utils/jwt');
const hash=require('crypto');
const models=require('./../../models');

module.exports = deactivate = (req, res) => {
    
    //Getting data from payload
    const {id,password} = req.body;

    //Getting hash secret key
    const secretKey = process.env.SECRET_KEY;

    //Hashing the password
    const encryptedPassword = hash.createHmac('sha256', secretKey)  
                                     .update(password)  
                                     .digest('hex');

    //Authenticating
    verifyToken(req.headers.authorization).then((user)=>
    {
       if(user.id===id){
           //Deactivating user
            models.users.update({
                isActive : false
            },
            {
                where : {id,password:encryptedPassword}
            }).then((user)=> {         
                console.log(user);
                console.log(user.length);                                      
                if(user[0]===1){
                    res.status(200).send({message : 'User successfully deactivated!',status:true});
                }else{
                    res.status(200).send({message:'Invalid password',status:false});
                }
            }).catch((err)=> {
                res.status(404).send({message : 'User not found or does not exist',status:false});
            })
       }else{
            res.status(401).send({message: 'Unauthorized Access!'});
       }
    }).catch((err)=>{
        res.status(401).send({message : 'Unauthorized Access!'})
    })
}