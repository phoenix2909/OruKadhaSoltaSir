const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    try{
        let token = jwt.sign(payload,process.env.JWT_TOKEN_KEY,{
            expiresIn:'3h'
        })
        return token
    }catch(error){
        console.error(error);         
    }
}

const verifyToken = (token) => {
    return new Promise ((resolve,reject)=>{
        try
        {
            let payload = jwt.verify(token,process.env.JWT_TOKEN_KEY)
            resolve (payload);
        } catch (error)
        {
            reject (error);
        }
    });
}

module.exports = {generateToken,verifyToken}