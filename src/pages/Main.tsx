import React, { useState } from "react";
import { Timezone } from "timezones.json";
import AnaloClock from "../components/AnaloClock/AnaloClock";
import SelectTimezone from "../components/SelectTimezone/SelectTimezone";
import { DateTime } from "luxon";
import "./mainStyle.css";
import { isValidZonetime } from "../components/SelectTimezone/selectTimezone.tools";

export default function Main() {
  const [timezone, setTimezone] = useState<string>(DateTime.local().zoneName);

  const handlerOnChangeTimeZone = ({ utc }: Timezone) => {
    if (isValidZonetime(utc[0])) setTimezone(utc[0]);
  };

  return (
    <div className="main-container">
      <AnaloClock timezone={timezone} />
      <div className="sidebar-container">
        <SelectTimezone onChange={handlerOnChangeTimeZone} />
        <h1>Alarms</h1>
      </div>
    </div>
  );
}
