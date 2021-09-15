import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'
import { withRouter, Link } from 'react-router-dom'

const AddExperience = ({addExperience, history}) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        description: '',
        current: '',
    })
    const {
        title,
        company,
        location,
        from,
        to,
        description,
        current
    } = formData
    const [disableToDate, toggleDisableToDate] = useState(false)
    const onChangeHandler = (eve)=> setFormData({...formData, [eve.target.name]: eve.target.value })

    const onSubmitHandler = (eve)=>{
        eve.preventDefault()
        addExperience(formData, history)
    }

    return (
        <>
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit = {onSubmitHandler}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value = {title} onChange = {onChangeHandler} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company"value = {company}  onChange = {onChangeHandler} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value = {location} onChange = {onChangeHandler} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value = {from} onChange = {onChangeHandler} required />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value = {current}
           onChange = {(eve)=> {
           setFormData({...formData, current: !current})
           toggleDisableToDate(!disableToDate)
           } }/>
          {' '} Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to"  value = {to} onChange = {onChangeHandler}
          disabled = {disableToDate ? 'disable': ''}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value = {description} onChange = {onChangeHandler}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>   
        </>
    )
}

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
}

export default connect(null,{addExperience})(withRouter(AddExperience))
