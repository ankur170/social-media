import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile'
import { connect } from 'react-redux'


const Education = ({educations, deleteEducation}) => {

    const education = educations.map((edu)=>(
        <tr key= {edu._id}>
            <td> {edu.school } </td>
            <td className='hide-sm'> {edu.degree} </td>
            <td>
                <Moment format = 'YYYY/MM/MM'>{edu.from}</Moment>{' - '}
                {edu.current ? 'Now': (<Moment format = 'YYYY/MM/DD'>{edu.to}</Moment>)}
            </td>
            <td>
                <button className = 'btn btn-danger' onClick = { () => deleteEducation(edu._id) }>Delete</button>
            </td>
        </tr>
    ))
    return (
        <>
          <h2 className = 'my-2'>Education Credentials</h2>
          <table className= 'table'>
              <thead>
                  <tr>
                      <th>School</th>
                      <th className = 'hide-sm'>Degree</th>
                      <th className = 'hide-sm'>Year</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>{education}</tbody>
          </table>  
        </>
    )
}

Education.propTypes = {
    educations: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education)

