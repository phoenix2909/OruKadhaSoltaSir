const models = require('./../../models')

let update_personal_info = (req, res) => {
    const { id, about, father_occupation, eco_status, age, gender, } = req.body

    if (id && about && father_occupation && eco_status && age && gender) {
        //Adding some intro about yourself
        models.profiles.update({
            about, 
            father_occupation,
            eco_status,
            age,
            gender, 
        },
            {
                returning: true,
                where: { id }
            }).then(([affectedRows, [profile]]) => {
                let resObj = {
                    message: 'Updated personal info Successfully!',
                    id: profile.id,
                    father_occupation: profile.father_occupation,
                    eco_status : profile.eco_status,
                    age : profile.age,
                    gender : profile.gender,
                    about : profile.about,
                    affectedRows,
                }
                res.status(200).send(resObj);
            }).catch((err) => {
                console.log(err);
                res.status(500).send({ message: 'Internal server error', status: false });
            })
    } else {
        res.status(400).send({ message: 'Bad request', status: false })
    }


}

module.exports = { update_personal_info }