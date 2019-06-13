const models = require('./../../models')

let update_hobbies = (req, res) => {
    let { profile_id, selected_hobbiesArr } = req.body;
    
    if (profile_id && selected_hobbiesArr) {

        //Preparing for bulk insert
        selected_hobbiesArr = selected_hobbiesArr.map(hobby => ({
            hobby_id: hobby,
            profile_id
        }));

        // First destroy every row with this id
        models.profile_hobbies.destroy({ where: { profile_id } },
            {
                returning: true,
                where: { profile_id }
            }).then((hobby) => {
                //  Then bulkCreate everything again
                models.profile_hobbies.bulkCreate(selected_hobbiesArr).then(hobby => {
                    res.status(200).send({
                        message: 'Hobbies added successfully!',
                        hobby
                    })
                }).catch((err)=>{
                    console.log(err);
                    res.status(500).send({message:'Internal server error', status: false});
                })
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ message: 'Internal server error', status: false });
            })
    } else {
        res.status(400).send({ message: 'Bad request', status: false })
    }

}

module.exports = { update_hobbies }