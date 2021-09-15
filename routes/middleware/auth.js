const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next)=>{
    //extract token from request
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({error:[{msg:'No Token Access Denied'}]})
    }
    //verify token with jwt
    try{
        jwt.verify(token,config.get('SECRET'),(err,decodedToken)=>{
            //console.log('decoded token is ',decodedToken)
            if(err) throw err;
            req.user = decodedToken.user;
            next()
        })
    }
    catch(err){
        res.status(401).json({error:[{msg:'UnAuthorized Token,Please Login with Valid Account'}]});
    }
}