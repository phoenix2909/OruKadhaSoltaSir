const {verifyToken} = require('./jwt')

module.exports = (req,res,next) => {
    if(req.headers.authorization)
    {
        verifyToken(req.headers.authorization).then(()=>{
            next();
        }).catch((err)=>{
            res.status(401).send({
                message:"Unauthorized Access!"
            });
        })
    }
    else{
        res.status(401).send({
            message : 'Unauthorized Access!'
        })
    }
}