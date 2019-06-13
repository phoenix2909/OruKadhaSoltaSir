const models = require('./../../models')

let add_self_intro = (req, res) => {
    const {id, sm_intro} = req.body

    if(id && sm_intro){
            //Adding some intro about yourself
            models.profiles.update({
                sm_intro
            },
            {
                returning :true,
                where : {id}
            }).then(([affectedRows ,[profile]])=> {                
                let resObj={
                    message : 'Updated Successfully!',
                    id:profile.id,
                    sm_intro : profile.sm_intro,
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

module.exports = {add_self_intro}