import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({addComment, post_id}) => {
    
    const [text, setText] = useState('')

    const onChangeHandler = (eve)=> setText(eve.target.value)
    const onSubmitHandler = (eve)=>{
        eve.preventDefault()
        addComment(post_id, {text})
        setText('')
    }

    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a Comment...</h3>
        </div>
        <form className="form my-1" onSubmit = {(eve)=> onSubmitHandler(eve)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Leave a comment"
            value = {text}
            onChange = {(eve)=> onChangeHandler(eve)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(CommentForm)
