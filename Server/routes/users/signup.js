const hash = require('crypto'); 
const models=require('./../../models');


module.exports = signUp = (req, res) => {

    //Getting data from payload    
    const {email, password} = req.body

    //Getting secret key for hashing
    const secretKey = process.env.SECRET_KEY

    //Hashing password
    let encryptedPassword = hash.createHmac('sha256', secretKey)  
                                  .update(password)  
                                  .digest('hex');

    //Check and creating a user                              
    models.users.findOrCreate({where : {email:email}, defaults:{email:email,password:encryptedPassword}})
    .spread((user,created)=>{
        if(!created)
            res.status(200).send({message: 'User already exists',status:false});
        else{
            res.status(200).send({message : 'Registered successfully!',status:true});
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({message:'Internal Server Error'});
    })
}