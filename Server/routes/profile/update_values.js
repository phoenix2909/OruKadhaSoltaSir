const models = require('./../../models')

let update_values = (req, res) => {
    let { profile_id, selected_valuesArr } = req.body;
    
    if (profile_id && selected_valuesArr) {
        //Preparing to insert
        selected_valuesArr = selected_valuesArr.map(value => ({
            value_id : value,
            profile_id
        }));

        // First destroy every row with this id
        models.profile_values.destroy({ where: { profile_id } },
            {
                returning: true,
                where: { profile_id }
            }).then((value) => {
                //  Then bulkCreate everything again
                models.profile_values.bulkCreate(selected_valuesArr).then(value => {
                    res.status(200).send({
                        message: 'Values added successfully!',
                        value
                    })
                }).catch((err)=>{
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

module.exports = { update_values }