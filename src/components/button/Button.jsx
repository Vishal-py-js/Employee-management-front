import React from 'react'
import "./Button.css"

function Button({text, onClick}) {
  return (
    <button onClick={onClick} className='but'>
        <img src="assets/icons/add.svg" alt="add"/>
        {text}
    </button>
  )
}

export default Button