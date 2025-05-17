import React from 'react'
import loading from "../assets/dog running.gif"
import loading2 from "../assets/dog running bg-trans.gif"

const Loading = (size = 50) => {
  return (
    <div className='flex justify-center items-center'>
        <img 
            src={loading}
            alt="loading..."
            className={`w-${size} h-${size}`}
        />
    </div>
  )
}

export default Loading