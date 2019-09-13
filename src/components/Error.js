import React from 'react';

function Error({mensaje}){
    return(
        <div className='car-panel red darken-4 error col s12'>
           <h6>{mensaje}</h6> 
        </div>
    )
}
export default Error;