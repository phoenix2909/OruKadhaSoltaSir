const models = require('./../../models')

let update_profile_pic = (req, res) => {
    const {id,photo} = req.body

    if(id && photo){
            //Updating the profile picture
            models.profiles.update({
                photo
            },
            {
                returning :true,
                where : {id}
            }).then(([affectedRows ,[profile]])=> {
                let resObj={
                    message : 'Profile picture updated Successfully!',
                    id:profile.id,
                    photo : profile.photo,
                    affectedRows,
                }
                res.status(200).send(resObj);
            }).catch((err)=> {
                console.log(err);
                res.status(500).send({message : 'Internal server error',status:false});
            })
    }else{
            res.status(400).send({message: 'Bad request',status:false})
    }

    
}

module.exports = {update_profile_pic}