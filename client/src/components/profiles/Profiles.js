import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProfiles } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfilesItems from './ProfilesItems'

const Profiles = ({getAllProfiles, profile: {profiles, isLoading}}) => {
    useEffect(()=> getAllProfiles(),[isLoading, getAllProfiles])
    return (
        <>
        {isLoading ? <Spinner/> :(
        <>
          <h1 className = 'large text-primary'>Developers </h1>
          <p className = 'lead'>
              <i className = 'fab connectdevelop'></i> {' '} Browse and connect with Developers..
          </p>
          <div className = 'profiles'>
          {isLoading ? <Spinner/> : profiles.length > 0 ? (
              profiles.map((profile)=>
                  <ProfilesItems key= {profile._id} profile= {profile}/>
              )
        ): 
          <h4> No Profile Found </h4> }
          </div>
        </>
        )
         }
        </>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToprops = (state)=>({
    profile: state.profile
})

export default connect(mapStateToprops,{ getAllProfiles })(Profiles)
