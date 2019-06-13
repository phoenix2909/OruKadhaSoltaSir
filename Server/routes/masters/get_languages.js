const models=require('./../../models');

const getMasterLanguages=(req,res)=>{
    //Getting all the languages in the master
    models.master_languages.findAll().then((languages)=>{
        res.status(200).send(languages);
    }).catch((err)=>{
        console.log(err);        
        res.status(500).send({message:'Internal Server Error'});
    })
}

module.exports={getMasterLanguages};