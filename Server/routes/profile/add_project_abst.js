const models = require('./../../models')

let add_project_abst = (req, res) => {
    const {id, project_abst} = req.body

    if (id && project_abst) {
        //Adding some intro about yourself
        models.profiles.update({
            project_abst
        },
            {
                returning: true,
                where: { id }
            }).then(([affectedRows, [profile]]) => {
                let resObj = {
                    message: 'Added project info Successfully!',
                    id : profile.id,
                    project_abst : profile.project_abst,
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

module.exports = { add_project_abst }