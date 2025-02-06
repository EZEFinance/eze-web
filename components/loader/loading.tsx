import React from 'react'

export default function Loading() {
  return (
    <div className='fixed z-[100] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm w-full h-full'>
      <div className="lava-lamp top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bubble"></div>
        <div className="bubble1"></div>
        <div className="bubble2"></div>
        <div className="bubble3"></div>
      </div>
    </div>
  )
}
