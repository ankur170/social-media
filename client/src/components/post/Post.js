import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPostByPostId } from '../../actions/post'
import PostItem from '../posts/PostItem'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Post = ({post:{post, isLoading}, getPostByPostId, match}) => {
    useEffect(()=> getPostByPostId(match.params.post_id),[getPostByPostId, match.params.post_id])
    return ( post === null && isLoading ? <Spinner /> :<>
        <Link to = '/posts' className = 'btn'> Back To Post </Link>
        <PostItem displaySection = {false} post = {post} />
        <CommentForm post_id = {post._id}/>
        {post.comment.map((comm)=> 
        <CommentItem key = {comm._id} post_id= {post._id} comment = {comm}/> )}
        </>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPostByPostId: PropTypes.func.isRequired,
}

const mapStateToprops = (state)=>({
    post: state.post
})

export default connect(mapStateToprops, {getPostByPostId})(Post)
