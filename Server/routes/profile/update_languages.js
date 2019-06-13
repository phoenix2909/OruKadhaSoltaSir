const models = require('./../../models')

let update_languages = (req, res) => {
    let { profile_id, selected_lang_arr } = req.body;
    
    if (profile_id && selected_lang_arr) {
        //Preparing array to insert
        selected_lang_arr = selected_lang_arr.map(lang => ({
            lang_id:lang,
            profile_id
        }));
        
        //Adding known languages
        models.profile_languages.destroy({where : {profile_id}},
            {
                returning: true,
                where: { profile_id }
            }).then((lang) => {
                models.profile_languages.bulkCreate(selected_lang_arr).then(lang=>{
                    res.status(200).send({ message: 'Languages added successfully!',
                lang })
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

module.exports = { update_languages }