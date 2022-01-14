import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import useInterval from "../../hook/useInterval";
import "./analoClock.css";
import { createStyleTransform } from "./analoClock.tools";
import ClockNumbers from "./ClockNumbers";
import { isValidZonetime } from "../SelectTimezone/selectTimezone.tools";

const DELAY = 1000;

export default function AnaloClock({ timezone }: { timezone: string }): JSX.Element {
  const [dateTime, setDataTime] = useState<DateTime>(DateTime.local());

  useEffect(() => {
    if (isValidZonetime(timezone)) {
      setDataTime((prev) => prev.setZone(timezone));
    }
  }, [timezone]);

  useInterval(() => {
    setDataTime((prev) => prev.plus(DELAY));
  }, DELAY);

  const styleHourHands = () => createStyleTransform(dateTime.hour * 30);
  const styleMinuteHands = () => createStyleTransform(dateTime.minute * 6);
  const styleSecondHands = () => createStyleTransform(dateTime.second * 6);

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
