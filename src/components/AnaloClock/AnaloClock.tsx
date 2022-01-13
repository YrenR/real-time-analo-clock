import React, { useState } from "react";
import useInterval from "../../hook/useInterval";
import "./analoClock.css";
import { createStyleTransform } from "./analoClock.tools";
import ClockNumbers from "./ClockNumbers";

export default function AnaloClock(): JSX.Element {
  const [time, setTime] = useState<Date>(new Date());

  useInterval(() => {
    setTime(new Date());
  });

  const styleHourHands = () => createStyleTransform(time.getHours() * 30);
  const styleMinuteHands = () => createStyleTransform(time.getMinutes() * 6);
  const styleSecondHands = () => createStyleTransform(time.getSeconds() * 6);

  return (
    <div className="clock-container">
      <div className="clock">
        <div className="hour-hand" {...styleHourHands()} />
        <div className="minute-hand" {...styleMinuteHands()} />
        <div className="second-hand" {...styleSecondHands()} />
        <ClockNumbers />
      </div>
    </div>
  );
}
