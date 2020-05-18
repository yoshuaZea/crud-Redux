import React, {Fragment} from 'react'
import './spinner.css'

const Spinner = ({text}) => {
    return ( 
        <Fragment>
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
            <p className="text-center">{text}</p>
        </Fragment>
    )
}
 
export default Spinner