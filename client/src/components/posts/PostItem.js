import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { addLike, addUnlike, deletePost } from '../../actions/post'

const PostItem = ({auth, displaySection = true, post: {_id, name, avatar, text, user, like, comment, date}, 
    addLike, addUnlike, deletePost}) => {
    return (
        <div className = 'posts'>
            <div className="post bg-white p-1 my-1">
          <div>
            <Link to = {`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
               Posted On <Moment format = 'YYYY/MM/DD'>{date}</Moment>
            </p>
            {displaySection && <>
                <button type="button" className="btn btn-light" onClick = {(eve)=> addLike(_id)}>
              <i className="fas fa-thumbs-up"></i>
              {like.length ?  <span className='like-count'>{' '}{like.length} </span> : ' '}
            </button>
            <button type="button" className="btn btn-light" onClick = {(eve)=> addUnlike(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to = {`/posts/${_id}`} className="btn btn-primary">
              Discussion {comment.length ?  <span className='comment-count'>{comment.length} </span> : ' '}
            </Link>
            { !auth.isLoading && auth.user._id === user && <button      
            type="button"
            className="btn btn-danger" onClick = {(eve)=> deletePost(_id)}>
            <i className="fas fa-times"></i>
            </button> }
            </>}
        
          </div>
        </div>
        </div>
    )
}

PostItem.defaultProps = {
    displaySection: true
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post:PropTypes.object.isRequired,
    addUnlike: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToprops = (state)=>({
    auth: state.auth
})

export default connect(mapStateToprops, {addLike, addUnlike, deletePost})(PostItem)

