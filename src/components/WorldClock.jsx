import React, { useState, useEffect, useCallback } from "react";
import { timezones } from "../constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PuffLoader from 'react-spinners/PuffLoader'

export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezone, setTimezone] = useState(timezones[0].name);

  const fetchTime = async () => {
    const timezoneObj = timezones.find((x) => x.name == timezone);
    const response = await axios.get(`http://worldtimeapi.org/api/timezone/${timezoneObj.location}`);
    setCurrentTime(new Date(response.data.datetime.slice(0, -6)));
    return response.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["timezoneData", timezone],
    queryFn: fetchTime,
  });

  const refreshClock = () => {
    setCurrentTime((date) => new Date(date.getTime() + 1000));
  };

  useEffect(() => {
    const timer = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timezone]);

  return (
    <div className="clockContainer">
      <div className="dropdownContainer">
        <select
          disabled={isLoading}
          onChange={(e) => {
            setTimezone(e.target.value);
          }}
          className="customInput"
        >
          {timezones.map((timezone, index) => (
            <option key={index} value={timezone.name}>
              {timezone.name}
            </option>
          ))}
        </select>
        <PuffLoader loading={isLoading} size={40} color="cyan" />
      </div>
      <p className="customError">{error}</p>
      <h1>{currentTime.toLocaleTimeString()}</h1>
    </div>
  );
}
