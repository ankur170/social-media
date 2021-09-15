import React from 'react'
import spinnerImage from '../../img/spinner.gif'

const Spinner = () => {
    return (
        <>
          <img src = {spinnerImage}
          style = {{margin : 'auto', width : '200px', display : 'block'}}
          alt = 'Loading'
          />  
        </>
    )
}

export default Spinner
