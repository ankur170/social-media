import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import Experience from './Experience'
import { Link } from 'react-router-dom'
import Education from './Education'


const Dashboard = ({profile: {isLoading, profile}, auth: {user}, getCurrentProfile, deleteAccount}) => {

    useEffect(getCurrentProfile,[isLoading, getCurrentProfile])
    return (
        isLoading && profile === null ? <Spinner/> :(
        <>
          <h1 className = 'large text-primary'>Dashboard</h1>
          <p className = 'lead'><i className= 'fa fa-user'>{' '}Welcome{' '} 
          {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</i>
          </p>
          { profile ===null ?
           <>
           <p>You have not Create profile yet, Please Add Something</p>
           <Link to = '/create-profile' className = 'btn btn-primary my-1'>
               Create Profile
           </Link>
           </> 
           :
           <>
        <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        
        <Link to="/add-experience" className="btn btn-light">
           <i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        
        <Link to="/add-education" className="btn btn-light">
           <i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
        
        </div>
        <Experience experiences= {profile.experience} />
        <Education educations= {profile.education} />
        <div className = 'my-2'>
            <button className = 'btn btn-danger' onClick = {()=> deleteAccount()}>
                <i className= 'fas fa-user-minus'>{' '} Delete My Account</i>
            </button>
        </div>
           </>}
        </>
        )
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToprops = (state)=> ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToprops,{getCurrentProfile, deleteAccount})(Dashboard)
