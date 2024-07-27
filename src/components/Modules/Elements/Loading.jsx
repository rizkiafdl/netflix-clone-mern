import React from 'react'

const Loading = () => {
    return (
        <div className='absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>
            <span className="loading loading-bars  w-36">
            </span>
            <p className='font-bold text-2xl text-center'>Please Wait</p>
        </div>)
}

export default Loading 