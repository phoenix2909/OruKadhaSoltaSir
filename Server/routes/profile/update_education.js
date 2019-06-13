const models = require('./../../models')

let update_education = (req, res) => {
    let {id,profile_id, course_id} = req.body;
    
    if (profile_id && course_id) {
        if(id){
            // Updating education details
            models.profile_educations.update({
                course_id
            },
            {
                returning: true,
                where: { id,profile_id }
            }).then(([affectedRows ,[education]]) => {                
                let resObj = {
                    message: 'Updated education details successfully!',
                    id:education.id,
                    profile_id:education.profile_id,
                    course_id:education.course_id,
                    affectedRows,
                }
                res.status(200).send(resObj);
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ message: 'Internal server error', status: false });
            })
        }else{
            //Inserting education detail to the table
            models.profile_educations.create({profile_id,course_id})
                .then((education,created)=>{
                    if(!created){
                        let resObj = {
                            message: 'Inserted education details successfully!',
                            id:education.id,
                            profile_id:education.profile_id,
                            course_id:education.course_id,
                        }
                        res.status(200).send(resObj);
                    }
                }).catch((err)=>{
                    console.log(err);
                    res.status(500).send({message:'Internal Server Error',status:false});
                })
        }        
    } else {
        res.status(400).send({ message: 'Bad request', status: false })
    }
}

module.exports = {update_education}