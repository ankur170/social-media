import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeComment } from '../../actions/post'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const CommentItem = ({auth, comment: {_id, text, name, avatar, user, date}, post_id, removeComment }) => {

     return( <div class="post bg-white p-1 my-1">
          <div>
            <Link to = {`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on {<Moment format = 'YYYY/MM/DD'>{date}</Moment>}
            </p>
            {!auth.isLoading && auth.user._id === user && (
                <button className = 'btn btn-danger' type = 'button'
                 onClick = {(eve)=> removeComment(post_id, _id)}>
                  <i className = 'fas fa-times'/>
                </button>
            )  }
          </div>
        </div>
     )  
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,

}

const mapStateToprops = (state)=>({
    auth: state.auth
})

export default connect(mapStateToprops, {removeComment})(CommentItem)
