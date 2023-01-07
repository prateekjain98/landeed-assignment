import React, { useEffect, useRef, useState } from "react";
import CountdownTimer from "./CountdownTimer";

export default function Countdown() {
  const [countdownTimers, setCountdownTimers] = useState([]);
  const [error, setError] = useState();
  const countdownTime = useRef();

  const addCountdown = () => {
    if (!countdownTime.current.value || countdownTime.current.value === "00:00:00") {
      setError("Please select a time for adding countdown");
    } else {
      const timeArray = countdownTime.current.value.split(":");
      const timeInSeconds = Number(timeArray[2]) + (Number(timeArray[1]) + Number(timeArray[0]) * 60) * 60;
      setCountdownTimers([
        ...countdownTimers,
        { id: countdownTimers.length === 0 ? 1 : countdownTimers[countdownTimers.length - 1].id + 1, time: timeInSeconds },
      ]);
    }
  };

  const deleteCountdown = (idx) => {
    const timers = [...countdownTimers];
    timers.splice(idx, 1);
    setCountdownTimers(timers);
  };

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  return (
    <div className="countdownContainer">
      <div className="countdownHeader">
        <input ref={countdownTime} type="time" defaultValue="00:00:00" step="3" className="customInput"></input>
        <button onClick={addCountdown}>Start</button>
      </div>
      <p>Time format is HH:MM:SS</p>
      <p className="customError">{error}</p>
      {countdownTimers.map((countdownTimer, index) => (
        <CountdownTimer key={countdownTimer.id} time={countdownTimer.time} deleteTimer={() => deleteCountdown(index)} />
      ))}
    </div>
  );
}
