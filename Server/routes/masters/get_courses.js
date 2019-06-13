const models=require('./../../models');

const getMasterCourses=(req,res)=>{
    //Getting all the courses in the master
    models.master_courses.findAll().then((courses)=>{
        res.status(200).send(courses);
    }).catch((err)=>{
        console.log(err);        
        res.status(500).send({message:'Internal Server Error'});
    })
}

module.exports={getMasterCourses};