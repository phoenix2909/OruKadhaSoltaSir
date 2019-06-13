const models = require('./../../models')

let update_skills = (req, res) => {
    let { profile_id, selected_skillsArr } = req.body;
    
    if (profile_id && selected_skillsArr) {
        //Preparing to insert
        selected_skillsArr = selected_skillsArr.map(skill => ({
            skill_id : skill,
            profile_id
        }));
        // First destroy every row with this id
        models.profile_skills.destroy({ where: { profile_id } },
            {
                returning: true,
                where: { profile_id }
            }).then((skill) => {                
                //  Then bulkCreate everything again
                models.profile_skills.bulkCreate(selected_skillsArr).then(skill => {
                    res.status(200).send({
                        message: 'Skills added successfully!',
                        skill   
                    })
                }).catch((err)=>{
                    console.log(err);
                    res.status(500).send({message:'Internal server error',status:false});
                })
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ message: 'Internal server error', status: false });
            })
    } else {
        res.status(400).send({ message: 'Bad request', status: false })
    }
}

module.exports = { update_skills }