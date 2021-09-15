import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link, Redirect} from 'react-router-dom'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'

const Login = ({login, isAuthenticated})=> {
    
    const [formData, setFormData] = useState({
        email:'',
        passWord:''
    })

    const {email,passWord} = formData

    const onChangeHandler = (eve)=>{
        const name = eve.target.name
        const value = eve.target.value
        setFormData({...formData, [name]:value })   
    }

    const submitHandler = (eve)=>{
        eve.preventDefault()
        login({email, passWord}) 
    }
// REDIRECT IF LOGGED_IN
    if(isAuthenticated){
      return <Redirect to = '/dashboard'/>
    }

    return (
    <>
      <h1 className="large text-primary">Sign In </h1>
      <p className="lead"><i className="fas fa-user"></i> Sign In Your Account</p>
      <form className="form" onSubmit = {submitHandler}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value = {email} onChange = {onChangeHandler} />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="passWord"
            minLength="8"
            value = {passWord}
            onChange = {onChangeHandler}
          />
        </div>
       
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Not have an account? <Link to="/register">Sign Up</Link>
      </p>
 </>
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToprops = (state)=> ({isAuthenticated: state.auth.isAuthenticated})

export default connect(mapStateToprops,{login})(Login)

