const express = require('express')
const postsRouter = express.Router()
const Post = require('./../model/Post')
const User = require('./../model/User')
const {body,validationResult} = require('express-validator')
const authMiddleware = require('./../middleware/auth')

//@route Post api/post/
//@desc  create a new Post 
//@access Private
postsRouter.post(
    '/',
    [authMiddleware,
    body('text').not().isEmpty().withMessage('text is required')
    ], 
    async(req,res)=>{
    console.log('req body  is', req.body)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
    try{
        const user = await User.findById(req.user.id);
        const newPostObject =  {
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id
        }
        const newPost =  new Post(newPostObject)
        res.json(await newPost.save())  
    }
    catch(err){
        console.error(err.message)
        res.status(500).json('Server Error') 
    }

})

//@route Get api/post/
//@desc  get all Posts for authorised user 
//@access Private
postsRouter.get('/',[authMiddleware],async(req,res)=>{
    //console.log("req for posts is ", req)
    try{
        const allPosts = await Post.find({}).sort({date: -1})
        //console.log('allposts are', allPosts)
        res.json(allPosts)
    }
    catch(err){
        console.error(err.message)
        res.status(500).json('Server Error')
    }
})

//@route Get api/post/
//@desc  get all Posts for authorised user 
//@access Private
postsRouter.get('/:id',[authMiddleware],async(req,res)=>{
    const id = req.params.id
    //console.log('params id is',id)
    try{
        const idPost = await Post.findById(id)
        //console.log('idpost is',idPost)
        if(!idPost){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        }
        res.json(idPost)
    }
    catch(err){
        if(err.kind == "ObjectId"){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        }
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route Delete api/post/:id
//@desc  delete Posts for authorised user 
//@access Private
postsRouter.delete('/:id', [authMiddleware], async(req,res)=>{
    try{
        const idPost = await Post.findById(req.params.id)
        if(!idPost){
            return res.status(400).json({errors:{msg: 'Post Not Found'}}) 
        }
        //console.log('idPost is ',idPost)
        //console.log(`typeof idpost.user is ${typeof(idPost.user)} and type of req.user.id is ${typeof(req.user.id)}`)
        if(idPost.user.toString() !== req.user.id){
            return res.status(400).json({errors:{msg:'You can not delete it'}})
        }
         const del = await Post.deleteOne({_id:req.params.id})
        res.send('Post Successfuly deleted')
    }
    catch(err){
        if(err.kind == "ObjectId"){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        }  
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route Put api/post/like/:id
//@desc  create a new like on given postId for authorised user 
//@access Private
postsRouter.put('/like/:id',[authMiddleware], async(req,res)=>{
    try{
        const idPost = await Post.findById(req.params.id)
        if(!idPost){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        }
//check if already liked
        const checkLikeBefore = idPost.like.filter((item)=> item.user.toString() === req.user.id)
        if(checkLikeBefore.length > 0){
            return res .status(400).json({errors:{msg:'Already liked'}})
        }
//add user to post likees
        idPost.like.unshift({user:req.user.id})
        await idPost.save()
        res.json(idPost.like)
    }
    catch(err){
        if(err.kind == "ObjectId"){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        } 
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})
//@route Put api/post/like/:id
//@desc  create a new like on given postId for authorised user 
//@access Private
postsRouter.put('/unlike/:id',[authMiddleware], async(req,res)=>{
    try{
        const idPost = await Post.findById(req.params.id)
        if(!idPost){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        }
//check if already liked
        const checkLikeBefore = idPost.like.filter((item)=> item.user.toString() === req.user.id)
        if(checkLikeBefore.length === 0){
            return res .status(400).json({errors:{msg: 'Not Liked Yet'}})
        }
//add user to post likees
        idPost.like = idPost.like.filter((item)=> item.user.toString() !== req.user.id)
        await idPost.save()
        res.json(idPost.like)
    }
    catch(err){
        if(err.kind == "ObjectId"){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        } 
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route Post api/posts/comment/:id
//@desc  create a new comment on given postId Post 
//@access Private
postsRouter.post(
    '/comment/:id',
    [authMiddleware,
    body('text').not().isEmpty().withMessage('text is required')
    ], 
    async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
    try{
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        }
        const newCommentObject =  {
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id
        }
        post.comment.unshift(newCommentObject)
        await post.save()
        //console.log(post)
        res.json(post.comment)  
    }
    catch(err){
        console.error(err.message)
        if(err.kind == "ObjectId"){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        } 
        res.status(500).json('Server Error') 
    }

})

//@route Delete api/posts/comment/:id/:comment_id
//@desc  delete a comment with comment_id on given postId Post 
//@access Private
postsRouter.delete('/comment/:id/:comment_id',[authMiddleware],async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({errors:{msg: 'Post Not Found'}})
        }
        //check comment exist
        const idComment = post.comment.find((item)=> (item.id) === req.params.comment_id)
        if(!idComment){
            return res.status(400).json({errors:{msg: 'Comment Not Found'}})
        }
        //check user exist
        //console.log(typeof(idComment))
        if(idComment.id.toString() === req.params.id){
            return res.status(400).json({errors:{msg: 'Comment Not Found'}})
        }
        post.comment = post.comment.filter((item)=> (item.id) !== req.params.comment_id)
        await post.save()
        res.send('comment deleted successfully')
    }
    catch(err){
        console.error(err.message)
        if(err.kind == "ObjectId"){
            return res.status(400).json({errors:{msg: 'Comment/Post Not Found'}})
        } 
        res.status(500).json('Server Error') 
    }
})

module.exports = postsRouter;