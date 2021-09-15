const express = require('express');
const usersRouter = express.Router();
const {validationResult, body} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const User = require('./../model/User')

//@route POST api/user/
//@desc  Register new user route
//@access Public
usersRouter.post(
    '/',
    body('name').trim().isLength({min:1}).escape().withMessage('name must be specified')
    .isAlphanumeric().withMessage('name must contain alphabets and numeric characters'),
    body('email').isEmail().withMessage('Enter a valid email').trim().escape().normalizeEmail(),
    body('passWord').isLength({min:8}).withMessage('Enter password 8 or more characters')
    .matches('[0-9]').withMessage('Password Must Contain a Number')
    .matches('[A-Z]').withMessage('Password Must Contain a Uppercase letter')
    .trim().escape(),
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {email,name ,passWord}= req.body;

        try{
            //checks whether user exist or not
             const userExist = await User.findOne({email})
             if(userExist){
                 return res.status(400).json({errors:[{msg:'User already exist'}]})
             }

            //get users gravatar
            const avatar = gravatar.url(email,{
                s:'200',
                r:'pg',
                d:'mm'
            })

            //hash the password and register user with hashed password
            const salt = await bcrypt.genSalt(10)
            const hashedPassWord = await bcrypt.hash(passWord,salt)
            const user = new User({
                name,
                email,
                passWord:hashedPassWord,
                avatar
            })
            await user.save();

            //returns the jwt token to user
            const payload = {user:
                {id:user.id}
            }
            jwt.sign(payload ,config.get('SECRET'),{expiresIn:3600000}
            ,(err,token)=>{
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

module.exports = usersRouter;