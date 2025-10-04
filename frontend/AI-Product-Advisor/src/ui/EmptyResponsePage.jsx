import React from 'react'

const EmptyResponsePage = ({message}) => {
  return (
    <div className='p-1 text-gray-400 rounded-md text-center pl-3'>
        {message}
    </div>
  )
}

export default EmptyResponsePage