import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({experience:{
    company,
    from,
    to,
    description
}, status}) => {
    return (
        <div>
            <h3 className="text-dark">{company && <span>{company}</span>}</h3>
            <p><Moment format= 'YYYY/MM/DD'>{from}</Moment> -
             {to ? <Moment format= 'YYYY/MM/DD'>{to}</Moment>: 'Now' }
             </p>
            <p><strong>Position: </strong>{status}</p>
            <p>
              <strong>Description: </strong>{description}
            </p> 
        </div>
    )
}

ProfileExperience.propTypes = {
   experience: PropTypes.object.isRequired,
}

export default ProfileExperience
