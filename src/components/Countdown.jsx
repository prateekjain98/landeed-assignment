import React from 'react'

export default function Countdown() {
  return (
    <div className='countdownContainer'>
      <div className='countdownHeader'>
        <input type="time" step="3" className="customInput"></input>
        <button>Start</button>
      </div>
    </div>
  );
}
