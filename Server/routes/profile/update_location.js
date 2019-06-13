const models = require('./../../models')

let update_location = (req, res) => {
    const {id,per_loc,cur_loc} = req.body;

    if(id && per_loc && cur_loc){
            //Updating the profile picture
            models.profiles.update({
                per_loc,
                cur_loc
            },
            {
                returning :true,
                where : {id}
            }).then(([affectedRows ,[profile]])=> {                
                let resObj={
                    message : 'Location updated Successfully!',
                    id:profile.id,
                    per_loc : profile.per_loc,
                    cur_loc : profile.cur_loc,
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

module.exports = {update_location}