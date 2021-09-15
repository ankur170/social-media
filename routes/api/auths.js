const express = require('express')
const authsRouter = express.Router()
const authMiddleware = require('./../middleware/auth')
const User = require('./../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {body,validationResult}= require('express-validator')
const config = require('config')

//@route GET api/auth/
//@desc  get Authorised user data
//@access Public
authsRouter.get('/', authMiddleware, async(req,res)=> {
    try{
        const user = await User.findById(req.user.id).select('-passWord');
        res.json(user)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

//@route POST api/auth/
//@desc  Login user
//@access Public
authsRouter.post(
    '/',
    body('email').isEmail().withMessage('Enter a valid email'),
    body('passWord').exists().withMessage('Password is required'),
    async(req,res)=>{
       // console.log('data in body is ', req.body)
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }

        const {email, passWord}= req.body;

        try{
           const user = await User.findOne({email})
           if(!user){
               return res.status(400).json({error:[{msg:'Invalid Credentials'}]})
           }

           //compare the bcrypt password
           const isMatch = await bcrypt.compare(passWord,user.passWord)
           if(!isMatch){
               return res.status(400).json({error:[{msg:'Invalid Credentials'}]})
           }

            //returns the jwt token to user
            const payload = {user:
                {id:user.id}
            }
            jwt.sign(payload ,config.get('SECRET'),{expiresIn:360000},(err,token)=>{
                if(err){
                    throw err;
                }
                else{
                    res.json({token})
                }
            })
        }
        catch(errors){
            console.error(errors.message)
            res.status(500).send('server error')
        }

        
    }
)

module.exports = authsRouter;