import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profile'
import { connect } from 'react-redux'


const Experience = ({experiences, deleteExperience}) => {

    const experience = experiences.map((expe)=>(
        <tr key= {expe._id}>
            <td> {expe.company } </td>
            <td className='hide-sm'> {expe.title} </td>
            <td>
                <Moment format = 'YYYY/MM/MM'>{expe.from}</Moment>{' - '}
                {expe.current ? 'Now': (<Moment format = 'YYYY/MM/DD'>{expe.to}</Moment>)}
            </td>
            <td>
                <button className = 'btn btn-danger' onClick = { () => deleteExperience(expe._id) } > 
                    Delete
                </button>
            </td>
        </tr>
    ))
    return (
        <>
          <h2 className = 'my-2'>Experience Credentials</h2>
          <table className= 'table'>
              <thead>
                  <tr>
                      <th>Company</th>
                      <th className = 'hide-sm'>Title</th>
                      <th className = 'hide-sm'>Year</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>{experience}</tbody>
          </table>  
        </>
    )
}

Experience.propTypes = {
    experiences: PropTypes.array.isRequired,
}

export default connect(null, {deleteExperience})(Experience)
