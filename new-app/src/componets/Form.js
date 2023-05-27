import React from 'react'

function Form() {
  return (
    <div className='root'>
        <div className='form' >
            <input type= 'text' placeholder='User name' className='input-box'>
            </input><br>
            </br>
           
            <input type= 'text' placeholder='Password' className='input-box'>
            </input> <br>
            </br>
            <div>
            <button  >Login</button>
            </div>
            
        </div>
      
    </div>
  )
}

export default Form