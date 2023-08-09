import React, { useEffect, useState } from 'react'

function Card(props) {
  return (
    <div className='card'>{
      <div className="cardbody">
        <img className='cardİmg' src={`http://localhost:8800/images/` + props.img}></img>
        <h4 className='cardTitle'>{props.name}</h4>
        <p style={{ padding: '0.2rem' }}>{props.desc}</p>
      </div>

    }
    </div>
  )
}

export default Card
