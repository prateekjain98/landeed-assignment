import React, { useEffect, useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const CountdownTimer = ({ time, deleteTimer }) => {
  const [currentTime, setCurrentTime] = useState(time);
  const timerRef = useRef();

  // Converting seconds into HH:MM:SS
  const formatTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
  };

  const refreshClock = () => {
    setCurrentTime((prev) => prev - 1);
  };

  useEffect(() => {
    timerRef.current = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (currentTime === 0) {
      clearInterval(timerRef.current);
    }
  }, [currentTime]);

  return (
    <div className="timerRow">
      <h2>
        {formatTime(currentTime)} / {formatTime(time)}
      </h2>
      <MdDelete size={30} color="ff6863" onClick={deleteTimer} />
    </div>
  );
};

CountdownTimer.propTypes = {
  time: PropTypes.number,
  deleteTimer: PropTypes.func,
};

export default CountdownTimer;
