import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
import { getAllPosts } from '../../actions/post'

const Posts = ({post: {posts, isLoading}, getAllPosts}) => {
    useEffect(()=>{
        //console.log('useeffect is running')
         getAllPosts()},[getAllPosts])
    return ( isLoading ? <Spinner/> :
        <>
        <h1 className="large text-primary">
          Posts
        </h1>
        <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
        {<PostForm/>}
        <div className = 'posts'>
            { posts.map((post)=>
            <PostItem key = {post._id} post = {post}/>
            )}
        </div>
        </>
    )
}

Posts.propTypes = {
   post: PropTypes.object.isRequired,
   getAllPosts: PropTypes.func.isRequired, 
}

const mapStateToprops = (state)=>({
    post: state.post
})

export default connect(mapStateToprops, {getAllPosts})(Posts)
