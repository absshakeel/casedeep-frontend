import React from 'react'

const Sticky = () => {
  return (
    <div className='w-full flex flex-col'>
    <div className='w-[200px] mt-[20rem] h-[200px] bg-[red] sticky top-0'>sticky</div>
    <div className='w-full h-[1800px] bg-green-600'></div>
    </div>
  )
}

export default Sticky