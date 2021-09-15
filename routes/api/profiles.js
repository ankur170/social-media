const express = require('express')
const axios = require('axios')
const config = require('config')
const profilesRouter = express.Router()
const Profile = require('./../model/Profile')
const authMiddleware = require('./../middleware/auth')
const {body,validationResult} = require('express-validator')
const User = require('../model/User')
const Post = require('../model/Post')

//@route GET api/profiles/me
//@desc  get the profile of current user(contains token with it)
//@access Private
profilesRouter.get('/me' ,authMiddleware ,async(req,res)=> {

    try{
       const currentProfile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
       if(!currentProfile){
           return res.status(400).json([{msg: 'Please add your profile First'}])
       } 
       res.send(currentProfile)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json([{msg:'Server Error'}])
    }
} )

//@route Post api/profiles/
//@desc  create/update profile of current user(contains token with it)
//@access Private

profilesRouter.post(
    '/',
    //validation of token and required parameter
    [authMiddleware,
    body('status').not().isEmpty().withMessage('status is required'),
    body('skill').not().isEmpty().withMessage('skills are required')
],
async(req,res)=>{
    //console.log('req body contains',req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {
        company,
        website,
        location,
        status,
        skill,
        bio,
        githubUsername,
        facebook,
        twitter,
        instagram,
        linkedin,
        youtube
    } = req.body;
    //build basic profile object
    const profileFields = {};
    profileFields.user = req.user.id
    if(company)  profileFields.company = company;
    if(website)  profileFields.website = website;
    if(status)  profileFields.status = status;
    if(location)  profileFields.location = location;
    if(bio)  profileFields.bio = bio;
    if(githubUsername)  profileFields.githubUsername = githubUsername
    if(skill)  profileFields.skill = (skill+'').split(',').map((oneSkill)=> oneSkill.trim())

    //build social profile object
    profileFields.socialMedia = {}
    if(youtube)  profileFields.socialMedia.youtube = youtube;
    if(twitter)  profileFields.socialMedia.twitter = twitter;
    if(facebook)  profileFields.socialMedia.facebook = facebook;
    if(linkedin)  profileFields.socialMedia.linkedin = linkedin;
    if(instagram)  profileFields.socialMedia.instagram = instagram;

    const profile = await Profile.findOne({user: req.user.id})
    //console.log('profile is',profile)
    try{
        if(profile){
            //update profile
            const updatedProfile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new : true}
            )
            //console.log('updatedprofile is', updatedProfile)
            return res.send(updatedProfile)
        }

        //create new profile
        const newProfile = new Profile(profileFields)
        const newSaveProfile = await newProfile.save()
        //console.log('new save profile is',newSaveProfile)
        return res.send(newSaveProfile)
        
    }
    catch(err){
        console.error(err.msg);
        return res.status(500).json([{msg: 'Server Error'}])
    }
}
)

//@route Get api/profiles/
//@desc  get profile of all users
//@access Public
profilesRouter.get('/', async(req,res)=>{
    try{
        const allProfiles = await Profile.find({}).populate('user',['name','avatar']);
        res.json(allProfiles)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send([{msg:'Server Error'}])
    }
    
})

//@route Get api/profiles/users/user_id
//@desc  get profile of given user with user_id
//@access Public
profilesRouter.get('/user/:user_id', async(req,res)=>{
    const user_id = req.params.user_id
    console.log(typeof(user_id))
    try{
        const profiles = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profiles){
           return res.status(400).json({errors:[{msg: 'There is no profile with this userId'}]})
        }
        res.json(profiles)
    }
    catch(err){
        console.error(err.message);
        if(err.kind=='ObjectId'){
            return res.status(400).json({errors:[{msg: 'Profile not Found'}]})
        }
        res.status(500).send([{msg:'Server Error'}])
    }
    
})

//@route Delete api/profiles/
//@desc  delete profile/delete/user of authorised user 
//@access Private
profilesRouter.delete('/', authMiddleware, async(req,res)=>{
    try{
        //remove post of user
        await Post.deleteMany({user: req.user.id})
        //delete profile
        await Profile.findOneAndRemove({user:req.user.id})
        
        //delete user
        await User.findOneAndRemove({_id:req.user.id})

        res.json([{msg:'User Deleted'}])
    }
    catch(err){
        console.error(err.message);
        res.status(500).send([{msg:'Server Error'}])
    }
    
})

