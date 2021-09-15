import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { createCurrentProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({createCurrentProfile, getCurrentProfile, history, profile:{profile, isLoading}}) => {
    
    const [formData, setFormData] = useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skill:'',
        bio:'',
        githubUsername:'',
        facebook:'',
        twitter:'',
        instagram:'',
        linkedin:'',
        youtube:''
       })
    const { company,
        website,
        location,
        status,
        skill,
        bio,
        githubUsername,
        facebook,
        twitter,
        instagram,
        linkedin,
        youtube} = formData
    
    const [displaySocialMedia, toggleSocialMedia]= useState(false)
    useEffect(()=>{
        getCurrentProfile()
        setFormData({
        company: isLoading || !profile.company ? '' : profile.company,
        website: isLoading || !profile.website ? '' : profile.website,
        location: isLoading || !profile.location ? '' : profile.location,
        status: isLoading || !profile.status ? '' : profile.status,
        skill: isLoading || !profile.skill ? '' : ( profile.skill + '').split(','),
        bio: isLoading || !profile.bio ? '' : profile.bio,
        githubUsername: isLoading || !profile.githubUsername ? '' : profile.githubUsername,
        facebook: isLoading || !profile.facebook ? '' : profile.facebook,
        twitter: isLoading || !profile.twitter ? '' : profile.twitter,
        instagram: isLoading || !profile.instagram ? '' : profile.instagram,
        linkedin: isLoading || !profile.linkedin ? '' : profile.linkedin,
        youtube: isLoading || !profile.youtube ? '' : profile.youtube,
        })
    },[isLoading, getCurrentProfile])// eslint-disable-line

    const onChangeHandler = (eve)=>{
        setFormData({...formData, [eve.target.name]: eve.target.value})
    }

    const onSubmitHandler = (eve)=>{
        eve.preventDefault()
        createCurrentProfile(formData, history,true)
    }

    return (
        <>
        <h1 className="large text-primary">
          Create Your Profile
        </h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make your
          profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit = {onSubmitHandler}>
        <div className="form-group"  >
          <select name="status" value = {status} onChange = {onChangeHandler}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value = {company} onChange = {onChangeHandler}/>
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value = {website} onChange = {onChangeHandler}/>
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value = {location} onChange = {onChangeHandler}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skill" value = {skill} onChange = {onChangeHandler}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value = {githubUsername}
            onChange = {onChangeHandler}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value = {bio} onChange = {onChangeHandler}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick = {()=> toggleSocialMedia(!displaySocialMedia)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        
        {displaySocialMedia ? <>
            <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value = {twitter} onChange = {onChangeHandler}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value = {facebook} onChange = {onChangeHandler}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value = {youtube} onChange = {onChangeHandler}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value = {linkedin} onChange = {onChangeHandler}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value = {instagram} onChange = {onChangeHandler}/>
        </div>
        </>: null}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to ="/dashboard">Go Back</Link>
      </form>  
        </>
    )
}

EditProfile.propTypes = {
    createCurrentProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToprops = (state)=>({
    profile: state.profile
})

export default connect(mapStateToprops, { createCurrentProfile, getCurrentProfile})(withRouter(EditProfile))
