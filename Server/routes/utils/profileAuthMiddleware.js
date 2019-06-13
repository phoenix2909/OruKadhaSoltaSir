const {verifyToken} = require('./jwt')

module.exports = (req,res,next) => {
    if(req.headers.authorization)
    {
        console.log(req.headers.authorization);
        verifyToken(req.headers.authorization).then((obj)=>{
            if(obj.id===req.body.user_id)
            next();
        }).catch((err)=>{
            res.status(401).send({

                message:"Unauthorized Access!",err
            });
        })
    }
    else{
        res.status(401).send({
            message : 'Unauthorized Access!'
        })
    }
}