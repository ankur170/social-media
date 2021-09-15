import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {setAlert} from '../../actions/alert'
import { register } from '../../actions/auth'

const Register = ({setAlert, register, isAuthenticated})=> {
    
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        passWord:'',
        password2:'',
    })

    const {name,email,passWord,password2} = formData

    const onChangeHandler = (eve)=>{
        const name = eve.target.name
        const value = eve.target.value
        setFormData({...formData, [name]:value })   
    }

    const submitHandler = (eve)=>{
        eve.preventDefault()
        if(passWord !== password2){
            setAlert('passWord do not match','danger')
        }
        else{
            register({name, email, passWord})
        }
    }

    if(isAuthenticated){
      return <Redirect to = '/dashboard'/>
    }

    return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit = {submitHandler}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value = {name} onChange = {onChangeHandler} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value = {email} onChange = {onChangeHandler} required />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="8"
            value = {password2}
            onChange = {onChangeHandler}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
 </>
    )
}

const mapStateToprops = (state)=> ({isAuthenticated: state.auth.isAuthenticated})

export default connect(mapStateToprops,{setAlert,register})(Register)

