const models = require('./../../models')

let update_basic_info = (req, res) => {
    const {id,user_id, full_name, mobile} = req.body

    if(id){
            if(user_id && full_name && mobile){
                    //Updating the basic info
                    models.profiles.update({
                        full_name,
                        mobile
                    },
                    {
                        returning :true,
                        where : {id}
                    }).then(([affectedRows ,[profile]])=> {
                        let resObj={
                            message : 'Profile updated Successfully!',
                            id:profile.id,
                            user_id:profile.user_id,
                            full_name:profile.full_name,
                            mobile:profile.mobile,
                            affectedRows,
                        }
                        res.status(200).send(resObj);
                    }).catch((err)=> {
                        console.log(err);
                        res.status(500).send({message : 'Internal server error',err,status:false});
                    })
            }else{                
                res.status(400).send({ message: 'Mandatory fields required', status: false });
            }            
    }else{
        if(user_id && full_name && mobile){
            //Creating user profile
            models.profiles.create({user_id,full_name,mobile})
                .then((profile,created)=> {
                    if(!created){
                        let resObj={
                            message : 'Profile Created Successfully!',
                            id:profile.id,
                            user_id:profile.user_id,
                            full_name:profile.full_name,
                            mobile:profile.mobile
                        }
                        res.status(200).send(resObj);
                    }else{
                        res.status(200).send({message : 'Profile Not Created',created:created})
                    }
                })
                .catch((err)=>{
                    var resObj={
                        message:err.errors[0].message,
                        status:false
                    }
                    res.status(400).send(resObj);
                })
            }else{
                res.status(400).send({message:'Mandatory fields required',status:false});
            }  
    }

    
}

module.exports = {update_basic_info}