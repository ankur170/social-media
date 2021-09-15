import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const ProfilesItems = ({profile:{
    user:{name, avatar, _id},
    skill,
    company,
    location,
    status
}}) => {
    return (
        <div className = 'profile bg-light'>
          <img src = {avatar} alt = '' className= 'round-img' />
          <div>
              <h2>{name}</h2>
              <p>{status} at {company && <span> {company}</span> } </p>
              <p className = 'my-1'> {location && <span> {location}</span> } </p>
              <Link to = {`/profile/${_id}`} className = 'btn btn-primary'>
                  View Profile
              </Link>
         </div>
              <ul>
                  {skill.slice(0,4).map((skl, index)=>(
                      <li key = {index} className = 'text-primary'>
                          <i className = 'fas fa-check'>{' '}{skl}</i>
                      </li>
                  ))}
              </ul>
        </div>
    )
}

ProfilesItems.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfilesItems
