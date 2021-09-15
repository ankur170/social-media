import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({component: Component, auth: {isAuthenticated, isLoading}, ...rest}) =>(
    <Route {...rest} render = {
        props => !isAuthenticated && !isLoading ? (
            <Redirect to = 'login'/>) : (<Component {...props}/>) 
    } />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToprops = (state)=>({
    auth: state.auth
})

export default connect(mapStateToprops)(PrivateRoute)
