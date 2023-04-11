import React from 'react'
import AttracionsForm from './AttracionsForm';

const NewAttraction = () => {
  return (
    <section>
       <h1 className='title'>Új látványosságok felvitele</h1>
       <AttracionsForm type={"new"} />
    </section>
  )
}

export default NewAttraction;