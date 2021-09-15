import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfilesByUserId } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import { Link } from 'react-router-dom'

const Profile = ({match, profile:{ profile,isLoading}, auth, getProfilesByUserId}) => {
    
    useEffect(()=> getProfilesByUserId(match.params.user_id),[getProfilesByUserId, match.params.user_id])
    return (<>
     {
       profile === null || isLoading ? <Spinner/> : <>
       <Link to = '/profiles'> Back To Profile </Link>
       { auth.isAuthenticated && auth.isLoading && auth.user._id === profile.user._id &&
        <Link to ='edit-profile' className = 'btn btn-dark'> Edit Profile</Link> 
       }
       <div class="profile-grid my-1">
            <ProfileTop profile = {profile}/>
            <ProfileAbout profile = {profile}/>
            <div class="profile-exp bg-white p-2">
               <h2 class="text-primary">Experience</h2>
                { 
                    profile.experience.length > 0 ?
                    profile.experience.map((exp)=>(
                        <ProfileExperience key= {exp._id} experience = {exp} status= {profile.status}/>
                    )) : 
                    <h4>No Experience Credentials</h4>
                }
            </div>
            <div class="profile-edu bg-white p-2">
               <h2 class="text-primary">Education</h2>
                {
                    profile.education.length > 0 ?
                    profile.education.map((edu)=>(
                        <ProfileEducation key= {edu._id} education = {edu}/>
                    )) : 
                    <h4>No Education Credentials</h4>
                }
            </div>
        </div>
       </>
    } 
    </>)
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfilesByUserId: PropTypes.func.isRequired,
}

const mapStateToprops = (state)=>({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToprops, {getProfilesByUserId})(Profile)