//@route Post api/profiles/experience
//@desc  add experience
//@access Private
profilesRouter.put(
    '/experience',
    [authMiddleware,
    body('title').not().isEmpty().withMessage('title is required'),
    body('company').not().isEmpty().withMessage('company is required'),
    body('from').not().isEmpty().withMessage('from date is required')
    ], 
    async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.message})
    }

    const {
        title,
        company,
        location,
        from,
        to,
        description,
        current
    } = req.body;

    const experienceObject = {}
    if(title) experienceObject.title = title
    if(company) experienceObject.company = company
    if(location) experienceObject.location = location
    if(from) experienceObject.from = from
    if(to) experienceObject.to = to
    if(current) experienceObject.current = current
    if(description) experienceObject.description = description

    try{
        const profile = await Profile.findOne({user:req.user.id})
        //console.log('profile is ',profile)
        if(!profile){
           return res.status(400).json({errors:[{msg:'Profile Not Found Create Profile First'}]})
        }
        const exp = profile.experience.unshift(experienceObject)
        //console.log('exp is ',(profile.experience))
        const updatedExperience = await Profile.findOneAndUpdate(
            {user:req.user.id},
            {$set:{experience:profile.experience}},
            {new:true}
        )
        res.send(updatedExperience)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json('Server Error') 
    }

})

//@route Delete api/profiles/experience/:experience_id
//@desc  delete profile experience with experience_id of authorised user 
//@access Private
profilesRouter.delete('/experience/:experience_id', authMiddleware, async(req,res)=>{
    //here we use filter method which is not inplace we should use splice for inplace
    try{
        const profile = await Profile.findOne({user:req.user.id})
        
        const filtr = (profile.experience.filter((item)=>{ return((item.id) !== req.params.experience_id)}))
        profile.experience = filtr
        await profile.save()
        res.json(profile)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json('Server error ')
    }
})

//@route Post api/profiles/education
//@desc  add education
//@access Private
profilesRouter.put(
    '/education',
    [authMiddleware,
    body('school').not().isEmpty().withMessage('school is required'),
    body('degree').not().isEmpty().withMessage('degree is required'),
    body('fieldofstudy').not().isEmpty().withMessage('fieldofstudy is required'),
    body('from').not().isEmpty().withMessage('from date is required')
    ], 
    async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.message})
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description,
        current
    } = req.body;

    const edObject = {}
    if(school) edObject.school = school
    if(degree) edObject.degree = degree
    if(fieldofstudy) edObject.fieldofstudy = fieldofstudy
    if(from) edObject.from = from
    if(to) edObject.to = to
    if(current) edObject.current = current
    if(description) edObject.description = description

    try{
        const profile = await Profile.findOne({user:req.user.id})
        //console.log('profile is ',profile)
        if(!profile){
           return res.status(400).json({errors:[{msg:'Profile Not Found Create Profile First'}]})
        }
        const exp = profile.education.unshift(edObject)
        //console.log('exp is ',(profile.education))
        const updatedEducation = await Profile.findOneAndUpdate(
            {user:req.user.id},
            {$set:{education:profile.education}},
            {new:true}
        )
        //console.log('updated education is',updatedEducation)
        res.send(updatedEducation)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json('Server Error') 
    }

})

//@route Delete api/profiles/education/:education_id
//@desc  delete profile education with education_id of authorised user 
//@access Private
profilesRouter.delete('/education/:education_id', authMiddleware, async(req,res)=>{
    //here we use filter method which is not inplace we should use splice for inplace
    try{
        const profile = await Profile.findOne({user:req.user.id})
        
        const filtr = (profile.education.filter((item)=>{ return((item.id) !== req.params.education_id)}))
        profile.education = filtr
        await profile.save()
        res.json(profile)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json('Server error ')
    }
})



module.exports = profilesRouter;