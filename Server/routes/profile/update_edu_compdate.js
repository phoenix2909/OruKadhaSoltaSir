const models = require('./../../models')

let update_edu_compdate = (req, res) => {
    let { id, comp_date } = req.body;
    
    if (id && comp_date) {
        // Updating education completion date
        models.profile_educations.update({
            comp_date
        },
            {
                returning: true,
                where: { id }
            }).then(([affectedRows,[education]]) => {
                let resObj = {
                    message: 'Updated education details successfully!',
                    id:education.id,
                    profile_id:education.profile_id,
                    course_id:education.course_id,
                    comp_date:education.comp_date,
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

module.exports = { update_edu_compdate }