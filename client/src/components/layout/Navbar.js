import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../actions/auth'
import PropTypes from 'prop-types'

const Navbar = ({logout, auth: {isAuthenticated, isLoading}}) => {

  const guestLinks = (
    <ul>
      <li><Link to="/profiles"> Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  const authLinks = (
    <ul>
      <li>
          <Link to="/profiles"> Developers</Link>
      </li>
      <li>
          <Link to="/posts"> Posts</Link>
      </li>
      <li><Link to="/dashboard">
          <i className = 'fas fa-user'></i>{' '}
          <span className ='hide-sm'>Dashboard</span>
          </Link>
      </li>
      <li>
        <a onClick= {logout} href="#!">
           <i className = 'fas fa-sign-out-alt'></i>{' '}<span className ='hide-sm'>Logout</span> </a>
      </li>
   </ul>
  )
    return (
     <>
     <nav className="navbar bg-dark">
      <h1>
        <Link to ="/"><i className="fas fa-code"></i> Social Media
        </Link>
      </h1>
      {!isLoading && (<>
        {isAuthenticated ? authLinks : guestLinks}</>)}
    </nav>
     </>
    )
}

Navbar.propTypes = {
  auth:PropTypes.object.isRequired,
  logout:PropTypes.func.isRequired,
}

const mapStateToprops = (state)=>({
  auth: state.auth
})

export default connect(mapStateToprops, {logout})(Navbar)