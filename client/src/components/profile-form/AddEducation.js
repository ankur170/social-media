import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        description: '',
        current: '',
    })

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description,
        current
    } = formData

    const [disableToDate, toggleDisableToDate] = useState(false)
    const onChangeHandler = (eve)=> setFormData({...formData, [eve.target.name]: eve.target.value })

    const onSubmitHandler = (eve)=>{
        eve.preventDefault()
        addEducation(formData, history)
    }

    return (
        <>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit = {onSubmitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value = {school} onChange = {onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value = {degree} onChange = {onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value = {fieldofstudy}
           onChange = {onChangeHandler} required/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value = {from} onChange = {onChangeHandler} required />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value = {current}
             onChange = {(eve)=> {
                 setFormData({...formData, current: !current})
                 toggleDisableToDate(!disableToDate)
                 }} />
             Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value = {to} onChange = {onChangeHandler}
          disabled = {disableToDate ? 'disable': ''}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value = {description} onChange = {onChangeHandler}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>  
        </>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation))
